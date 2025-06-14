import React from "react";
import { motion } from "framer-motion";
import HeroSection from "../../Components/Common/Home/HeroSection";
import FeaturedProducts from "../../Components/Common/Home/FeaturedProducts";
import ProductCategories from "../../Components/Common/Home/ProductCategories";
import ProductShowcase from "../../Components/Common/Home/ProductShowcase";
import NavBar from "../../Components/Common/NavBar";
import Footer from "../../Components/Common/Footer";

// Main Home Page Component
const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <NavBar />
      <HeroSection />
      <ProductCategories />
      <FeaturedProducts />
      <ProductShowcase />
      <Footer />
    </div>
  );
};

export default HomePage;
