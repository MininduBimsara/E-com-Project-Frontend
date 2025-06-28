// orderSlice.tsx - Redux slice for order state management
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  Order,
  OrderStatus,
  OrderStatistics,
} from "../../Api/Common/orderApi";

// ==========================================
// TYPES & INTERFACES
// ==========================================

export interface OrderState {
  // Order data
  orders: Order[];
  userOrders: Order[];
  currentOrder: Order | null;
  orderStatistics: OrderStatistics | null;

  // Loading states
  loading: boolean;
  creating: boolean;
  updating: boolean;
  cancelling: boolean;
  fetchingUserOrders: boolean;
  fetchingOrderDetails: boolean;
  fetchingStatistics: boolean;

  // Error handling
  error: string | null;
  createError: string | null;
  updateError: string | null;
  cancelError: string | null;
  userOrdersError: string | null;
  orderDetailsError: string | null;
  statisticsError: string | null;

  // UI state
  lastAction: string | null;
  selectedOrderId: string | null;

  // Pagination
  hasMoreOrders: boolean;
  totalOrders: number;
  currentPage: number;

  // Filters
  activeFilters: {
    status?: OrderStatus;
    dateFrom?: string;
    dateTo?: string;
  };

  // Cache
  lastFetched: string | null;
}

// Initial state
const initialState: OrderState = {
  orders: [],
  userOrders: [],
  currentOrder: null,
  orderStatistics: null,
  loading: false,
  creating: false,
  updating: false,
  cancelling: false,
  fetchingUserOrders: false,
  fetchingOrderDetails: false,
  fetchingStatistics: false,
  error: null,
  createError: null,
  updateError: null,
  cancelError: null,
  userOrdersError: null,
  orderDetailsError: null,
  statisticsError: null,
  lastAction: null,
  selectedOrderId: null,
  hasMoreOrders: true,
  totalOrders: 0,
  currentPage: 1,
  activeFilters: {},
  lastFetched: null,
};

