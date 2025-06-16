import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Star,
  Leaf,
  ShoppingCart,
  Eye,
  Award,
  Loader2,
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  features?: string[];
  inStock: boolean;
  rating: string;
  ecoLabel: string;
  carbonFootprint: number;
  isNew?: boolean;
  isPopular?: boolean;
  isBestseller?: boolean;
}

interface ProductsGridProps {
  products: Product[];
  onProductView: (product: Product) => void;
  loading?: boolean;
}

const ProductsGrid: React.FC<ProductsGridProps> = ({
  products,
  onProductView,
  loading = false,
}) => {
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  const toggleFavorite = (productId: string) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId);
      } else {
        newFavorites.add(productId);
      }
      return newFavorites;
    });
  };

  const handleImageError = (productId: string) => {
    setImageErrors((prev) => new Set([...prev, productId]));
  };

  const getImageSrc = (product: Product) => {
    if (imageErrors.has(product.id)) {
      // Fallback image based on category
      switch (product.category.toLowerCase()) {
        case "cloths":
        case "clothing":
          return "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
        case "kitchen":
          return "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
        case "accessories":
          return "https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
        default:
          return "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
      }
    }

    // Use the first image if available, otherwise fallback
    if (product.images && product.images.length > 0) {
      const imageUrl = product.images[0];

      // If it's already a full URL (transformed), use as is
      if (imageUrl.startsWith("http")) {
        return imageUrl;
      }

      // If it's just a filename, construct the full URL
      return `${import.meta.env.VITE_API_URL}/product-images/${imageUrl}`;
    }

    // Final fallback
    return "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16">
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className="relative backdrop-blur-xl bg-white/90 border border-white/20 rounded-3xl overflow-hidden"
        >
          <div className="aspect-[4/3] bg-gradient-to-br from-green-100/50 to-emerald-100/50 animate-pulse"></div>
          <div className="p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="h-3 bg-green-100 rounded animate-pulse w-20"></div>
              <div className="h-6 bg-green-100 rounded animate-pulse w-16"></div>
            </div>
            <div className="h-6 bg-gray-200 rounded animate-pulse mb-3"></div>
            <div className="h-4 bg-gray-100 rounded animate-pulse mb-4 w-3/4"></div>
            <div className="h-5 bg-green-100 rounded animate-pulse mb-6 w-24"></div>
            <div className="h-10 bg-gray-100 rounded animate-pulse"></div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <section className="py-20 bg-gradient-to-b from-white to-green-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Results Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h3 className="text-2xl lg:text-3xl font-light text-green-800 tracking-wider mb-4">
            {loading ? (
              <span className="flex items-center justify-center">
                <Loader2 className="w-6 h-6 mr-2 animate-spin" />
                Loading Products...
              </span>
            ) : (
              `Showing ${products.length} Products`
            )}
          </h3>
          <div className="w-16 h-px bg-green-600/30 mx-auto"></div>
        </motion.div>

        {/* Loading State */}
        {loading && <LoadingSkeleton />}

        {/* Empty State */}
        {!loading && products.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-6">🌱</div>
            <h4 className="text-2xl font-light text-gray-600 mb-4">
              No products found
            </h4>
            <p className="text-gray-500 font-light">
              Try adjusting your filters or search terms to find what you're
              looking for.
            </p>
          </motion.div>
        )}

        {/* Products Grid */}
        {!loading && products.length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16"
          >
            <AnimatePresence>
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  variants={itemVariants}
                  layout
                  className="group relative"
                  onHoverStart={() => setHoveredProduct(product.id)}
                  onHoverEnd={() => setHoveredProduct(null)}
                >
                  {/* Product Card */}
                  <div className="relative backdrop-blur-xl bg-white/90 border border-white/20 rounded-3xl overflow-hidden group-hover:shadow-2xl group-hover:shadow-green-100/20 transition-all duration-500">
                    {/* Product Image */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={getImageSrc(product)}
                        alt={product.name}
                        onError={() => handleImageError(product.id)}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />

                      {/* Image Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Badges */}
                      <div className="absolute top-4 left-4 flex flex-col gap-2">
                        {product.isNew && (
                          <span className="bg-green-600/90 text-white px-3 py-1 text-xs font-light tracking-wider backdrop-blur-sm rounded-full">
                            NEW
                          </span>
                        )}
                        {product.isPopular && (
                          <span className="bg-amber-500/90 text-white px-3 py-1 text-xs font-light tracking-wider backdrop-blur-sm rounded-full">
                            POPULAR
                          </span>
                        )}
                        {product.isBestseller && (
                          <span className="bg-purple-600/90 text-white px-3 py-1 text-xs font-light tracking-wider backdrop-blur-sm rounded-full flex items-center">
                            <Award className="w-3 h-3 mr-1" />
                            BESTSELLER
                          </span>
                        )}
                      </div>

                      {/* Eco Rating */}
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

                      {/* Quick Actions */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{
                          opacity: hoveredProduct === product.id ? 1 : 0,
                          y: hoveredProduct === product.id ? 0 : 20,
                        }}
                        transition={{ duration: 0.3 }}
                        className="absolute bottom-4 right-4 flex gap-2"
                      >
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(product.id);
                          }}
                          className={`p-2 rounded-full backdrop-blur-sm transition-all duration-300 ${
                            favorites.has(product.id)
                              ? "bg-red-500/90 text-white"
                              : "bg-white/90 text-gray-600 hover:bg-red-500/90 hover:text-white"
                          }`}
                        >
                          <Heart
                            className="w-4 h-4"
                            fill={
                              favorites.has(product.id)
                                ? "currentColor"
                                : "none"
                            }
                          />
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            console.log(
                              "Eye button clicked for product:",
                              product.name
                            ); // Debug log
                            onProductView(product);
                          }}
                          className="p-2 rounded-full bg-green-600/90 text-white backdrop-blur-sm hover:bg-green-700/90 transition-all duration-300"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </motion.div>
                    </div>

                    {/* Product Info */}
                    <div className="p-6">
                      {/* Category & Eco Label */}
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm uppercase tracking-[0.15em] text-green-600 font-light">
                          {product.category}
                        </span>
                        <span className="bg-green-100/80 text-green-700 px-2 py-1 text-xs font-light tracking-wider rounded">
                          {product.ecoLabel}
                        </span>
                      </div>

                      {/* Product Name */}
                      <h4 className="text-2xl md:text-3xl font-light tracking-wider text-green-800 mb-3 group-hover:text-green-600 transition-colors duration-500">
                        {product.name}
                      </h4>

                      {/* Description */}
                      <p className="text-gray-600/80 font-light leading-relaxed mb-4 line-clamp-2">
                        {product.description}
                      </p>

                      {/* Features */}
                      {product.features && product.features.length > 0 && (
                        <div className="mb-4">
                          <div className="flex flex-wrap gap-1">
                            {product.features
                              .slice(0, 3)
                              .map((feature, idx) => (
                                <span
                                  key={idx}
                                  className="text-xs text-gray-500 bg-gray-100/80 px-2 py-1 rounded font-light"
                                >
                                  {feature}
                                </span>
                              ))}
                            {product.features.length > 3 && (
                              <span className="text-xs text-gray-500 font-light">
                                +{product.features.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Price */}
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <div className="text-xl font-light text-green-700 italic">
                            Rs. {product.price.toLocaleString()}
                          </div>
                          {product.originalPrice && (
                            <div className="text-sm text-gray-400 line-through font-light">
                              Rs. {product.originalPrice.toLocaleString()}
                            </div>
                          )}
                        </div>

                        {/* Stock Status */}
                        <div
                          className={`text-xs font-light tracking-wider ${
                            product.inStock ? "text-green-600" : "text-red-500"
                          }`}
                        >
                          {product.inStock ? "IN STOCK" : "OUT OF STOCK"}
                        </div>
                      </div>

                      {/* Add to Cart Button */}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={!product.inStock}
                        onClick={(e) => {
                          e.stopPropagation();
                          // Add to cart logic here
                          console.log("Add to cart clicked for:", product.name);
                        }}
                        className={`w-full py-3 font-light tracking-[0.1em] text-sm transition-all duration-500 flex items-center justify-center ${
                          product.inStock
                            ? "bg-transparent border border-green-600/40 text-green-700 hover:bg-green-600 hover:text-white"
                            : "bg-gray-100 border border-gray-200 text-gray-400 cursor-not-allowed"
                        }`}
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        {product.inStock ? "ADD TO CART" : "OUT OF STOCK"}
                      </motion.button>
                    </div>

                    {/* Hover Line Effect */}
                    <div className="absolute bottom-0 left-0 w-0 h-1 bg-green-600 group-hover:w-full transition-all duration-700"></div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Load More Button */}
        {!loading && products.length >= 9 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mt-16"
          >
            <button className="group bg-transparent border-2 border-green-700/60 text-green-700 px-12 py-4 font-light tracking-[0.2em] text-sm hover:bg-green-700 hover:text-white transition-all duration-500 uppercase">
              Load More Products
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ProductsGrid;
