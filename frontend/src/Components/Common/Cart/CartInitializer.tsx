// CartInitializer.tsx
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../Redux/Store/hook';
import { fetchCart } from '../../../Redux/Thunks/cartThunks';

/**
 * Component that initializes the cart when user is authenticated
 * This ensures the cart is loaded from the backend when the app starts
 */
export default function CartInitializer() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user.user);
  const isAuthenticated = useAppSelector(state => state.user.isAuthenticated);
  const cart = useAppSelector(state => state.cart.currentCart);
  const lastFetched = useAppSelector(state => state.cart.lastFetched);

  useEffect(() => {
    // Only fetch cart if user is authenticated and we don't have cart data
    if (isAuthenticated && user?.id && !cart) {
      console.log('Initializing cart for user:', user.id);
      dispatch(fetchCart(user.id));
    }
  }, [dispatch, isAuthenticated, user?.id, cart]);

  // Refresh cart data periodically (every 5 minutes) if user is authenticated
  useEffect(() => {
    if (!isAuthenticated || !user?.id) return;

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const lastFetch = lastFetched ? new Date(lastFetched).getTime() : 0;
      const fiveMinutes = 5 * 60 * 1000;

      if (now - lastFetch > fiveMinutes) {
        console.log('Refreshing cart data...');
        dispatch(fetchCart(user.id));
      }
    }, 5 * 60 * 1000); // Check every 5 minutes

    return () => clearInterval(interval);
  }, [dispatch, isAuthenticated, user?.id, lastFetched]);

  // This component doesn't render anything
  return null;
}
