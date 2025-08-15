// hooks/useCart.ts - Enhanced with debugging and proper error handling
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

  console.log("🪝 [useCart] Hook called with state:", {
    hasCart: !!cart,
    cartItems: cart?.items?.length || 0,
    isOpen,
    isAuthenticated,
    userId: user?.id || user?._id,
  });

  // Transform Redux cart data to match the old context interface
  const items: CartItem[] =
    cart?.items?.map((item) => {
      const transformedItem = {
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
      };

      console.log("🪝 [useCart] Transformed item:", {
        original: item,
        transformed: transformedItem,
      });

      return transformedItem;
    }) || [];

  const itemCount = cart?.totalItems || 0;
  const totalPrice = cart?.total || 0;
  const totalCarbonFootprint = items.reduce(
    (total, item) => total + item.carbonFootprint * item.quantity,
    0
  );

  console.log("🪝 [useCart] Computed values:", {
    itemCount,
    totalPrice,
    totalCarbonFootprint,
    itemsLength: items.length,
  });

  // Cart actions
  const addItem = useCallback(
    (product: Product, quantity: number = 1) => {
      console.log("🪝 [useCart] addItem called with:", {
        product: {
          id: product.id,
          name: product.name,
          price: product.price,
        },
        quantity,
      });
      console.log("🪝 [useCart] Current user state:", {
        isAuthenticated,
        user: !!user,
        userId: user?.id || user?._id,
      });

      if (!isAuthenticated || !user) {
        console.error("❌ [useCart] Cannot add item - user not authenticated");
        return;
      }

      // Check for both 'id' and '_id' (MongoDB uses _id)
      const userId = user?.id || user?._id;

      if (!userId) {
        console.error(
          "❌ [useCart] User not authenticated - cannot add item to cart"
        );
        console.error("❌ [useCart] User object:", user);
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
      )
        .then((result) => {
          console.log("🪝 [useCart] addToCart result:", result);
        })
        .catch((error) => {
          console.error("🪝 [useCart] addToCart error:", error);
        });
    },
    [dispatch, user?.id, user?._id, isAuthenticated]
  );

  const removeItem = useCallback(
    (productId: string) => {
      console.log("🪝 [useCart] removeItem called with productId:", productId);

      const userId = user?.id || user?._id;
      if (!userId) {
        console.error(
          "❌ [useCart] User not authenticated - cannot remove item"
        );
        return;
      }

      console.log("🪝 [useCart] Dispatching removeFromCart");
      dispatch(
        removeFromCart({
          userId: userId,
          productId,
        })
      )
        .then((result) => {
          console.log("🪝 [useCart] removeFromCart result:", result);
        })
        .catch((error) => {
          console.error("🪝 [useCart] removeFromCart error:", error);
        });
    },
    [dispatch, user?.id, user?._id]
  );

  const updateQuantity = useCallback(
    (productId: string, quantity: number) => {
      console.log("🪝 [useCart] updateQuantity called:", {
        productId,
        quantity,
      });

      const userId = user?.id || user?._id;
      if (!userId) {
        console.error(
          "❌ [useCart] User not authenticated - cannot update quantity"
        );
        return;
      }

      if (quantity <= 0) {
        console.log("🪝 [useCart] Quantity <= 0, removing item instead");
        dispatch(
          removeFromCart({
            userId: userId,
            productId,
          })
        );
      } else {
        console.log("🪝 [useCart] Dispatching updateCartItemQuantity");
        dispatch(
          updateCartItemQuantity({
            userId: userId,
            productId,
            quantity,
          })
        )
          .then((result) => {
            console.log("🪝 [useCart] updateCartItemQuantity result:", result);
          })
          .catch((error) => {
            console.error("🪝 [useCart] updateCartItemQuantity error:", error);
          });
      }
    },
    [dispatch, user?.id, user?._id]
  );

  const clearCart = useCallback(() => {
    console.log("🪝 [useCart] clearCart called");

    const userId = user?.id || user?._id;
    if (!userId) {
      console.error("❌ [useCart] User not authenticated - cannot clear cart");
      return;
    }

    console.log("🪝 [useCart] Dispatching clearCartItems");
    dispatch(clearCartItems(userId))
      .then((result) => {
        console.log("🪝 [useCart] clearCartItems result:", result);
      })
      .catch((error) => {
        console.error("🪝 [useCart] clearCartItems error:", error);
      });
  }, [dispatch, user?.id, user?._id]);

  const openCartAction = useCallback(() => {
    console.log("🪝 [useCart] openCart called");
    dispatch(openCart());
  }, [dispatch]);

  const closeCartAction = useCallback(() => {
    console.log("🪝 [useCart] closeCart called");
    dispatch(closeCart());
  }, [dispatch]);

  const hookReturnValue = {
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

  console.log("🪝 [useCart] Returning hook value:", {
    itemsCount: hookReturnValue.items.length,
    isOpen: hookReturnValue.isOpen,
    itemCount: hookReturnValue.itemCount,
    totalPrice: hookReturnValue.totalPrice,
  });

  return hookReturnValue;
}
