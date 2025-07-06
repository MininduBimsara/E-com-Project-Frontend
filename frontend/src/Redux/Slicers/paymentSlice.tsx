// paymentSlice.tsx - Redux slice for payment state management
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type {
  Payment,
  PayPalOrderResponse,
  PaymentCaptureResponse,
  PaymentHistory,
} from "../../Api/Common/paymentApi";

// ==========================================
// TYPES & INTERFACES
// ==========================================

export interface PaymentState {
  // Payment data
  currentPayment: Payment | null;
  paymentHistory: Payment[];
  paypalOrder: PayPalOrderResponse | null;

  // Loading states
  loading: boolean;
  creating: boolean;
  capturing: boolean;
  fetchingHistory: boolean;
  fetchingDetails: boolean;

  // Error handling
  error: string | null;

  // UI state
  showPaymentModal: boolean;
  paymentMethod: "paypal" | "stripe" | "cash_on_delivery" | null;
  lastAction: string | null;

  // Payment flow
  isProcessing: boolean;
  paymentCompleted: boolean;
  paymentFailed: boolean;

  // Statistics
  totalPayments: number;
  totalAmount: number;

  // Cache
  lastFetched: string | null;
}

// Initial state
const initialState: PaymentState = {
  currentPayment: null,
  paymentHistory: [],
  paypalOrder: null,
  loading: false,
  creating: false,
  capturing: false,
  fetchingHistory: false,
  fetchingDetails: false,
  error: null,
  showPaymentModal: false,
  paymentMethod: null,
  lastAction: null,
  isProcessing: false,
  paymentCompleted: false,
  paymentFailed: false,
  totalPayments: 0,
  totalAmount: 0,
  lastFetched: null,
};

// ==========================================
// PAYMENT SLICE
// ==========================================

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    // ========== LOADING STATES ==========
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
      if (action.payload) {
        state.error = null;
      }
    },

    setCreating: (state, action: PayloadAction<boolean>) => {
      state.creating = action.payload;
      if (action.payload) {
        state.error = null;
        state.isProcessing = true;
      } else {
        state.isProcessing = false;
      }
    },

    setCapturing: (state, action: PayloadAction<boolean>) => {
      state.capturing = action.payload;
      if (action.payload) {
        state.error = null;
        state.isProcessing = true;
      } else {
        state.isProcessing = false;
      }
    },

    setFetchingHistory: (state, action: PayloadAction<boolean>) => {
      state.fetchingHistory = action.payload;
      if (action.payload) {
        state.error = null;
      }
    },

    setFetchingDetails: (state, action: PayloadAction<boolean>) => {
      state.fetchingDetails = action.payload;
      if (action.payload) {
        state.error = null;
      }
    },

    // ========== PAYMENT DATA ==========
    setCurrentPayment: (state, action: PayloadAction<Payment>) => {
      state.currentPayment = action.payload;
      state.error = null;
    },

    setPaymentHistory: (state, action: PayloadAction<Payment[]>) => {
      state.paymentHistory = action.payload;
      state.totalPayments = action.payload.length;
      state.totalAmount = action.payload.reduce(
        (sum, payment) => sum + payment.amount,
        0
      );
      state.lastFetched = new Date().toISOString();
      state.error = null;
    },

    setPayPalOrder: (state, action: PayloadAction<PayPalOrderResponse>) => {
      state.paypalOrder = action.payload;
      state.error = null;
    },

    clearPaymentData: (state) => {
      state.currentPayment = null;
      state.paypalOrder = null;
      state.paymentCompleted = false;
      state.paymentFailed = false;
      state.isProcessing = false;
      state.lastFetched = null;
    },

    // ========== ERROR HANDLING ==========
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
      state.creating = false;
      state.capturing = false;
      state.fetchingHistory = false;
      state.fetchingDetails = false;
      state.isProcessing = false;
      state.paymentFailed = true;
    },

    clearError: (state) => {
      state.error = null;
      state.paymentFailed = false;
    },

    // ========== UI STATE ==========
    showPaymentModal: (state) => {
      state.showPaymentModal = true;
    },

    hidePaymentModal: (state) => {
      state.showPaymentModal = false;
      state.paymentMethod = null;
    },

    setPaymentMethod: (
      state,
      action: PayloadAction<"paypal" | "stripe" | "cash_on_delivery">
    ) => {
      state.paymentMethod = action.payload;
    },

    // ========== PAYMENT FLOW ==========
    setPaymentCompleted: (state, action: PayloadAction<boolean>) => {
      state.paymentCompleted = action.payload;
      if (action.payload) {
        state.paymentFailed = false;
        state.isProcessing = false;
      }
    },

    setPaymentFailed: (state, action: PayloadAction<boolean>) => {
      state.paymentFailed = action.payload;
      if (action.payload) {
        state.paymentCompleted = false;
        state.isProcessing = false;
      }
    },

    setIsProcessing: (state, action: PayloadAction<boolean>) => {
      state.isProcessing = action.payload;
    },

    // ========== ACTION TRACKING ==========
    setLastAction: (state, action: PayloadAction<string>) => {
      state.lastAction = action.payload;
    },

    // ========== PAYMENT STATISTICS ==========
    updatePaymentStats: (
      state,
      action: PayloadAction<{ totalPayments: number; totalAmount: number }>
    ) => {
      state.totalPayments = action.payload.totalPayments;
      state.totalAmount = action.payload.totalAmount;
    },

    // ========== ADD NEW PAYMENT TO HISTORY ==========
    addPaymentToHistory: (state, action: PayloadAction<Payment>) => {
      state.paymentHistory.unshift(action.payload);
      state.totalPayments = state.paymentHistory.length;
      state.totalAmount = state.paymentHistory.reduce(
        (sum, payment) => sum + payment.amount,
        0
      );
    },

    // ========== RESET ==========
    resetPaymentState: () => initialState,

    resetPaymentFlow: (state) => {
      state.paymentCompleted = false;
      state.paymentFailed = false;
      state.isProcessing = false;
      state.error = null;
      state.paypalOrder = null;
      state.currentPayment = null;
    },
  },
});

