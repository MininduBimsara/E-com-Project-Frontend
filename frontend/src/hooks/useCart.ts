// hooks/useCart.ts
import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../Redux/Store/hook';
import { 
  openCart, 
  closeCart, 
  updateLocalQuantity, 
  removeLocalItem 
} from '../Redux/Slicers/cartSlice';
import { 
  addToCart, 
  updateCartItemQuantity, 
  removeFromCart, 
  clearCartItems,
  fetchCart 
} from '../Redux/Thunks/cartThunks';
import type { Product } from '../Types/cart';
import type { CartContextType, CartItem } from '../Types/cart';

/**
 * Custom hook that provides the same interface as the old context-based cart
 * but uses Redux under the hood for backend persistence
 */
export function useCart(): CartContextType {
  const dispatch = useAppDispatch();
  
  // Get cart state from Redux
  const cart = useAppSelector(state => state.cart.currentCart);
  const isOpen = useAppSelector(state => state.cart.isOpen);
  const user = useAppSelector(state => state.user.user);
  
  // Transform Redux cart data to match the old context interface
  const items: CartItem[] = cart?.items?.map(item => ({
    id: item.productId,
    name: item.product?.name || 'Unknown Product',
    category: item.product?.category || 'Unknown',
    price: item.priceAtAdd,
    originalPrice: item.product?.price,
    image: item.product?.images?.[0] || '',
    quantity: item.quantity,
    inStock: item.product?.isActive || false,
    ecoLabel: item.product?.ecoLabel || 'Eco-Friendly',
    carbonFootprint: item.product?.carbonFootprint || 0,
    maxQuantity: item.product?.stock || 10
  })) || [];
  
  const itemCount = cart?.totalItems || 0;
  const totalPrice = cart?.total || 0;
  const totalCarbonFootprint = items.reduce(
    (total, item) => total + item.carbonFootprint * item.quantity, 
    0
  );
  
  // Cart actions
  const addItem = useCallback((product: Product, quantity: number = 1) => {
    if (!user?.id) {
      console.error('User not authenticated');
      return;
    }
    
    dispatch(addToCart({ 
      userId: user.id, 
      productId: product.id, 
      quantity 
    }));
  }, [dispatch, user?.id]);
  
  const removeItem = useCallback((productId: string) => {
    if (!user?.id) {
      console.error('User not authenticated');
      return;
    }
    
    dispatch(removeFromCart({ 
      userId: user.id, 
      productId 
    }));
  }, [dispatch, user?.id]);
  
  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (!user?.id) {
      console.error('User not authenticated');
      return;
    }
    
    if (quantity <= 0) {
      dispatch(removeFromCart({ 
        userId: user.id, 
        productId 
      }));
    } else {
      dispatch(updateCartItemQuantity({ 
        userId: user.id, 
        productId, 
        quantity 
      }));
    }
  }, [dispatch, user?.id]);
  
  const clearCart = useCallback(() => {
    if (!user?.id) {
      console.error('User not authenticated');
      return;
    }
    
    dispatch(clearCartItems(user.id));
  }, [dispatch, user?.id]);
  
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
    closeCart: closeCartAction
  };
}
