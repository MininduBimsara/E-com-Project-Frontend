// Option 1: Fix ProductsFilter.tsx to use lowercase IDs (Recommended)

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, X } from "lucide-react";

interface FilterProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

const ProductsFilter: React.FC<FilterProps> = ({
  activeCategory,
  onCategoryChange,
  searchTerm,
  onSearchChange,
}) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // FIXED: Use lowercase IDs to match the transformed frontend products
  const categories = [
    { id: "all", name: "All Products", count: 150 },
    { id: "cloths", name: "Cloths", count: 45 }, // lowercase id
    { id: "kitchen", name: "Kitchen", count: 38 }, // lowercase id
    { id: "accessories", name: "Accessories", count: 32 }, // lowercase id
  ];

  const clearSearch = () => {
    onSearchChange("");
  };

  return (
    <section className="relative py-20 bg-white/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filter Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center text-green-700/60 px-4 py-2 text-sm font-light mb-6 tracking-wider uppercase">
            <Filter className="w-4 h-4 mr-2" />
            Filter & Search
          </div>

          <h3 className="text-3xl lg:text-4xl font-light text-green-800 tracking-wider mb-8">
            Find Your Perfect
          </h3>
          <div className="text-2xl lg:text-3xl font-light text-green-600 italic tracking-wider">
            Sustainable Choice
          </div>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl mx-auto mb-16"
        >
          <div className="relative">
            <div
              className={`relative backdrop-blur-xl bg-white/90 border rounded-2xl transition-all duration-500 ${
                isSearchFocused
                  ? "border-green-600/40 shadow-lg shadow-green-100/50"
                  : "border-white/20 hover:border-green-600/20"
              }`}
            >
              <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-600/60" />

              <input
                type="text"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                placeholder="Search sustainable products..."
                className="w-full pl-14 pr-14 py-4 bg-transparent font-light text-gray-800 placeholder-gray-500/60 focus:outline-none text-lg tracking-wide"
              />

              {searchTerm && (
                <button
                  onClick={clearSearch}
                  className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-green-600 transition-colors duration-300"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Search Results Count */}
            {searchTerm && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mt-4 text-sm font-light text-gray-600/80 tracking-wide"
              >
                Searching for "{searchTerm}"
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-8 lg:gap-12"
        >
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 * index }}
              onClick={() => onCategoryChange(category.id)}
              className={`relative group transition-all duration-500 ${
                activeCategory === category.id
                  ? "text-green-700"
                  : "text-green-600/60 hover:text-green-700"
              }`}
            >
              <div className="text-center">
                {/* Category Name */}
                <span className="block text-xl lg:text-2xl font-light tracking-wider mb-1">
                  {category.name}
                </span>

                {/* Product Count */}
                <span className="block text-xs font-light tracking-[0.15em] uppercase opacity-70">
                  {category.count} items
                </span>
              </div>

              {/* Active Indicator Line */}
              <div
                className={`absolute -bottom-2 left-0 right-0 h-px transition-all duration-500 ${
                  activeCategory === category.id
                    ? "bg-green-700/40"
                    : "bg-green-600/20 group-hover:bg-green-700/30"
                }`}
              />

              {/* Hover Effect Background */}
              <div
                className={`absolute inset-0 -z-10 rounded-lg transition-all duration-500 ${
                  activeCategory === category.id
                    ? "bg-green-50/50"
                    : "bg-transparent group-hover:bg-green-50/30"
                }`}
                style={{ margin: "-0.5rem" }}
              />
            </motion.button>
          ))}
        </motion.div>

        {/* Active Filter Display */}
        {(activeCategory !== "all" || searchTerm) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap justify-center items-center gap-4 mt-12 pt-8 border-t border-green-600/10"
          >
            <span className="text-sm font-light text-gray-600/80 tracking-wider">
              Active filters:
            </span>

            {activeCategory !== "all" && (
              <div className="inline-flex items-center bg-green-100/80 text-green-700 px-4 py-2 rounded-full text-sm font-light tracking-wide">
                {categories.find((c) => c.id === activeCategory)?.name}
                <button
                  onClick={() => onCategoryChange("all")}
                  className="ml-2 hover:text-green-800 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}

            {searchTerm && (
              <div className="inline-flex items-center bg-green-100/80 text-green-700 px-4 py-2 rounded-full text-sm font-light tracking-wide">
                "{searchTerm}"
                <button
                  onClick={clearSearch}
                  className="ml-2 hover:text-green-800 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ProductsFilter;
