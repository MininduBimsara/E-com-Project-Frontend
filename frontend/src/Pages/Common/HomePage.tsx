import React, { useState } from "react";
import { motion } from "framer-motion";
import HeroSection from "../../Components/Common/Home/HeroSection";
import EcoImpactDashboard from "../../Components/Common/Home/EcoImpactDashboard";
import SustainabilityFilters from "../../Components/Common/Home/SustainabilityFilters";
import FeaturedProducts from "../../Components/Common/Home/FeaturedProducts";
import WhyChooseUs from "../../Components/Common/Home/WhyChooseUs";
import ProductCategories from "../../Components/Common/Home/ProductCategories";
import ProductShowcase from "../../Components/Common/Home/ProductShowcase";
// import NewsletterSection from "./components/NewsletterSection";

// Main Home Page Component
const HomePage: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");

  return (
    <div className="min-h-screen">
      <HeroSection />
      <EcoImpactDashboard />
      <FeaturedProducts />
      <ProductCategories />
      <ProductShowcase />
      <SustainabilityFilters
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
      />
      <WhyChooseUs />

      {/* <
      
      <NewsletterSection />  */}
    </div>
  );
};

export default HomePage;
