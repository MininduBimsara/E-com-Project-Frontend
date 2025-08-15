// CartInitializer.tsx
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../Redux/Store/hook";
import { fetchCart } from "../../../Redux/Thunks/cartThunks";

export default function CartInitializer() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);
  const authLoading = useAppSelector((state) => state.user.loading); // Add this
  const cart = useAppSelector((state) => state.cart.currentCart);
  const lastFetched = useAppSelector((state) => state.cart.lastFetched);

  // console.log("🔄 [CartInitializer] Component rendered");
  // console.log("🔄 [CartInitializer] Auth state:", {
  //   isAuthenticated,
  //   authLoading,
  //   user: !!user,
  // });
  // console.log("🔄 [CartInitializer] User ID:", user?.id || user?._id);

  useEffect(() => {
   // console.log("🔄 [CartInitializer] useEffect triggered");
    const userId = user?.id || user?._id;

    // console.log("🔄 [CartInitializer] Conditions check:", {
    //   isAuthenticated,
    //   userId: userId,
    //   hasCart: !!cart,
    //   authLoading, // Add this to debug
    // });

    // Wait for auth loading to complete, then fetch cart if authenticated
    if (!authLoading && isAuthenticated && userId && !cart) {
      //console.log("✅ [CartInitializer] Fetching cart for user:", userId);
      dispatch(fetchCart(userId));
    } else {
      // console.log("⏭️ [CartInitializer] Skipping cart fetch:", {
      //   authLoading: authLoading ? "still loading" : "loaded",
      //   isAuthenticated: isAuthenticated ? "yes" : "no",
      //   userId: userId ? "present" : "missing",
      //   hasCart: cart ? "yes" : "no",
      // });
    }
  }, [dispatch, isAuthenticated, user?.id, user?._id, cart, authLoading]); // Add authLoading to dependencies

  // Refresh cart data periodically (every 5 minutes) if user is authenticated
  useEffect(() => {
    const userId = user?.id || user?._id;
    if (!isAuthenticated || !userId) return;

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const lastFetch = lastFetched ? new Date(lastFetched).getTime() : 0;
      const fiveMinutes = 5 * 60 * 1000;

      if (now - lastFetch > fiveMinutes) {
      //  console.log("🔄 [CartInitializer] Refreshing cart data...");
        dispatch(fetchCart(userId));
      }
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [dispatch, isAuthenticated, user?.id, user?._id, lastFetched]);

  return null;
}
