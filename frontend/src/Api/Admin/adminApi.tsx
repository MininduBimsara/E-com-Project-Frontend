import axios, { AxiosInstance, AxiosResponse } from "axios";

// Admin interfaces
export interface AdminCredentials {
  email: string;
  password: string;
}

export interface Admin {
  id: string;
  username: string;
  email: string;
  role: string;
  lastLoginAt?: string;
  status: string;
}

export interface AdminLoginResponse {
  admin: Admin;
}

export interface DashboardStats {
  users: number;
  products: number;
  orders: number;
  revenue: number;
  status: {
    userService: string;
    productService: string;
    orderService: string;
  };
}

export interface User {
  id: string;
  username: string;
  email: string;
  status: string;
  createdAt: string;
  lastLoginAt?: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: string;
  createdAt: string;
}

export interface Order {
  id: string;
  userId: string;
  totalAmount: number;
  status: string;
  createdAt: string;
  items: any[];
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
}

const API_URL = `${import.meta.env.VITE_ADMIN_API_URL}/api/admin`;

// Create axios instance with default config
const adminApiClient: AxiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Response interceptor to handle errors
adminApiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // JWT cookie will be automatically cleared by the server
      window.location.href = "/admin/login";
    }
    return Promise.reject(error);
  }
);

// Admin API functions
export const adminApi = {
  // Admin login
  login: async (credentials: AdminCredentials): Promise<AdminLoginResponse> => {
    try {
      const response: AxiosResponse<ApiResponse<AdminLoginResponse>> =
        await adminApiClient.post("/login", credentials);

      if (response.data.success && response.data.data) {
        // JWT token is automatically stored in httpOnly cookie by server
        return response.data.data;
      } else {
        throw new Error(response.data.message || "Login failed");
      }
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Login failed");
    }
  },

  // Get admin profile
  getProfile: async (): Promise<Admin> => {
    try {
      const response: AxiosResponse<ApiResponse<Admin>> =
        await adminApiClient.get("/profile");

      if (response.data.success && response.data.data) {
        return response.data.data;
      } else {
        throw new Error(response.data.message || "Failed to fetch profile");
      }
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch profile"
      );
    }
  },

  // Get dashboard statistics
  getDashboard: async (): Promise<DashboardStats> => {
    try {
      const response: AxiosResponse<ApiResponse<DashboardStats>> =
        await adminApiClient.get("/dashboard");

      if (response.data.success && response.data.data) {
        return response.data.data;
      } else {
        throw new Error(
          response.data.message || "Failed to fetch dashboard stats"
        );
      }
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch dashboard stats"
      );
    }
  },

  // Get all users
  getUsers: async (
    page: number = 1,
    limit: number = 10,
    search: string = ""
  ): Promise<PaginatedResponse<User>> => {
    try {
      const response: AxiosResponse<ApiResponse<PaginatedResponse<User>>> =
        await adminApiClient.get("/users", {
          params: { page, limit, search },
        });

      if (response.data.success && response.data.data) {
        return response.data.data;
      } else {
        throw new Error(response.data.message || "Failed to fetch users");
      }
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to fetch users");
    }
  },

  // Get all products
  getProducts: async (
    page: number = 1,
    limit: number = 10,
    search: string = "",
    category: string = ""
  ): Promise<PaginatedResponse<Product>> => {
    try {
      const response: AxiosResponse<ApiResponse<PaginatedResponse<Product>>> =
        await adminApiClient.get("/products", {
          params: { page, limit, search, category },
        });

      if (response.data.success && response.data.data) {
        return response.data.data;
      } else {
        throw new Error(response.data.message || "Failed to fetch products");
      }
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch products"
      );
    }
  },

  // Get all orders
  getOrders: async (
    page: number = 1,
    limit: number = 10,
    status: string = ""
  ): Promise<PaginatedResponse<Order>> => {
    try {
      const response: AxiosResponse<ApiResponse<PaginatedResponse<Order>>> =
        await adminApiClient.get("/orders", {
          params: { page, limit, status },
        });

      if (response.data.success && response.data.data) {
        return response.data.data;
      } else {
        throw new Error(response.data.message || "Failed to fetch orders");
      }
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch orders"
      );
    }
  },

  // Update order status
  updateOrderStatus: async (
    orderId: string,
    status: string
  ): Promise<Order> => {
    try {
      const response: AxiosResponse<ApiResponse<Order>> =
        await adminApiClient.put(`/orders/${orderId}/status`, { status });

      if (response.data.success && response.data.data) {
        return response.data.data;
      } else {
        throw new Error(
          response.data.message || "Failed to update order status"
        );
      }
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to update order status"
      );
    }
  },

  // Update user status
  updateUserStatus: async (userId: string, status: string): Promise<User> => {
    try {
      const response: AxiosResponse<ApiResponse<User>> =
        await adminApiClient.put(`/users/${userId}/status`, { status });

      if (response.data.success && response.data.data) {
        return response.data.data;
      } else {
        throw new Error(
          response.data.message || "Failed to update user status"
        );
      }
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to update user status"
      );
    }
  },

  // Admin logout
  logout: async (): Promise<{ success: boolean }> => {
    try {
      await adminApiClient.post("/logout");
      // JWT cookie will be automatically cleared by the server
      return { success: true };
    } catch (error: any) {
      // Even if logout fails, we consider it successful for frontend purposes
      throw new Error(error.response?.data?.message || "Logout failed");
    }
  },
};

export default adminApi;
