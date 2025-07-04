// paymentThunks.tsx - Async actions for payment operations
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createPayPalOrder as createPayPalOrderApi,
  capturePayPalOrder as capturePayPalOrderApi,
  getPaymentHistory as getPaymentHistoryApi,
  getPaymentDetails as getPaymentDetailsApi,
  type ApiResponse,
  type Payment,
  type PayPalOrderResponse,
  type PaymentCaptureResponse,
} from "../../Api/Common/paymentApi";

import {
  setLoading,
  setCreating,
  setCapturing,
  setFetchingHistory,
  setFetchingDetails,
  setCurrentPayment,
  setPaymentHistory,
  setPayPalOrder,
  setError,
  setLastAction,
  setPaymentCompleted,
  setPaymentFailed,
  addPaymentToHistory,
  updatePaymentStats,
} from "../Slicers/paymentSlice";

// ==========================================
// PAYPAL PAYMENT THUNKS
// ==========================================

/**
 * Create PayPal Order
 */
export const createPayPalOrder = createAsyncThunk<
  PayPalOrderResponse,
  { orderId: string; amount: number },
  { rejectValue: string }
>(
  "payment/createPayPalOrder",
  async ({ orderId, amount }, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setCreating(true));
      dispatch(setLastAction("Creating PayPal order..."));

      const response: ApiResponse<PayPalOrderResponse> =
        await createPayPalOrderApi(orderId, amount);

      if (!response.success) {
        throw new Error(response.message || "Failed to create PayPal order");
      }

      dispatch(setPayPalOrder(response.data!));
      dispatch(setLastAction("PayPal order created successfully"));

      return response.data!;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to create PayPal order";
      dispatch(setError(errorMessage));
      return rejectWithValue(errorMessage);
    } finally {
      dispatch(setCreating(false));
    }
  }
);

/**
 * Capture PayPal Payment
 */
export const capturePayPalPayment = createAsyncThunk<
  PaymentCaptureResponse,
  { orderId: string; paypalOrderId: string },
  { rejectValue: string }
>(
  "payment/capturePayPalPayment",
  async ({ orderId, paypalOrderId }, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setCapturing(true));
      dispatch(setLastAction("Capturing PayPal payment..."));

      const response: ApiResponse<PaymentCaptureResponse> =
        await capturePayPalOrderApi(orderId, paypalOrderId);

      if (!response.success) {
        throw new Error(response.message || "Failed to capture PayPal payment");
      }

      // Update current payment
      dispatch(setCurrentPayment(response.data!.payment));

      // Add to payment history
      dispatch(addPaymentToHistory(response.data!.payment));

      // Mark payment as completed
      dispatch(setPaymentCompleted(true));

      dispatch(setLastAction("PayPal payment captured successfully"));

      return response.data!;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to capture PayPal payment";
      dispatch(setError(errorMessage));
      dispatch(setPaymentFailed(true));
      return rejectWithValue(errorMessage);
    } finally {
      dispatch(setCapturing(false));
    }
  }
);

// ==========================================
// PAYMENT HISTORY THUNKS
// ==========================================

/**
 * Fetch Payment History
 */
export const fetchPaymentHistory = createAsyncThunk<
  Payment[],
  void,
  { rejectValue: string }
>("payment/fetchPaymentHistory", async (_, { dispatch, rejectWithValue }) => {
  try {
    dispatch(setFetchingHistory(true));
    dispatch(setLastAction("Fetching payment history..."));

    const response: ApiResponse<Payment[]> = await getPaymentHistoryApi();

    if (!response.success) {
      throw new Error(response.message || "Failed to fetch payment history");
    }

    dispatch(setPaymentHistory(response.data!));
    dispatch(setLastAction("Payment history fetched successfully"));

    return response.data!;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Failed to fetch payment history";
    dispatch(setError(errorMessage));
    return rejectWithValue(errorMessage);
  } finally {
    dispatch(setFetchingHistory(false));
  }
});

/**
 * Fetch Payment Details by Transaction ID
 */
export const fetchPaymentDetails = createAsyncThunk<
  Payment,
  string,
  { rejectValue: string }
>(
  "payment/fetchPaymentDetails",
  async (transactionId: string, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setFetchingDetails(true));
      dispatch(
        setLastAction(`Fetching payment details for ${transactionId}...`)
      );

      const response: ApiResponse<Payment> = await getPaymentDetailsApi(
        transactionId
      );

      if (!response.success) {
        throw new Error(response.message || "Failed to fetch payment details");
      }

      dispatch(setCurrentPayment(response.data!));
      dispatch(setLastAction("Payment details fetched successfully"));

      return response.data!;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch payment details";
      dispatch(setError(errorMessage));
      return rejectWithValue(errorMessage);
    } finally {
      dispatch(setFetchingDetails(false));
    }
  }
);

