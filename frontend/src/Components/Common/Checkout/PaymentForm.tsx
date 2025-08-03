import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Shield,
  Loader2,
  CheckCircle,
  AlertCircle,
  CreditCard,
} from "lucide-react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  createPayPalOrder,
  capturePayPalPayment,
} from "../../../Redux/Thunks/paymentThunks";
import { createOrder } from "../../../Redux/Thunks/orderThunks";
import { useCart } from "../../../Context/CartContext";
import type { AppDispatch, RootState } from "../../../Redux/Store/store";
import type { FormData } from "../../../Types/checkout";

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
  const [paypalStatus, setPaypalStatus] = useState<
    "idle" | "processing" | "success" | "error"
  >("idle");
  const [paypalError, setPaypalError] = useState<string>("");
  const [orderId, setOrderId] = useState<string>("");

  // Redux loading/error states
  const { loading: paymentLoading } = useSelector(
    (state: RootState) => state.payment
  );
  const { loading: orderLoading } = useSelector(
    (state: RootState) => state.orders
  );
  const isLoading = isSubmitting || paymentLoading || orderLoading;

  // Helper: Map cart items to OrderItem type
  const mapCartItemsToOrderItems = () =>
    items.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
      priceAtOrder: item.price,
      productName: item.name,
      productImageUrl: item.image,
    }));

  // PayPal handlers
  const handleCreatePayPalOrder = async () => {
    try {
      setPaypalStatus("processing");
      setPaypalError("");

      // Create order first (with correct payload)
      const orderData = {
        items: mapCartItemsToOrderItems(),
        shippingAddress: {
          street: formData.address,
          city: formData.city,
          state: formData.province,
          zipCode: formData.postalCode,
          country: "LK", // Sri Lanka
        },
        paymentMethod: "paypal",
      };

      const order = await dispatch(createOrder(orderData)).unwrap();
      setOrderId(order._id);

      // Create PayPal order
      const paypalOrder = await dispatch(
        createPayPalOrder({ orderId: order._id, amount: totalPrice })
      ).unwrap();

      return paypalOrder.paypalOrderId;
    } catch (error) {
      setPaypalError(
        (error as Error)?.message || "Failed to create PayPal order"
      );
      setPaypalStatus("error");
      throw error;
    }
  };

  const handleApprovePayPal = async (data: { orderID: string }) => {
    try {
      setPaypalStatus("processing");

      // Capture the payment
      const paymentResult = await dispatch(
        capturePayPalPayment({ orderId, paypalOrderId: data.orderID })
      ).unwrap();

      setPaypalStatus("success");
      clearCart();

      if (onOrderComplete) {
        onOrderComplete(paymentResult);
      }

      navigate("/order-success", {
        state: {
          orderId: orderId,
          paymentId: paymentResult.payment._id,
        },
      });
    } catch (error) {
      setPaypalError((error as Error)?.message || "PayPal payment failed");
      setPaypalStatus("error");
    }
  };

  const handlePayPalError = (error: any) => {
    console.error("PayPal Error:", error);
    setPaypalError("PayPal payment failed. Please try again.");
    setPaypalStatus("error");
  };

  const handlePayPalCancel = () => {
    setPaypalStatus("idle");
    setPaypalError("");
  };

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

      {/* PayPal Status Messages */}
      {paypalStatus !== "idle" && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mb-6 p-4 rounded-xl border ${
            paypalStatus === "success"
              ? "bg-green-50 border-green-200 text-green-700"
              : paypalStatus === "error"
              ? "bg-red-50 border-red-200 text-red-700"
              : "bg-blue-50 border-blue-200 text-blue-700"
          }`}
        >
          <div className="flex items-center space-x-2">
            {paypalStatus === "processing" && (
              <Loader2 className="w-5 h-5 animate-spin" />
            )}
            {paypalStatus === "success" && <CheckCircle className="w-5 h-5" />}
            {paypalStatus === "error" && <AlertCircle className="w-5 h-5" />}
            <span className="font-light">
              {paypalStatus === "processing" && "Processing PayPal payment..."}
              {paypalStatus === "success" && "PayPal payment successful!"}
              {paypalStatus === "error" && paypalError}
            </span>
          </div>
        </motion.div>
      )}

      {/* PayPal Payment Section */}
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

        {/* PayPal Buttons */}
        {totalPrice > 0 && (
          <div className="max-w-md mx-auto">
            <PayPalButtons
              createOrder={handleCreatePayPalOrder}
              onApprove={handleApprovePayPal}
              onError={handlePayPalError}
              onCancel={handlePayPalCancel}
              disabled={isLoading || paypalStatus === "processing"}
              style={{
                layout: "vertical",
                color: "blue",
                shape: "rect",
                label: "pay",
                height: 50,
              }}
            />
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
          className="border border-gray-300 text-gray-600 px-8 py-3 font-light tracking-[0.1em] text-sm hover:border-gray-400 transition-all duration-500"
        >
          Back to Shipping
        </motion.button>

        <div className="text-sm font-light text-gray-600 flex items-center">
          Complete payment using PayPal button above
        </div>
      </div>
    </motion.div>
  );
};

export default PaymentForm;
