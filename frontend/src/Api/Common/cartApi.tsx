// cartApi.tsx - Updated with correct Vite environment variables and debugging
import { createAxiosInstance } from "../axiosConfig";

// Base URL using gateway service - according to documentation
const API_BASE_URL =
  import.meta.env.VITE_CART_API_URL || "http://localhost:5000/api/cart";

console.log("🛒 [Cart API] Initializing with base URL:", API_BASE_URL);

// Create axios instance using centralized configuration
const cartApi = createAxiosInstance(API_BASE_URL);

// ==========================================
// LOGGING UTILITY
// ==========================================

const logApiCall = (method: string, url: string, data?: any) => {
  console.log(`🛒 [Cart API] ${method} ${url}`, data ? { data } : "");
  console.log(`🛒 [Cart API] Full URL: ${API_BASE_URL}${url}`);
};

const logApiResponse = (method: string, url: string, response: any) => {
  console.log(`✅ [Cart API] ${method} ${url} - Success:`, response);
};

const logApiError = (method: string, url: string, error: any) => {
  console.error(`❌ [Cart API] ${method} ${url} - Error:`, error);
  console.error(`❌ [Cart API] Error details:`, {
    message: error.message,
    status: error.response?.status,
    data: error.response?.data,
    url: error.config?.url,
    method: error.config?.method,
  });
};

// ==========================================
// CART API FUNCTIONS
// ==========================================

/**
 * Get user's full cart with product details (optional auth)
 * Full URL: http://localhost:5000/api/cart/{userId}
 */
export const getCart = async (userId: string) => {
  const url = `/${userId}`;
  logApiCall("GET", url, { userId });

  try {
    const response = await cartApi.get(url);
    logApiResponse("GET", url, response.data);
    return response.data;
  } catch (error) {
    logApiError("GET", url, error);
    throw error;
  }
};

/**
 * Get lightweight cart summary (public)
 * Full URL: http://localhost:5000/api/cart/{userId}/summary
 */
export const getCartSummary = async (userId: string) => {
  const url = `/${userId}/summary`;
  logApiCall("GET", url, { userId });

  try {
    const response = await cartApi.get(url);
    logApiResponse("GET", url, response.data);
    return response.data;
  } catch (error) {
    logApiError("GET", url, error);
    throw error;
  }
};

/**
 * Get cart items count only (public)
 * Full URL: http://localhost:5000/api/cart/{userId}/count
 */
export const getCartCount = async (userId: string) => {
  const url = `/${userId}/count`;
  logApiCall("GET", url, { userId });

  try {
    const response = await cartApi.get(url);
    logApiResponse("GET", url, response.data);
    return response.data;
  } catch (error) {
    logApiError("GET", url, error);
    throw error;
  }
};

/**
 * Add item to cart (optional auth)
 * Full URL: http://localhost:5000/api/cart/{userId}/add
 */
export const addToCart = async (
  userId: string,
  productId: string,
  quantity: number = 1
) => {
  const url = `/${userId}/add`;
  const data = { productId, quantity };
  logApiCall("POST", url, { userId, ...data });

  try {
    const response = await cartApi.post(url, data);
    logApiResponse("POST", url, response.data);
    return response.data;
  } catch (error) {
    logApiError("POST", url, error);
    throw error;
  }
};

/**
 * Update item quantity in cart (optional auth)
 * Full URL: http://localhost:5000/api/cart/{userId}/item/{productId}
 */
export const updateCartItem = async (
  userId: string,
  productId: string,
  quantity: number
) => {
  const url = `/${userId}/item/${productId}`;
  const data = { quantity };
  logApiCall("PUT", url, { userId, productId, ...data });

  try {
    const response = await cartApi.put(url, data);
    logApiResponse("PUT", url, response.data);
    return response.data;
  } catch (error) {
    logApiError("PUT", url, error);
    throw error;
  }
};

/**
 * Remove item from cart (optional auth)
 * Full URL: http://localhost:5000/api/cart/{userId}/item/{productId}
 */
export const removeFromCart = async (userId: string, productId: string) => {
  const url = `/${userId}/item/${productId}`;
  logApiCall("DELETE", url, { userId, productId });

  try {
    const response = await cartApi.delete(url);
    logApiResponse("DELETE", url, response.data);
    return response.data;
  } catch (error) {
    logApiError("DELETE", url, error);
    throw error;
  }
};

/**
 * Clear entire cart (optional auth)
 * Full URL: http://localhost:5000/api/cart/{userId}/clear
 */
export const clearCart = async (userId: string) => {
  const url = `/${userId}/clear`;
  logApiCall("DELETE", url, { userId });

  try {
    const response = await cartApi.delete(url);
    logApiResponse("DELETE", url, response.data);
    return response.data;
  } catch (error) {
    logApiError("DELETE", url, error);
    throw error;
  }
};

/**
 * Update shipping cost (optional auth)
 * Full URL: http://localhost:5000/api/cart/{userId}/shipping
 */
export const updateShipping = async (userId: string, shippingCost: number) => {
  const url = `/${userId}/shipping`;
  const data = { shippingCost };
  logApiCall("PUT", url, { userId, ...data });

  try {
    const response = await cartApi.put(url, data);
    logApiResponse("PUT", url, response.data);
    return response.data;
  } catch (error) {
    logApiError("PUT", url, error);
    throw error;
  }
};

/**
 * Validate cart (check stock, prices, availability) (requires auth)
 * Full URL: http://localhost:5000/api/cart/{userId}/validate
 */
export const validateCart = async (userId: string) => {
  const url = `/${userId}/validate`;
  logApiCall("POST", url, { userId });

  try {
    const response = await cartApi.post(url);
    logApiResponse("POST", url, response.data);
    return response.data;
  } catch (error) {
    logApiError("POST", url, error);
    throw error;
  }
};

// ==========================================
// ADMIN API FUNCTIONS
// ==========================================

/**
 * Get cart statistics (Admin only)
 * Full URL: http://localhost:5000/api/cart/admin/statistics
 */
export const getCartStatistics = async () => {
  const url = "/admin/statistics";
  logApiCall("GET", url);

  try {
    const response = await cartApi.get(url);
    logApiResponse("GET", url, response.data);
    return response.data;
  } catch (error) {
    logApiError("GET", url, error);
    throw error;
  }
};

// ==========================================
// TYPES FOR API RESPONSES
// ==========================================

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

export interface CartItem {
  _id?: string;
  productId: string;
  quantity: number;
  priceAtAdd: number;
  product?: {
    _id: string;
    name: string;
    price: number;
    images: string[];
    category: string;
    stock: number;
    isActive: boolean;
    carbonFootprint?: number;
    ecoLabel?: string;
  };
}

export interface Cart {
  _id?: string;
  userId: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  totalItems: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CartSummary {
  userId: string;
  totalItems: number;
  subtotal: number;
  total: number;
  hasItems: boolean;
  lastUpdated?: string;
}

export interface CartValidationIssue {
  type: "PRODUCT_NOT_FOUND" | "INSUFFICIENT_STOCK" | "PRICE_CHANGED";
  productId: string;
  message: string;
  requestedQuantity?: number;
  availableStock?: number;
  oldPrice?: number;
  newPrice?: number;
}

export interface CartValidationResult {
  valid: boolean;
  issues: CartValidationIssue[];
  cart: Cart;
}

// Export the cart API instance for direct use if needed
export default cartApi;
