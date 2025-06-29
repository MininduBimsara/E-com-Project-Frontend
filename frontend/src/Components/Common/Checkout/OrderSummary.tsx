// components/checkout/OrderSummary.tsx
import React from "react";
import { motion } from "framer-motion";
import { Leaf, Shield, Truck } from "lucide-react";
import { ShippingOption } from "../../types/checkout";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface OrderSummaryProps {
  items: CartItem[];
  totalPrice: number;
  totalCarbonFootprint: number;
  selectedShipping?: ShippingOption;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  items,
  totalPrice,
  totalCarbonFootprint,
  selectedShipping,
}) => {
  const finalTotal = totalPrice + (selectedShipping?.price || 0);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="bg-white/90 backdrop-blur-sm border border-white/20 rounded-3xl p-6 sticky top-6"
    >
      <h3 className="text-xl font-light text-green-800 tracking-wider mb-6">
        Order Summary
      </h3>

      {/* Items */}
      <div className="space-y-4 mb-6">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg flex-shrink-0">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-light text-gray-800 truncate">
                {item.name}
              </div>
              <div className="text-xs text-gray-500">Qty: {item.quantity}</div>
            </div>
            <div className="text-sm font-light text-green-700">
              Rs. {(item.price * item.quantity).toLocaleString()}
            </div>
          </div>
        ))}
      </div>

      {/* Environmental Impact */}
      <div className="bg-green-50/80 border border-green-100 rounded-xl p-4 mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-light text-green-700 flex items-center">
            <Leaf className="w-4 h-4 mr-2" />
            Environmental Impact
          </span>
        </div>
        <div className="text-xs text-green-600 font-light">
          Carbon Footprint: {totalCarbonFootprint.toFixed(1)}kg CO₂
        </div>
        <div className="text-xs text-green-600 font-light">
          Carbon Neutral Shipping Included
        </div>
      </div>

      {/* Pricing */}
      <div className="space-y-3 border-t border-gray-100 pt-4">
        <div className="flex justify-between text-sm">
          <span className="font-light text-gray-600">Subtotal</span>
          <span className="font-light text-gray-800">
            Rs. {totalPrice.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="font-light text-gray-600">Shipping</span>
          <span className="font-light text-gray-800">
            {selectedShipping?.price === 0
              ? "Free"
              : `Rs. ${selectedShipping?.price.toLocaleString()}`}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="font-light text-gray-600">Tax</span>
          <span className="font-light text-gray-800">Included</span>
        </div>
        <div className="border-t border-gray-200 pt-3">
          <div className="flex justify-between">
            <span className="text-lg font-light text-gray-800">Total</span>
            <span className="text-xl font-light text-green-700 italic">
              Rs. {finalTotal.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Security Features */}
      <div className="mt-6 pt-6 border-t border-gray-100">
        <div className="grid grid-cols-3 gap-3 text-xs text-gray-600">
          <div className="flex items-center">
            <Shield className="w-3 h-3 mr-1 text-green-600" />
            <span className="font-light">Secure</span>
          </div>
          <div className="flex items-center">
            <Truck className="w-3 h-3 mr-1 text-green-600" />
            <span className="font-light">Tracked</span>
          </div>
          <div className="flex items-center">
            <Leaf className="w-3 h-3 mr-1 text-green-600" />
            <span className="font-light">Eco Pack</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default OrderSummary;
