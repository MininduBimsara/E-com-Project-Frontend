// frontend/src/Redux/Slicers/authSlice.tsx
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  loginUser,
  registerUser,
  logoutUser,
  verifyAuth,
} from "../Thunks/authThunks";
import type { User } from "../../Api/Common/authApi";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  // Add a flag to track if we've attempted initial auth verification
  initialAuthAttempted: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  initialAuthAttempted: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Clear errors
    clearErrors: (state) => {
      state.error = null;
    },
    // Manual logout (for cases where API call isn't needed)
    clearUserData: (state) => {
      console.log("🔄 [authSlice] Clearing user data manually");
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    // Set initial auth attempted flag
    setInitialAuthAttempted: (state) => {
      state.initialAuthAttempted = true;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle login
      .addCase(loginUser.pending, (state) => {
        console.log("⏳ [authSlice] Login pending...");
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.initialAuthAttempted = true;

        console.log("✅ [authSlice] Login successful:", {
          userId: action.payload.id,
          username: action.payload.username,
          role: action.payload.role,
          email: action.payload.email,
        });
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.initialAuthAttempted = true;

        console.log("❌ [authSlice] Login failed:", action.payload);
      })
      // Handle registration
      .addCase(registerUser.pending, (state) => {
        console.log("⏳ [authSlice] Registration pending...");
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.initialAuthAttempted = true;

        console.log("✅ [authSlice] Registration successful:", {
          userId: action.payload.id,
          username: action.payload.username,
          role: action.payload.role,
        });
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.initialAuthAttempted = true;

        console.log("❌ [authSlice] Registration failed:", action.payload);
      })
      // Handle logout
      .addCase(logoutUser.pending, (state) => {
        console.log("⏳ [authSlice] Logout pending...");
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.error = null;

        console.log("✅ [authSlice] Logout successful");
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || "Logout failed. Please try again.";

        console.log("❌ [authSlice] Logout failed:", action.payload);
      })
      // Handle auth verification
      .addCase(verifyAuth.pending, (state) => {
        console.log("⏳ [authSlice] Auth verification pending...");
        // Only set loading to true if we haven't attempted initial auth yet
        if (!state.initialAuthAttempted) {
          state.loading = true;
        }
      })
      .addCase(verifyAuth.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
        state.initialAuthAttempted = true;

        console.log("✅ [authSlice] Auth verification successful:", {
          userId: action.payload.id,
          username: action.payload.username,
          role: action.payload.role,
          email: action.payload.email,
        });
      })
      .addCase(verifyAuth.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = null; // Don't set error for failed verification
        state.initialAuthAttempted = true;

        console.log(
          "ℹ️ [authSlice] Auth verification failed (user not logged in):",
          action.payload
        );
      });
  },
});

export const { clearErrors, clearUserData, setInitialAuthAttempted } =
  authSlice.actions;
export default authSlice.reducer;
