import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Heart,
  Star,
  Leaf,
  ShoppingCart,
  Plus,
  Minus,
  Share2,
  Truck,
  Shield,
  RotateCcw,
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
  specifications?: { [key: string]: string };
  sustainability?: string[];
}

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  loading?: boolean; // Add loading prop
}

const ProductModal: React.FC<ProductModalProps> = ({
  product,
  isOpen,
  onClose,
  loading = false, // Default to false
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Reset state when product changes
  React.useEffect(() => {
    if (product) {
      setActiveImageIndex(0);
      setQuantity(1);
      setImageError(false);
    }
  }, [product]);

  const handleQuantityChange = (change: number) => {
    setQuantity((prev) => Math.max(1, prev + change));
  };

  const getImageSrc = (imageFilename: string, category?: string) => {
    if (imageError || !imageFilename) {
      // Fallback images based on category
      switch (category?.toLowerCase()) {
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

    // If it's already a full URL (from transformed product), use as is
    if (imageFilename.startsWith("http")) {
      return imageFilename;
    }

    // Otherwise, construct URL from filename
    return `${
      import.meta.env.VITE_PRODUCT_API_URL
    }/product-images/${imageFilename}`;
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      y: 20,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: 20,
      transition: {
        duration: 0.3,
      },
    },
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  // Loading state
  if (loading) {
    return (
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
              onClick={onClose}
            />
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative w-full max-w-6xl max-h-[90vh] overflow-hidden bg-white rounded-3xl shadow-2xl flex items-center justify-center py-20"
            >
              <div className="text-center">
                <Loader2 className="w-12 h-12 animate-spin text-green-600 mx-auto mb-4" />
                <p className="text-lg font-light text-gray-600">
                  Loading product details...
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    );
  }

  // No product state
  if (!product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-6xl max-h-[90vh] overflow-hidden bg-white rounded-3xl shadow-2xl"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-10 p-2 rounded-full bg-white/90 backdrop-blur-sm text-gray-600 hover:text-gray-900 hover:bg-white transition-all duration-300"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex flex-col lg:flex-row h-full">
              {/* Image Section */}
              <div className="lg:w-1/2 relative">
                {/* Main Image */}
                <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-green-50 to-emerald-50">
                  <img
                    src={getImageSrc(
                      product.images[activeImageIndex],
                      product.category
                    )}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={() => setImageError(true)}
                  />

                  {/* Badges */}
                  <div className="absolute top-6 left-6 flex flex-col gap-2">
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
                  </div>

                  {/* Eco Rating */}
                  <div className="absolute top-6 right-16">
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
                  <div className="absolute bottom-6 left-6">
                    <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-gray-700 flex items-center">
                      <Leaf className="w-4 h-4 mr-2 text-green-600" />
                      {product.carbonFootprint}kg CO₂
                    </div>
                  </div>
                </div>

                {/* Image Thumbnails */}
                {product.images.length > 1 && (
                  <div className="absolute bottom-6 right-6 flex gap-2">
                    {product.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveImageIndex(index)}
                        className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                          activeImageIndex === index
                            ? "border-green-600"
                            : "border-white/50 hover:border-green-400"
                        }`}
                      >
                        <img
                          src={getImageSrc(image, product.category)}
                          alt={`${product.name} ${index + 1}`}
                          className="w-full h-full object-cover"
                          onError={() => setImageError(true)}
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Content Section */}
              <div className="lg:w-1/2 overflow-y-auto">
                <div className="p-8 lg:p-12">
                  {/* Category & Eco Label */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm uppercase tracking-[0.15em] text-green-600 font-light">
                      {product.category}
                    </span>
                    <span className="bg-green-100/80 text-green-700 px-3 py-1 text-xs font-light tracking-wider rounded-full">
                      {product.ecoLabel}
                    </span>
                  </div>

                  {/* Product Name */}
                  <h2 className="text-3xl lg:text-4xl font-light tracking-wider text-green-800 mb-4">
                    {product.name}
                  </h2>

                  {/* Price */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="text-3xl lg:text-4xl font-light text-green-600 italic">
                      Rs. {product.price.toLocaleString()}
                    </div>
                    {product.originalPrice && (
                      <div className="text-lg text-gray-400 line-through font-light">
                        Rs. {product.originalPrice.toLocaleString()}
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-gray-600/80 font-light leading-relaxed mb-8">
                    {product.description}
                  </p>

                  {/* Features */}
                  {product.features && product.features.length > 0 && (
                    <div className="mb-8">
                      <h4 className="text-lg font-light text-gray-800 mb-4 tracking-wide">
                        Key Features
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {product.features.map((feature, idx) => (
                          <div
                            key={idx}
                            className="text-sm text-gray-600 bg-gray-50/80 px-3 py-2 rounded font-light flex items-center"
                          >
                            <div className="w-1 h-1 bg-green-600 rounded-full mr-2"></div>
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Specifications */}
                  {product.specifications && (
                    <div className="mb-8">
                      <h4 className="text-lg font-light text-gray-800 mb-4 tracking-wide">
                        Specifications
                      </h4>
                      <div className="space-y-3">
                        {Object.entries(product.specifications).map(
                          ([key, value]) => (
                            <div
                              key={key}
                              className="flex justify-between items-center py-2 border-b border-gray-100"
                            >
                              <span className="text-sm font-light text-gray-600 capitalize">
                                {key}:
                              </span>
                              <span className="text-sm text-gray-800">
                                {value}
                              </span>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}

                  {/* Sustainability */}
                  {product.sustainability && (
                    <div className="mb-8">
                      <h4 className="text-lg font-light text-gray-800 mb-4 tracking-wide flex items-center">
                        <Leaf className="w-5 h-5 mr-2 text-green-600" />
                        Sustainability
                      </h4>
                      <div className="space-y-2">
                        {product.sustainability.map((item, idx) => (
                          <div
                            key={idx}
                            className="text-sm text-gray-600 flex items-center"
                          >
                            <div className="w-1 h-1 bg-green-600 rounded-full mr-3"></div>
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Quantity & Actions */}
                  <div className="space-y-6">
                    {/* Quantity Selector */}
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-light text-gray-600 tracking-wider">
                        QUANTITY:
                      </span>
                      <div className="flex items-center border border-gray-200 rounded-lg">
                        <button
                          onClick={() => handleQuantityChange(-1)}
                          className="p-2 hover:bg-gray-50 transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-4 py-2 text-gray-800 font-light min-w-[3rem] text-center">
                          {quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(1)}
                          className="p-2 hover:bg-gray-50 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={!product.inStock}
                        className={`flex-1 py-4 font-light tracking-[0.1em] text-sm transition-all duration-500 flex items-center justify-center ${
                          product.inStock
                            ? "bg-green-600 text-white hover:bg-green-700"
                            : "bg-gray-200 text-gray-400 cursor-not-allowed"
                        }`}
                      >
                        <ShoppingCart className="w-5 h-5 mr-2" />
                        {product.inStock ? "ADD TO CART" : "OUT OF STOCK"}
                      </motion.button>

                      <button
                        onClick={() => setIsFavorite(!isFavorite)}
                        className={`p-4 border transition-all duration-300 ${
                          isFavorite
                            ? "border-red-500 bg-red-50 text-red-500"
                            : "border-gray-200 hover:border-red-500 hover:text-red-500"
                        }`}
                      >
                        <Heart
                          className="w-5 h-5"
                          fill={isFavorite ? "currentColor" : "none"}
                        />
                      </button>

                      <button className="p-4 border border-gray-200 hover:border-green-500 hover:text-green-500 transition-all duration-300">
                        <Share2 className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Service Info */}
                    <div className="pt-6 border-t border-gray-100">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center text-gray-600">
                          <Truck className="w-4 h-4 mr-2 text-green-600" />
                          <span className="font-light">Free Shipping</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <RotateCcw className="w-4 h-4 mr-2 text-green-600" />
                          <span className="font-light">30-Day Returns</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Shield className="w-4 h-4 mr-2 text-green-600" />
                          <span className="font-light">Quality Guarantee</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProductModal;
