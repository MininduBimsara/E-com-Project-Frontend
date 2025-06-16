import React from "react";
import { motion } from "framer-motion";
import Hero from "../../Components/Common/About/Hero";
import OurMission from "../../Components/Common/About/OurMission";
import WhyUs from "../../Components/Common/About/WhyUs";
import HowWeChooseProducts from "../../Components/Common/About/HowWeChooseProducts";
import NavBar from "../../Components/Common/NavBar";
import Footer from "../../Components/Common/Footer";

// Main About Page Component
const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <NavBar />
      <Hero />
      <OurMission />
      <WhyUs />
      <HowWeChooseProducts />
      <Footer />
    </div>
  );
};

export default AboutPage;
