import React, { useState } from "react";
import { motion } from "framer-motion";
import { Leaf, ArrowRight } from "lucide-react";

const ProductShowcase: React.FC = () => {
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

  const showcaseProducts = [
    {
      id: 1,
      name: "Organic Cotton",
      subtitle: "Collection",
      price: 2500,
      description: "Sustainable fashion for conscious living",
      ecoRating: "A+",
      carbonFootprint: 1.2,
      category: "Clothing",
      icon: "🌿",
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 2,
      name: "Bamboo Kitchen",
      subtitle: "Essentials",
      price: 1800,
      description: "Zero-waste cooking solutions",
      ecoRating: "A",
      carbonFootprint: 0.8,
      category: "Kitchen",
      icon: "🎋",
      image:
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 3,
      name: "Eco Water",
      subtitle: "Bottles",
      price: 3200,
      description: "Hydration with purpose",
      ecoRating: "A+",
      carbonFootprint: 0.5,
      category: "Accessories",
      icon: "💧",
      image:
        "https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background with natural texture */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-25 to-teal-50"></div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-15">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width=%2260%22%20height=%2260%22%20viewBox=%220%200%2060%2060%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill=%22none%22%20fill-rule=%22evenodd%22%3E%3Cg%20fill=%22%2310b981%22%20fill-opacity=%220.04%22%3E%3Ccircle%20cx=%2230%22%20cy=%2230%22%20r=%2230%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center text-green-700/60 px-4 py-2 text-sm font-light mb-8 tracking-wider">
            <Leaf className="w-4 h-4 mr-2" />
            FEATURED COLLECTION
          </div>

          <h2
            className="text-6xl lg:text-8xl font-light text-green-800 tracking-wider mb-4"
            style={{
              transform: "none",
              fontSmooth: "always",
              textRendering: "optimizeLegibility",
            }}
          >
            Showcase
          </h2>
          <h3
            className="text-4xl lg:text-6xl font-light text-green-600 tracking-wider italic mb-8"
            style={{
              transform: "none",
              fontSmooth: "always",
              textRendering: "optimizeLegibility",
            }}
          >
            Products
          </h3>

          <div className="w-24 h-px bg-green-600/30 mx-auto mb-8"></div>
        </motion.div>

        {/* Product Showcase Lines */}
        <div className="space-y-8 mb-20">
          {showcaseProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group relative cursor-pointer"
              onHoverStart={() => setHoveredProduct(product.id)}
              onHoverEnd={() => setHoveredProduct(null)}
            >
              {/* Product Line */}
              <div className="relative py-8 border-b border-green-600/10">
                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
                  {/* Product Image */}
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.3 }}
                    className="w-full lg:w-72 h-56 lg:h-72 rounded-2xl overflow-hidden bg-gradient-to-br from-green-100/50 to-blue-100/50 relative group/image"
                  >
                    <img
                      src={product.image}
                      alt={`${product.name} ${product.subtitle}`}
                      className="w-full h-full object-cover group-hover/image:scale-110 transition-transform duration-700"
                    />

                    {/* Image Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-300" />

                    {/* Icon Overlay */}
                    <motion.div
                      animate={{
                        scale:
                          hoveredProduct === product.id ? [1, 1.2, 1] : [1],
                        rotate:
                          hoveredProduct === product.id ? [0, 10, -10, 0] : [0],
                      }}
                      transition={{ duration: 0.8 }}
                      className="absolute top-4 left-4 text-2xl bg-white/90 backdrop-blur-sm rounded-full w-12 h-12 flex items-center justify-center shadow-lg"
                    >
                      {product.icon}
                    </motion.div>

                    {/* Eco Rating Badge */}
                    <div className="absolute top-4 right-4">
                      <div
                        className={`px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm ${
                          product.ecoRating === "A+"
                            ? "bg-green-600/90 text-white"
                            : "bg-yellow-500/90 text-white"
                        }`}
                      >
                        {product.ecoRating}
                      </div>
                    </div>

                    {/* Carbon Footprint */}
                    <div className="absolute bottom-4 left-4">
                      <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-700 flex items-center">
                        <Leaf className="w-3 h-3 mr-1 text-green-600" />
                        {product.carbonFootprint}kg CO₂
                      </div>
                    </div>
                  </motion.div>

                  {/* Product Info */}
                  <div className="flex-1 text-center lg:text-left">
                    <div className="mb-4">
                      <h3 className="text-3xl lg:text-4xl font-light text-gray-900 tracking-wide group-hover:text-green-600 transition-colors duration-500">
                        {product.name}
                      </h3>
                      <p className="text-xl lg:text-2xl font-light text-green-600 italic tracking-wide">
                        {product.subtitle}
                      </p>
                    </div>

                    <p className="text-gray-600/80 font-light mb-6 leading-relaxed max-w-lg">
                      {product.description}
                    </p>

                    {/* Eco Info */}
                    <div className="flex items-center justify-center lg:justify-start gap-4 text-sm text-gray-500 mb-6">
                      <span className="text-gray-400">|</span>
                      <span>{product.category}</span>
                    </div>

                    {/* Price */}
                    <div className="text-3xl lg:text-4xl font-light text-green-600 mb-6">
                      Rs. {product.price.toLocaleString()}
                    </div>

                    {/* Action Button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-transparent border border-green-600/40 text-green-700 px-8 py-3 font-light tracking-[0.1em] text-sm hover:bg-green-600 hover:text-white transition-all duration-500 group/btn"
                    >
                      <span>ADD TO CART</span>
                      <ArrowRight className="w-4 h-4 ml-2 inline group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </motion.button>
                  </div>
                </div>

                {/* Hover Line Effect */}
                <motion.div
                  className="absolute bottom-0 left-0 h-px bg-green-600"
                  initial={{ width: "0%" }}
                  animate={{
                    width: hoveredProduct === product.id ? "100%" : "0%",
                  }}
                  transition={{ duration: 0.7 }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Products Grid - Minimal Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-16"
        >
          <h4 className="text-2xl font-light text-gray-700 text-center mb-12 tracking-wider">
            MORE PRODUCTS
          </h4>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Eco T-Shirt",
                price: 2500,
                rating: "A+",
                category: "Clothing",
                icon: "👕",
              },
              {
                name: "Bamboo Utensils",
                price: 1800,
                rating: "A",
                category: "Kitchen",
                icon: "🥄",
              },
              {
                name: "Reusable Bottle",
                price: 3200,
                rating: "A+",
                category: "Accessories",
                icon: "🍃",
              },
            ].map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.8 }}
                className="group cursor-pointer border-b border-green-600/10 pb-6 hover:border-green-600/30 transition-all duration-500"
              >
                <div className="text-center">
                  <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {product.icon}
                  </div>

                  <h5 className="font-light text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                    {product.name}
                  </h5>

                  <p className="text-green-600 font-light mb-2">
                    Rs. {product.price.toLocaleString()}
                  </p>

                  <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                    <span>{product.category}</span>
                    <span>•</span>
                    <span
                      className={`px-2 py-1 ${
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
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center"
        >
          <button className="group bg-transparent border-2 border-green-700/60 text-green-700 px-12 py-4 font-light tracking-[0.2em] text-sm hover:bg-green-700 hover:text-white transition-all duration-500 uppercase">
            <span>EXPLORE COLLECTION</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductShowcase;
