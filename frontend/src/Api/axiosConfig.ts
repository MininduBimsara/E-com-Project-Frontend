import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

// Global Axios configuration
const createAxiosInstance = (
  baseURL: string,
  additionalConfig?: AxiosRequestConfig
): AxiosInstance => {
  const instance = axios.create({
    baseURL,
    withCredentials: true, // This ensures cookies are sent with every request
    headers: {
      "Content-Type": "application/json",
    },
    ...additionalConfig,
  });

  // Request interceptor to add auth token if available
  instance.interceptors.request.use(
    (config) => {
      // Add auth token from localStorage/sessionStorage if available
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor for global error handling
  instance.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error) => {
      // Handle 401 Unauthorized errors globally
      if (error.response?.status === 401) {
        // Clear stored tokens
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");

        // Don't redirect automatically - let components handle auth state
        // The verifyAuth thunk will handle setting isAuthenticated to false
        console.log("401 Unauthorized - clearing tokens");
      }

      // Log errors for debugging
      console.error("API Error:", error.response?.data || error.message);

      return Promise.reject(error);
    }
  );

  return instance;
};

// Export the factory function for creating configured instances
export { createAxiosInstance };

// Export a default instance for general use
export const defaultAxiosInstance = createAxiosInstance("");

// Export axios for direct use if needed
export { axios };
