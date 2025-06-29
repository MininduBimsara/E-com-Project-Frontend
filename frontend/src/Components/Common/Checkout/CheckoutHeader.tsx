import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

interface CheckoutHeaderProps {
  onBack?: () => void;
}

const CheckoutHeader: React.FC<CheckoutHeaderProps> = ({ onBack }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center mb-12"
    >
      {onBack && (
        <button
          onClick={onBack}
          className="inline-flex items-center text-green-600 hover:text-green-700 font-light tracking-wide mb-6 transition-colors duration-300"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Cart
        </button>
      )}

      <h1 className="text-4xl lg:text-5xl font-light text-green-800 tracking-wider mb-4">
        Checkout
      </h1>
      <div className="text-lg font-light text-green-600 italic tracking-wide">
        Complete your sustainable purchase
      </div>
    </motion.div>
  );
};

export default CheckoutHeader;
