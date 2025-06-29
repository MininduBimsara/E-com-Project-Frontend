// orderThunks.tsx - Async actions for order operations
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createOrder as createOrderApi,
  getOrderById as getOrderByIdApi,
  getOrderByNumber as getOrderByNumberApi,
  getUserOrders as getUserOrdersApi,
  cancelOrder as cancelOrderApi,
  getAllOrders as getAllOrdersApi,
  updateOrderStatus as updateOrderStatusApi,
  getOrderStatistics as getOrderStatisticsApi,
  type ApiResponse,
  type Order,
  type CreateOrderData,
  type OrderQueryOptions,
  type AdminOrderQueryOptions,
  type OrderStatistics,
  type OrderStatus,
} from "../../Api/Common/orderApi";

import {
  setLoading,
  setCreating,
  setUpdating,
  setCancelling,
  setFetchingUserOrders,
  setFetchingOrderDetails,
  setFetchingStatistics,
  setOrders,
  setUserOrders,
  addOrder,
  updateOrder,
  setCurrentOrder,
  setOrderStatistics,
  setError,
  setCreateError,
  setUpdateError,
  setCancelError,
  setUserOrdersError,
  setOrderDetailsError,
  setStatisticsError,
  setLastAction,
  updateLocalOrderStatus,
} from "../Slicers/orderSlice";

// ==========================================
// ORDER ASYNC THUNKS
// ==========================================

/**
 * Create a new order
 */
export const createOrder = createAsyncThunk<
  Order,
  CreateOrderData,
  { rejectValue: string }
>(
  "orders/createOrder",
  async (orderData: CreateOrderData, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setCreating(true));
      dispatch(setLastAction("Creating order..."));

      const response: ApiResponse<Order> = await createOrderApi(orderData);

      if (!response.success) {
        throw new Error(response.message || "Failed to create order");
      }

      dispatch(addOrder(response.data!));
      dispatch(setLastAction("Order created successfully"));

      return response.data!;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to create order";
      dispatch(setCreateError(errorMessage));
      return rejectWithValue(errorMessage);
    } finally {
      dispatch(setCreating(false));
    }
  }
);

/**
 * Fetch order by ID
 */
export const fetchOrderById = createAsyncThunk<
  Order,
  string,
  { rejectValue: string }
>(
  "orders/fetchOrderById",
  async (orderId: string, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setFetchingOrderDetails(true));
      dispatch(setLastAction("Fetching order details..."));

      const response: ApiResponse<Order> = await getOrderByIdApi(orderId);

      if (!response.success) {
        throw new Error(response.message || "Failed to fetch order");
      }

      dispatch(setCurrentOrder(response.data!));
      dispatch(setLastAction("Order details fetched successfully"));

      return response.data!;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch order";
      dispatch(setOrderDetailsError(errorMessage));
      return rejectWithValue(errorMessage);
    } finally {
      dispatch(setFetchingOrderDetails(false));
    }
  }
);

/**
 * Fetch order by order number
 */
export const fetchOrderByNumber = createAsyncThunk<
  Order,
  string,
  { rejectValue: string }
>(
  "orders/fetchOrderByNumber",
  async (orderNumber: string, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setFetchingOrderDetails(true));
      dispatch(setLastAction("Fetching order by number..."));

      const response: ApiResponse<Order> = await getOrderByNumberApi(
        orderNumber
      );

      if (!response.success) {
        throw new Error(response.message || "Failed to fetch order");
      }

      dispatch(setCurrentOrder(response.data!));
      dispatch(setLastAction("Order fetched successfully"));

      return response.data!;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch order";
      dispatch(setOrderDetailsError(errorMessage));
      return rejectWithValue(errorMessage);
    } finally {
      dispatch(setFetchingOrderDetails(false));
    }
  }
);

/**
 * Fetch user's orders
 */
export const fetchUserOrders = createAsyncThunk<
  Order[],
  { userId: string; options?: OrderQueryOptions },
  { rejectValue: string }
>(
  "orders/fetchUserOrders",
  async ({ userId, options }, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setFetchingUserOrders(true));
      dispatch(setLastAction("Fetching user orders..."));

      const response: ApiResponse<Order[]> = await getUserOrdersApi(
        userId,
        options
      );

      if (!response.success) {
        throw new Error(response.message || "Failed to fetch user orders");
      }

      dispatch(setUserOrders(response.data!));
      dispatch(setLastAction("User orders fetched successfully"));

      return response.data!;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch user orders";
      dispatch(setUserOrdersError(errorMessage));
      return rejectWithValue(errorMessage);
    } finally {
      dispatch(setFetchingUserOrders(false));
    }
  }
);

