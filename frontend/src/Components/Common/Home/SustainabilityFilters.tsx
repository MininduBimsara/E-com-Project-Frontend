import React from "react";
import { motion } from "framer-motion";
import {
  Heart,
  Leaf,
  TreePine,
  Recycle,
  Filter,
  ArrowRight,
} from "lucide-react";

interface SustainabilityFiltersProps {
  selectedFilter: string;
  setSelectedFilter: (filter: string) => void;
}

const SustainabilityFilters: React.FC<SustainabilityFiltersProps> = ({
  selectedFilter,
  setSelectedFilter,
}) => {
  const filters = [
    {
      id: "cruelty-free",
      label: "Cruelty-Free",
      icon: Heart,
      description: "No animal testing involved",
      count: 45,
      gradient: "from-pink-500 to-rose-500",
      bgGradient: "from-pink-50 to-rose-50",
      borderColor: "border-pink-200",
      textColor: "text-pink-700",
    },
    {
      id: "low-carbon",
      label: "Low Carbon Footprint",
      icon: Leaf,
      description: "Minimal environmental impact",
      count: 38,
      gradient: "from-green-500 to-emerald-500",
      bgGradient: "from-green-50 to-emerald-50",
      borderColor: "border-green-200",
      textColor: "text-green-700",
    },
    {
      id: "organic",
      label: "100% Organic",
      icon: TreePine,
      description: "Certified organic materials",
      count: 29,
      gradient: "from-emerald-500 to-teal-500",
      bgGradient: "from-emerald-50 to-teal-50",
      borderColor: "border-emerald-200",
      textColor: "text-emerald-700",
    },
    {
      id: "recycled",
      label: "Recycled Materials",
      icon: Recycle,
      description: "Made from recycled content",
      count: 52,
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50",
      borderColor: "border-blue-200",
      textColor: "text-blue-700",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-green-50/50 to-blue-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Filter className="w-4 h-4 mr-2" />
            Shop by Values
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Shop by
            <span className="block text-green-600">Sustainability</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Find products that align with your values. Filter by eco-credentials
            that matter most to you and your family.
          </p>
        </motion.div>

        {/* Filters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {filters.map((filter, index) => (
            <motion.div
              key={filter.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
              onClick={() => setSelectedFilter(filter.id)}
            >
              <div
                className={`relative overflow-hidden rounded-3xl border-2 transition-all duration-500 ${
                  selectedFilter === filter.id
                    ? `${filter.borderColor} shadow-xl shadow-${
                        filter.gradient.split("-")[1]
                      }-500/25`
                    : "border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-lg"
                }`}
              >
                {/* Background Gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${
                    selectedFilter === filter.id
                      ? filter.bgGradient
                      : "from-white to-gray-50"
                  } transition-all duration-500`}
                ></div>

                {/* Content */}
                <div className="relative p-8 text-center">
                  {/* Icon */}
                  <div
                    className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-6 transition-all duration-300 ${
                      selectedFilter === filter.id
                        ? `bg-gradient-to-br ${filter.gradient} shadow-lg`
                        : "bg-white shadow-sm group-hover:shadow-md"
                    }`}
                  >
                    <filter.icon
                      className={`w-10 h-10 transition-colors duration-300 ${
                        selectedFilter === filter.id
                          ? "text-white"
                          : "text-gray-400 group-hover:text-gray-600"
                      }`}
                    />
                  </div>

                  {/* Label */}
                  <h3
                    className={`text-lg font-bold mb-3 transition-colors duration-300 ${
                      selectedFilter === filter.id
                        ? filter.textColor
                        : "text-gray-900"
                    }`}
                  >
                    {filter.label}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {filter.description}
                  </p>

                  {/* Product Count */}
                  <div
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      selectedFilter === filter.id
                        ? `${filter.textColor} bg-white/50`
                        : "text-gray-500 bg-gray-100"
                    }`}
                  >
                    {filter.count} products
                  </div>

                  {/* Selection Indicator */}
                  {selectedFilter === filter.id && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-4 right-4 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm"
                    >
                      <div
                        className={`w-3 h-3 rounded-full bg-gradient-to-br ${filter.gradient}`}
                      ></div>
                    </motion.div>
                  )}
                </div>

                {/* Hover Effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${filter.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                ></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Selected Filter Info */}
        {selectedFilter !== "all" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 mb-8"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Showing {filters.find((f) => f.id === selectedFilter)?.label}{" "}
                  Products
                </h3>
                <p className="text-gray-600">
                  {filters.find((f) => f.id === selectedFilter)?.count}{" "}
                  eco-friendly products match your criteria
                </p>
              </div>
              <button
                onClick={() => setSelectedFilter("all")}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <span className="text-sm">Clear filter</span>
              </button>
            </div>
          </motion.div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <button className="group bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2 mx-auto">
            <span>View All Filtered Products</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default SustainabilityFilters;
