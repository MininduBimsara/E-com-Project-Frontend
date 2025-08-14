// hooks/useCart.ts
import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../Redux/Store/hook";
import {
  openCart,
  closeCart,
  updateLocalQuantity,
  removeLocalItem,
} from "../Redux/Slicers/cartSlice";
import {
  addToCart,
  updateCartItemQuantity,
  removeFromCart,
  clearCartItems,
  fetchCart,
} from "../Redux/Thunks/cartThunks";
import type { Product } from "../Types/cart";
import type { CartContextType, CartItem } from "../Types/cart";

/**
 * Custom hook that provides the same interface as the old context-based cart
 * but uses Redux under the hood for backend persistence
 */
export function useCart(): CartContextType {
  const dispatch = useAppDispatch();

  // Get cart state from Redux
  const cart = useAppSelector((state) => state.cart.currentCart);
  const isOpen = useAppSelector((state) => state.cart.isOpen);
const { user, isAuthenticated } = useAppSelector((state) => state.user);

  // Transform Redux cart data to match the old context interface
  const items: CartItem[] =
    cart?.items?.map((item) => ({
      id: item.productId,
      name: item.product?.name || "Unknown Product",
      category: item.product?.category || "Unknown",
      price: item.priceAtAdd,
      originalPrice: item.product?.price,
      image: item.product?.images?.[0] || "",
      quantity: item.quantity,
      inStock: item.product?.isActive || false,
      ecoLabel: item.product?.ecoLabel || "Eco-Friendly",
      carbonFootprint: item.product?.carbonFootprint || 0,
      maxQuantity: item.product?.stock || 10,
    })) || [];

  const itemCount = cart?.totalItems || 0;
  const totalPrice = cart?.total || 0;
  const totalCarbonFootprint = items.reduce(
    (total, item) => total + item.carbonFootprint * item.quantity,
    0
  );

  // Cart actions
  const addItem = useCallback(
    (product: Product, quantity: number = 1) => {

      if (!isAuthenticated || !user) {
        console.error("❌ Cannot add item - user not authenticated");
        return;
      }

      console.log("🔍 [useCart] addItem called with:", { product, quantity });
      console.log("🔍 [useCart] Current user state:", user);
      console.log("🔍 [useCart] User ID:", user?.id);
      console.log("🔍 [useCart] User _id:", user?._id);
      console.log("🔍 [useCart] All user properties:", Object.keys(user || {}));
      console.log(
        "🔍 [useCart] Is user authenticated:",
        !!user?.id || !!user?._id
      );

      // Check for both 'id' and '_id' (MongoDB uses _id)
      const userId = user?.id || user?._id;

      if (!userId) {
        console.error(
          "❌ [useCart] User not authenticated - cannot add item to cart"
        );
        console.error("❌ [useCart] User object:", user);
        console.error("❌ [useCart] No user ID found in user object");
        return;
      }

      console.log(
        "✅ [useCart] User authenticated, dispatching addToCart with userId:",
        userId
      );
      dispatch(
        addToCart({
          userId: userId,
          productId: product.id,
          quantity,
        })
      );
    },
    [dispatch, user?.id, user?._id]
  );

  const removeItem = useCallback(
    (productId: string) => {
      const userId = user?.id || user?._id;
      if (!userId) {
        console.error("User not authenticated");
        return;
      }

      dispatch(
        removeFromCart({
          userId: userId,
          productId,
        })
      );
    },
    [dispatch, user?.id, user?._id]
  );

  const updateQuantity = useCallback(
    (productId: string, quantity: number) => {
      const userId = user?.id || user?._id;
      if (!userId) {
        console.error("User not authenticated");
        return;
      }

      if (quantity <= 0) {
        dispatch(
          removeFromCart({
            userId: userId,
            productId,
          })
        );
      } else {
        dispatch(
          updateCartItemQuantity({
            userId: userId,
            productId,
            quantity,
          })
        );
      }
    },
    [dispatch, user?.id, user?._id]
  );

  const clearCart = useCallback(() => {
    const userId = user?.id || user?._id;
    if (!userId) {
      console.error("User not authenticated");
      return;
    }

    dispatch(clearCartItems(userId));
  }, [dispatch, user?.id, user?._id]);

  const openCartAction = useCallback(() => {
    dispatch(openCart());
  }, [dispatch]);

  const closeCartAction = useCallback(() => {
    dispatch(closeCart());
  }, [dispatch]);

  return {
    items,
    isOpen,
    itemCount,
    totalPrice,
    totalCarbonFootprint,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    openCart: openCartAction,
    closeCart: closeCartAction,
  };
}