// ==========================================
// EXPORT ACTIONS & REDUCER
// ==========================================

export const {
  // Loading states
  setLoading,
  setCreating,
  setCapturing,
  setFetchingHistory,
  setFetchingDetails,

  // Payment data
  setCurrentPayment,
  setPaymentHistory,
  setPayPalOrder,
  clearPaymentData,

  // Error handling
  setError,
  clearError,

  // UI state
  showPaymentModal,
  hidePaymentModal,
  setPaymentMethod,

  // Payment flow
  setPaymentCompleted,
  setPaymentFailed,
  setIsProcessing,

  // Action tracking
  setLastAction,

  // Statistics
  updatePaymentStats,
  addPaymentToHistory,

  // Reset
  resetPaymentState,
  resetPaymentFlow,
} = paymentSlice.actions;

export default paymentSlice.reducer;

// ==========================================
// SELECTORS (for easy state access)
// ==========================================

export const selectCurrentPayment = (state: { payment: PaymentState }) =>
  state.payment.currentPayment;
export const selectPaymentHistory = (state: { payment: PaymentState }) =>
  state.payment.paymentHistory;
export const selectPayPalOrder = (state: { payment: PaymentState }) =>
  state.payment.paypalOrder;

export const selectPaymentLoading = (state: { payment: PaymentState }) =>
  state.payment.loading;
export const selectPaymentCreating = (state: { payment: PaymentState }) =>
  state.payment.creating;
export const selectPaymentCapturing = (state: { payment: PaymentState }) =>
  state.payment.capturing;
export const selectPaymentFetchingHistory = (state: {
  payment: PaymentState;
}) => state.payment.fetchingHistory;
export const selectPaymentFetchingDetails = (state: {
  payment: PaymentState;
}) => state.payment.fetchingDetails;

export const selectPaymentError = (state: { payment: PaymentState }) =>
  state.payment.error;
export const selectShowPaymentModal = (state: { payment: PaymentState }) =>
  state.payment.showPaymentModal;
export const selectPaymentMethod = (state: { payment: PaymentState }) =>
  state.payment.paymentMethod;
export const selectPaymentLastAction = (state: { payment: PaymentState }) =>
  state.payment.lastAction;

export const selectIsProcessingPayment = (state: { payment: PaymentState }) =>
  state.payment.isProcessing;
export const selectPaymentCompleted = (state: { payment: PaymentState }) =>
  state.payment.paymentCompleted;
export const selectPaymentFailed = (state: { payment: PaymentState }) =>
  state.payment.paymentFailed;

export const selectPaymentTotalPayments = (state: { payment: PaymentState }) =>
  state.payment.totalPayments;
export const selectPaymentTotalAmount = (state: { payment: PaymentState }) =>
  state.payment.totalAmount;

// Combined selectors
export const selectHasPaymentHistory = (state: { payment: PaymentState }) =>
  state.payment.paymentHistory.length > 0;

export const selectSuccessfulPayments = (state: { payment: PaymentState }) =>
  state.payment.paymentHistory.filter(
    (payment) => payment.payment_status === "completed"
  );

export const selectPendingPayments = (state: { payment: PaymentState }) =>
  state.payment.paymentHistory.filter(
    (payment) => payment.payment_status === "pending"
  );

export const selectFailedPayments = (state: { payment: PaymentState }) =>
  state.payment.paymentHistory.filter(
    (payment) => payment.payment_status === "failed"
  );

export const selectPaymentsByMethod = (
  state: { payment: PaymentState },
  method: "paypal" | "stripe" | "cash_on_delivery"
) =>
  state.payment.paymentHistory.filter(
    (payment) => payment.payment_method === method
  );

export const selectAveragePaymentAmount = (state: {
  payment: PaymentState;
}) => {
  const { paymentHistory } = state.payment;
  if (paymentHistory.length === 0) return 0;
  return (
    paymentHistory.reduce((sum, payment) => sum + payment.amount, 0) /
    paymentHistory.length
  );
};

export const selectRecentPayments = (
  state: { payment: PaymentState },
  limit: number = 5
) =>
  state.payment.paymentHistory
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, limit);

export const selectPaymentById = (
  state: { payment: PaymentState },
  paymentId: string
) => state.payment.paymentHistory.find((payment) => payment._id === paymentId);

export const selectPaymentByTransactionId = (
  state: { payment: PaymentState },
  transactionId: string
) =>
  state.payment.paymentHistory.find(
    (payment) => payment.transaction_id === transactionId
  );
