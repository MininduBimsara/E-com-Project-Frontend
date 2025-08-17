// frontend/src/Redux/Thunks/authThunks.tsx
import { createAsyncThunk } from "@reduxjs/toolkit";
import type {
  Credentials,
  RegisterUserData,
  User,
} from "../../Api/Common/authApi";
import { authApi } from "../../Api/Common/authApi";

// Thunk for user login
export const loginUser = createAsyncThunk<
  User,
  Credentials,
  { rejectValue: string }
>("auth/login", async (credentials, { rejectWithValue }) => {
  try {
    console.log("🔍 [loginUser] Attempting login for:", credentials.email);

    const user = await authApi.login(credentials);

    console.log("🔍 [loginUser] API response:", {
      userId: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    });

    return user;
  } catch (error: any) {
    console.log("❌ [loginUser] Login failed:", error.message);
    return rejectWithValue(error.message);
  }
});

// Thunk for user registration
export const registerUser = createAsyncThunk<
  User,
  RegisterUserData | FormData,
  { rejectValue: string }
>("auth/register", async (userData, { rejectWithValue }) => {
  try {
    console.log("🔍 [registerUser] Attempting registration");

    const user = await authApi.register(userData);

    console.log("🔍 [registerUser] Registration successful:", {
      userId: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    });

    return user;
  } catch (error: any) {
    console.log("❌ [registerUser] Registration failed:", error.message);
    return rejectWithValue(error.message);
  }
});

// Thunk for user logout
export const logoutUser = createAsyncThunk<
  { success: boolean },
  void,
  { rejectValue: string }
>("auth/logout", async (_, { rejectWithValue }) => {
  try {
    console.log("🔍 [logoutUser] Attempting logout");

    const result = await authApi.logout();

    console.log("✅ [logoutUser] Logout successful");
    return result;
  } catch (error: any) {
    console.log("❌ [logoutUser] Logout failed:", error.message);
    return rejectWithValue(error.message);
  }
});

// Thunk to verify authentication status
export const verifyAuth = createAsyncThunk<User, void, { rejectValue: string }>(
  "auth/verifyAuth",
  async (_, { rejectWithValue }) => {
    try {
      console.log("🔍 [verifyAuth] Verifying authentication");

      const user = await authApi.verifyAuth();

      console.log("✅ [verifyAuth] Auth verification successful:", {
        userId: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      });

      return user;
    } catch (error: any) {
      console.log(
        "ℹ️ [verifyAuth] Auth verification failed (user not logged in):",
        error.message
      );
      return rejectWithValue(error.message);
    }
  }
);
