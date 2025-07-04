import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  adminApi,
  AdminCredentials,
  AdminLoginResponse,
  Admin,
  DashboardStats,
  User,
  Product,
  Order,
  PaginatedResponse,
} from "../../Api/Admin/adminApi";

// Admin login thunk
export const loginAdmin = createAsyncThunk<
  AdminLoginResponse,
  AdminCredentials,
  { rejectValue: string }
>("admin/login", async (credentials, { rejectWithValue }) => {
  try {
    const result = await adminApi.login(credentials);
    return result;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

// Get admin profile thunk
export const getAdminProfile = createAsyncThunk<
  Admin,
  void,
  { rejectValue: string }
>("admin/getProfile", async (_, { rejectWithValue }) => {
  try {
    const admin = await adminApi.getProfile();
    return admin;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

// Get dashboard statistics thunk
export const getDashboardStats = createAsyncThunk<
  DashboardStats,
  void,
  { rejectValue: string }
>("admin/getDashboard", async (_, { rejectWithValue }) => {
  try {
    const stats = await adminApi.getDashboard();
    return stats;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

// Get users thunk
export const getUsers = createAsyncThunk<
  PaginatedResponse<User>,
  { page?: number; limit?: number; search?: string },
  { rejectValue: string }
>(
  "admin/getUsers",
  async ({ page = 1, limit = 10, search = "" }, { rejectWithValue }) => {
    try {
      const users = await adminApi.getUsers(page, limit, search);
      return users;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Get products thunk
export const getProducts = createAsyncThunk<
  PaginatedResponse<Product>,
  { page?: number; limit?: number; search?: string; category?: string },
  { rejectValue: string }
>(
  "admin/getProducts",
  async (
    { page = 1, limit = 10, search = "", category = "" },
    { rejectWithValue }
  ) => {
    try {
      const products = await adminApi.getProducts(
        page,
        limit,
        search,
        category
      );
      return products;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Get orders thunk
export const getOrders = createAsyncThunk<
  PaginatedResponse<Order>,
  { page?: number; limit?: number; status?: string },
  { rejectValue: string }
>(
  "admin/getOrders",
  async ({ page = 1, limit = 10, status = "" }, { rejectWithValue }) => {
    try {
      const orders = await adminApi.getOrders(page, limit, status);
      return orders;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Update order status thunk
export const updateOrderStatus = createAsyncThunk<
  Order,
  { orderId: string; status: string },
  { rejectValue: string }
>(
  "admin/updateOrderStatus",
  async ({ orderId, status }, { rejectWithValue }) => {
    try {
      const updatedOrder = await adminApi.updateOrderStatus(orderId, status);
      return updatedOrder;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Update user status thunk
export const updateUserStatus = createAsyncThunk<
  User,
  { userId: string; status: string },
  { rejectValue: string }
>("admin/updateUserStatus", async ({ userId, status }, { rejectWithValue }) => {
  try {
    const updatedUser = await adminApi.updateUserStatus(userId, status);
    return updatedUser;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

// Admin logout thunk
export const logoutAdmin = createAsyncThunk<
  { success: boolean },
  void,
  { rejectValue: string }
>("admin/logout", async (_, { rejectWithValue }) => {
  try {
    const result = await adminApi.logout();
    return result;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

// Verify admin authentication thunk
export const verifyAdminAuth = createAsyncThunk<
  Admin,
  void,
  { rejectValue: string }
>("admin/verifyAuth", async (_, { rejectWithValue }) => {
  try {
    const admin = await adminApi.getProfile();
    return admin;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});
