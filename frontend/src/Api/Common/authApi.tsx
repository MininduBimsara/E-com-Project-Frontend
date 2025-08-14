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

// Auth API functions
export const authApi = {
  // User registration
  register: async (userData: RegisterUserData | FormData): Promise<User> => {
    try {
      let response: AxiosResponse<{ user: User }>;

      if (userData instanceof FormData) {
        // If FormData is provided (with file upload)
        response = await authApiClient.post("/register", userData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        // For data without file upload
        response = await authApiClient.post("/register", {
          username: userData.username,
          email: userData.email,
          password: userData.password,
        });
      }

      return response.data.user;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Registration failed");
    }
  },

  login: async (credentials: Credentials): Promise<User> => {
    try {
      const response: AxiosResponse<LoginResponse> = await authApiClient.post(
        "/login",
        {
          email: credentials.email,
          password: credentials.password,
        }
      );

      console.log("🔍 [authApi.login] Full response:", response.data);
      console.log("🔍 [authApi.login] User object:", response.data.user);

      const user = response.data.user;

      // Extract the ID from the nested user object structure
      const userId =
        user.id ||
        user._id ||
        (user.user && (user.user.id || user.user._id)) ||
        user.userId ||
        user.sub ||
        user.uid;

      console.log("🔍 [authApi.login] Extracted userId:", userId);

      const normalizedUser: User = {
        ...user,
        id: userId,
        _id: userId,
      };

      console.log("🔍 [authApi.login] Normalized user:", normalizedUser);

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }

      return normalizedUser;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Login failed");
    }
  },

  // User logout
  logout: async (): Promise<{ success: boolean }> => {
    try {
      // console.log("🔐 [Auth API] Attempting logout...");
      await authApiClient.post("/logout");

      // Clear any stored tokens (fallback)
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
      // console.log(
      //   "🔐 [Auth API] Logout successful - cookies should be cleared by backend"
      // );

      return { success: true };
    } catch (error) {
      // console.error("❌ [Auth API] Logout error:", error);
      throw new Error("Logout failed");
    }
  },

  verifyAuth: async (): Promise<User> => {
    try {
      const response: AxiosResponse<{ user?: User }> = await authApiClient.get(
        "/verify",
        {
          withCredentials: true,
        }
      );

      console.log("🔍 [Auth API] Full verify response:", response.data);
      console.log("🔍 [Auth API] User from response:", response.data.user);

      if (response.data.user) {
        const user = response.data.user;

        // Log all properties to understand the structure
        console.log("🔍 [Auth API] User object keys:", Object.keys(user));
        console.log("🔍 [Auth API] User object values:", Object.values(user));

        // Try different ways to extract the ID based on your object structure
        const userId =
          user.id ||
          user._id ||
          (user.user && (user.user.id || user.user._id)) ||
          user.userId ||
          user.sub ||
          user.uid;

        console.log("🔍 [Auth API] Final extracted userId:", userId);

        const normalizedUser: User = {
          ...user,
          id: userId,
          _id: userId,
        };

        console.log("✅ [Auth API] Final normalized user:", normalizedUser);
        return normalizedUser;
      } else {
        throw new Error("No user authenticated");
      }
    } catch (error: any) {
      throw new Error(error.response?.data?.message || error.message);
    }
  },
};

export default authApi;
