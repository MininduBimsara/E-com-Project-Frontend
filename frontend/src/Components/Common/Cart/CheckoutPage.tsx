import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  CreditCard,
  Truck,
  Shield,
  Leaf,
  MapPin,
  User,
  Mail,
  Phone,
  Lock,
  Calendar,
  ChevronDown,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import { useCart } from "../context/CartContext";

interface CheckoutPageProps {
  onBack?: () => void;
  onOrderComplete?: (orderData: any) => void;
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({
  onBack,
  onOrderComplete,
}) => {
  const { items, totalPrice, totalCarbonFootprint, clearCart } = useCart();

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Shipping Information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    province: "",

    // Payment Information
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",

    // Options
    shippingMethod: "standard",
    paymentMethod: "card",
    saveInfo: false,
    marketing: false,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const shippingOptions = [
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

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (step === 1) {
      if (!formData.firstName.trim())
        newErrors.firstName = "First name is required";
      if (!formData.lastName.trim())
        newErrors.lastName = "Last name is required";
      if (!formData.email.trim()) newErrors.email = "Email is required";
      if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
      if (!formData.address.trim()) newErrors.address = "Address is required";
      if (!formData.city.trim()) newErrors.city = "City is required";
      if (!formData.postalCode.trim())
        newErrors.postalCode = "Postal code is required";
      if (!formData.province) newErrors.province = "Province is required";
    }

    if (step === 2) {
      if (!formData.cardNumber.trim())
        newErrors.cardNumber = "Card number is required";
      if (!formData.expiryDate.trim())
        newErrors.expiryDate = "Expiry date is required";
      if (!formData.cvv.trim()) newErrors.cvv = "CVV is required";
      if (!formData.cardName.trim())
        newErrors.cardName = "Cardholder name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 3));
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(2)) return;

    setIsSubmitting(true);

    // Simulate order processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const orderData = {
      id: `ORD-${Date.now()}`,
      items,
      total: totalPrice + (formData.shippingMethod === "express" ? 500 : 0),
      shippingInfo: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        postalCode: formData.postalCode,
        province: formData.province,
      },
      shippingMethod: formData.shippingMethod,
      carbonFootprint: totalCarbonFootprint,
      date: new Date().toISOString(),
    };

    if (onOrderComplete) {
      onOrderComplete(orderData);
    }

    clearCart();
    setCurrentStep(3);
    setIsSubmitting(false);
  };

  const selectedShipping = shippingOptions.find(
    (opt) => opt.id === formData.shippingMethod
  );
  const finalTotal = totalPrice + (selectedShipping?.price || 0);

  const stepVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50/30 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
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

        {/* Progress Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <div className="flex items-center space-x-8">
            {[
              { number: 1, title: "Shipping", icon: Truck },
              { number: 2, title: "Payment", icon: CreditCard },
              { number: 3, title: "Complete", icon: CheckCircle },
            ].map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-500 ${
                    currentStep >= step.number
                      ? "bg-green-600 border-green-600 text-white"
                      : "bg-white border-gray-300 text-gray-400"
                  }`}
                >
                  <step.icon className="w-5 h-5" />
                </div>
                <div className="ml-3">
                  <div
                    className={`text-sm font-light tracking-wide ${
                      currentStep >= step.number
                        ? "text-green-700"
                        : "text-gray-400"
                    }`}
                  >
                    {step.title}
                  </div>
                </div>
                {index < 2 && (
                  <div
                    className={`w-16 h-px ml-8 transition-colors duration-500 ${
                      currentStep > step.number ? "bg-green-600" : "bg-gray-300"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {/* Step 1: Shipping Information */}
              {currentStep === 1 && (
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
                            onChange={(e) =>
                              handleInputChange("firstName", e.target.value)
                            }
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
                            onChange={(e) =>
                              handleInputChange("email", e.target.value)
                            }
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
                            onChange={(e) =>
                              handleInputChange("city", e.target.value)
                            }
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
                            onChange={(e) =>
                              handleInputChange("lastName", e.target.value)
                            }
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
                            onChange={(e) =>
                              handleInputChange("phone", e.target.value)
                            }
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
                            onChange={(e) =>
                              handleInputChange("postalCode", e.target.value)
                            }
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
                              onChange={(e) =>
                                handleInputChange("province", e.target.value)
                              }
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
                        onChange={(e) =>
                          handleInputChange("address", e.target.value)
                        }
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
                                  handleInputChange(
                                    "shippingMethod",
                                    e.target.value
                                  )
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
                      onClick={handleNext}
                      className="bg-green-600 text-white px-8 py-3 font-light tracking-[0.1em] text-sm hover:bg-green-700 transition-all duration-500"
                    >
                      Continue to Payment
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Payment Information */}
              {currentStep === 2 && (
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
                          onChange={(e) =>
                            handleInputChange("cardNumber", e.target.value)
                          }
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
                          onChange={(e) =>
                            handleInputChange("expiryDate", e.target.value)
                          }
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
                          onChange={(e) =>
                            handleInputChange("cvv", e.target.value)
                          }
                          className={`w-full pl-10 pr-4 py-3 border rounded-xl font-light focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300 ${
                            errors.cvv
                              ? "border-red-300 bg-red-50/30"
                              : "border-gray-200 bg-white/50"
                          }`}
                          placeholder="123"
                        />
                      </div>
                      {errors.cvv && (
                        <p className="text-red-500 text-xs mt-1 font-light">
                          {errors.cvv}
                        </p>
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
                          onChange={(e) =>
                            handleInputChange("cardName", e.target.value)
                          }
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
                        Your payment information is secured with 256-bit SSL
                        encryption
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between mt-8">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handlePrevious}
                      className="border border-gray-300 text-gray-600 px-8 py-3 font-light tracking-[0.1em] text-sm hover:border-gray-400 transition-all duration-500"
                    >
                      Back to Shipping
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleSubmit}
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
              )}

              {/* Step 3: Order Complete */}
              {currentStep === 3 && (
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
                    Thank you for your sustainable purchase. Your order has been
                    confirmed and will be processed shortly.
                  </p>

                  <div className="bg-green-50/80 border border-green-100 rounded-xl p-6 mb-8">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600 font-light">
                          Order ID:
                        </span>
                        <div className="font-medium text-gray-800">
                          ORD-{Date.now()}
                        </div>
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
              )}
            </AnimatePresence>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
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
                      <div className="text-xs text-gray-500">
                        Qty: {item.quantity}
                      </div>
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
                    <span className="text-lg font-light text-gray-800">
                      Total
                    </span>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
