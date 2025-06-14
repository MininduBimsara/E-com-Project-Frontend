import React, { useState } from "react";
import { motion } from "framer-motion";
import HeroSection from "../../Components/Common/Home/HeroSection";
// import EcoImpactDashboard from "../../Components/Common/Home/EcoImpactDashboard";
// import SustainabilityFilters from "../../Components/Common/Home/SustainabilityFilters";
import FeaturedProducts from "../../Components/Common/Home/FeaturedProducts";
// import WhyChooseUs from "../../Components/Common/Home/WhyChooseUs";
import ProductCategories from "../../Components/Common/Home/ProductCategories";
import ProductShowcase from "../../Components/Common/Home/ProductShowcase";
import NavBar from "../../Components/Common/NavBar";

// Main Home Page Component
const HomePage: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");
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
      {/* <SustainabilityFilters
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
      /> */}
      {/* <EcoImpactDashboard /> */}
      {/* <WhyChooseUs /> */}
    </div>
  );
};

export default HomePage;
