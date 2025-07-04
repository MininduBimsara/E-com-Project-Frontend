import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  loginAdmin,
  getAdminProfile,
  getDashboardStats,
  getUsers,
  getProducts,
  getOrders,
  updateOrderStatus,
  updateUserStatus,
  logoutAdmin,
  verifyAdminAuth,
} from "../Thunks/adminThunks";
import {
  Admin,
  DashboardStats,
  User,
  Product,
  Order,
  PaginatedResponse,
} from "../../Api/Admin/adminApi";

interface AdminState {
  // Admin data
  admin: Admin | null;
  isAuthenticated: boolean;

  // Dashboard data
  dashboardStats: DashboardStats | null;

  // Users data
  users: PaginatedResponse<User> | null;

  // Products data
  products: PaginatedResponse<Product> | null;

  // Orders data
  orders: PaginatedResponse<Order> | null;

  // Loading states
  loading: {
    auth: boolean;
    dashboard: boolean;
    users: boolean;
    products: boolean;
    orders: boolean;
    updateOrder: boolean;
    updateUser: boolean;
  };

  // Error states
  error: {
    auth: string | null;
    dashboard: string | null;
    users: string | null;
    products: string | null;
    orders: string | null;
    updateOrder: string | null;
    updateUser: string | null;
  };
}

