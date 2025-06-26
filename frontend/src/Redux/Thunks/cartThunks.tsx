// cartThunks.tsx - Async actions for cart operations
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCart,
  getCartSummary,
  getCartCount,
  addToCart as addToCartApi,
  updateCartItem as updateCartItemApi,
  removeFromCart as removeFromCartApi,
  clearCart as clearCartApi,
  updateShipping as updateShippingApi,
  validateCart as validateCartApi,
  getCartStatistics,
  type ApiResponse,
  type Cart,
  type CartSummary,
  type CartValidationResult,
} from "../../Api/Common/cartApi";

import {
  setLoading,
  setAdding,
  setUpdating,
  setRemoving,
  setClearing,
  setValidating,
  setCart,
  setCartSummary,
  setError,
  setLastAction,
  setValidationResult,
  updateLocalQuantity,
  removeLocalItem,
} from "../Slicers/cartSlice";

// ==========================================
// ASYNC THUNKS
// ==========================================

/**
 * Fetch user's cart with full product details
 */
export const fetchCart = createAsyncThunk<
  Cart,
  string,
  { rejectValue: string }
>("cart/fetchCart", async (userId: string, { dispatch, rejectWithValue }) => {
  try {
    dispatch(setLoading(true));
    dispatch(setLastAction("Fetching cart..."));

    const response: ApiResponse<Cart> = await getCart(userId);

    if (!response.success) {
      throw new Error(response.message || "Failed to fetch cart");
    }

    dispatch(setCart(response.data!));
    dispatch(setLastAction("Cart fetched successfully"));

    return response.data!;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || error.message || "Failed to fetch cart";
    dispatch(setError(errorMessage));
    return rejectWithValue(errorMessage);
  } finally {
    dispatch(setLoading(false));
  }
});

/**
 * Fetch cart summary (lightweight)
 */
export const fetchCartSummary = createAsyncThunk<
  CartSummary,
  string,
  { rejectValue: string }
>(
  "cart/fetchCartSummary",
  async (userId: string, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading(true));

      const response: ApiResponse<CartSummary> = await getCartSummary(userId);

      if (!response.success) {
        throw new Error(response.message || "Failed to fetch cart summary");
      }

      dispatch(setCartSummary(response.data!));

      return response.data!;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch cart summary";
      dispatch(setError(errorMessage));
      return rejectWithValue(errorMessage);
    } finally {
      dispatch(setLoading(false));
    }
  }
);

/**
 * Add item to cart
 */
export const addToCart = createAsyncThunk<
  Cart,
  { userId: string; productId: string; quantity: number },
  { rejectValue: string }
>(
  "cart/addToCart",
  async ({ userId, productId, quantity }, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setAdding(true));
      dispatch(setLastAction(`Adding ${quantity} item(s) to cart...`));

      const response: ApiResponse<Cart> = await addToCartApi(
        userId,
        productId,
        quantity
      );

      if (!response.success) {
        throw new Error(response.message || "Failed to add item to cart");
      }

      dispatch(setCart(response.data!));
      dispatch(setLastAction(`Item added to cart successfully`));

      return response.data!;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to add item to cart";
      dispatch(setError(errorMessage));
      return rejectWithValue(errorMessage);
    } finally {
      dispatch(setAdding(false));
    }
  }
);

/**
 * Update item quantity in cart
 */
export const updateCartItemQuantity = createAsyncThunk<
  Cart,
  { userId: string; productId: string; quantity: number },
  { rejectValue: string }
>(
  "cart/updateCartItemQuantity",
  async ({ userId, productId, quantity }, { dispatch, rejectWithValue }) => {
    try {
      // Optimistic update for better UX
      dispatch(updateLocalQuantity({ productId, quantity }));

      dispatch(setUpdating(true));
      dispatch(setLastAction("Updating item quantity..."));

      const response: ApiResponse<Cart> = await updateCartItemApi(
        userId,
        productId,
        quantity
      );

      if (!response.success) {
        throw new Error(response.message || "Failed to update item quantity");
      }

      dispatch(setCart(response.data!));
      dispatch(setLastAction("Item quantity updated successfully"));

      return response.data!;
    } catch (error: any) {
      // Revert optimistic update on error by fetching fresh cart
      dispatch(fetchCart(userId));

      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to update item quantity";
      dispatch(setError(errorMessage));
      return rejectWithValue(errorMessage);
    } finally {
      dispatch(setUpdating(false));
    }
  }
);

/**
 * Remove item from cart
 */
export const removeFromCart = createAsyncThunk<
  Cart,
  { userId: string; productId: string },
  { rejectValue: string }
>(
  "cart/removeFromCart",
  async ({ userId, productId }, { dispatch, rejectWithValue }) => {
    try {
      // Optimistic update for better UX
      dispatch(removeLocalItem(productId));

      dispatch(setRemoving(true));
      dispatch(setLastAction("Removing item from cart..."));

      const response: ApiResponse<Cart> = await removeFromCartApi(
        userId,
        productId
      );

      if (!response.success) {
        throw new Error(response.message || "Failed to remove item from cart");
      }

      dispatch(setCart(response.data!));
      dispatch(setLastAction("Item removed from cart successfully"));

      return response.data!;
    } catch (error: any) {
      // Revert optimistic update on error by fetching fresh cart
      dispatch(fetchCart(userId));

      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to remove item from cart";
      dispatch(setError(errorMessage));
      return rejectWithValue(errorMessage);
    } finally {
      dispatch(setRemoving(false));
    }
  }
);

