import axios, { AxiosInstance, AxiosResponse } from "axios";

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
  id: string;
  username: string;
  email: string;
  role: string;
  // Add other user fields as needed
}

// Base URL using gateway service - according to documentation
const API_URL =
  import.meta.env.VITE_AUTH_API_URL || "http://localhost:5000/api/auth";

// Create axios instance with default config
const authApiClient: AxiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

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

  // User login
  login: async (credentials: Credentials): Promise<User> => {
    try {
      const response: AxiosResponse<{ user: User }> = await authApiClient.post(
        "/login",
        {
          email: credentials.email,
          password: credentials.password,
        }
      );
      return response.data.user;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Login failed");
    }
  },

  // User logout
  logout: async (): Promise<{ success: boolean }> => {
    try {
      await authApiClient.post("/logout");
      return { success: true };
    } catch (error) {
      console.error("Logout error:", error);
      throw new Error("Logout failed");
    }
  },

  // Verify authentication status
  verifyAuth: async (): Promise<User> => {
    try {
      const response: AxiosResponse<{ user?: User }> = await authApiClient.get(
        "/verify",
        {
          withCredentials: true,
        }
      );

      if (response.data.user) {
        return response.data.user;
      } else {
        throw new Error("No user authenticated");
      }
    } catch (error: any) {
      console.error("Verification error:", error);
      throw new Error(error.response?.data?.message || error.message);
    }
  },
};

export default authApi;
