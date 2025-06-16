import React from "react";
import { motion } from "framer-motion";
import { Leaf, ShoppingBag } from "lucide-react";

const ProductsHero: React.FC = () => {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background with natural texture */}
      <div className="absolute inset-0 bg-gradient-to-b from-green-50 to-emerald-25"></div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width=%2240%22%20height=%2240%22%20viewBox=%220%200%2040%2040%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill=%22none%22%20fill-rule=%22evenodd%22%3E%3Cg%20fill=%22%2334d399%22%20fill-opacity=%220.03%22%3E%3Cpath%20d=%22M20%2020c0-11.046-8.954-20-20-20s-20%208.954-20%2020%208.954%2020%2020%2020%2020-8.954%2020-20z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center text-green-700/60 px-4 py-2 text-sm font-light mb-8 tracking-wider uppercase"
          >
            <ShoppingBag className="w-4 h-4 mr-2" />
            Our Collection
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-8xl md:text-9xl font-light text-green-800 tracking-[0.2em] mb-6"
            style={{
              transform: "none",
              fontSmooth: "always",
              textRendering: "optimizeLegibility",
            }}
          >
            Products
          </motion.h1>

          {/* Subtitle */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-4xl md:text-5xl font-light text-green-600 tracking-wider italic mb-12"
          >
            for sustainable living
          </motion.h2>

          {/* Subtle line */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "6rem" }}
            transition={{ duration: 1, delay: 0.8 }}
            className="h-px bg-green-600/30 mx-auto mb-12"
          />

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="text-lg font-light text-gray-600/80 leading-relaxed max-w-3xl mx-auto mb-16"
          >
            Discover our carefully curated collection of eco-friendly products
            designed for conscious consumers who value quality, sustainability,
            and style. Each item tells a story of environmental responsibility
            and mindful craftsmanship.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-wrap justify-center gap-12 text-center"
          >
            <div className="group">
              <div className="text-3xl lg:text-4xl font-light text-green-700 mb-2">
                150+
              </div>
              <div className="text-sm font-light text-gray-600/80 tracking-wider uppercase">
                Eco Products
              </div>
            </div>
            <div className="w-px h-12 bg-green-600/20 hidden sm:block"></div>
            <div className="group">
              <div className="text-3xl lg:text-4xl font-light text-green-700 mb-2">
                A+
              </div>
              <div className="text-sm font-light text-gray-600/80 tracking-wider uppercase">
                Sustainability Rating
              </div>
            </div>
            <div className="w-px h-12 bg-green-600/20 hidden sm:block"></div>
            <div className="group">
              <div className="text-3xl lg:text-4xl font-light text-green-700 mb-2 flex items-center justify-center">
                <Leaf className="w-6 h-6 mr-2" />
                Carbon Neutral
              </div>
              <div className="text-sm font-light text-gray-600/80 tracking-wider uppercase">
                Shipping
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductsHero;
