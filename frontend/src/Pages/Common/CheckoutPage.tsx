// CheckoutPage.tsx (Refactored Main Component)
import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useCart } from "../../../Context/CartContext";

// Component imports
import CheckoutHeader from "../../Components/Common/Checkout/CheckoutHeader";
import ProgressSteps from "../../Components/Common/Checkout/ProgressSteps";
import ShippingForm from "../../Components/Common/Checkout/ShippingForm";
import PaymentForm from "../../Components/Common/Checkout/PaymentForm";
import OrderComplete from "../../Components/Common/Checkout/OrderComplete";
import OrderSummary from "../../Components/Common/Checkout/OrderSummary";

// Hook imports
import { useCheckoutForm } from "./hooks/useCheckoutForm";
import { useCheckoutValidation } from "./hooks/useCheckoutValidation";

// Utility imports
import { shippingOptions, createOrderData } from "./utils/checkoutHelpers";

// Type imports
import { CheckoutPageProps } from "../../Types/checkout";

const CheckoutPage: React.FC<CheckoutPageProps> = ({
  onBack,
  onOrderComplete,
}) => {
  const { items, totalPrice, totalCarbonFootprint, clearCart } = useCart();
  const { formData, handleInputChange, resetForm } = useCheckoutForm();
  const { errors, validateStep, clearError } = useCheckoutValidation();

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedShipping = shippingOptions.find(
    (opt) => opt.id === formData.shippingMethod
  );

  const handleInputChangeWithValidation = (field: string, value: string) => {
    handleInputChange(field, value);
    clearError(field);
  };

  const handleNext = () => {
    if (validateStep(currentStep, formData)) {
      setCurrentStep((prev) => Math.min(prev + 1, 3));
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(2, formData)) return;

    setIsSubmitting(true);

    // Simulate order processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const orderData = createOrderData(
      items,
      totalPrice,
      totalCarbonFootprint,
      formData,
      selectedShipping
    );

    if (onOrderComplete) {
      onOrderComplete(orderData);
    }

    clearCart();
    setCurrentStep(3);
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50/30 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <CheckoutHeader onBack={onBack} />

        {/* Progress Steps */}
        <ProgressSteps currentStep={currentStep} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {/* Step 1: Shipping Information */}
              {currentStep === 1 && (
                <ShippingForm
                  formData={formData}
                  errors={errors}
                  onInputChange={handleInputChangeWithValidation}
                  onNext={handleNext}
                />
              )}

              {/* Step 2: Payment Information */}
              {currentStep === 2 && (
                <PaymentForm
                  formData={formData}
                  errors={errors}
                  isSubmitting={isSubmitting}
                  onInputChange={handleInputChangeWithValidation}
                  onPrevious={handlePrevious}
                  onSubmit={handleSubmit}
                />
              )}

              {/* Step 3: Order Complete */}
              {currentStep === 3 && (
                <OrderComplete selectedShipping={selectedShipping} />
              )}
            </AnimatePresence>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <OrderSummary
              items={items}
              totalPrice={totalPrice}
              totalCarbonFootprint={totalCarbonFootprint}
              selectedShipping={selectedShipping}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
