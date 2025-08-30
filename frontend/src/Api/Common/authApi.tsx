// frontend/src/Api/Common/authApi.tsx
import { createAxiosInstance } from "../axiosConfig";
import type { AxiosResponse } from "axios";

// Interfaces for user and credentials
export interface Credentials {
  email: string;
  password: string;
}

export interface RegisterUserData {
  username: string;
  email: string;
  password: string;
  profileImage?: File;
}

export interface User {
  id?: string; // Make this optional
  _id?: string; // Make this optional
  username: string;
  email: string;
  role: string;
  profileImage?: string | null;
  // Add other user fields as needed
}

// Add interface for login response that might include token
export interface LoginResponse {
  user: User;
  token?: string;
  message?: string;
}

// Base URL using gateway service - according to documentation
const API_URL =
  import.meta.env.VITE_AUTH_API_URL || "http://localhost:5000/api/auth/auth";

// Create axios instance using centralized configuration
const authApiClient = createAxiosInstance(API_URL);

// Ensure cookies are always sent with requests
authApiClient.defaults.withCredentials = true;

// Auth API functions
export const authApi = {
  // User registration
  register: async (userData: RegisterUserData | FormData): Promise<User> => {
    try {
      console.log("🔍 [authApi.register] Starting registration...");

      let response: AxiosResponse<{ user: User; token?: string }>;

      if (userData instanceof FormData) {
        // If FormData is provided (with file upload)
        response = await authApiClient.post("/register", userData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        });
      } else {
        // For data without file upload
        response = await authApiClient.post(
          "/register",
          {
            username: userData.username,
            email: userData.email,
            password: userData.password,
          },
          {
            withCredentials: true,
          }
        );
      }

      console.log(
        "🔍 [authApi.register] Registration response:",
        response.data
      );

      const user = response.data.user;

      // Normalize user ID
      const normalizedUser: User = {
        ...user,
        id: user.id || user._id,
        _id: user._id || user.id,
      };

      console.log(
        "✅ [authApi.register] Registration successful:",
        normalizedUser
      );
      return normalizedUser;
    } catch (error: any) {
      console.error("❌ [authApi.register] Registration failed:", error);
      throw new Error(error.response?.data?.message || "Registration failed");
    }
  },

  login: async (credentials: Credentials): Promise<User> => {
    try {
      console.log("🔍 [authApi.login] Starting login for:", credentials.email);

      const response: AxiosResponse<LoginResponse> = await authApiClient.post(
        "/login",
        {
          email: credentials.email,
          password: credentials.password,
        },
        {
          withCredentials: true, // Ensure cookies are handled
        }
      );

      console.log("🔍 [authApi.login] Full response:", response.data);
      console.log("🔍 [authApi.login] User object:", response.data.user);

      const user = response.data.user;

      // Extract the ID from the user object structure
      const userId = user.id || user._id;

      console.log("🔍 [authApi.login] Extracted userId:", userId);

      const normalizedUser: User = {
        ...user,
        id: userId,
        _id: userId,
      };

      console.log("🔍 [authApi.login] Normalized user:", normalizedUser);

      // Don't store tokens in localStorage for cookie-based auth
      // The server should handle JWT cookies automatically

      return normalizedUser;
    } catch (error: any) {
      console.error("❌ [authApi.login] Login failed:", error);
      throw new Error(error.response?.data?.message || "Login failed");
    }
  },

  // User logout
  logout: async (): Promise<{ success: boolean }> => {
    try {
      console.log("🔍 [authApi.logout] Attempting logout...");

      await authApiClient.post(
        "/logout",
        {},
        {
          withCredentials: true,
        }
      );

      // Don't manually clear localStorage since we're using httpOnly cookies
      console.log(
        "✅ [authApi.logout] Logout successful - cookies cleared by backend"
      );

      return { success: true };
    } catch (error: any) {
      console.error("❌ [authApi.logout] Logout error:", error);
      throw new Error("Logout failed");
    }
  },

  verifyAuth: async (): Promise<User> => {
    try {
      console.log("🔍 [authApi.verifyAuth] Verifying authentication...");

      const response: AxiosResponse<{ user?: User }> = await authApiClient.get(
        "/verify",
        {
          withCredentials: true,
        }
      );

      console.log(
        "🔍 [authApi.verifyAuth] Full verify response:",
        response.data
      );
      console.log(
        "🔍 [authApi.verifyAuth] User from response:",
        response.data.user
      );

      if (response.data.user) {
        const user = response.data.user;

        // Log all properties to understand the structure
        console.log(
          "🔍 [authApi.verifyAuth] User object keys:",
          Object.keys(user)
        );

        // Extract the ID from the user object structure
        const userId = user.id || user._id;

        console.log("🔍 [authApi.verifyAuth] Final extracted userId:", userId);

        const normalizedUser: User = {
          ...user,
          id: userId,
          _id: userId,
        };

        console.log(
          "✅ [authApi.verifyAuth] Final normalized user:",
          normalizedUser
        );
        return normalizedUser;
      } else {
        throw new Error("No user authenticated");
      }
    } catch (error: any) {
      console.log(
        "ℹ️ [authApi.verifyAuth] Auth verification failed:",
        error.response?.data?.message || error.message
      );
      throw new Error(error.response?.data?.message || error.message);
    }
  },
};

export default authApi;
