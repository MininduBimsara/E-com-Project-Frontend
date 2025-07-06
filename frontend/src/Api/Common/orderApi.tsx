// orderApi.tsx - Updated with correct Vite environment variables
import axios from "axios";

// Base URL using gateway service - according to documentation
const API_BASE_URL =
  import.meta.env.VITE_ORDER_API_URL || "http://localhost:5000/api/orders";

// Create axios instance with default config
const orderApi = axios.create({
  baseURL: API_BASE_URL, // This already includes /api/orders path
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Include cookies for authentication
});

// Add token to requests automatically
orderApi.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
orderApi.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Order API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// ==========================================
// ORDER API FUNCTIONS
// ==========================================

/**
 * Create a new order (optional auth)
 * Full URL: http://localhost:5000/api/orders/
 */
export const createOrder = async (orderData: CreateOrderData) => {
  const response = await orderApi.post("/", orderData);
  return response.data;
};

/**
 * Get order by ID (requires auth)
 * Full URL: http://localhost:5000/api/orders/{orderId}
 */
export const getOrderById = async (orderId: string) => {
  const response = await orderApi.get(`/${orderId}`);
  return response.data;
};

/**
 * Get order by order number (requires auth)
 * Full URL: http://localhost:5000/api/orders/number/{orderNumber}
 */
export const getOrderByNumber = async (orderNumber: string) => {
  const response = await orderApi.get(`/number/${orderNumber}`);
  return response.data;
};

/**
 * Get user's orders (requires auth)
 * Full URL: http://localhost:5000/api/orders/user/{userId}
 */
export const getUserOrders = async (
  userId: string,
  options?: OrderQueryOptions
) => {
  const params = new URLSearchParams();
  if (options) {
    Object.entries(options).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, value.toString());
      }
    });
  }

  const response = await orderApi.get(
    `/user/${userId}${params.toString() ? `?${params.toString()}` : ""}`
  );
  return response.data;
};

/**
 * Cancel order (requires auth)
 * Full URL: http://localhost:5000/api/orders/{orderId}/cancel
 */
export const cancelOrder = async (orderId: string) => {
  const response = await orderApi.put(`/${orderId}/cancel`);
  return response.data;
};

// ==========================================
// ADMIN API FUNCTIONS
// ==========================================

/**
 * Get all orders (Admin only)
 * Full URL: http://localhost:5000/api/orders/admin
 */
export const getAllOrders = async (options?: AdminOrderQueryOptions) => {
  const params = new URLSearchParams();
  if (options) {
    Object.entries(options).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, value.toString());
      }
    });
  }

  const response = await orderApi.get(
    `/admin${params.toString() ? `?${params.toString()}` : ""}`
  );
  return response.data;
};

/**
 * Update order status (Admin only)
 * Full URL: http://localhost:5000/api/orders/admin/{orderId}/status
 */
export const updateOrderStatus = async (
  orderId: string,
  status: OrderStatus,
  statusNote?: string
) => {
  const response = await orderApi.put(`/admin/${orderId}/status`, {
    status,
    statusNote,
  });
  return response.data;
};

/**
 * Get orders by payment status (Admin only)
 * Full URL: http://localhost:5000/api/orders/admin/payment-status/{paymentStatus}
 */
export const getOrdersByPaymentStatus = async (
  paymentStatus: PaymentStatus
) => {
  const response = await orderApi.get(`/admin/payment-status/${paymentStatus}`);
  return response.data;
};

/**
 * Get order statistics (Admin only)
 * Full URL: http://localhost:5000/api/orders/admin/statistics
 */
export const getOrderStatistics = async () => {
  const response = await orderApi.get("/admin/statistics");
  return response.data;
};

// ==========================================
// TYPES FOR API RESPONSES
// ==========================================

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

export interface ShippingAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country?: string;
}

export interface OrderItem {
  _id?: string;
  productId: string;
  quantity: number;
  priceAtOrder: number;
  productName: string;
  productImageUrl?: string;
}

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "refunded";

export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";

export interface StatusHistory {
  status: OrderStatus;
  changedAt: string;
  changedBy?: string;
  note?: string;
}

export interface Order {
  _id: string;
  userId: string;
  orderNumber: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  currency: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentId?: string;
  shippingAddress: ShippingAddress;
  statusHistory: StatusHistory[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderData {
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
}

export interface OrderQueryOptions {
  status?: OrderStatus;
  limit?: number;
  skip?: number;
}

export interface AdminOrderQueryOptions extends OrderQueryOptions {
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface OrderStatistics {
  totalOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
  statusBreakdown: Record<OrderStatus, number>;
  revenueByPeriod: Array<{
    period: string;
    revenue: number;
    orders: number;
  }>;
}

// Export the order API instance for direct use if needed
export default orderApi;
