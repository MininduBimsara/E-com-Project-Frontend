// cartSlice.tsx - Redux slice for cart state management
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type {
  Cart,
  CartItem,
  CartSummary,
  CartValidationResult,
} from "../../Api/Common/cartApi";

// ==========================================
// TYPES & INTERFACES
// ==========================================

export interface CartState {
  // Cart data
  currentCart: Cart | null;
  cartSummary: CartSummary | null;

  // Loading states
  loading: boolean;
  adding: boolean;
  updating: boolean;
  removing: boolean;
  clearing: boolean;
  validating: boolean;

  // Error handling
  error: string | null;

  // UI state
  isOpen: boolean;
  lastAction: string | null;

  // Validation
  validationResult: CartValidationResult | null;
  hasValidationIssues: boolean;

  // Cache
  lastFetched: string | null;
}

// Initial state
const initialState: CartState = {
  currentCart: null,
  cartSummary: null,
  loading: false,
  adding: false,
  updating: false,
  removing: false,
  clearing: false,
  validating: false,
  error: null,
  isOpen: false,
  lastAction: null,
  validationResult: null,
  hasValidationIssues: false,
  lastFetched: null,
};

// ==========================================
// CART SLICE
// ==========================================

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // ========== LOADING STATES ==========
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
      if (action.payload) {
        state.error = null;
      }
    },

    setAdding: (state, action: PayloadAction<boolean>) => {
      state.adding = action.payload;
      if (action.payload) {
        state.error = null;
      }
    },

    setUpdating: (state, action: PayloadAction<boolean>) => {
      state.updating = action.payload;
      if (action.payload) {
        state.error = null;
      }
    },

    setRemoving: (state, action: PayloadAction<boolean>) => {
      state.removing = action.payload;
      if (action.payload) {
        state.error = null;
      }
    },

    setClearing: (state, action: PayloadAction<boolean>) => {
      state.clearing = action.payload;
      if (action.payload) {
        state.error = null;
      }
    },

    setValidating: (state, action: PayloadAction<boolean>) => {
      state.validating = action.payload;
      if (action.payload) {
        state.error = null;
      }
    },

    // ========== CART DATA ==========
    setCart: (state, action: PayloadAction<Cart>) => {
      state.currentCart = action.payload;
      state.lastFetched = new Date().toISOString();
      state.error = null;
    },

    setCartSummary: (state, action: PayloadAction<CartSummary>) => {
      state.cartSummary = action.payload;
      state.error = null;
    },

    clearCartData: (state) => {
      state.currentCart = null;
      state.cartSummary = null;
      state.validationResult = null;
      state.hasValidationIssues = false;
      state.lastFetched = null;
    },

    // ========== ERROR HANDLING ==========
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
      state.adding = false;
      state.updating = false;
      state.removing = false;
      state.clearing = false;
      state.validating = false;
    },

    clearError: (state) => {
      state.error = null;
    },

    // ========== UI STATE ==========
    openCart: (state) => {
      state.isOpen = true;
    },

    closeCart: (state) => {
      state.isOpen = false;
    },

    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },

    // ========== ACTION TRACKING ==========
    setLastAction: (state, action: PayloadAction<string>) => {
      state.lastAction = action.payload;
    },

    // ========== VALIDATION ==========
    setValidationResult: (
      state,
      action: PayloadAction<CartValidationResult>
    ) => {
      state.validationResult = action.payload;
      state.hasValidationIssues = !action.payload.valid;
      state.error = null;
    },

    clearValidationResult: (state) => {
      state.validationResult = null;
      state.hasValidationIssues = false;
    },

    // ========== LOCAL CART UPDATES (Optimistic) ==========
    updateLocalQuantity: (
      state,
      action: PayloadAction<{ productId: string; quantity: number }>
    ) => {
      if (state.currentCart) {
        const item = state.currentCart.items.find(
          (item) => item.productId === action.payload.productId
        );
        if (item) {
          item.quantity = action.payload.quantity;
          // Recalculate totals
          state.currentCart.totalItems = state.currentCart.items.reduce(
            (sum, item) => sum + item.quantity,
            0
          );
          state.currentCart.subtotal = state.currentCart.items.reduce(
            (sum, item) => sum + item.priceAtAdd * item.quantity,
            0
          );
          state.currentCart.total =
            state.currentCart.subtotal + state.currentCart.shipping;
        }
      }
    },

    removeLocalItem: (state, action: PayloadAction<string>) => {
      if (state.currentCart) {
        state.currentCart.items = state.currentCart.items.filter(
          (item) => item.productId !== action.payload
        );
        // Recalculate totals
        state.currentCart.totalItems = state.currentCart.items.reduce(
          (sum, item) => sum + item.quantity,
          0
        );
        state.currentCart.subtotal = state.currentCart.items.reduce(
          (sum, item) => sum + item.priceAtAdd * item.quantity,
          0
        );
        state.currentCart.total =
          state.currentCart.subtotal + state.currentCart.shipping;
      }
    },

    // ========== RESET ==========
    resetCartState: () => initialState,
  },
});

