import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import {
  CheckCircle,
  Package,
  Truck,
  Mail,
  Download,
  ArrowRight,
  Leaf,
  Shield,
} from "lucide-react";

interface OrderSuccessState {
  orderId: string;
  paymentId: string;
  orderData?: any;
}

const OrderSuccessPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState<OrderSuccessState | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("🎉 [OrderSuccessPage] Component mounted");
    console.log("📍 [OrderSuccessPage] Location state:", location.state);

    // Get order details from navigation state
    const state = location.state as OrderSuccessState;

    if (state?.orderId && state?.paymentId) {
      console.log("✅ [OrderSuccessPage] Order details found:", {
        orderId: state.orderId,
        paymentId: state.paymentId,
      });
      setOrderDetails(state);
    } else {
      console.log(
        "❌ [OrderSuccessPage] No order details found, redirecting..."
      );
      // If no order details, redirect to products after a brief delay
      setTimeout(() => {
        navigate("/products", { replace: true });
      }, 2000);
    }

    setIsLoading(false);
  }, [location.state, navigate]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const successIconVariants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 10,
        delay: 0.2,
      },
    },
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50/30 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg font-light text-gray-600">
            Loading order details...
          </p>
        </div>
      </div>
    );
  }

  // No order details state
  if (!orderDetails) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50/30 to-white flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md mx-auto px-6"
        >
          <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Package className="w-10 h-10 text-yellow-600" />
          </div>
          <h2 className="text-2xl font-light text-gray-800 mb-4">
            No Order Found
          </h2>
          <p className="text-gray-600 mb-8 font-light">
            We couldn't find your order details. You'll be redirected to
            continue shopping.
          </p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/products")}
            className="bg-green-600 text-white px-8 py-3 font-light tracking-[0.1em] text-sm hover:bg-green-700 transition-all duration-500"
          >
            Continue Shopping
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50/30 to-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          {/* Success Icon */}
          <motion.div
            variants={successIconVariants}
            className="w-24 h-24 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-8"
          >
            <CheckCircle className="w-12 h-12 text-white" />
          </motion.div>

          {/* Success Message */}
          <motion.div variants={itemVariants} className="mb-12">
            <h1 className="text-4xl lg:text-5xl font-light text-green-800 tracking-wider mb-4">
              Order Confirmed!
            </h1>
            <p className="text-xl font-light text-green-600 italic tracking-wide mb-2">
              Thank you for your sustainable purchase
            </p>
            <p className="text-lg font-light text-gray-600 max-w-2xl mx-auto">
              Your order has been successfully processed and you'll receive a
              confirmation email shortly.
            </p>
          </motion.div>

          {/* Order Details Card */}
          <motion.div
            variants={itemVariants}
            className="bg-white/90 backdrop-blur-sm border border-white/20 rounded-3xl p-8 mb-8 text-left"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Order Information */}
              <div>
                <h3 className="text-lg font-light text-green-800 tracking-wider mb-6 flex items-center">
                  <Package className="w-5 h-5 mr-3 text-green-600" />
                  Order Details
                </h3>

                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm font-light text-gray-600 tracking-wide">
                      Order ID
                    </span>
                    <span className="font-medium text-gray-800 font-mono text-sm">
                      {orderDetails.orderId}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm font-light text-gray-600 tracking-wide">
                      Payment ID
                    </span>
                    <span className="font-medium text-gray-800 font-mono text-sm">
                      {orderDetails.paymentId}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm font-light text-gray-600 tracking-wide">
                      Order Date
                    </span>
                    <span className="font-medium text-gray-800">
                      {new Date().toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm font-light text-gray-600 tracking-wide">
                      Status
                    </span>
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-light">
                      Processing
                    </span>
                  </div>
                </div>
              </div>

              {/* Shipping & Timeline */}
              <div>
                <h3 className="text-lg font-light text-green-800 tracking-wider mb-6 flex items-center">
                  <Truck className="w-5 h-5 mr-3 text-green-600" />
                  Delivery Information
                </h3>

                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm font-light text-gray-600 tracking-wide">
                      Estimated Delivery
                    </span>
                    <span className="font-medium text-gray-800">
                      5-7 business days
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm font-light text-gray-600 tracking-wide">
                      Shipping Method
                    </span>
                    <span className="font-medium text-gray-800">
                      Standard Shipping
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm font-light text-gray-600 tracking-wide">
                      Tracking
                    </span>
                    <span className="text-green-600 text-sm font-light">
                      Available once shipped
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm font-light text-gray-600 tracking-wide">
                      Carbon Neutral
                    </span>
                    <span className="flex items-center text-green-600 text-sm">
                      <Leaf className="w-4 h-4 mr-1" />
                      Included
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Next Steps */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          >
            <div className="bg-white/60 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center">
              <Mail className="w-8 h-8 mx-auto text-green-600 mb-4" />
              <h4 className="text-sm font-light text-gray-800 mb-2 tracking-wide">
                Confirmation Email
              </h4>
              <p className="text-xs text-gray-600 font-light">
                Check your email for order confirmation and receipt
              </p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center">
              <Package className="w-8 h-8 mx-auto text-green-600 mb-4" />
              <h4 className="text-sm font-light text-gray-800 mb-2 tracking-wide">
                Order Processing
              </h4>
              <p className="text-xs text-gray-600 font-light">
                We'll prepare your sustainable products with care
              </p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center">
              <Truck className="w-8 h-8 mx-auto text-green-600 mb-4" />
              <h4 className="text-sm font-light text-gray-800 mb-2 tracking-wide">
                Tracking Updates
              </h4>
              <p className="text-xs text-gray-600 font-light">
                You'll receive shipping notifications via email
              </p>
            </div>
          </motion.div>

          {/* Environmental Impact */}
          <motion.div
            variants={itemVariants}
            className="bg-green-50/80 border border-green-100 rounded-2xl p-6 mb-8"
          >
            <div className="flex items-center justify-center mb-4">
              <Leaf className="w-6 h-6 text-green-600 mr-3" />
              <h3 className="text-lg font-light text-green-800 tracking-wider">
                Environmental Impact
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-light text-green-700 mb-1">
                  100%
                </div>
                <div className="text-sm text-green-600 font-light">
                  Carbon Neutral Shipping
                </div>
              </div>
              <div>
                <div className="text-2xl font-light text-green-700 mb-1">
                  ♻️
                </div>
                <div className="text-sm text-green-600 font-light">
                  Eco-Friendly Packaging
                </div>
              </div>
              <div>
                <div className="text-2xl font-light text-green-700 mb-1">
                  🌱
                </div>
                <div className="text-sm text-green-600 font-light">
                  Sustainable Products
                </div>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/products")}
              className="bg-green-600 text-white px-8 py-3 font-light tracking-[0.1em] text-sm hover:bg-green-700 transition-all duration-500 flex items-center"
            >
              Continue Shopping
              <ArrowRight className="w-4 h-4 ml-2" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/profile/orders")}
              className="border border-green-600 text-green-600 px-8 py-3 font-light tracking-[0.1em] text-sm hover:bg-green-50 transition-all duration-500"
            >
              View Order History
            </motion.button>
          </motion.div>

          {/* Security Notice */}
          <motion.div variants={itemVariants} className="mt-12 text-center">
            <div className="flex items-center justify-center text-gray-600 mb-2">
              <Shield className="w-4 h-4 mr-2" />
              <span className="text-sm font-light">
                Your payment was processed securely through PayPal
              </span>
            </div>
            <p className="text-xs text-gray-500 font-light">
              Order confirmation and receipt have been sent to your email
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
