import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./Pages/Common/HomePage";
import About from "./Pages/Common/About";
import Products from "./Pages/Common/ProductPage";
// import AuthModal from "./Pages/Common/AuthForm";

// Import the cart system components
import { CartProvider } from "./Context/CartContext";
import CartSidebar from "./Components/Common/Cart/CartSidebar";
import CheckoutPage from "./Pages/Common/CheckoutPage";
import Header from "./Components/Common/NavBar";
import ContactPage from "./Pages/Common/ContactPage";

import AdminDashboard from "./Pages/Admin/AdminDashboard";

function App() {
  return (
    <>
      <CartProvider>
        <Router>
          <div className="min-h-screen bg-white">
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
          </div>
        </Router>
      </CartProvider>
    </>
  );
}

export default App;
