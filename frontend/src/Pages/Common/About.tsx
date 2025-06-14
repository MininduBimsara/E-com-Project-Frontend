import React, { useState } from "react";
import { motion } from "framer-motion";
import Hero from "../../Components/Common/About/Hero";
import OurMission from "../../Components/Common/About/OurMission";
import WhyUs from "../../Components/Common/About/WhyUs";
import HowWeChooseProducts from "../../Components/Common/About/HowWeChooseProducts";
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
      <Hero />
      <OurMission />
      <WhyUs />
      <HowWeChooseProducts />
      <Footer />
    </div>
  );
};

export default HomePage;
