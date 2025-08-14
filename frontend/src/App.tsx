import "./App.css";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

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

function App() {

const dispatch = useAppDispatch(); // Add this

// Add this useEffect to verify auth on app startup
useEffect(() => {
  console.log("🚀 [App] Verifying authentication on startup");
  dispatch(verifyAuth());
}, [dispatch]);

  return (
    <>
      <Router>
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
              <Route
                path="/payment-flow"
                element={<PaymentFlowDocumentation />}
              />
              <Route path="/cart-flow" element={<CartFlowDiagrams />} />
              {/* Add more routes as needed */}
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
            </Routes>
          </div>

          {/* Cart sidebar - always present, shows when cart is opened */}
          <CartSidebar
            onCheckout={() => {
              // Navigate to checkout page when checkout is clicked
              window.location.href = "/checkout";
            }}
          />

          {/* Auth Debugger - only in development */}
          <AuthDebugger />
        </div>
      </Router>
    </>
  );
}

export default App;