// ==========================================
// ORDER SLICE
// ==========================================

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    // ========== LOADING STATES ==========
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
      if (action.payload) {
        state.error = null;
      }
    },

    setCreating: (state, action: PayloadAction<boolean>) => {
      state.creating = action.payload;
      if (action.payload) {
        state.createError = null;
      }
    },

    setUpdating: (state, action: PayloadAction<boolean>) => {
      state.updating = action.payload;
      if (action.payload) {
        state.updateError = null;
      }
    },

    setCancelling: (state, action: PayloadAction<boolean>) => {
      state.cancelling = action.payload;
      if (action.payload) {
        state.cancelError = null;
      }
    },

    setFetchingUserOrders: (state, action: PayloadAction<boolean>) => {
      state.fetchingUserOrders = action.payload;
      if (action.payload) {
        state.userOrdersError = null;
      }
    },

    setFetchingOrderDetails: (state, action: PayloadAction<boolean>) => {
      state.fetchingOrderDetails = action.payload;
      if (action.payload) {
        state.orderDetailsError = null;
      }
    },

    setFetchingStatistics: (state, action: PayloadAction<boolean>) => {
      state.fetchingStatistics = action.payload;
      if (action.payload) {
        state.statisticsError = null;
      }
    },

    // ========== ORDER DATA ==========
    setOrders: (state, action: PayloadAction<Order[]>) => {
      state.orders = action.payload;
      state.totalOrders = action.payload.length;
      state.lastFetched = new Date().toISOString();
      state.error = null;
    },

    setUserOrders: (state, action: PayloadAction<Order[]>) => {
      state.userOrders = action.payload;
      state.userOrdersError = null;
    },

    addOrder: (state, action: PayloadAction<Order>) => {
      state.orders.unshift(action.payload);
      state.userOrders.unshift(action.payload);
      state.totalOrders += 1;
    },

    updateOrder: (state, action: PayloadAction<Order>) => {
      const updatedOrder = action.payload;

      // Update in orders list
      const orderIndex = state.orders.findIndex(
        (order) => order._id === updatedOrder._id
      );
      if (orderIndex !== -1) {
        state.orders[orderIndex] = updatedOrder;
      }

      // Update in user orders list
      const userOrderIndex = state.userOrders.findIndex(
        (order) => order._id === updatedOrder._id
      );
      if (userOrderIndex !== -1) {
        state.userOrders[userOrderIndex] = updatedOrder;
      }

      // Update current order if it's the same
      if (state.currentOrder?._id === updatedOrder._id) {
        state.currentOrder = updatedOrder;
      }
    },

    setCurrentOrder: (state, action: PayloadAction<Order>) => {
      state.currentOrder = action.payload;
      state.orderDetailsError = null;
    },

    clearCurrentOrder: (state) => {
      state.currentOrder = null;
      state.orderDetailsError = null;
    },

    setOrderStatistics: (state, action: PayloadAction<OrderStatistics>) => {
      state.orderStatistics = action.payload;
      state.statisticsError = null;
    },

    // ========== ERROR HANDLING ==========
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },

    setCreateError: (state, action: PayloadAction<string>) => {
      state.createError = action.payload;
      state.creating = false;
    },

    setUpdateError: (state, action: PayloadAction<string>) => {
      state.updateError = action.payload;
      state.updating = false;
    },

    setCancelError: (state, action: PayloadAction<string>) => {
      state.cancelError = action.payload;
      state.cancelling = false;
    },

    setUserOrdersError: (state, action: PayloadAction<string>) => {
      state.userOrdersError = action.payload;
      state.fetchingUserOrders = false;
    },

    setOrderDetailsError: (state, action: PayloadAction<string>) => {
      state.orderDetailsError = action.payload;
      state.fetchingOrderDetails = false;
    },

    setStatisticsError: (state, action: PayloadAction<string>) => {
      state.statisticsError = action.payload;
      state.fetchingStatistics = false;
    },

    clearErrors: (state) => {
      state.error = null;
      state.createError = null;
      state.updateError = null;
      state.cancelError = null;
      state.userOrdersError = null;
      state.orderDetailsError = null;
      state.statisticsError = null;
    },

    // ========== UI STATE ==========
    setLastAction: (state, action: PayloadAction<string>) => {
      state.lastAction = action.payload;
    },

    setSelectedOrderId: (state, action: PayloadAction<string | null>) => {
      state.selectedOrderId = action.payload;
    },

    // ========== PAGINATION ==========
    setHasMoreOrders: (state, action: PayloadAction<boolean>) => {
      state.hasMoreOrders = action.payload;
    },

    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },

    incrementPage: (state) => {
      state.currentPage += 1;
    },

    resetPagination: (state) => {
      state.currentPage = 1;
      state.hasMoreOrders = true;
    },

    // ========== FILTERS ==========
    setActiveFilters: (
      state,
      action: PayloadAction<OrderState["activeFilters"]>
    ) => {
      state.activeFilters = action.payload;
    },

    clearActiveFilters: (state) => {
      state.activeFilters = {};
    },

    // ========== LOCAL ORDER UPDATES (Optimistic) ==========
    updateLocalOrderStatus: (
      state,
      action: PayloadAction<{ orderId: string; status: OrderStatus }>
    ) => {
      const { orderId, status } = action.payload;

      // Update in orders list
      const orderIndex = state.orders.findIndex(
        (order) => order._id === orderId
      );
      if (orderIndex !== -1) {
        state.orders[orderIndex].status = status;
        state.orders[orderIndex].statusHistory.push({
          status,
          changedAt: new Date().toISOString(),
        });
      }

      // Update in user orders list
      const userOrderIndex = state.userOrders.findIndex(
        (order) => order._id === orderId
      );
      if (userOrderIndex !== -1) {
        state.userOrders[userOrderIndex].status = status;
        state.userOrders[userOrderIndex].statusHistory.push({
          status,
          changedAt: new Date().toISOString(),
        });
      }

      // Update current order if it's the same
      if (state.currentOrder?._id === orderId) {
        state.currentOrder.status = status;
        state.currentOrder.statusHistory.push({
          status,
          changedAt: new Date().toISOString(),
        });
      }
    },

    // ========== RESET ==========
    resetOrderState: () => initialState,

    clearOrderData: (state) => {
      state.orders = [];
      state.userOrders = [];
      state.currentOrder = null;
      state.orderStatistics = null;
      state.totalOrders = 0;
      state.lastFetched = null;
    },
  },
});

// ==========================================
// EXPORT ACTIONS & REDUCER
// ==========================================

