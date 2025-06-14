import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent z-10"></div>
        <img
          src="./hero.jpg"
          alt="Sustainable Products"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center bg-green-600/20 backdrop-blur-sm border border-green-400/30 rounded-full px-4 py-2 mb-6"
            >
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
              <span className="text-green-300 text-sm font-medium">
                Sustainable Living Made Simple
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl lg:text-7xl font-bold mb-6 leading-tight"
            >
              Shop
              <span className="block text-green-400">Sustainably</span>
              <span className="block text-xl lg:text-2xl font-normal text-gray-300 mt-2">
                Live Consciously
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg lg:text-xl text-gray-200 mb-8 max-w-lg leading-relaxed"
            >
              Discover curated eco-friendly products that make a difference.
              Join thousands of conscious consumers creating positive impact.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button className="group bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 hover:scale-105">
                <span>Explore Products</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button className="group border-2 border-white/30 hover:border-white/50 text-white px-8 py-4 rounded-2xl font-semibold backdrop-blur-sm hover:bg-white/10 transition-all duration-300 flex items-center justify-center space-x-2">
                <Play className="w-5 h-5" />
                <span>Watch Story</span>
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex items-center space-x-8 mt-12"
            >
              <div>
                <div className="text-2xl font-bold text-green-400">1,250+</div>
                <div className="text-sm text-gray-300">Happy Customers</div>
              </div>
              <div className="w-px h-12 bg-white/20"></div>
              <div>
                <div className="text-2xl font-bold text-green-400">4.8t</div>
                <div className="text-sm text-gray-300">CO₂ Offset</div>
              </div>
              <div className="w-px h-12 bg-white/20"></div>
              <div>
                <div className="text-2xl font-bold text-green-400">100%</div>
                <div className="text-sm text-gray-300">Eco-Certified</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Product Showcase */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            {/* Main Product Card */}
            <div className="relative">
              {/* <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl"
              >
                <div className="w-full h-80 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-2xl mb-6 flex items-center justify-center">
                  <div className="text-white/60 text-6xl">🌿</div>
                </div>
                <div className="text-white">
                  <h3 className="text-xl font-semibold mb-2">
                    Organic Cotton Collection
                  </h3>
                  <p className="text-gray-300 text-sm mb-4">
                    Sustainable fashion for conscious living
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-green-400">
                      Rs. 2,500
                    </span>
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">
                      A+
                    </span>
                  </div>
                </div>
              </motion.div> */}

              {/* Floating Elements */}
              <motion.div
                animate={{ y: [0, 15, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute -top-4 -left-4 bg-green-500/20 backdrop-blur-sm rounded-2xl p-4 border border-green-400/30"
              >
                <div className="text-green-300 text-sm font-medium">
                  Zero Waste
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, -12, 0], rotate: [0, -3, 0] }}
                transition={{ duration: 6, repeat: Infinity, delay: 2 }}
                className="absolute -bottom-4 -right-4 bg-blue-500/20 backdrop-blur-sm rounded-2xl p-4 border border-blue-400/30"
              >
                <div className="text-blue-300 text-sm font-medium">
                  Carbon Neutral
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60"
      >
        <div className="flex flex-col items-center space-y-2">
          <span className="text-sm">Scroll to explore</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/60 to-transparent"></div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