// ==========================================
// COMPOSITE THUNKS
// ==========================================

/**
 * Complete Payment Flow - Create and Process PayPal Payment
 */
export const processPayPalPayment = createAsyncThunk<
  PaymentCaptureResponse,
  { orderId: string; amount: number },
  { rejectValue: string }
>(
  "payment/processPayPalPayment",
  async ({ orderId, amount }, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLastAction("Starting PayPal payment process..."));

      // Step 1: Create PayPal Order
      const paypalOrder = await dispatch(
        createPayPalOrder({ orderId, amount })
      ).unwrap();

      // Step 2: Return the order for frontend to handle PayPal approval
      // The capture will be called separately after user approves
      return {
        payment: {} as Payment, // Will be filled after capture
        order: paypalOrder,
      } as PaymentCaptureResponse;
    } catch (error: any) {
      const errorMessage = error.message || "Failed to process PayPal payment";
      dispatch(setError(errorMessage));
      dispatch(setPaymentFailed(true));
      return rejectWithValue(errorMessage);
    }
  }
);

/**
 * Refresh Payment Data - Fetch latest payment history and update stats
 */
export const refreshPaymentData = createAsyncThunk<
  Payment[],
  void,
  { rejectValue: string }
>("payment/refreshPaymentData", async (_, { dispatch, rejectWithValue }) => {
  try {
    dispatch(setLoading(true));
    dispatch(setLastAction("Refreshing payment data..."));

    // Fetch latest payment history
    const payments = await dispatch(fetchPaymentHistory()).unwrap();

    // Update statistics
    const totalPayments = payments.length;
    const totalAmount = payments.reduce(
      (sum, payment) => sum + payment.amount,
      0
    );

    dispatch(updatePaymentStats({ totalPayments, totalAmount }));

    dispatch(setLastAction("Payment data refreshed successfully"));

    return payments;
  } catch (error: any) {
    const errorMessage = error.message || "Failed to refresh payment data";
    dispatch(setError(errorMessage));
    return rejectWithValue(errorMessage);
  } finally {
    dispatch(setLoading(false));
  }
});

/**
 * Verify Payment Status - Check if a payment was successful
 */
export const verifyPaymentStatus = createAsyncThunk<
  Payment,
  string,
  { rejectValue: string }
>(
  "payment/verifyPaymentStatus",
  async (transactionId: string, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading(true));
      dispatch(
        setLastAction(`Verifying payment status for ${transactionId}...`)
      );

      const payment = await dispatch(
        fetchPaymentDetails(transactionId)
      ).unwrap();

      if (payment.payment_status === "completed") {
        dispatch(setPaymentCompleted(true));
        dispatch(setLastAction("Payment verified as completed"));
      } else if (payment.payment_status === "failed") {
        dispatch(setPaymentFailed(true));
        dispatch(setLastAction("Payment verified as failed"));
      } else {
        dispatch(setLastAction(`Payment status: ${payment.payment_status}`));
      }

      return payment;
    } catch (error: any) {
      const errorMessage = error.message || "Failed to verify payment status";
      dispatch(setError(errorMessage));
      return rejectWithValue(errorMessage);
    } finally {
      dispatch(setLoading(false));
    }
  }
);

// ==========================================
// UTILITY THUNKS
// ==========================================

/**
 * Initialize Payment Module - Load initial data
 */
export const initializePayments = createAsyncThunk<
  void,
  void,
  { rejectValue: string }
>("payment/initializePayments", async (_, { dispatch, rejectWithValue }) => {
  try {
    dispatch(setLoading(true));
    dispatch(setLastAction("Initializing payment module..."));

    // Load payment history
    await dispatch(fetchPaymentHistory()).unwrap();

    dispatch(setLastAction("Payment module initialized successfully"));
  } catch (error: any) {
    // Don't throw error for initialization - just log it
    console.warn("Failed to initialize payments:", error.message);
    dispatch(setLastAction("Payment module initialized with limited data"));
  } finally {
    dispatch(setLoading(false));
  }
});

/**
 * Retry Failed Payment - Attempt to process a failed payment again
 */
export const retryFailedPayment = createAsyncThunk<
  PaymentCaptureResponse,
  { orderId: string; amount: number },
  { rejectValue: string }
>(
  "payment/retryFailedPayment",
  async ({ orderId, amount }, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLastAction("Retrying failed payment..."));

      // Reset payment state
      dispatch(setPaymentFailed(false));

      // Process payment again
      const result = await dispatch(
        processPayPalPayment({ orderId, amount })
      ).unwrap();

      dispatch(setLastAction("Payment retry initiated"));

      return result;
    } catch (error: any) {
      const errorMessage = error.message || "Failed to retry payment";
      dispatch(setError(errorMessage));
      dispatch(setPaymentFailed(true));
      return rejectWithValue(errorMessage);
    }
  }
);
