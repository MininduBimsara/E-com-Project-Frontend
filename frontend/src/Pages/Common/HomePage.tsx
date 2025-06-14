import React, { useState } from "react";
import { motion } from "framer-motion";
import HeroSection from "../../Components/Common/Home/HeroSection";
import FeaturedProducts from "../../Components/Common/Home/FeaturedProducts";
import ProductCategories from "../../Components/Common/Home/ProductCategories";
import ProductShowcase from "../../Components/Common/Home/ProductShowcase";
import NavBar from "../../Components/Common/NavBar";
import Footer from "../../Components/Common/Footer";

// Main Home Page Component
const HomePage: React.FC = () => {
  const [cartItemCount, setCartItemCount] = useState(3);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleCartClick = () => {
    console.log("Cart clicked");
  };

  const handleLoginClick = () => {
    setIsLoggedIn(true);
  };

  const handleLogoutClick = () => {
    setIsLoggedIn(false);
  };

  const handleProfileClick = () => {
    console.log("Profile clicked");
  };

  return (
    <div className="min-h-screen">
      <NavBar
        cartItemCount={cartItemCount}
        isLoggedIn={isLoggedIn}
        userName="Kamal Perera"
        onCartClick={handleCartClick}
        onLoginClick={handleLoginClick}
        onLogoutClick={handleLogoutClick}
        onProfileClick={handleProfileClick}
      />
      <HeroSection />
      <ProductCategories />
      <FeaturedProducts />
      <ProductShowcase />
      <Footer />
    </div>
  );
};

export default HomePage;
