import "./App.css";
import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "./Redux/Store/store";

import Home from "./Pages/Common/HomePage";
import About from "./Pages/Common/About";
import Products from "./Pages/Common/ProductPage";
// import AuthModal from "./Pages/Common/AuthForm";

//flow
import PaymentFlowDocumentation from "./Flow/PaymentFlow";
import CartFlowDiagrams from "./Flow/CartFlow";

// Import the cart system components
import CartSidebar from "./Components/Common/Cart/CartSidebar";
import CartInitializer from "./Components/Common/Cart/CartInitializer";
import AuthDebugger from "./Components/Common/Cart/AuthDebugger";
import CheckoutPage from "./Pages/Common/CheckoutPage";
import Header from "./Components/Common/NavBar";
import ContactPage from "./Pages/Common/ContactPage";

import AdminDashboard from "./Pages/Admin/AdminDashboard";

import { useAppDispatch } from "./Redux/Store/hook";
import { verifyAuth } from "./Redux/Thunks/authThunks";

// Protected Route Component for Admin
const ProtectedAdminRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user, isAuthenticated, loading } = useSelector(
    (state: RootState) => state.user
  );

  console.log("🔍 [ProtectedAdminRoute] Route access check:", {
    isAuthenticated,
    userRole: user?.role,
    loading,
    user: user
      ? { id: user.id, username: user.username, role: user.role }
      : null,
  });

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-25 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-3 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-light tracking-wide">
            Checking permissions...
          </p>
        </div>
      </div>
    );
  }

  // Check if user is authenticated and has admin role
  const isAdmin =
    isAuthenticated &&
    user &&
    (user.role === "admin" || user.role === "super_admin");

  if (!isAdmin) {
    console.log("❌ [ProtectedAdminRoute] Access denied - redirecting to home");
    return <Navigate to="/" replace />;
  }

  console.log("✅ [ProtectedAdminRoute] Access granted to admin dashboard");
  return <>{children}</>;
};

// Create a wrapper component to use useNavigate inside Router context
function AppContent() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Verify auth on app startup
  useEffect(() => {
    console.log("🚀 [App] Verifying authentication on startup");
    dispatch(verifyAuth());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-white">
      {/* Initialize cart when user is authenticated */}
      <CartInitializer />

      {/* Your existing navbar with cart integration */}
      <Header />

      {/* Main content with proper top margin for fixed navbar */}
      <div className="pt-20 lg:pt-24">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/payment-flow" element={<PaymentFlowDocumentation />} />
          <Route path="/cart-flow" element={<CartFlowDiagrams />} />

          {/* Protected Admin Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedAdminRoute>
                <AdminDashboard />
              </ProtectedAdminRoute>
            }
          />

          {/* Add more admin routes here if needed */}
          <Route
            path="/admin/*"
            element={
              <ProtectedAdminRoute>
                <AdminDashboard />
              </ProtectedAdminRoute>
            }
          />
        </Routes>
      </div>

      {/* Cart sidebar - always present, shows when cart is opened */}
      <CartSidebar
        onCheckout={() => {
          // Use React Router navigation instead of window.location
          console.log(
            "🛒 [App] Custom onCheckout called, navigating to /checkout"
          );
          navigate("/checkout");
        }}
      />

      {/* Auth Debugger - only in development */}
      <AuthDebugger />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
