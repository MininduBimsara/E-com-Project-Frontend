import axios, { AxiosInstance, AxiosResponse } from "axios";

// Interfaces for Google authentication
export interface GoogleUser {
  id: string;
  username: string;
  email: string;
  role: string;
  googleId?: string;
  profileImage?: string;
  // Add other user fields as needed
}

export interface GoogleAuthResponse {
  user: GoogleUser;
  token?: string;
  message?: string;
}

// Base URL for Google authentication
const GOOGLE_AUTH_API_URL =
  import.meta.env.VITE_GOOGLE_AUTH_API_URL ||
  "http://localhost:5000/api/googleauth";

// Create axios instance with default config
const googleAuthApiClient: AxiosInstance = axios.create({
  baseURL: GOOGLE_AUTH_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Google Auth API functions
export const googleAuthApi = {
  // Google authentication
  authenticate: async (
    tokenCredential: string
  ): Promise<GoogleAuthResponse> => {
    try {
      const response: AxiosResponse<GoogleAuthResponse> =
        await googleAuthApiClient.post(
          "/google",
          { token: tokenCredential },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

      // Store the auth token in localStorage if provided
      if (response.data.token) {
        localStorage.setItem("authToken", response.data.token);

        // Set the token as default header for future requests
        googleAuthApiClient.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.token}`;
      }

      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Google authentication failed"
      );
    }
  },

  // Check Google auth status
  checkAuthStatus: async (): Promise<GoogleUser | null> => {
    try {
      // First try to get the token from localStorage
      const token = localStorage.getItem("authToken");

      if (!token) {
        return null; // No token found
      }

      // Set token in headers
      googleAuthApiClient.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;

      // Check user status from the backend
      const response: AxiosResponse<{ user: GoogleUser }> =
        await googleAuthApiClient.get("/user");
      return response.data.user;
    } catch (error: any) {
      // Clear invalid token
      localStorage.removeItem("authToken");
      delete googleAuthApiClient.defaults.headers.common["Authorization"];
      throw new Error(
        error.response?.data?.message || "Failed to check authentication status"
      );
    }
  },

  // Google logout
  logout: async (): Promise<{ success: boolean }> => {
    try {
      // Make a request to the logout endpoint
      await googleAuthApiClient.get("/logout", { withCredentials: true });
    } catch (error) {
      // Continue with cleanup even if server logout fails
      console.warn("Server logout failed, but cleaning up locally");
    } finally {
      // Always remove the token from localStorage and headers
      localStorage.removeItem("authToken");
      delete googleAuthApiClient.defaults.headers.common["Authorization"];
    }

    return { success: true };
  },

  // Manual token cleanup (for use in reducers)
  clearLocalAuth: (): void => {
    localStorage.removeItem("authToken");
    delete googleAuthApiClient.defaults.headers.common["Authorization"];
  },
};

export default googleAuthApi;
