import { createAxiosInstance } from "../axiosConfig";
import type { AxiosResponse } from "axios";

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
  id?: string;
  _id?: string;
  username: string;
  email: string;
  role: string;
  profileImage?: string | null;
}

export interface LoginResponse {
  user: User;
  token?: string;
  message?: string;
}

const API_URL =
  import.meta.env.VITE_AUTH_API_URL || "http://localhost:5000/api/auth/auth";

const authApiClient = createAxiosInstance(API_URL);

// Helper to normalize IDs
const normalizeUser = (user: Partial<User> = {}): User => {
  const userId = user.id || user._id || "";
  return {
    ...user,
    id: userId,
    _id: userId,
  } as User;
};


export const authApi = {
  register: async (userData: RegisterUserData | FormData): Promise<User> => {
    try {
      let response: AxiosResponse<{ user: User; token?: string }>;

      if (userData instanceof FormData) {
        response = await authApiClient.post("/register", userData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        response = await authApiClient.post("/register", {
          username: userData.username,
          email: userData.email,
          password: userData.password,
        });
      }

      const normalizedUser = normalizeUser(response.data.user);

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }

      return normalizedUser;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Registration failed");
    }
  },

  login: async (credentials: Credentials): Promise<User> => {
    try {
      const response: AxiosResponse<LoginResponse> = await authApiClient.post(
        "/login",
        credentials
      );

      const normalizedUser = normalizeUser(response.data.user);

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }

      return normalizedUser;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Login failed");
    }
  },

  verifyAuth: async (): Promise<User> => {
    try {
      const response: AxiosResponse<{ user?: User }> = await authApiClient.get(
        "/verify",
        { withCredentials: true }
      );

      if (!response.data.user) {
        throw new Error("No user authenticated");
      }

      return normalizeUser(response.data.user);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || error.message);
    }
  },

  logout: async (): Promise<{ success: boolean }> => {
    try {
      await authApiClient.post("/logout");
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
      return { success: true };
    } catch {
      throw new Error("Logout failed");
    }
  },
};

export default authApi;
