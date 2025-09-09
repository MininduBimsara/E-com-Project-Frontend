import React, { useState, useCallback, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import { Shield, CheckCircle, AlertCircle, CreditCard } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  createPayPalOrder,
  capturePayPalPayment,
} from "../../../Redux/Thunks/paymentThunks";
import { createOrder } from "../../../Redux/Thunks/orderThunks";
import { useCart } from "../../../hooks/useCart";
import type { AppDispatch, RootState } from "../../../Redux/Store/store";
import type { FormData } from "../../../Types/checkout";
import PayPalWrapper from "./PayPalWrapper";

interface PaymentFormProps {
  formData: FormData;
  errors: { [key: string]: string };
  isSubmitting: boolean;
  onInputChange: (field: string, value: string) => void;
  onPrevious: () => void;
  onSubmit: () => void;
  onOrderComplete?: (orderData: any) => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({
  formData,
  errors,
  isSubmitting,
  onInputChange,
  onPrevious,
  onSubmit,
  onOrderComplete,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();

  // Simple state for tracking overall payment status
  const [paymentStatus, setPaymentStatus] = useState<{
    status: "idle" | "success" | "failed";
    message: string;
    orderId: string;
  }>({
    status: "idle",
    message: "",
    orderId: "",
  });

  // Ref to store current order ID across renders
  const currentOrderId = useRef<string>("");

  // Get Redux states
  const { loading: paymentLoading, error: paymentError } = useSelector(
    (state: RootState) => state.payment
  );
  const { loading: orderLoading, error: orderError } = useSelector(
    (state: RootState) => state.orders
  );

  // Memoized order data - only recreates when form data changes
  const orderData = useMemo(
    () => ({
      items: items.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
        priceAtOrder: item.price,
        productName: item.name,
        productImageUrl: item.image,
      })),
      shippingAddress: {
        street: formData.address,
        city: formData.city,
        state: formData.province,
        zipCode: formData.postalCode,
        country: "LK",
      },
      paymentMethod: "paypal",
    }),
    [
      items,
      formData.address,
      formData.city,
      formData.province,
      formData.postalCode,
    ]
  );

  // PayPal Create Order Handler
  const handleCreatePayPalOrder = useCallback(async (): Promise<string> => {
    try {
      console.log("Creating order for PayPal...");

      // Create order first
      const order = await dispatch(createOrder(orderData)).unwrap();
      const orderId = order._id;

      // Store order ID
      currentOrderId.current = orderId;
      setPaymentStatus((prev) => ({ ...prev, orderId }));

      console.log("Order created successfully:", orderId);

      // Create PayPal order
      const paypalOrder = await dispatch(
        createPayPalOrder({ orderId, amount: totalPrice })
      ).unwrap();

      console.log("PayPal order created:", paypalOrder.paypalOrderId);

      return paypalOrder.paypalOrderId;
    } catch (error) {
      console.error("Failed to create PayPal order:", error);
      const errorMessage =
        (error as Error)?.message || "Failed to create order";
      setPaymentStatus({
        status: "failed",
        message: errorMessage,
        orderId: currentOrderId.current,
      });
      throw error;
    }
  }, [dispatch, orderData, totalPrice]);

  // PayPal Approve Handler
  const handlePayPalApprove = useCallback(
    async (data: { orderID: string }) => {
      try {
        console.log("Processing PayPal approval...");

        const orderId = currentOrderId.current;
        if (!orderId) {
          throw new Error("Order ID not found");
        }

        // Capture PayPal payment
        const paymentResult = await dispatch(
          capturePayPalPayment({ orderId, paypalOrderId: data.orderID })
        ).unwrap();

        console.log("PayPal payment captured successfully");

        // Update status to success
        setPaymentStatus({
          status: "success",
          message: "Payment completed successfully!",
          orderId,
        });

        // Clear cart
        clearCart();

        // Call completion handler
        if (onOrderComplete) {
          onOrderComplete(paymentResult);
        }

        // Navigate to success page
        setTimeout(() => {
          navigate("/order-success", {
            state: {
              orderId: orderId,
              paymentId: paymentResult.payment._id,
            },
          });
        }, 2000);
      } catch (error) {
        console.error("PayPal payment capture failed:", error);
        const errorMessage =
          (error as Error)?.message || "Payment processing failed";
        setPaymentStatus({
          status: "failed",
          message: errorMessage,
          orderId: currentOrderId.current,
        });
      }
    },
    [dispatch, clearCart, onOrderComplete, navigate]
  );

  // PayPal Error Handler
  const handlePayPalError = useCallback((error: any) => {
    console.error("PayPal error:", error);
    setPaymentStatus({
      status: "failed",
      message: "PayPal payment failed. Please try again.",
      orderId: currentOrderId.current,
    });
  }, []);

  // PayPal Cancel Handler
  const handlePayPalCancel = useCallback(() => {
    console.log("PayPal payment cancelled by user");
    setPaymentStatus({
      status: "idle",
      message: "",
      orderId: "",
    });
    currentOrderId.current = "";
  }, []);

  // Reset payment status when trying again
  const handleTryAgain = useCallback(() => {
    setPaymentStatus({
      status: "idle",
      message: "",
      orderId: "",
    });
    currentOrderId.current = "";
  }, []);

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

      {/* Payment Status Messages */}
      {paymentStatus.status !== "idle" && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mb-6 p-4 rounded-xl border ${
            paymentStatus.status === "success"
              ? "bg-green-50 border-green-200 text-green-700"
              : "bg-red-50 border-red-200 text-red-700"
          }`}
        >
          <div className="flex items-center space-x-2">
            {paymentStatus.status === "success" && (
              <CheckCircle className="w-5 h-5" />
            )}
            {paymentStatus.status === "failed" && (
              <AlertCircle className="w-5 h-5" />
            )}
            <span className="font-light">{paymentStatus.message}</span>
          </div>
          {paymentStatus.status === "failed" && (
            <button
              onClick={handleTryAgain}
              className="mt-2 text-blue-600 hover:text-blue-700 text-sm font-light underline"
            >
              Try Again
            </button>
          )}
        </motion.div>
      )}

      {/* Redux Error Messages */}
      {(paymentError || orderError) && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 rounded-xl border bg-red-50 border-red-200 text-red-700"
        >
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-5 h-5" />
            <span className="font-light">{paymentError || orderError}</span>
          </div>
        </motion.div>
      )}

      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-lg font-light text-gray-800 mb-2">
            Complete your payment with PayPal
          </h3>
          <p className="text-sm font-light text-gray-600 mb-6">
            Secure checkout powered by PayPal. You can pay with your PayPal
            account or credit/debit card.
          </p>
        </div>

        {/* PayPal Payment Section */}
        {paymentStatus.status !== "success" && totalPrice > 0 && (
          <PayPalWrapper
            amount={totalPrice}
            disabled={isSubmitting || paymentLoading || orderLoading}
            onCreateOrder={handleCreatePayPalOrder}
            onApprove={handlePayPalApprove}
            onError={handlePayPalError}
            onCancel={handlePayPalCancel}
          />
        )}

        {/* Success Message */}
        {paymentStatus.status === "success" && (
          <div className="text-center py-8">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-light text-gray-800 mb-2">
              Payment Successful!
            </h3>
            <p className="text-gray-600 font-light">
              Redirecting to order confirmation...
            </p>
          </div>
        )}

        {/* Security Notice */}
        <div className="mt-8 p-4 bg-green-50/80 border border-green-100 rounded-xl">
          <div className="flex items-center justify-center text-green-700">
            <Shield className="w-5 h-5 mr-2" />
            <span className="text-sm font-light">
              Your payment is secured with PayPal's advanced encryption and
              fraud protection
            </span>
          </div>
        </div>

        {/* Payment Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="text-center p-4">
            <Shield className="w-8 h-8 mx-auto text-green-600 mb-2" />
            <h4 className="text-sm font-light text-gray-800 mb-1">
              Secure Payment
            </h4>
            <p className="text-xs text-gray-600 font-light">
              256-bit SSL encryption
            </p>
          </div>
          <div className="text-center p-4">
            <CheckCircle className="w-8 h-8 mx-auto text-green-600 mb-2" />
            <h4 className="text-sm font-light text-gray-800 mb-1">
              Buyer Protection
            </h4>
            <p className="text-xs text-gray-600 font-light">
              PayPal purchase protection
            </p>
          </div>
          <div className="text-center p-4">
            <CreditCard className="w-8 h-8 mx-auto text-green-600 mb-2" />
            <h4 className="text-sm font-light text-gray-800 mb-1">
              Multiple Options
            </h4>
            <p className="text-xs text-gray-600 font-light">
              PayPal or card payment
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-12 pt-6 border-t border-gray-100">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onPrevious}
          disabled={isSubmitting || paymentLoading || orderLoading}
          className="border border-gray-300 text-gray-600 px-8 py-3 font-light tracking-[0.1em] text-sm hover:border-gray-400 transition-all duration-500 disabled:opacity-50"
        >
          Back to Shipping
        </motion.button>

        <div className="text-sm font-light text-gray-600 flex items-center">
          {paymentStatus.status === "failed" ? (
            <span className="text-red-600">
              Please try again or contact support
            </span>
          ) : paymentStatus.status === "success" ? (
            <span className="text-green-600">
              Payment completed successfully!
            </span>
          ) : (
            <span>Complete payment using PayPal button above</span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default PaymentForm;
