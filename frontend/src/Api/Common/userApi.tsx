import axios, { AxiosInstance, AxiosResponse } from "axios";

// User interfaces
export interface User {
  id: string;
  username: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  profileImage?: string;
  role: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateUserData {
  username?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  profileImage?: File;
}

// Base URL using gateway service - according to documentation
const API_URL =
  import.meta.env.VITE_USER_API_URL || "http://localhost:5000/api/users";

// Create axios instance with default config
const userApiClient: AxiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests automatically
userApiClient.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
userApiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("User API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// User API functions
export const userApi = {
  // Get current user profile (requires auth)
  getCurrentUser: async (): Promise<User> => {
    try {
      const response: AxiosResponse<{ user: User }> = await userApiClient.get(
        "/current"
      );
      return response.data.user;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch current user"
      );
    }
  },

  // Get user profile by ID (requires auth)
  getUserById: async (userId: string): Promise<User> => {
    try {
      const response: AxiosResponse<{ user: User }> = await userApiClient.get(
        `/${userId}`
      );
      return response.data.user;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to fetch user");
    }
  },

  // Update user profile (requires auth)
  updateUser: async (
    userId: string,
    updateData: UpdateUserData | FormData
  ): Promise<User> => {
    try {
      let response: AxiosResponse<{ user: User }>;

      if (updateData instanceof FormData) {
        // If FormData is provided (with file upload)
        response = await userApiClient.put(`/${userId}`, updateData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        // For data without file upload
        response = await userApiClient.put(`/${userId}`, updateData);
      }

      return response.data.user;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to update user");
    }
  },

  // Delete user profile (requires auth)
  deleteUser: async (userId: string): Promise<{ message: string }> => {
    try {
      const response: AxiosResponse<{ message: string }> =
        await userApiClient.delete(`/${userId}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to delete user");
    }
  },
};

export default userApi;
