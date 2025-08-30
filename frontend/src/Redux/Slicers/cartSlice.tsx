// cartSlice.tsx - Redux slice for cart state management with enhanced debugging
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
// LOGGING UTILITY
// ==========================================

const logSliceAction = (action: string, payload?: any, state?: any) => {
  console.log(`🧩 [Cart Slice] ${action}`, payload ? { payload } : "");
  if (state) {
    console.log(`🧩 [Cart Slice] State after ${action}:`, {
      hasCart: !!state.currentCart,
      itemCount: state.currentCart?.totalItems || 0,
      isOpen: state.isOpen,
      loading: state.loading,
      error: state.error,
    });
  }
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
      logSliceAction("setLoading", action.payload);
      state.loading = action.payload;
      if (action.payload) {
        state.error = null;
      }
      logSliceAction("setLoading", action.payload, state);
    },

    setAdding: (state, action: PayloadAction<boolean>) => {
      logSliceAction("setAdding", action.payload);
      state.adding = action.payload;
      if (action.payload) {
        state.error = null;
      }
    },

    setUpdating: (state, action: PayloadAction<boolean>) => {
      logSliceAction("setUpdating", action.payload);
      state.updating = action.payload;
      if (action.payload) {
        state.error = null;
      }
    },

    setRemoving: (state, action: PayloadAction<boolean>) => {
      logSliceAction("setRemoving", action.payload);
      state.removing = action.payload;
      if (action.payload) {
        state.error = null;
      }
    },

    setClearing: (state, action: PayloadAction<boolean>) => {
      logSliceAction("setClearing", action.payload);
      state.clearing = action.payload;
      if (action.payload) {
        state.error = null;
      }
    },

    setValidating: (state, action: PayloadAction<boolean>) => {
      logSliceAction("setValidating", action.payload);
      state.validating = action.payload;
      if (action.payload) {
        state.error = null;
      }
    },

    // ========== CART DATA ==========
    setCart: (state, action: PayloadAction<Cart>) => {
      logSliceAction("setCart", {
        userId: action.payload.userId,
        itemCount: action.payload.items?.length || 0,
        total: action.payload.total,
      });

      state.currentCart = action.payload;
      state.lastFetched = new Date().toISOString();
      state.error = null;

      logSliceAction("setCart", null, state);
    },

    setCartSummary: (state, action: PayloadAction<CartSummary>) => {
      logSliceAction("setCartSummary", action.payload);
      state.cartSummary = action.payload;
      state.error = null;
    },

    clearCartData: (state) => {
      logSliceAction("clearCartData");
      state.currentCart = null;
      state.cartSummary = null;
      state.validationResult = null;
      state.hasValidationIssues = false;
      state.lastFetched = null;
      logSliceAction("clearCartData", null, state);
    },

    // ========== ERROR HANDLING ==========
    setError: (state, action: PayloadAction<string>) => {
      logSliceAction("setError", action.payload);
      state.error = action.payload;
      state.loading = false;
      state.adding = false;
      state.updating = false;
      state.removing = false;
      state.clearing = false;
      state.validating = false;
    },

    clearError: (state) => {
      logSliceAction("clearError");
      state.error = null;
    },

    // ========== UI STATE ==========
    openCart: (state) => {
      logSliceAction("openCart");
      state.isOpen = true;
      logSliceAction("openCart", null, state);
    },

    closeCart: (state) => {
      logSliceAction("closeCart");
      state.isOpen = false;
      logSliceAction("closeCart", null, state);
    },

    toggleCart: (state) => {
      logSliceAction("toggleCart", { currentState: state.isOpen });
      state.isOpen = !state.isOpen;
      logSliceAction("toggleCart", null, state);
    },

    // ========== ACTION TRACKING ==========
    setLastAction: (state, action: PayloadAction<string>) => {
      logSliceAction("setLastAction", action.payload);
      state.lastAction = action.payload;
    },

    // ========== VALIDATION ==========
    setValidationResult: (
      state,
      action: PayloadAction<CartValidationResult>
    ) => {
      logSliceAction("setValidationResult", {
        valid: action.payload.valid,
        issuesCount: action.payload.issues?.length || 0,
      });
      state.validationResult = action.payload;
      state.hasValidationIssues = !action.payload.valid;
      state.error = null;
    },

    clearValidationResult: (state) => {
      logSliceAction("clearValidationResult");
      state.validationResult = null;
      state.hasValidationIssues = false;
    },

    // ========== LOCAL CART UPDATES (Optimistic) ==========
    updateLocalQuantity: (
      state,
      action: PayloadAction<{ productId: string; quantity: number }>
    ) => {
      logSliceAction("updateLocalQuantity", action.payload);

      if (state.currentCart) {
        const item = state.currentCart.items.find(
          (item) => item.productId === action.payload.productId
        );
        if (item) {
          const oldQuantity = item.quantity;
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

          console.log(
            `🧩 [Cart Slice] Updated quantity for ${action.payload.productId}: ${oldQuantity} → ${action.payload.quantity}`
          );
          logSliceAction("updateLocalQuantity", null, state);
        } else {
          console.warn(
            `🧩 [Cart Slice] Item ${action.payload.productId} not found for quantity update`
          );
        }
      }
    },

    removeLocalItem: (state, action: PayloadAction<string>) => {
      logSliceAction("removeLocalItem", { productId: action.payload });

      if (state.currentCart) {
        const itemsBefore = state.currentCart.items.length;
        state.currentCart.items = state.currentCart.items.filter(
          (item) => item.productId !== action.payload
        );
        const itemsAfter = state.currentCart.items.length;

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

        console.log(
          `🧩 [Cart Slice] Removed item ${action.payload}: ${itemsBefore} → ${itemsAfter} items`
        );
        logSliceAction("removeLocalItem", null, state);
      }
    },

    // ========== RESET ==========
    resetCartState: () => {
      logSliceAction("resetCartState");
      return initialState;
    },
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
