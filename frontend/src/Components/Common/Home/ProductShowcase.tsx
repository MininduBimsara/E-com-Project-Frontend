import React, { useState } from "react";
import { motion } from "framer-motion";
import { Leaf } from "lucide-react";

const ProductShowcase: React.FC = () => {
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

  return (
    <section className="py-24 bg-gradient-to-br from-gray-100 via-green-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center bg-green-100/80 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
            <Leaf className="w-4 h-4 mr-2" />
            Featured Collection
          </div>
          <h2 className="text-5xl lg:text-6xl font-light text-gray-900 mb-4 tracking-tight">
            Organic Cotton
          </h2>
          <h3 className="text-3xl lg:text-4xl font-light text-green-600 mb-8 tracking-tight">
            Collection
          </h3>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-light">
            Sustainable fashion for conscious living
          </p>
        </motion.div>

        {/* Glass Morphism Product Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative max-w-2xl mx-auto"
          onHoverStart={() => setHoveredProduct(1)}
          onHoverEnd={() => setHoveredProduct(null)}
        >
          {/* Background Blur */}
          <div className="absolute inset-0 bg-white/30 backdrop-blur-xl rounded-3xl border border-white/50 shadow-2xl"></div>

          {/* Product Image Area */}
          <div className="relative p-8">
            <div className="aspect-square bg-gradient-to-br from-green-100/50 to-blue-100/50 rounded-2xl mb-8 flex items-center justify-center backdrop-blur-sm border border-white/30 overflow-hidden">
              {/* Eco Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="absolute top-4 left-4 bg-green-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium"
              >
                Zero Waste
              </motion.div>

              {/* Leaf Icon as placeholder */}
              <motion.div
                animate={{
                  y: hoveredProduct === 1 ? [-5, 5, -5] : [0],
                  rotate: hoveredProduct === 1 ? [0, 2, -2, 0] : [0],
                }}
                transition={{
                  duration: 2,
                  repeat: hoveredProduct === 1 ? Infinity : 0,
                }}
                className="text-green-600/40 text-8xl"
              >
                🌿
              </motion.div>

              {/* Eco Rating */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold"
              >
                A+
              </motion.div>
            </div>

            {/* Product Info */}
            <div className="text-center">
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="text-2xl lg:text-3xl font-light text-gray-900 mb-4"
              >
                Organic Cotton Collection
              </motion.h3>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="text-gray-600 mb-6 font-light leading-relaxed"
              >
                Sustainable fashion for conscious living
              </motion.p>

              {/* Price */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="mb-8"
              >
                <span className="text-4xl font-light text-green-600">
                  Rs. 2,500
                </span>
              </motion.div>

              {/* CTA Button */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-green-600/90 hover:bg-green-600 backdrop-blur-sm text-white px-10 py-4 rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-xl border border-green-500/50"
              >
                ADD TO CART
              </motion.button>
            </div>
          </div>

          {/* Floating Elements */}
          <motion.div
            animate={{ y: [0, -10, 0], rotate: [0, 3, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-2xl backdrop-blur-sm border border-white/30"
          />

          <motion.div
            animate={{ y: [0, 8, 0], rotate: [0, -2, 0] }}
            transition={{ duration: 8, repeat: Infinity, delay: 2 }}
            className="absolute -bottom-6 -left-6 w-12 h-12 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-xl backdrop-blur-sm border border-white/30"
          />
        </motion.div>

        {/* Additional Product Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          {[
            {
              name: "Eco T-Shirt",
              price: 2500,
              rating: "A+",
              category: "Clothing",
            },
            {
              name: "Bamboo Utensils",
              price: 1800,
              rating: "A",
              category: "Kitchen",
            },
            {
              name: "Reusable Bottle",
              price: 3200,
              rating: "A+",
              category: "Accessories",
            },
          ].map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 + 0.8 }}
              className="group cursor-pointer"
            >
              <div className="bg-white/40 backdrop-blur-lg rounded-2xl p-6 border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="aspect-square bg-gradient-to-br from-green-100/50 to-blue-100/50 rounded-xl mb-4 flex items-center justify-center">
                  <span className="text-green-600/40 text-4xl">🌱</span>
                </div>

                <h4 className="font-medium text-gray-900 mb-2">
                  {product.name}
                </h4>
                <p className="text-green-600 font-light mb-2">
                  Rs. {product.price.toLocaleString()}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    {product.category}
                  </span>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      product.rating === "A+"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {product.rating}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
