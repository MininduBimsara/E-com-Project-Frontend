import React from "react";
import { motion } from "framer-motion";
import { CreditCard, Calendar, Lock, User, Shield } from "lucide-react";
import { FormData } from "../../types/checkout";

interface PaymentFormProps {
  formData: FormData;
  errors: { [key: string]: string };
  isSubmitting: boolean;
  onInputChange: (field: string, value: string) => void;
  onPrevious: () => void;
  onSubmit: () => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({
  formData,
  errors,
  isSubmitting,
  onInputChange,
  onPrevious,
  onSubmit,
}) => {
  const stepVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  return (
    <motion.div
      key="payment"
      variants={stepVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.5 }}
      className="bg-white/90 backdrop-blur-sm border border-white/20 rounded-3xl p-8"
    >
      <h2 className="text-2xl font-light text-green-800 tracking-wider mb-8 flex items-center">
        <CreditCard className="w-6 h-6 mr-3 text-green-600" />
        Payment Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="block text-sm font-light text-gray-700 mb-2 tracking-wide">
            Card Number *
          </label>
          <div className="relative">
            <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={formData.cardNumber}
              onChange={(e) => onInputChange("cardNumber", e.target.value)}
              className={`w-full pl-10 pr-4 py-3 border rounded-xl font-light focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300 ${
                errors.cardNumber
                  ? "border-red-300 bg-red-50/30"
                  : "border-gray-200 bg-white/50"
              }`}
              placeholder="1234 5678 9012 3456"
            />
          </div>
          {errors.cardNumber && (
            <p className="text-red-500 text-xs mt-1 font-light">
              {errors.cardNumber}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-light text-gray-700 mb-2 tracking-wide">
            Expiry Date *
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={formData.expiryDate}
              onChange={(e) => onInputChange("expiryDate", e.target.value)}
              className={`w-full pl-10 pr-4 py-3 border rounded-xl font-light focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300 ${
                errors.expiryDate
                  ? "border-red-300 bg-red-50/30"
                  : "border-gray-200 bg-white/50"
              }`}
              placeholder="MM/YY"
            />
          </div>
          {errors.expiryDate && (
            <p className="text-red-500 text-xs mt-1 font-light">
              {errors.expiryDate}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-light text-gray-700 mb-2 tracking-wide">
            CVV *
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={formData.cvv}
              onChange={(e) => onInputChange("cvv", e.target.value)}
              className={`w-full pl-10 pr-4 py-3 border rounded-xl font-light focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300 ${
                errors.cvv
                  ? "border-red-300 bg-red-50/30"
                  : "border-gray-200 bg-white/50"
              }`}
              placeholder="123"
            />
          </div>
          {errors.cvv && (
            <p className="text-red-500 text-xs mt-1 font-light">{errors.cvv}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-light text-gray-700 mb-2 tracking-wide">
            Cardholder Name *
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={formData.cardName}
              onChange={(e) => onInputChange("cardName", e.target.value)}
              className={`w-full pl-10 pr-4 py-3 border rounded-xl font-light focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300 ${
                errors.cardName
                  ? "border-red-300 bg-red-50/30"
                  : "border-gray-200 bg-white/50"
              }`}
              placeholder="Name as it appears on card"
            />
          </div>
          {errors.cardName && (
            <p className="text-red-500 text-xs mt-1 font-light">
              {errors.cardName}
            </p>
          )}
        </div>
      </div>

      {/* Security Notice */}
      <div className="mt-6 p-4 bg-green-50/80 border border-green-100 rounded-xl">
        <div className="flex items-center text-green-700">
          <Shield className="w-5 h-5 mr-2" />
          <span className="text-sm font-light">
            Your payment information is secured with 256-bit SSL encryption
          </span>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onPrevious}
          className="border border-gray-300 text-gray-600 px-8 py-3 font-light tracking-[0.1em] text-sm hover:border-gray-400 transition-all duration-500"
        >
          Back to Shipping
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onSubmit}
          disabled={isSubmitting}
          className="bg-green-600 text-white px-8 py-3 font-light tracking-[0.1em] text-sm hover:bg-green-700 transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
              Processing...
            </>
          ) : (
            "Complete Order"
          )}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default PaymentForm;
