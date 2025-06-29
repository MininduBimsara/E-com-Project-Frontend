import React from "react";
import { motion } from "framer-motion";
import { User, Mail, Phone, MapPin, ChevronDown, Truck } from "lucide-react";
import { FormData, ShippingOption } from "../../types/checkout";

interface ShippingFormProps {
  formData: FormData;
  errors: { [key: string]: string };
  onInputChange: (field: string, value: string) => void;
  onNext: () => void;
}

const ShippingForm: React.FC<ShippingFormProps> = ({
  formData,
  errors,
  onInputChange,
  onNext,
}) => {
  const provinces = [
    "Western Province",
    "Central Province",
    "Southern Province",
    "Northern Province",
    "Eastern Province",
    "North Western Province",
    "North Central Province",
    "Uva Province",
    "Sabaragamuwa Province",
  ];

  const shippingOptions: ShippingOption[] = [
    {
      id: "standard",
      name: "Standard Shipping",
      description: "Carbon-neutral delivery",
      price: 0,
      duration: "5-7 business days",
      icon: Truck,
    },
    {
      id: "express",
      name: "Express Shipping",
      description: "Eco-friendly express",
      price: 500,
      duration: "2-3 business days",
      icon: Truck,
    },
  ];

  const stepVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  return (
    <motion.div
      key="shipping"
      variants={stepVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.5 }}
      className="bg-white/90 backdrop-blur-sm border border-white/20 rounded-3xl p-8"
    >
      <h2 className="text-2xl font-light text-green-800 tracking-wider mb-8 flex items-center">
        <Truck className="w-6 h-6 mr-3 text-green-600" />
        Shipping Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal Information */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-light text-gray-700 mb-2 tracking-wide">
              First Name *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => onInputChange("firstName", e.target.value)}
                className={`w-full pl-10 pr-4 py-3 border rounded-xl font-light focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300 ${
                  errors.firstName
                    ? "border-red-300 bg-red-50/30"
                    : "border-gray-200 bg-white/50"
                }`}
                placeholder="Enter your first name"
              />
            </div>
            {errors.firstName && (
              <p className="text-red-500 text-xs mt-1 font-light">
                {errors.firstName}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-light text-gray-700 mb-2 tracking-wide">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => onInputChange("email", e.target.value)}
                className={`w-full pl-10 pr-4 py-3 border rounded-xl font-light focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300 ${
                  errors.email
                    ? "border-red-300 bg-red-50/30"
                    : "border-gray-200 bg-white/50"
                }`}
                placeholder="your@email.com"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs mt-1 font-light">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-light text-gray-700 mb-2 tracking-wide">
              City *
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={formData.city}
                onChange={(e) => onInputChange("city", e.target.value)}
                className={`w-full pl-10 pr-4 py-3 border rounded-xl font-light focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300 ${
                  errors.city
                    ? "border-red-300 bg-red-50/30"
                    : "border-gray-200 bg-white/50"
                }`}
                placeholder="Enter your city"
              />
            </div>
            {errors.city && (
              <p className="text-red-500 text-xs mt-1 font-light">
                {errors.city}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-light text-gray-700 mb-2 tracking-wide">
              Last Name *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => onInputChange("lastName", e.target.value)}
                className={`w-full pl-10 pr-4 py-3 border rounded-xl font-light focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300 ${
                  errors.lastName
                    ? "border-red-300 bg-red-50/30"
                    : "border-gray-200 bg-white/50"
                }`}
                placeholder="Enter your last name"
              />
            </div>
            {errors.lastName && (
              <p className="text-red-500 text-xs mt-1 font-light">
                {errors.lastName}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-light text-gray-700 mb-2 tracking-wide">
              Phone Number *
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => onInputChange("phone", e.target.value)}
                className={`w-full pl-10 pr-4 py-3 border rounded-xl font-light focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300 ${
                  errors.phone
                    ? "border-red-300 bg-red-50/30"
                    : "border-gray-200 bg-white/50"
                }`}
                placeholder="+94 77 123 4567"
              />
            </div>
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1 font-light">
                {errors.phone}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-light text-gray-700 mb-2 tracking-wide">
                Postal Code *
              </label>
              <input
                type="text"
                value={formData.postalCode}
                onChange={(e) => onInputChange("postalCode", e.target.value)}
                className={`w-full px-4 py-3 border rounded-xl font-light focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300 ${
                  errors.postalCode
                    ? "border-red-300 bg-red-50/30"
                    : "border-gray-200 bg-white/50"
                }`}
                placeholder="10250"
              />
              {errors.postalCode && (
                <p className="text-red-500 text-xs mt-1 font-light">
                  {errors.postalCode}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-light text-gray-700 mb-2 tracking-wide">
                Province *
              </label>
              <div className="relative">
                <select
                  value={formData.province}
                  onChange={(e) => onInputChange("province", e.target.value)}
                  className={`w-full px-4 py-3 border rounded-xl font-light focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300 appearance-none ${
                    errors.province
                      ? "border-red-300 bg-red-50/30"
                      : "border-gray-200 bg-white/50"
                  }`}
                >
                  <option value="">Select</option>
                  {provinces.map((province) => (
                    <option key={province} value={province}>
                      {province}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
              {errors.province && (
                <p className="text-red-500 text-xs mt-1 font-light">
                  {errors.province}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Address */}
      <div className="mt-6">
        <label className="block text-sm font-light text-gray-700 mb-2 tracking-wide">
          Street Address *
        </label>
        <div className="relative">
          <MapPin className="absolute left-3 top-4 w-4 h-4 text-gray-400" />
          <textarea
            value={formData.address}
            onChange={(e) => onInputChange("address", e.target.value)}
            rows={3}
            className={`w-full pl-10 pr-4 py-3 border rounded-xl font-light focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300 resize-none ${
              errors.address
                ? "border-red-300 bg-red-50/30"
                : "border-gray-200 bg-white/50"
            }`}
            placeholder="Enter your full address"
          />
        </div>
        {errors.address && (
          <p className="text-red-500 text-xs mt-1 font-light">
            {errors.address}
          </p>
        )}
      </div>

      {/* Shipping Options */}
      <div className="mt-8">
        <h3 className="text-lg font-light text-gray-800 mb-4 tracking-wide">
          Shipping Method
        </h3>
        <div className="space-y-3">
          {shippingOptions.map((option) => (
            <label
              key={option.id}
              className={`block p-4 border rounded-xl cursor-pointer transition-all duration-300 ${
                formData.shippingMethod === option.id
                  ? "border-green-500 bg-green-50/50"
                  : "border-gray-200 bg-white/50 hover:border-green-300"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="shippingMethod"
                    value={option.id}
                    checked={formData.shippingMethod === option.id}
                    onChange={(e) =>
                      onInputChange("shippingMethod", e.target.value)
                    }
                    className="text-green-600 focus:ring-green-500"
                  />
                  <option.icon className="w-5 h-5 ml-3 mr-3 text-green-600" />
                  <div>
                    <div className="font-light text-gray-800">
                      {option.name}
                    </div>
                    <div className="text-sm text-gray-600 font-light">
                      {option.description}
                    </div>
                    <div className="text-xs text-green-600 font-light">
                      {option.duration}
                    </div>
                  </div>
                </div>
                <div className="text-lg font-light text-green-700">
                  {option.price === 0
                    ? "Free"
                    : `Rs. ${option.price.toLocaleString()}`}
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>

      <div className="flex justify-end mt-8">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onNext}
          className="bg-green-600 text-white px-8 py-3 font-light tracking-[0.1em] text-sm hover:bg-green-700 transition-all duration-500"
        >
          Continue to Payment
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ShippingForm;