const initialState: AdminState = {
  admin: null,
  isAuthenticated: false,
  dashboardStats: null,
  users: null,
  products: null,
  orders: null,
  loading: {
    auth: false,
    dashboard: false,
    users: false,
    products: false,
    orders: false,
    updateOrder: false,
    updateUser: false,
  },
  error: {
    auth: null,
    dashboard: null,
    users: null,
    products: null,
    orders: null,
    updateOrder: null,
    updateUser: null,
  },
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    // Clear specific errors
    clearAuthError: (state) => {
      state.error.auth = null;
    },
    clearDashboardError: (state) => {
      state.error.dashboard = null;
    },
    clearUsersError: (state) => {
      state.error.users = null;
    },
    clearProductsError: (state) => {
      state.error.products = null;
    },
    clearOrdersError: (state) => {
      state.error.orders = null;
    },
    clearUpdateOrderError: (state) => {
      state.error.updateOrder = null;
    },
    clearUpdateUserError: (state) => {
      state.error.updateUser = null;
    },

    // Clear all errors
    clearAllErrors: (state) => {
      Object.keys(state.error).forEach((key) => {
        state.error[key as keyof typeof state.error] = null;
      });
    },

    // Manual admin data clear (for logout)
    clearAdminData: (state) => {
      state.admin = null;
      state.isAuthenticated = false;
      state.dashboardStats = null;
      state.users = null;
      state.products = null;
      state.orders = null;
      Object.keys(state.error).forEach((key) => {
        state.error[key as keyof typeof state.error] = null;
      });
    },

    // Update user in users list
    updateUserInList: (state, action: PayloadAction<User>) => {
      if (state.users?.data) {
        const index = state.users.data.findIndex(
          (user) => user.id === action.payload.id
        );
        if (index !== -1) {
          state.users.data[index] = action.payload;
        }
      }
    },

    // Update order in orders list
    updateOrderInList: (state, action: PayloadAction<Order>) => {
      if (state.orders?.data) {
        const index = state.orders.data.findIndex(
          (order) => order.id === action.payload.id
        );
        if (index !== -1) {
          state.orders.data[index] = action.payload;
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle admin login
      .addCase(loginAdmin.pending, (state) => {
        state.loading.auth = true;
        state.error.auth = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.loading.auth = false;
        state.admin = action.payload.admin;
        state.isAuthenticated = true;
        state.error.auth = null;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading.auth = false;
        state.error.auth = action.payload as string;
        state.isAuthenticated = false;
      })

      // Handle get admin profile
      .addCase(getAdminProfile.pending, (state) => {
        state.loading.auth = true;
        state.error.auth = null;
      })
      .addCase(
        getAdminProfile.fulfilled,
        (state, action: PayloadAction<Admin>) => {
          state.loading.auth = false;
          state.admin = action.payload;
          state.isAuthenticated = true;
          state.error.auth = null;
        }
      )
      .addCase(getAdminProfile.rejected, (state, action) => {
        state.loading.auth = false;
        state.error.auth = action.payload as string;
      })

      // Handle verify admin auth
      .addCase(verifyAdminAuth.pending, (state) => {
        state.loading.auth = true;
      })
      .addCase(
        verifyAdminAuth.fulfilled,
        (state, action: PayloadAction<Admin>) => {
          state.loading.auth = false;
          state.admin = action.payload;
          state.isAuthenticated = true;
          state.error.auth = null;
        }
      )
      .addCase(verifyAdminAuth.rejected, (state) => {
        state.loading.auth = false;
        state.admin = null;
        state.isAuthenticated = false;
        state.error.auth = null;
      })

      // Handle admin logout
      .addCase(logoutAdmin.pending, (state) => {
        state.loading.auth = true;
      })
      .addCase(logoutAdmin.fulfilled, (state) => {
        state.admin = null;
        state.isAuthenticated = false;
        state.loading.auth = false;
        state.dashboardStats = null;
        state.users = null;
        state.products = null;
        state.orders = null;
        Object.keys(state.error).forEach((key) => {
          state.error[key as keyof typeof state.error] = null;
        });
      })
      .addCase(logoutAdmin.rejected, (state, action) => {
        state.loading.auth = false;
        state.error.auth = action.payload as string;
      })

      // Handle get dashboard stats
      .addCase(getDashboardStats.pending, (state) => {
        state.loading.dashboard = true;
        state.error.dashboard = null;
      })
      .addCase(
        getDashboardStats.fulfilled,
        (state, action: PayloadAction<DashboardStats>) => {
          state.loading.dashboard = false;
          state.dashboardStats = action.payload;
          state.error.dashboard = null;
        }
      )
      .addCase(getDashboardStats.rejected, (state, action) => {
        state.loading.dashboard = false;
        state.error.dashboard = action.payload as string;
      })

      // Handle get users
      .addCase(getUsers.pending, (state) => {
        state.loading.users = true;
        state.error.users = null;
      })
      .addCase(
        getUsers.fulfilled,
        (state, action: PayloadAction<PaginatedResponse<User>>) => {
          state.loading.users = false;
          state.users = action.payload;
          state.error.users = null;
        }
      )
      .addCase(getUsers.rejected, (state, action) => {
        state.loading.users = false;
        state.error.users = action.payload as string;
      })

      // Handle get products
      .addCase(getProducts.pending, (state) => {
        state.loading.products = true;
        state.error.products = null;
      })
      .addCase(
        getProducts.fulfilled,
        (state, action: PayloadAction<PaginatedResponse<Product>>) => {
          state.loading.products = false;
          state.products = action.payload;
          state.error.products = null;
        }
      )
      .addCase(getProducts.rejected, (state, action) => {
        state.loading.products = false;
        state.error.products = action.payload as string;
      })

      // Handle get orders
      .addCase(getOrders.pending, (state) => {
        state.loading.orders = true;
        state.error.orders = null;
      })
      .addCase(
        getOrders.fulfilled,
        (state, action: PayloadAction<PaginatedResponse<Order>>) => {
          state.loading.orders = false;
          state.orders = action.payload;
          state.error.orders = null;
        }
      )
      .addCase(getOrders.rejected, (state, action) => {
        state.loading.orders = false;
        state.error.orders = action.payload as string;
      })

      // Handle update order status
      .addCase(updateOrderStatus.pending, (state) => {
        state.loading.updateOrder = true;
        state.error.updateOrder = null;
      })
      .addCase(
        updateOrderStatus.fulfilled,
        (state, action: PayloadAction<Order>) => {
          state.loading.updateOrder = false;
          state.error.updateOrder = null;
          // Update the order in the orders list
          if (state.orders?.data) {
            const index = state.orders.data.findIndex(
              (order) => order.id === action.payload.id
            );
            if (index !== -1) {
              state.orders.data[index] = action.payload;
            }
          }
        }
      )
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.loading.updateOrder = false;
        state.error.updateOrder = action.payload as string;
      })

      // Handle update user status
      .addCase(updateUserStatus.pending, (state) => {
        state.loading.updateUser = true;
        state.error.updateUser = null;
      })
      .addCase(
        updateUserStatus.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.loading.updateUser = false;
          state.error.updateUser = null;
          // Update the user in the users list
          if (state.users?.data) {
            const index = state.users.data.findIndex(
              (user) => user.id === action.payload.id
            );
            if (index !== -1) {
              state.users.data[index] = action.payload;
            }
          }
        }
      )
      .addCase(updateUserStatus.rejected, (state, action) => {
        state.loading.updateUser = false;
        state.error.updateUser = action.payload as string;
      });
  },
});

export const {
  clearAuthError,
  clearDashboardError,
  clearUsersError,
  clearProductsError,
  clearOrdersError,
  clearUpdateOrderError,
  clearUpdateUserError,
  clearAllErrors,
  clearAdminData,
  updateUserInList,
  updateOrderInList,
} = adminSlice.actions;

export default adminSlice.reducer;
