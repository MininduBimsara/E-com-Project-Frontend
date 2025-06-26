// cartApi.tsx - API functions to communicate with your backend
import axios from "axios";

// Base URL for your cart API
const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

// Create axios instance with default config
const cartApi = axios.create({
  baseURL: `${API_BASE_URL}/api/cart`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests automatically
cartApi.interceptors.request.use(
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
cartApi.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Cart API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// ==========================================
// CART API FUNCTIONS
// ==========================================

/**
 * Get user's full cart with product details
 */
export const getCart = async (userId: string) => {
  const response = await cartApi.get(`/${userId}`);
  return response.data;
};

/**
 * Get lightweight cart summary
 */
export const getCartSummary = async (userId: string) => {
  const response = await cartApi.get(`/${userId}/summary`);
  return response.data;
};

/**
 * Get cart items count only
 */
export const getCartCount = async (userId: string) => {
  const response = await cartApi.get(`/${userId}/count`);
  return response.data;
};

/**
 * Add item to cart
 */
export const addToCart = async (
  userId: string,
  productId: string,
  quantity: number = 1
) => {
  const response = await cartApi.post(`/${userId}/add`, {
    productId,
    quantity,
  });
  return response.data;
};

/**
 * Update item quantity in cart
 */
export const updateCartItem = async (
  userId: string,
  productId: string,
  quantity: number
) => {
  const response = await cartApi.put(`/${userId}/item/${productId}`, {
    quantity,
  });
  return response.data;
};

/**
 * Remove item from cart
 */
export const removeFromCart = async (userId: string, productId: string) => {
  const response = await cartApi.delete(`/${userId}/item/${productId}`);
  return response.data;
};

/**
 * Clear entire cart
 */
export const clearCart = async (userId: string) => {
  const response = await cartApi.delete(`/${userId}/clear`);
  return response.data;
};

/**
 * Update shipping cost
 */
export const updateShipping = async (userId: string, shippingCost: number) => {
  const response = await cartApi.put(`/${userId}/shipping`, {
    shippingCost,
  });
  return response.data;
};

/**
 * Validate cart (check stock, prices, availability)
 */
export const validateCart = async (userId: string) => {
  const response = await cartApi.post(`/${userId}/validate`);
  return response.data;
};

// ==========================================
// ADMIN API FUNCTIONS
// ==========================================

/**
 * Get cart statistics (Admin only)
 */
export const getCartStatistics = async () => {
  const response = await cartApi.get("/admin/statistics");
  return response.data;
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
