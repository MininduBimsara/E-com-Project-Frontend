// types/cart.ts

/**
 * Represents a single item in the shopping cart
 * This interface defines what data each cart item must have
 */
export interface CartItem {
  id: string; // Unique identifier for the product
  name: string; // Product name
  category: string; // Product category (cloths, kitchen, etc.)
  price: number; // Current price
  originalPrice?: number; // Original price (for discounts)
  image: string; // Product image URL
  quantity: number; // How many of this item in cart
  inStock: boolean; // Whether item is available
  ecoLabel: string; // Sustainability label
  carbonFootprint: number; // Environmental impact
  maxQuantity?: number; // Maximum allowed quantity
}

/**
 * Defines all the cart functions and data available to components
 * This is what components get when they use useCart()
 */
export interface CartContextType {
  // Cart Data
  items: CartItem[]; // Array of all items in cart
  isOpen: boolean; // Whether cart sidebar is open
  itemCount: number; // Total number of items (sum of quantities)
  totalPrice: number; // Total cost of all items
  totalCarbonFootprint: number; // Total environmental impact

  // Cart Actions (functions to modify the cart)
  addItem: (product: any, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
}