/**
 * Cancel an order
 */
export const cancelOrder = createAsyncThunk<
  Order,
  string,
  { rejectValue: string }
>(
  "orders/cancelOrder",
  async (orderId: string, { dispatch, rejectWithValue }) => {
    try {
      // Optimistic update
      dispatch(updateLocalOrderStatus({ orderId, status: "cancelled" }));

      dispatch(setCancelling(true));
      dispatch(setLastAction("Cancelling order..."));

      const response: ApiResponse<Order> = await cancelOrderApi(orderId);

      if (!response.success) {
        throw new Error(response.message || "Failed to cancel order");
      }

      dispatch(updateOrder(response.data!));
      dispatch(setLastAction("Order cancelled successfully"));

      return response.data!;
    } catch (error: any) {
      // Revert optimistic update by fetching fresh order
      dispatch(fetchOrderById(orderId));

      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to cancel order";
      dispatch(setCancelError(errorMessage));
      return rejectWithValue(errorMessage);
    } finally {
      dispatch(setCancelling(false));
    }
  }
);

// ==========================================
// ADMIN ORDER ASYNC THUNKS
// ==========================================

/**
 * Fetch all orders (Admin only)
 */
export const fetchAllOrders = createAsyncThunk<
  Order[],
  AdminOrderQueryOptions | undefined,
  { rejectValue: string }
>("orders/fetchAllOrders", async (options, { dispatch, rejectWithValue }) => {
  try {
    dispatch(setLoading(true));
    dispatch(setLastAction("Fetching all orders..."));

    const response: ApiResponse<Order[]> = await getAllOrdersApi(options);

    if (!response.success) {
      throw new Error(response.message || "Failed to fetch orders");
    }

    dispatch(setOrders(response.data!));
    dispatch(setLastAction("All orders fetched successfully"));

    return response.data!;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Failed to fetch orders";
    dispatch(setError(errorMessage));
    return rejectWithValue(errorMessage);
  } finally {
    dispatch(setLoading(false));
  }
});

/**
 * Update order status (Admin only)
 */
export const updateOrderStatus = createAsyncThunk<
  Order,
  { orderId: string; status: OrderStatus; statusNote?: string },
  { rejectValue: string }
>(
  "orders/updateOrderStatus",
  async ({ orderId, status, statusNote }, { dispatch, rejectWithValue }) => {
    try {
      // Optimistic update
      dispatch(updateLocalOrderStatus({ orderId, status }));

      dispatch(setUpdating(true));
      dispatch(setLastAction(`Updating order status to ${status}...`));

      const response: ApiResponse<Order> = await updateOrderStatusApi(
        orderId,
        status,
        statusNote
      );

      if (!response.success) {
        throw new Error(response.message || "Failed to update order status");
      }

      dispatch(updateOrder(response.data!));
      dispatch(setLastAction("Order status updated successfully"));

      return response.data!;
    } catch (error: any) {
      // Revert optimistic update by fetching fresh order
      dispatch(fetchOrderById(orderId));

      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to update order status";
      dispatch(setUpdateError(errorMessage));
      return rejectWithValue(errorMessage);
    } finally {
      dispatch(setUpdating(false));
    }
  }
);

/**
 * Fetch order statistics (Admin only)
 */
export const fetchOrderStatistics = createAsyncThunk<
  OrderStatistics,
  { timeframe?: string; groupBy?: string },
  { rejectValue: string }
>(
  "orders/fetchOrderStatistics",
  async ({ timeframe, groupBy }, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setFetchingStatistics(true));
      dispatch(setLastAction("Fetching order statistics..."));

      const response: ApiResponse<OrderStatistics> =
        await getOrderStatisticsApi(timeframe, groupBy);

      if (!response.success) {
        throw new Error(response.message || "Failed to fetch order statistics");
      }

      dispatch(setOrderStatistics(response.data!));
      dispatch(setLastAction("Order statistics fetched successfully"));

      return response.data!;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch order statistics";
      dispatch(setStatisticsError(errorMessage));
      return rejectWithValue(errorMessage);
    } finally {
      dispatch(setFetchingStatistics(false));
    }
  }
);

// ==========================================
// UTILITY THUNKS
// ==========================================

/**
 * Refresh user orders (useful after external changes)
 */
export const refreshUserOrders = createAsyncThunk<
  Order[],
  { userId: string; options?: OrderQueryOptions },
  { rejectValue: string }
>("orders/refreshUserOrders", async ({ userId, options }, { dispatch }) => {
  return dispatch(fetchUserOrders({ userId, options })).unwrap();
});

/**
 * Refresh current order
 */
export const refreshCurrentOrder = createAsyncThunk<
  Order,
  string,
  { rejectValue: string }
