import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Leaf, Award } from "lucide-react";

interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  rating: string;
  ecoLabel: string;
  carbonFootprint: number;
  category: string;
  isNew?: boolean;
  isPopular?: boolean;
  description: string;
  image: string;
}

const FeaturedProducts: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Products" },
    { id: "clothing", name: "Clothing" },
    { id: "kitchen", name: "Kitchen" },
    { id: "accessories", name: "Accessories" },
  ];

  const products: Product[] = [
    {
      id: "1",
      title: "Organic Cotton T-Shirt",
      price: 2500,
      originalPrice: 3200,
      rating: "A+",
      ecoLabel: "Organic Cotton",
      carbonFootprint: 1.2,
      category: "clothing",
      isPopular: true,
      description:
        "Premium organic cotton tee made from sustainable farming practices",
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "2",
      title: "Bamboo Kitchen Utensil Set",
      price: 1800,
      rating: "A",
      ecoLabel: "Zero Waste",
      carbonFootprint: 0.8,
      category: "kitchen",
      isNew: true,
      description: "Complete bamboo utensil set for plastic-free cooking",
      image:
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "3",
      title: "Eco-Friendly Water Bottle",
      price: 3200,
      originalPrice: 4000,
      rating: "A+",
      ecoLabel: "Recycled Materials",
      carbonFootprint: 0.5,
      category: "accessories",
      description: "Stainless steel bottle made from 90% recycled materials",
      image:
        "https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
  ];

  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter((product) => product.category === activeCategory);

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background with natural texture */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-green-25 to-emerald-50"></div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width=%2240%22%20height=%2240%22%20viewBox=%220%200%2040%2040%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill=%22none%22%20fill-rule=%22evenodd%22%3E%3Cg%20fill=%22%2334d399%22%20fill-opacity=%220.03%22%3E%3Cpath%20d=%22M20%2020c0-11.046-8.954-20-20-20s-20%208.954-20%2020%208.954%2020%2020%2020%2020-8.954%2020-20z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20 transform-none"
          style={{ transform: "none" }}
        >
          <div className="inline-flex items-center text-green-700/60 px-4 py-2 text-sm font-light mb-8 tracking-wider">
            <Award className="w-4 h-4 mr-2" />
            CUSTOMER FAVORITES
          </div>

          <h2 className="text-6xl lg:text-8xl font-light text-green-800 tracking-wider mb-4 transform-none">
            Featured
          </h2>
          <h3 className="text-4xl lg:text-6xl font-light text-green-600 tracking-wider mb-8 transform-none">
            Products
          </h3>

          <div className="w-24 h-px bg-green-600/30 mx-auto mb-8"></div>

          <p className="text-lg text-gray-600/80 max-w-2xl mx-auto font-light leading-relaxed">
            Discover our most popular eco-friendly products, carefully selected
            for their sustainability and quality.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-8 mb-20 transform-none"
          style={{ transform: "none" }}
        >
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              onClick={() => setActiveCategory(category.id)}
              className={`relative group transition-all duration-500 ${
                activeCategory === category.id
                  ? "text-green-700"
                  : "text-green-600/60 hover:text-green-700"
              }`}
            >
              <span className="text-2xl lg:text-3xl font-light tracking-wider">
                {category.name}
              </span>
              <div
                className={`absolute inset-0 border-b top-1/2 transition-all duration-500 ${
                  activeCategory === category.id
                    ? "border-green-700/40"
                    : "border-green-600/20 group-hover:border-green-700/30"
                }`}
              ></div>
            </motion.button>
          ))}
        </motion.div>

        {/* Products Display */}
        <div className="space-y-16">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group relative"
            >
              {/* Product Line */}
              <div className="relative py-12 border-b border-green-600/10">
                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
                  {/* Product Image */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    className="w-full lg:w-80 h-64 lg:h-80 rounded-2xl overflow-hidden bg-gradient-to-br from-green-100/50 to-blue-100/50 relative group/image"
                  >
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover/image:scale-110 transition-transform duration-700"
                    />

                    {/* Image Overlay with Badges */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-300" />

                    {/* Eco Rating Badge */}
                    <div className="absolute top-4 right-4">
                      <div
                        className={`px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm ${
                          product.rating === "A+"
                            ? "bg-green-600/90 text-white"
                            : product.rating === "A"
                            ? "bg-green-500/90 text-white"
                            : "bg-yellow-500/90 text-white"
                        }`}
                      >
                        {product.rating}
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
                    {/* Badges */}
                    <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-4">
                      {product.isNew && (
                        <span className="bg-green-600/10 text-green-700 px-3 py-1 text-xs font-light tracking-wider">
                          NEW
                        </span>
                      )}
                      {product.isPopular && (
                        <span className="bg-amber-500/10 text-amber-700 px-3 py-1 text-xs font-light tracking-wider">
                          POPULAR
                        </span>
                      )}
                      <span className="bg-green-600/10 text-green-700 px-3 py-1 text-xs font-light tracking-wider">
                        {product.ecoLabel}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-3xl lg:text-4xl font-light text-gray-900 mb-4 tracking-wide group-hover:text-green-600 transition-colors duration-500">
                      {product.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600/80 font-light mb-6 leading-relaxed max-w-lg">
                      {product.description}
                    </p>

                    {/* Price */}
                    <div className="mb-6">
                      <div className="text-3xl lg:text-4xl font-light text-green-600 mb-1">
                        Rs. {product.price.toLocaleString()}
                      </div>
                      {product.originalPrice && (
                        <div className="text-sm text-gray-400 line-through font-light">
                          Rs. {product.originalPrice.toLocaleString()}
                        </div>
                      )}
                    </div>

                    {/* Action Button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-transparent border border-green-600/40 text-green-700 px-8 py-3 font-light tracking-[0.1em] text-sm hover:bg-green-600 hover:text-white transition-all duration-500"
                    >
                      ADD TO CART
                    </motion.button>
                  </div>
                </div>

                {/* Hover Line Effect */}
                <div className="absolute bottom-0 left-0 w-0 h-px bg-green-600 group-hover:w-full transition-all duration-700"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-20"
        >
          <button className="group bg-transparent border-2 border-green-700/60 text-green-700 px-12 py-4 font-light tracking-[0.2em] text-sm hover:bg-green-700 hover:text-white transition-all duration-500 uppercase flex items-center mx-auto">
            <span>View All Products</span>
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
