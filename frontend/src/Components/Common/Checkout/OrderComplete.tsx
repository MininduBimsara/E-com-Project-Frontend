import React from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { ShippingOption } from "../../types/checkout";

interface OrderCompleteProps {
  selectedShipping?: ShippingOption;
}

const OrderComplete: React.FC<OrderCompleteProps> = ({ selectedShipping }) => {
  const stepVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  return (
    <motion.div
      key="complete"
      variants={stepVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.5 }}
      className="bg-white/90 backdrop-blur-sm border border-white/20 rounded-3xl p-8 text-center"
    >
      <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="w-10 h-10 text-white" />
      </div>

      <h2 className="text-3xl font-light text-green-800 tracking-wider mb-4">
        Order Complete!
      </h2>

      <p className="text-lg font-light text-gray-600 mb-8">
        Thank you for your sustainable purchase. Your order has been confirmed
        and will be processed shortly.
      </p>

      <div className="bg-green-50/80 border border-green-100 rounded-xl p-6 mb-8">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600 font-light">Order ID:</span>
            <div className="font-medium text-gray-800">ORD-{Date.now()}</div>
          </div>
          <div>
            <span className="text-gray-600 font-light">
              Estimated Delivery:
            </span>
            <div className="font-medium text-gray-800">
              {selectedShipping?.duration || "5-7 business days"}
            </div>
          </div>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => (window.location.href = "/")}
        className="bg-green-600 text-white px-8 py-3 font-light tracking-[0.1em] text-sm hover:bg-green-700 transition-all duration-500"
      >
        Continue Shopping
      </motion.button>
    </motion.div>
  );
};

export default OrderComplete;
