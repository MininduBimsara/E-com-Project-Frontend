// context/CartContext.tsx
import React, { createContext, useContext, useReducer } from "react";
import type { ReactNode } from "react";
import type { CartItem, CartContextType } from "../Types/cart";

/**
 * These are all the possible actions that can be performed on the cart
 * Each action has a type and payload (data needed for that action)
 */
type CartAction =
  | { type: "ADD_ITEM"; payload: { product: any; quantity: number } }
  | { type: "REMOVE_ITEM"; payload: { productId: string } }
  | {
      type: "UPDATE_QUANTITY";
      payload: { productId: string; quantity: number };
    }
  | { type: "CLEAR_CART" }
  | { type: "OPEN_CART" }
  | { type: "CLOSE_CART" };

/**
 * The shape of our cart state - what data we store
 */
interface CartState {
  items: CartItem[]; // All cart items
  isOpen: boolean; // Cart sidebar open/closed
}

/**
 * Create the React Context - this is like a "global store" for cart data
 * Initially undefined, will be filled by CartProvider
 */
const CartContext = createContext<CartContextType | undefined>(undefined);

/**
 * REDUCER FUNCTION - This is the heart of our cart logic!
 *
 * Think of this like a super-powered switch statement that handles all cart operations.
 * It takes the current state and an action, then returns the new state.
 *
 * Why use a reducer?
 * - Predictable state changes
 * - All cart logic in one place
 * - Easy to test and debug
 * - Handles complex state updates safely
 */
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_ITEM": {
      const { product, quantity } = action.payload;

      // Check if item already exists in cart
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === product.id
      );

      if (existingItemIndex >= 0) {
        // Item exists - just increase quantity
        const updatedItems = [...state.items]; // Create copy of array
        updatedItems[existingItemIndex].quantity += quantity;
        return { ...state, items: updatedItems }; // Return new state
      } else {
        // New item - add to cart
        const newItem: CartItem = {
          id: product.id,
          name: product.name,
          category: product.category,
          price: product.price,
          originalPrice: product.originalPrice,
          image: product.images?.[0] || "",
          quantity,
          inStock: product.inStock,
          ecoLabel: product.ecoLabel,
          carbonFootprint: product.carbonFootprint,
          maxQuantity: 10,
        };
        return { ...state, items: [...state.items, newItem] };
      }
    }

    case "REMOVE_ITEM": {
      // Filter out the item with matching ID
      const filteredItems = state.items.filter(
        (item) => item.id !== action.payload.productId
      );
      return { ...state, items: filteredItems };
    }

    case "UPDATE_QUANTITY": {
      const { productId, quantity } = action.payload;

      // If quantity is 0 or less, remove the item
      if (quantity <= 0) {
        return cartReducer(state, {
          type: "REMOVE_ITEM",
          payload: { productId },
        });
      }

      // Update quantity for the specific item
      const updatedItems = state.items.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      );
      return { ...state, items: updatedItems };
    }

    case "CLEAR_CART":
      return { ...state, items: [] };

    case "OPEN_CART":
      return { ...state, isOpen: true };

    case "CLOSE_CART":
      return { ...state, isOpen: false };

    default:
      return state; // Always return current state for unknown actions
  }
};

/**
 * CART PROVIDER COMPONENT - NO React.FC!
 *
 * This component wraps your app and provides cart functionality to all child components.
 * It's like creating a "cart store" that any component can access.
 */
export function CartProvider({ children }: { children: ReactNode }) {
  // useReducer hook manages our cart state
  // It takes our reducer function and initial state
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    isOpen: false,
  });

  // COMPUTED VALUES - These are calculated from the current state
  // They automatically update when state changes
  const itemCount = state.items.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const totalPrice = state.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const totalCarbonFootprint = state.items.reduce(
    (total, item) => total + item.carbonFootprint * item.quantity,
    0
  );

  // ACTION FUNCTIONS - These dispatch actions to our reducer
  // Components call these functions to modify the cart

  const addItem = (product: any, quantity: number = 1) => {
    dispatch({ type: "ADD_ITEM", payload: { product, quantity } });
  };

  const removeItem = (productId: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: { productId } });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const openCart = () => {
    dispatch({ type: "OPEN_CART" });
  };

  const closeCart = () => {
    dispatch({ type: "CLOSE_CART" });
  };

  // THE CONTEXT VALUE - This is what components receive when they use useCart()
  const value: CartContextType = {
    // State data
    items: state.items,
    isOpen: state.isOpen,
    itemCount,
    totalPrice,
    totalCarbonFootprint,

    // Action functions
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    openCart,
    closeCart,
  };

  // Provide the context value to all child components
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

/**
 * CUSTOM HOOK - useCart()
 *
 * This is a convenience hook that components use to access cart functionality.
 * It's much cleaner than using useContext(CartContext) everywhere.
 *
 * Usage in a component:
 * const { items, addItem, openCart } = useCart();
 */
export function useCart(): CartContextType {
  const context = useContext(CartContext);

  // Error handling - make sure hook is used within CartProvider
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
}
