import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Star,
  ShoppingBag,
  Heart,
  ArrowRight,
  Leaf,
  Award,
} from "lucide-react";

interface Product {
  id: string;
  image: string;
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
}

const FeaturedProducts: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [likedProducts, setLikedProducts] = useState<string[]>([]);

  const categories = [
    { id: "all", name: "All Products", count: 12 },
    { id: "clothing", name: "Clothing", count: 5 },
    { id: "kitchen", name: "Kitchen", count: 4 },
    { id: "accessories", name: "Accessories", count: 3 },
  ];

  const products: Product[] = [
    {
      id: "1",
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
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
    },
    {
      id: "2",
      image:
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Bamboo Kitchen Utensil Set",
      price: 1800,
      rating: "A",
      ecoLabel: "Zero Waste",
      carbonFootprint: 0.8,
      category: "kitchen",
      isNew: true,
      description: "Complete bamboo utensil set for plastic-free cooking",
    },
    {
      id: "3",
      image:
        "https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Eco-Friendly Water Bottle",
      price: 3200,
      originalPrice: 4000,
      rating: "A+",
      ecoLabel: "Recycled Materials",
      carbonFootprint: 0.5,
      category: "accessories",
      description: "Stainless steel bottle made from 90% recycled materials",
    },
  ];

  const toggleLike = (productId: string) => {
    setLikedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter((product) => product.category === activeCategory);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Award className="w-4 h-4 mr-2" />
            Customer Favorites
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Featured
            <span className="block text-green-600">Products</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover our most popular eco-friendly products, carefully selected
            for their sustainability and quality.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-2xl font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? "bg-green-600 text-white shadow-lg shadow-green-600/25"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {category.name}
              <span className="ml-2 text-xs opacity-70">
                ({category.count})
              </span>
            </button>
          ))}
        </motion.div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl border border-gray-100 transition-all duration-500"
            >
              {/* Image Container */}
              <div className="relative overflow-hidden">
                <div className="aspect-w-1 aspect-h-1 w-full h-80">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product.isNew && (
                    <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                      NEW
                    </span>
                  )}
                  {product.isPopular && (
                    <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                      POPULAR
                    </span>
                  )}
                </div>

                {/* Eco Rating */}
                <div className="absolute top-4 right-4">
                  <div
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      product.rating === "A+"
                        ? "bg-green-600 text-white"
                        : product.rating === "A"
                        ? "bg-green-500 text-white"
                        : "bg-yellow-500 text-white"
                    }`}
                  >
                    {product.rating}
                  </div>
                </div>

                {/* Actions */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-8 group-hover:translate-y-0">
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => toggleLike(product.id)}
                      className={`p-2 rounded-full transition-all duration-300 ${
                        likedProducts.includes(product.id)
                          ? "bg-red-500 text-white"
                          : "bg-white/90 text-gray-600 hover:bg-white"
                      }`}
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          likedProducts.includes(product.id)
                            ? "fill-current"
                            : ""
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Carbon Footprint */}
                <div className="absolute bottom-4 left-4">
                  <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-700 flex items-center">
                    <Leaf className="w-3 h-3 mr-1 text-green-600" />
                    {product.carbonFootprint}kg CO₂
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Eco Label */}
                <span className="inline-block px-3 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full mb-3">
                  {product.ecoLabel}
                </span>

                {/* Title */}
                <h3 className="font-bold text-xl text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                  {product.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>

                {/* Rating */}
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-yellow-400 fill-current"
                    />
                  ))}
                  <span className="text-gray-500 text-sm ml-2">(4.8)</span>
                </div>

                {/* Price & Action */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-green-600">
                      Rs. {product.price.toLocaleString()}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-400 line-through">
                        Rs. {product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-xl transition-colors shadow-lg hover:shadow-xl"
                  >
                    <ShoppingBag className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <button className="group bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2 mx-auto">
            <span>View All Products</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
