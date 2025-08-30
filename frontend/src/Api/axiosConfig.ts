import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
} from "axios";

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

  // Request interceptor for cookie-based authentication
  instance.interceptors.request.use(
    (config) => {
     

      // For cookie-based auth, we don't need to manually add Authorization headers
      // The withCredentials: true setting will automatically send cookies
      // But we can check if we have any stored tokens as fallback
      const storedToken =
        localStorage.getItem("token") || sessionStorage.getItem("token");

      if (storedToken) {
       
        config.headers.Authorization = `Bearer ${storedToken}`;
      } else {
       // console.log("🔐 [Axios Interceptor] No stored token - relying on cookies for authentication");
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
        // Clear stored tokens (fallback)
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");

      
        // Don't redirect automatically - let components handle auth state
        // The verifyAuth thunk will handle setting isAuthenticated to false
      }

      

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
