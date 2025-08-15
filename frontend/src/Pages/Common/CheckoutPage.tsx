// CheckoutPage.tsx - Comprehensive checkout with proper routing and debugging
import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import { useAppSelector } from "../../Redux/Store/hook";

// Component imports
import CheckoutHeader from "../../Components/Common/Checkout/CheckoutHeader";
import ProgressSteps from "../../Components/Common/Checkout/ProgressSteps";
import ShippingForm from "../../Components/Common/Checkout/ShippingForm";
import PaymentForm from "../../Components/Common/Checkout/PaymentForm";
import OrderComplete from "../../Components/Common/Checkout/OrderComplete";
import OrderSummary from "../../Components/Common/Checkout/OrderSummary";

// Hook imports
import { useCheckoutForm } from "../../hooks/useCheckoutForm";
import { useCheckoutValidation } from "../../hooks/useCheckoutValidation";

// Utility imports
import { shippingOptions, createOrderData } from "../../utils/checkoutHelpers";

// Type imports
import type { CheckoutPageProps } from "../../Types/checkout";

const CheckoutPage: React.FC<CheckoutPageProps> = ({
  onBack,
  onOrderComplete,
}) => {
  const navigate = useNavigate();
  const { items, totalPrice, totalCarbonFootprint, clearCart } = useCart();
  const { user, isAuthenticated } = useAppSelector((state) => state.user);
  const { formData, handleInputChange, resetForm } = useCheckoutForm();
  const { errors, validateStep, clearError } = useCheckoutValidation();

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  console.log("🛒 [CheckoutPage] Component rendered with:", {
    itemsCount: items.length,
    totalPrice,
    isAuthenticated,
    userId: user?.id || user?._id,
    currentStep,
  });

  // Check authentication and cart on mount
  useEffect(() => {
    console.log("🛒 [CheckoutPage] Mount effect - checking prerequisites");

    // Check if user is authenticated
    if (!isAuthenticated || !user) {
      console.log(
        "❌ [CheckoutPage] User not authenticated, redirecting to login"
      );
      navigate("/login?returnTo=/checkout", { replace: true });
      return;
    }

    // Check if cart has items
    if (!items || items.length === 0) {
      console.log("❌ [CheckoutPage] Cart is empty, redirecting to products");
      navigate("/products", { replace: true });
      return;
    }

    console.log("✅ [CheckoutPage] Prerequisites met, staying on checkout");
  }, [isAuthenticated, user, items, navigate]);

  const selectedShipping = shippingOptions.find(
    (opt) => opt.id === formData.shippingMethod
  );

  // PayPal configuration
  const paypalOptions = {
    clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID || "test",
    currency: "USD",
    intent: "capture" as const,
  };

  console.log("🛒 [CheckoutPage] PayPal config:", {
    clientId: paypalOptions.clientId?.substring(0, 10) + "...",
    currency: paypalOptions.currency,
  });

  const handleInputChangeWithValidation = (field: string, value: string) => {
    console.log("🛒 [CheckoutPage] Input change:", {
      field,
      value: value.substring(0, 20) + "...",
    });
    handleInputChange(field, value);
    clearError(field);
  };

  const handleNext = () => {
    console.log(
      "🛒 [CheckoutPage] handleNext called, current step:",
      currentStep
    );

    if (validateStep(currentStep, formData)) {
      const nextStep = Math.min(currentStep + 1, 3);
      console.log(
        "✅ [CheckoutPage] Validation passed, moving to step:",
        nextStep
      );
      setCurrentStep(nextStep);
    } else {
      console.log(
        "❌ [CheckoutPage] Validation failed, staying on step:",
        currentStep
      );
      console.log("❌ [CheckoutPage] Validation errors:", errors);
    }
  };

  const handlePrevious = () => {
    console.log(
      "🛒 [CheckoutPage] handlePrevious called, current step:",
      currentStep
    );
    const prevStep = Math.max(currentStep - 1, 1);
    console.log("🛒 [CheckoutPage] Moving to step:", prevStep);
    setCurrentStep(prevStep);
  };

  const handleSubmit = async () => {
    console.log("🛒 [CheckoutPage] handleSubmit called");

    if (!validateStep(2, formData)) {
      console.log("❌ [CheckoutPage] Payment step validation failed");
      return;
    }

    setIsSubmitting(true);
    console.log("🛒 [CheckoutPage] Starting order processing simulation...");

    try {
      // Simulate order processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const orderData = createOrderData(
        items,
        totalPrice,
        totalCarbonFootprint,
        formData,
        selectedShipping
      );

      console.log("✅ [CheckoutPage] Order data created:", {
        itemsCount: orderData.items?.length,
        total: orderData.total,
        shippingMethod: orderData.shippingMethod,
      });

      if (onOrderComplete) {
        console.log("🛒 [CheckoutPage] Calling onOrderComplete callback");
        onOrderComplete(orderData);
      }

      console.log("🛒 [CheckoutPage] Clearing cart and moving to completion");
      clearCart();
      setCurrentStep(3);
    } catch (error) {
      console.error("❌ [CheckoutPage] Order processing error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOrderComplete = (orderData: any) => {
    console.log(
      "🛒 [CheckoutPage] handleOrderComplete called with:",
      orderData
    );

    // Handle successful PayPal payment
    if (onOrderComplete) {
      console.log("🛒 [CheckoutPage] Calling parent onOrderComplete");
      onOrderComplete(orderData);
    }

    console.log("🛒 [CheckoutPage] Clearing cart and completing order");
    clearCart();
    setCurrentStep(3);
  };

  const handleBackToCart = () => {
    console.log("🛒 [CheckoutPage] handleBackToCart called");

    if (onBack) {
      console.log("🛒 [CheckoutPage] Using custom onBack handler");
      onBack();
    } else {
      console.log("🛒 [CheckoutPage] Navigating back to products");
      navigate("/products");
    }
  };

  // Show loading or redirect if prerequisites not met
  if (!isAuthenticated || !user) {
    console.log("🛒 [CheckoutPage] Rendering auth redirect state");
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50/30 to-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-light text-gray-800 mb-4">
            Authentication Required
          </h2>
          <p className="text-gray-600 mb-6">
            Please log in to continue with checkout
          </p>
          <button
            onClick={() => navigate("/login?returnTo=/checkout")}
            className="bg-green-600 text-white px-6 py-3 font-light tracking-wider text-sm hover:bg-green-700 transition-colors duration-300"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  if (!items || items.length === 0) {
    console.log("🛒 [CheckoutPage] Rendering empty cart state");
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50/30 to-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-light text-gray-800 mb-4">
            Your cart is empty
          </h2>
          <p className="text-gray-600 mb-6">
            Add some products to your cart before checking out
          </p>
          <button
            onClick={() => navigate("/products")}
            className="bg-green-600 text-white px-6 py-3 font-light tracking-wider text-sm hover:bg-green-700 transition-colors duration-300"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  console.log("🛒 [CheckoutPage] Rendering main checkout interface");

  return (
    <PayPalScriptProvider options={paypalOptions}>
      <div className="min-h-screen bg-gradient-to-b from-green-50/30 to-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <CheckoutHeader onBack={handleBackToCart} />

          {/* Progress Steps */}
          <ProgressSteps currentStep={currentStep} />

          {/* Debug Info in Development */}
          {process.env.NODE_ENV === "development" && (
            <div className="max-w-7xl mx-auto px-4 mb-6">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-yellow-800 mb-2">
                  Debug Info
                </h3>
                <div className="grid grid-cols-2 gap-4 text-xs text-yellow-700">
                  <div>Step: {currentStep}</div>
                  <div>Items: {items.length}</div>
                  <div>Total: Rs. {totalPrice}</div>
                  <div>User: {user?.username || "N/A"}</div>
                  <div>Shipping: {formData.shippingMethod}</div>
                  <div>Submitting: {isSubmitting ? "Yes" : "No"}</div>
                </div>
              </div>
            </div>
          )}

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
                    onOrderComplete={handleOrderComplete}
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
    </PayPalScriptProvider>
  );
};

export default CheckoutPage;