>("orders/refreshCurrentOrder", async (orderId: string, { dispatch }) => {
  return dispatch(fetchOrderById(orderId)).unwrap();
});

/**
 * Batch fetch orders with pagination
 */
export const fetchOrdersBatch = createAsyncThunk<
  Order[],
  {
    userId?: string;
    options?: OrderQueryOptions;
    isAdmin?: boolean;
    adminOptions?: AdminOrderQueryOptions;
  },
  { rejectValue: string }
>(
  "orders/fetchOrdersBatch",
  async ({ userId, options, isAdmin, adminOptions }, { dispatch }) => {
    if (isAdmin) {
      return dispatch(fetchAllOrders(adminOptions)).unwrap();
    } else if (userId) {
      return dispatch(fetchUserOrders({ userId, options })).unwrap();
    } else {
      throw new Error("User ID is required for non-admin users");
    }
  }
);

/**
 * Search orders by order number
 */
export const searchOrderByNumber = createAsyncThunk<
  Order,
  string,
  { rejectValue: string }
>("orders/searchOrderByNumber", async (orderNumber: string, { dispatch }) => {
  return dispatch(fetchOrderByNumber(orderNumber)).unwrap();
});

/**
 * Bulk update orders (Admin only)
 */
export const bulkUpdateOrderStatus = createAsyncThunk<
  Order[],
  { orderIds: string[]; status: OrderStatus; statusNote?: string },
  { rejectValue: string }
>(
  "orders/bulkUpdateOrderStatus",
  async ({ orderIds, status, statusNote }, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setUpdating(true));
      dispatch(setLastAction(`Bulk updating ${orderIds.length} orders...`));

      const updatePromises = orderIds.map((orderId) =>
        dispatch(updateOrderStatus({ orderId, status, statusNote })).unwrap()
      );

      const updatedOrders = await Promise.all(updatePromises);

      dispatch(
        setLastAction(`Successfully updated ${updatedOrders.length} orders`)
      );

      return updatedOrders;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to bulk update orders";
      dispatch(setUpdateError(errorMessage));
      return rejectWithValue(errorMessage);
    } finally {
      dispatch(setUpdating(false));
    }
  }
);

/**
 * Get orders by status
 */
export const fetchOrdersByStatus = createAsyncThunk<
  Order[],
  { userId?: string; status: OrderStatus; isAdmin?: boolean },
  { rejectValue: string }
>(
  "orders/fetchOrdersByStatus",
  async ({ userId, status, isAdmin }, { dispatch }) => {
    const options = { status };

    if (isAdmin) {
      return dispatch(fetchAllOrders(options)).unwrap();
    } else if (userId) {
      return dispatch(fetchUserOrders({ userId, options })).unwrap();
    } else {
      throw new Error("User ID is required for non-admin users");
    }
  }
);

/**
 * Validate order before status change
 */
export const validateOrderStatusChange = createAsyncThunk<
  boolean,
  { orderId: string; newStatus: OrderStatus },
  { rejectValue: string }
>(
  "orders/validateOrderStatusChange",
  async ({ orderId, newStatus }, { dispatch, getState, rejectWithValue }) => {
    try {
      // Get current order state
      const state = getState() as { orders: any };
      const currentOrder =
        state.orders.currentOrder ||
        state.orders.orders.find((order: Order) => order._id === orderId) ||
        state.orders.userOrders.find((order: Order) => order._id === orderId);

      if (!currentOrder) {
        // Fetch the order if not in state
        await dispatch(fetchOrderById(orderId)).unwrap();
        const updatedState = getState() as { orders: any };
        const order = updatedState.orders.currentOrder;

        if (!order) {
          throw new Error("Order not found");
        }

        return validateStatusTransition(order.status, newStatus);
      }

      return validateStatusTransition(currentOrder.status, newStatus);
    } catch (error: any) {
      return rejectWithValue(
        error.message || "Failed to validate status change"
      );
    }
  }
);

// ==========================================
// HELPER FUNCTIONS
// ==========================================

/**
 * Validate if status transition is allowed
 */
function validateStatusTransition(
  currentStatus: OrderStatus,
  newStatus: OrderStatus
): boolean {
  const allowedTransitions: Record<OrderStatus, OrderStatus[]> = {
    pending: ["confirmed", "cancelled"],
    confirmed: ["processing", "cancelled"],
    processing: ["shipped", "cancelled"],
    shipped: ["delivered"],
    delivered: ["refunded"],
    cancelled: [],
    refunded: [],
  };

  return allowedTransitions[currentStatus]?.includes(newStatus) || false;
}

// ==========================================
// EXPORT ALL THUNKS
// ==========================================

