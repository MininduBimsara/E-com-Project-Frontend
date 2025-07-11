import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  googleAuth,
  checkGoogleAuthStatus,
  googleLogout,
} from "../Thunks/googleAuthThunks";
import { googleAuthApi } from "../../Api/Common/googleAuthApi";
import type { GoogleUser } from "../../Api/Common/googleAuthApi";

interface GoogleAuthState {
  user: GoogleUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  success: boolean;
  message: string;
}

const initialState: GoogleAuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  success: false,
  message: "",
};

const googleAuthSlice = createSlice({
  name: "googleAuth",
  initialState,
  reducers: {
    // Reset the success and error states
    resetGoogleAuthStatus: (state) => {
      state.success = false;
      state.error = null;
      state.message = "";
    },
    // Clear the user data from state (for manual logout)
    clearGoogleUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      googleAuthApi.clearLocalAuth();
    },
  },
  extraReducers: (builder) => {
    builder
      // Google Auth
      .addCase(googleAuth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        googleAuth.fulfilled,
        (
          state,
          action: PayloadAction<{
            user: GoogleUser;
            token?: string;
            message?: string;
          }>
        ) => {
          state.loading = false;
          state.user = action.payload.user;
          state.isAuthenticated = true;
          state.success = true;
          state.message =
            action.payload.message || "Google authentication successful";
        }
      )
      .addCase(googleAuth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
      })

      // Check Google Auth Status
      .addCase(checkGoogleAuthStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        checkGoogleAuthStatus.fulfilled,
        (state, action: PayloadAction<GoogleUser | null>) => {
          state.loading = false;
          state.user = action.payload;
          state.isAuthenticated = action.payload ? true : false;
        }
      )
      .addCase(checkGoogleAuthStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
      })

      // Google Logout
      .addCase(googleLogout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(googleLogout.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.success = true;
        state.message = "Logged out successfully";
      })
      .addCase(googleLogout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        // Still clear user data even if the server logout fails
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const { resetGoogleAuthStatus, clearGoogleUser } =
  googleAuthSlice.actions;
export default googleAuthSlice.reducer;
