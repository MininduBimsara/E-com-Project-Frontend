import { createAsyncThunk } from "@reduxjs/toolkit";
import { googleAuthApi } from "../../Api/Common/googleAuthApi";
import type { GoogleUser } from "../../Api/Common/googleAuthApi";

// Async thunk for Google authentication
export const googleAuth = createAsyncThunk(
  "googleAuth/authenticate",
  async (tokenCredential: string, { rejectWithValue }) => {
    try {
      const response = await googleAuthApi.authenticate(tokenCredential);
      return response;
    } catch (error: any) {
      console.error("Google auth error:", error);
      return rejectWithValue(error.message || "Google authentication failed");
    }
  }
);

// Async thunk for checking Google auth status
export const checkGoogleAuthStatus = createAsyncThunk(
  "googleAuth/checkStatus",
  async (_, { rejectWithValue }) => {
    try {
      return await googleAuthApi.checkAuthStatus();
    } catch (error: any) {
      return rejectWithValue(
        error.message || "Failed to check authentication status"
      );
    }
  }
);

// Async thunk for Google logout
export const googleLogout = createAsyncThunk(
  "googleAuth/logout",
  async (_, { rejectWithValue }) => {
    try {
      return await googleAuthApi.logout();
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to logout");
    }
  }
);