export const {
  // Loading states
  setLoading,
  setCreating,
  setUpdating,
  setCancelling,
  setFetchingUserOrders,
  setFetchingOrderDetails,
  setFetchingStatistics,

  // Order data
  setOrders,
  setUserOrders,
  addOrder,
  updateOrder,
  setCurrentOrder,
  clearCurrentOrder,
  setOrderStatistics,

  // Error handling
  setError,
  setCreateError,
  setUpdateError,
  setCancelError,
  setUserOrdersError,
  setOrderDetailsError,
  setStatisticsError,
  clearErrors,

  // UI state
  setLastAction,
  setSelectedOrderId,

  // Pagination
  setHasMoreOrders,
  setCurrentPage,
  incrementPage,
  resetPagination,

  // Filters
  setActiveFilters,
  clearActiveFilters,

  // Local updates
  updateLocalOrderStatus,

  // Reset
  resetOrderState,
  clearOrderData,
} = orderSlice.actions;

export default orderSlice.reducer;

// ==========================================
// SELECTORS (for easy state access)
// ==========================================

export const selectOrders = (state: { orders: OrderState }) =>
  state.orders.orders;
export const selectUserOrders = (state: { orders: OrderState }) =>
  state.orders.userOrders;
export const selectCurrentOrder = (state: { orders: OrderState }) =>
  state.orders.currentOrder;
export const selectOrderStatistics = (state: { orders: OrderState }) =>
  state.orders.orderStatistics;

export const selectOrdersLoading = (state: { orders: OrderState }) =>
  state.orders.loading;
export const selectOrdersCreating = (state: { orders: OrderState }) =>
  state.orders.creating;
export const selectOrdersUpdating = (state: { orders: OrderState }) =>
  state.orders.updating;
export const selectOrdersCancelling = (state: { orders: OrderState }) =>
  state.orders.cancelling;
export const selectFetchingUserOrders = (state: { orders: OrderState }) =>
  state.orders.fetchingUserOrders;
export const selectFetchingOrderDetails = (state: { orders: OrderState }) =>
  state.orders.fetchingOrderDetails;
export const selectFetchingStatistics = (state: { orders: OrderState }) =>
  state.orders.fetchingStatistics;

export const selectOrdersError = (state: { orders: OrderState }) =>
  state.orders.error;
export const selectCreateError = (state: { orders: OrderState }) =>
  state.orders.createError;
export const selectUpdateError = (state: { orders: OrderState }) =>
  state.orders.updateError;
export const selectCancelError = (state: { orders: OrderState }) =>
  state.orders.cancelError;
export const selectUserOrdersError = (state: { orders: OrderState }) =>
  state.orders.userOrdersError;
export const selectOrderDetailsError = (state: { orders: OrderState }) =>
  state.orders.orderDetailsError;
export const selectStatisticsError = (state: { orders: OrderState }) =>
  state.orders.statisticsError;

export const selectLastAction = (state: { orders: OrderState }) =>
  state.orders.lastAction;
export const selectSelectedOrderId = (state: { orders: OrderState }) =>
  state.orders.selectedOrderId;
export const selectHasMoreOrders = (state: { orders: OrderState }) =>
  state.orders.hasMoreOrders;
export const selectCurrentPage = (state: { orders: OrderState }) =>
  state.orders.currentPage;
export const selectTotalOrders = (state: { orders: OrderState }) =>
  state.orders.totalOrders;
export const selectActiveFilters = (state: { orders: OrderState }) =>
  state.orders.activeFilters;

// Combined selectors
export const selectOrderById =
  (orderId: string) => (state: { orders: OrderState }) =>
    state.orders.orders.find((order) => order._id === orderId) ||
    state.orders.userOrders.find((order) => order._id === orderId);

export const selectOrdersByStatus =
  (status: OrderStatus) => (state: { orders: OrderState }) =>
    state.orders.userOrders.filter((order) => order.status === status);

export const selectPendingOrders = (state: { orders: OrderState }) =>
  state.orders.userOrders.filter((order) => order.status === "pending");

export const selectRecentOrders =
  (limit: number = 5) =>
  (state: { orders: OrderState }) =>
    state.orders.userOrders
      .slice()
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .slice(0, limit);

export const selectTotalOrderValue = (state: { orders: OrderState }) =>
  state.orders.userOrders.reduce((total, order) => total + order.total, 0);

export const selectOrdersWithinDateRange =
  (startDate: string, endDate: string) => (state: { orders: OrderState }) =>
    state.orders.userOrders.filter((order) => {
      const orderDate = new Date(order.createdAt);
      return orderDate >= new Date(startDate) && orderDate <= new Date(endDate);
    });
