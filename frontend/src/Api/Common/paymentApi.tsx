// paymentApi.tsx - API functions for payment operations
import axios from "axios";

// Base URL using gateway service - according to documentation
const API_BASE_URL =
  import.meta.env.VITE_PAYMENT_API_URL || "http://localhost:5000/api/payments";

// Create axios instance with default config
const paymentApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Include cookies for authentication
});

// Add token to requests automatically
paymentApi.interceptors.request.use(
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
paymentApi.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Payment API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// ==========================================
// PAYMENT API FUNCTIONS
// ==========================================

/**
 * Create PayPal Order (requires auth)
 * Full URL: http://localhost:5000/api/payments/paypal/create-order
 */
export const createPayPalOrder = async (orderId: string, amount: number) => {
  const response = await paymentApi.post("/paypal/create-order", {
    orderId,
    amount,
  });
  return response.data;
};

/**
 * Capture PayPal Payment (requires auth)
 * Full URL: http://localhost:5000/api/payments/paypal/capture-order
 */
export const capturePayPalOrder = async (
  orderId: string,
  paypalOrderId: string
) => {
  const response = await paymentApi.post("/paypal/capture-order", {
    orderId,
    paypalOrderId,
  });
  return response.data;
};

/**
 * Get Payment History (requires auth)
 * Full URL: http://localhost:5000/api/payments/history
 */
export const getPaymentHistory = async () => {
  const response = await paymentApi.get("/history");
  return response.data;
};

/**
 * Get Payment Details by Transaction ID (requires auth)
 * Full URL: http://localhost:5000/api/payments/{transactionId}
 */
export const getPaymentDetails = async (transactionId: string) => {
  const response = await paymentApi.get(`/${transactionId}`);
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

export interface PaymentDetails {
  paypal_order_id?: string;
  paypal_payer_id?: string;
  provider?: string;
}

export interface Payment {
  _id: string;
  user_id: string;
  order_id: string;
  amount: number;
  currency: string;
  payment_method: "paypal" | "stripe" | "cash_on_delivery";
  payment_status: "pending" | "completed" | "failed" | "cancelled";
  transaction_id: string;
  payment_details: PaymentDetails;
  createdAt: string;
  updatedAt: string;
}

export interface PayPalOrderResponse {
  orderId: string;
  paypalOrderId: string;
  links: PayPalLink[];
}

export interface PayPalLink {
  href: string;
  rel: string;
  method: string;
}

export interface PaymentCaptureResponse {
  payment: Payment;
  order: any; // Order details from order service
}

export interface PaymentHistory {
  payments: Payment[];
  totalCount: number;
  totalAmount: number;
}

// Export the payment API instance for direct use if needed
export default paymentApi;
