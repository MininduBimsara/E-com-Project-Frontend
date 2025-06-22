import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Leaf } from "lucide-react";

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30 z-10"></div>
        <img
          src="./hero.jpg"
          alt="Sustainable Products"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Background Pattern Overlay */}
      <div className="absolute inset-0 z-15 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width=%2260%22%20height=%2260%22%20viewBox=%220%200%2060%2060%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill=%22none%22%20fill-rule=%22evenodd%22%3E%3Cg%20fill=%22%23ffffff%22%20fill-opacity=%220.03%22%3E%3Ccircle%20cx=%2230%22%20cy=%2230%22%20r=%2230%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      </div>


      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center min-h-[calc(100vh-10rem)] flex flex-col justify-center">
          {/* Badge */}
          {/* <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center text-white/60 px-4 py-2 text-sm font-light mb-12 tracking-wider"
          >
            <Leaf className="w-4 h-4 mr-2" />
            SUSTAINABLE LIVING MADE SIMPLE
          </motion.div> */}

          {/* Hero Typography */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8 mb-16"
          >
            {/* Main Headline */}
            <div className="relative">
              <h1 className="text-6xl lg:text-9xl font-light text-white tracking-wider">
                Shop
              </h1>
              <div className="absolute inset-0 border-b border-white/10 top-1/2"></div>
            </div>

            {/* Subtitle */}
            <div className="relative">
              <h2 className="text-4xl lg:text-7xl font-light text-green-400 tracking-wider italic">
                Sustainably
              </h2>
              <div className="absolute inset-0 border-b border-green-400/20 top-1/2"></div>
            </div>

            {/* Tagline */}
            <div className="relative">
              <h3 className="text-3xl lg:text-5xl font-light text-white/80 tracking-wider">
                Live Consciously
              </h3>
              <div className="absolute inset-0 border-b border-white/5 top-1/2"></div>
            </div>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-12"
          >
            <div className="w-24 h-px bg-white/30 mx-auto mb-8"></div>
            <p className="text-lg lg:text-xl text-white/70 max-w-2xl mx-auto font-light leading-relaxed">
              Discover curated eco-friendly products that make a difference.
              Join thousands of conscious consumers creating positive impact.
            </p>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-10"
          >
            <button className="group bg-transparent border-2 border-white/40 text-white px-12 py-4 font-light tracking-[0.2em] text-sm hover:bg-white hover:text-gray-900 transition-all duration-500 uppercase flex items-center mx-auto backdrop-blur-sm">
              <span>Explore Products</span>
              <ArrowRight className="w-4 h-4 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            {[
              { value: "1,250+", label: "Happy Customers" },
              { value: "4.8t", label: "CO₂ Offset" },
              { value: "100%", label: "Eco-Certified" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 + index * 0.1 }}
                className="group text-center border-b border-white/10 pb-2 hover:border-green-400/30 transition-all duration-500"
              >
                <div className="text-3xl lg:text-4xl font-light text-green-400 mb-2 group-hover:text-green-300 transition-colors">
                  {stat.value}
                </div>
                <div className="text-sm text-white/60 font-light tracking-wider uppercase">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      {/* <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-16 left-1/2 transform -translate-x-1/2 text-white/40 z-20"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center space-y-2"
        >
          <span className="text-xs font-light tracking-wider uppercase">
            Scroll to explore
          </span>
          <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent"></div>
        </motion.div>
      </motion.div> */}

      {/* Decorative Elements */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-green-400/30 rounded-full z-15"
      />
    </section>
  );
};

export default HeroSection;