// ==========================================
// EXPORT ACTIONS & REDUCER
// ==========================================

export const {
  // Loading states
  setLoading,
  setAdding,
  setUpdating,
  setRemoving,
  setClearing,
  setValidating,

  // Cart data
  setCart,
  setCartSummary,
  clearCartData,

  // Error handling
  setError,
  clearError,

  // UI state
  openCart,
  closeCart,
  toggleCart,

  // Action tracking
  setLastAction,

  // Validation
  setValidationResult,
  clearValidationResult,

  // Local updates
  updateLocalQuantity,
  removeLocalItem,

  // Reset
  resetCartState,
} = cartSlice.actions;

export default cartSlice.reducer;

// ==========================================
// SELECTORS (for easy state access)
// ==========================================

export const selectCart = (state: { cart: CartState }) =>
  state.cart.currentCart;
export const selectCartSummary = (state: { cart: CartState }) =>
  state.cart.cartSummary;
export const selectCartItems = (state: { cart: CartState }) =>
  state.cart.currentCart?.items || [];
export const selectCartItemCount = (state: { cart: CartState }) =>
  state.cart.currentCart?.totalItems || 0;
export const selectCartTotal = (state: { cart: CartState }) =>
  state.cart.currentCart?.total || 0;
export const selectCartSubtotal = (state: { cart: CartState }) =>
  state.cart.currentCart?.subtotal || 0;
export const selectCartShipping = (state: { cart: CartState }) =>
  state.cart.currentCart?.shipping || 0;

export const selectCartLoading = (state: { cart: CartState }) =>
  state.cart.loading;
export const selectCartAdding = (state: { cart: CartState }) =>
  state.cart.adding;
export const selectCartUpdating = (state: { cart: CartState }) =>
  state.cart.updating;
export const selectCartRemoving = (state: { cart: CartState }) =>
  state.cart.removing;
export const selectCartClearing = (state: { cart: CartState }) =>
  state.cart.clearing;
export const selectCartValidating = (state: { cart: CartState }) =>
  state.cart.validating;

export const selectCartError = (state: { cart: CartState }) => state.cart.error;
export const selectCartIsOpen = (state: { cart: CartState }) =>
  state.cart.isOpen;
export const selectCartLastAction = (state: { cart: CartState }) =>
  state.cart.lastAction;

export const selectCartValidationResult = (state: { cart: CartState }) =>
  state.cart.validationResult;
export const selectCartHasValidationIssues = (state: { cart: CartState }) =>
  state.cart.hasValidationIssues;

// Combined selectors
export const selectCartIsEmpty = (state: { cart: CartState }) => {
  const items = state.cart.currentCart?.items || [];
  return items.length === 0;
};

export const selectCartTotalCarbonFootprint = (state: { cart: CartState }) => {
  const items = state.cart.currentCart?.items || [];
  return items.reduce((total, item) => {
    const carbonFootprint = item.product?.carbonFootprint || 0;
    return total + carbonFootprint * item.quantity;
  }, 0);
};
