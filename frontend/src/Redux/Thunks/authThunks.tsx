import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  authApi,
  Credentials,
  RegisterUserData,
  User,
} from "../../Api/Common/authApi";

// Thunk for user login
export const loginUser = createAsyncThunk<
  User,
  Credentials,
  { rejectValue: string }
>("auth/login", async (credentials, { rejectWithValue }) => {
  try {
    const user = await authApi.login(credentials);
    return user;
  } catch (error: any) {
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
    const user = await authApi.register(userData);
    return user;
  } catch (error: any) {
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
    const result = await authApi.logout();
    return result;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

// Thunk to verify authentication status
export const verifyAuth = createAsyncThunk<User, void, { rejectValue: string }>(
  "auth/verifyAuth",
  async (_, { rejectWithValue }) => {
    try {
      const user = await authApi.verifyAuth();
      return user;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