/**
 * Clear entire cart
 */
export const clearCartItems = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>(
  "cart/clearCartItems",
  async (userId: string, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setClearing(true));
      dispatch(setLastAction("Clearing cart..."));

      const response: ApiResponse<{ message: string }> = await clearCartApi(
        userId
      );

      if (!response.success) {
        throw new Error(response.message || "Failed to clear cart");
      }

      // Clear cart data in state
      dispatch(
        setCart({
          userId,
          items: [],
          subtotal: 0,
          shipping: 0,
          total: 0,
          totalItems: 0,
        })
      );

      dispatch(setLastAction("Cart cleared successfully"));

      return response.data?.message || "Cart cleared successfully";
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to clear cart";
      dispatch(setError(errorMessage));
      return rejectWithValue(errorMessage);
    } finally {
      dispatch(setClearing(false));
    }
  }
);

/**
 * Update shipping cost
 */
export const updateCartShipping = createAsyncThunk<
  Cart,
  { userId: string; shippingCost: number },
  { rejectValue: string }
>(
  "cart/updateCartShipping",
  async ({ userId, shippingCost }, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setUpdating(true));
      dispatch(setLastAction("Updating shipping cost..."));

      const response: ApiResponse<Cart> = await updateShippingApi(
        userId,
        shippingCost
      );

      if (!response.success) {
        throw new Error(response.message || "Failed to update shipping cost");
      }

      dispatch(setCart(response.data!));
      dispatch(setLastAction("Shipping cost updated successfully"));

      return response.data!;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to update shipping cost";
      dispatch(setError(errorMessage));
      return rejectWithValue(errorMessage);
    } finally {
      dispatch(setUpdating(false));
    }
  }
);

/**
 * Validate cart items (stock, prices, availability)
 */
export const validateCartItems = createAsyncThunk<
  CartValidationResult,
  string,
  { rejectValue: string }
>(
  "cart/validateCartItems",
  async (userId: string, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setValidating(true));
      dispatch(setLastAction("Validating cart items..."));

      const response: ApiResponse<CartValidationResult> = await validateCartApi(
        userId
      );

      if (!response.success) {
        throw new Error(response.message || "Failed to validate cart");
      }

      dispatch(setValidationResult(response.data!));

      // Also update cart with latest data
      if (response.data?.cart) {
        dispatch(setCart(response.data.cart));
      }

      const issueCount = response.data?.issues?.length || 0;
      dispatch(
        setLastAction(
          issueCount > 0
            ? `Cart validation completed with ${issueCount} issue(s)`
            : "Cart validation completed - all items are valid"
        )
      );

      return response.data!;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to validate cart";
      dispatch(setError(errorMessage));
      return rejectWithValue(errorMessage);
    } finally {
      dispatch(setValidating(false));
    }
  }
);

/**
 * Get cart count only (lightweight)
 */
export const fetchCartCount = createAsyncThunk<
  number,
  string,
  { rejectValue: string }
>("cart/fetchCartCount", async (userId: string, { rejectWithValue }) => {
  try {
    const response: ApiResponse<{ count: number }> = await getCartCount(userId);

    if (!response.success) {
      throw new Error(response.message || "Failed to fetch cart count");
    }

    return response.data?.count || 0;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Failed to fetch cart count";
    return rejectWithValue(errorMessage);
  }
});

/**
 * Get cart statistics (Admin only)
 */
export const fetchCartStatistics = createAsyncThunk<
  any,
  void,
  { rejectValue: string }
>("cart/fetchCartStatistics", async (_, { dispatch, rejectWithValue }) => {
  try {
    dispatch(setLoading(true));

    const response: ApiResponse<any> = await getCartStatistics();

    if (!response.success) {
      throw new Error(response.message || "Failed to fetch cart statistics");
    }

    return response.data!;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Failed to fetch cart statistics";
    dispatch(setError(errorMessage));
    return rejectWithValue(errorMessage);
  } finally {
    dispatch(setLoading(false));
  }
});

// ==========================================
// UTILITY THUNKS
// ==========================================

/**
 * Refresh cart data (useful after external changes)
 */
export const refreshCart = createAsyncThunk<
  Cart,
  string,
  { rejectValue: string }
>("cart/refreshCart", async (userId: string, { dispatch }) => {
  return dispatch(fetchCart(userId)).unwrap();
});

/**
 * Smart cart sync - validates and fetches fresh data if needed
 */
export const syncCart = createAsyncThunk<Cart, string, { rejectValue: string }>(
  "cart/syncCart",
  async (userId: string, { dispatch }) => {
    try {
      // First validate the cart
      const validationResult = await dispatch(
        validateCartItems(userId)
      ).unwrap();

      // If there are issues, fetch fresh cart data
      if (!validationResult.valid) {
        return dispatch(fetchCart(userId)).unwrap();
      }

      return validationResult.cart;
    } catch (error: any) {
      // If validation fails, just fetch fresh cart
      return dispatch(fetchCart(userId)).unwrap();
    }
  }
);

// ==========================================
// EXPORT ALL THUNKS
// ==========================================


