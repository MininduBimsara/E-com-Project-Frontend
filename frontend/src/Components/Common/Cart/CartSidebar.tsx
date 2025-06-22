interface CartSidebarProps {
  onCheckout?: () => void;
}

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  Leaf,
  CreditCard,
  Truck,
  Shield,
  ArrowRight,
  Heart
} from 'lucide-react';
import { useCart } from '../../../Context/CartContext';

interface CartSidebarProps {
  onCheckout?: () => void;
}

// NO React.FC - using regular function declaration
function CartSidebar({ onCheckout }: CartSidebarProps) {
  const {
    items,
    isOpen,
    itemCount,
    totalPrice,
    totalCarbonFootprint,
    updateQuantity,
    removeItem,
    clearCart,
    closeCart
  } = useCart();

  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  const handleImageError = (productId: string) => {
    setImageErrors(prev => new Set([...prev, productId]));
  };

  const getImageSrc = (item: any) => {
    if (imageErrors.has(item.id)) {
      // Fallback image based on category
      switch (item.category.toLowerCase()) {
        case 'cloths':
        case 'clothing':
          return 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80';
        case 'kitchen':
          return 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80';
        case 'accessories':
          return 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80';
        default:
          return 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80';
      }
    }
    return item.image || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80';
  };

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleCheckout = () => {
    if (onCheckout) {
      onCheckout();
    } else {
      console.log('Proceeding to checkout with items:', items);
    }
  };

  const sidebarVariants = {
    closed: {
      x: '100%',
      transition: {
        duration: 0.4,
        ease: 'easeInOut'
      }
    },
    open: {
      x: 0,
      transition: {
        duration: 0.4,
        ease: 'easeInOut'
      }
    }
  };

  const backdropVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1 }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: (index: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: index * 0.1,
        duration: 0.4
      }
    })
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            variants={backdropVariants}
            initial="closed"
            animate="open"
            exit="closed"
            onClick={closeCart}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-40"
          />

          {/* Sidebar */}
          <motion.div
            variants={sidebarVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="border-b border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <ShoppingBag className="w-6 h-6 text-green-600 mr-3" />
                  <h2 className="text-2xl font-light text-green-800 tracking-wider">
                    Cart
                  </h2>
                </div>
                <button
                  onClick={closeCart}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-300"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Cart Summary */}
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 font-light">
                  {itemCount} {itemCount === 1 ? 'item' : 'items'}
                </span>
                {items.length > 0 && (
                  <button
                    onClick={clearCart}
                    className="text-red-500 hover:text-red-700 font-light tracking-wide text-xs uppercase transition-colors duration-300"
                  >
                    Clear All
                  </button>
                )}
              </div>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto">
              {items.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="flex flex-col items-center justify-center h-full p-8 text-center"
                >
                  <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-6">
                    <ShoppingBag className="w-12 h-12 text-green-300" />
                  </div>
                  <h3 className="text-xl font-light text-gray-800 mb-2 tracking-wide">
                    Your cart is empty
                  </h3>
                  <p className="text-gray-500 font-light mb-6">
                    Add some sustainable products to get started
                  </p>
                  <button
                    onClick={closeCart}
                    className="bg-green-600 text-white px-6 py-3 font-light tracking-wider text-sm hover:bg-green-700 transition-colors duration-300"
                  >
                    Continue Shopping
                  </button>
                </motion.div>
              ) : (
                <div className="p-6 space-y-6">
                  {items.map((item, index) => (
                    <motion.div
                      key={item.id}
                      custom={index}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      exit={{ opacity: 0, x: 20 }}
                      className="group relative"
                    >
                      <div className="flex gap-4 bg-white border border-gray-100 rounded-2xl p-4 hover:shadow-lg hover:shadow-green-100/20 transition-all duration-500">
                        {/* Product Image */}
                        <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-gradient-to-br from-green-50 to-emerald-50 flex-shrink-0">
                          <img
                            src={getImageSrc(item)}
                            alt={item.name}
                            onError={() => handleImageError(item.id)}
                            className="w-full h-full object-cover"
                          />
                          
                          {/* Eco Badge */}
                          <div className="absolute -top-1 -right-1">
                            <div className="bg-green-600 text-white rounded-full p-1">
                              <Leaf className="w-3 h-3" />
                            </div>
                          </div>
                        </div>

                        {/* Product Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-light text-gray-800 tracking-wide truncate">
                                {item.name}
                              </h4>
                              <p className="text-xs text-green-600 uppercase tracking-wider font-light">
                                {item.category}
                              </p>
                            </div>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="p-1 rounded-full hover:bg-red-50 hover:text-red-500 transition-all duration-300 opacity-0 group-hover:opacity-100"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          {/* Price & Eco Info */}
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <span className="text-lg font-light text-green-700 italic">
                                Rs. {item.price.toLocaleString()}
                              </span>
                              {item.originalPrice && (
                                <span className="text-sm text-gray-400 line-through ml-2">
                                  Rs. {item.originalPrice.toLocaleString()}
                                </span>
                              )}
                            </div>
                            <div className="text-xs text-gray-500 flex items-center">
                              <Leaf className="w-3 h-3 mr-1 text-green-500" />
                              {item.carbonFootprint}kg CO₂
                            </div>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center border border-gray-200 rounded-lg">
                              <button
                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                className="p-1.5 hover:bg-gray-50 transition-colors"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="px-3 py-1.5 text-sm font-light min-w-[2rem] text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                disabled={item.quantity >= (item.maxQuantity || 10)}
                                className="p-1.5 hover:bg-gray-50 transition-colors disabled:opacity-50"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            <div className="text-sm font-light text-gray-800">
                              Rs. {(item.price * item.quantity).toLocaleString()}
                            </div>
                          </div>

                          {/* Stock Status */}
                          {!item.inStock && (
                            <div className="text-xs text-red-500 mt-2 font-light">
                              Out of stock
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer - Checkout Section */}
            {items.length > 0 && (
              <div className="border-t border-gray-100 p-6 bg-gray-50/50">
                {/* Environmental Impact */}
                <div className="bg-green-50/80 border border-green-100 rounded-xl p-4 mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-light text-green-700 flex items-center">
                      <Leaf className="w-4 h-4 mr-2" />
                      Environmental Impact
                    </span>
                    <Heart className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="text-xs text-green-600 font-light">
                    Total Carbon Footprint: {totalCarbonFootprint.toFixed(1)}kg CO₂
                  </div>
                </div>

                {/* Shipping Benefits */}
                <div className="grid grid-cols-3 gap-3 mb-6 text-xs text-gray-600">
                  <div className="flex items-center">
                    <Truck className="w-3 h-3 mr-1 text-green-600" />
                    <span className="font-light">Free Ship</span>
                  </div>
                  <div className="flex items-center">
                    <Shield className="w-3 h-3 mr-1 text-green-600" />
                    <span className="font-light">Secure</span>
                  </div>
                  <div className="flex items-center">
                    <Leaf className="w-3 h-3 mr-1 text-green-600" />
                    <span className="font-light">Eco Pack</span>
                  </div>
                </div>

                {/* Total */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
                  <span className="text-lg font-light text-gray-800 tracking-wide">
                    Total
                  </span>
                  <span className="text-2xl font-light text-green-700 italic">
                    Rs. {totalPrice.toLocaleString()}
                  </span>
                </div>

                {/* Checkout Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCheckout}
                  className="w-full bg-green-600 text-white py-4 font-light tracking-[0.1em] text-sm hover:bg-green-700 transition-all duration-500 flex items-center justify-center group"
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  Proceed to Checkout
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </motion.button>

                {/* Continue Shopping Link */}
                <button
                  onClick={closeCart}
                  className="w-full mt-3 text-gray-600 font-light text-sm tracking-wide hover:text-green-600 transition-colors duration-300"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default CartSidebar;
