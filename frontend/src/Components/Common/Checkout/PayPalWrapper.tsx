// Create a separate PayPal wrapper component to isolate PayPal buttons from parent re-renders
import React, { memo, useCallback } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { Loader2 } from "lucide-react";

interface PayPalWrapperProps {
  onCreateOrder: () => Promise<string>;
  onApprove: (data: { orderID: string }) => Promise<void>;
  onError: (error: any) => void;
  onCancel: () => void;
  disabled: boolean;
  isProcessing: boolean;
  processingMessage?: string;
}

// Memo to prevent unnecessary re-renders
const PayPalWrapper = memo<PayPalWrapperProps>(
  ({
    onCreateOrder,
    onApprove,
    onError,
    onCancel,
    disabled,
    isProcessing,
    processingMessage = "Processing payment...",
  }) => {
    console.log(
      "🔄 [PayPalWrapper] Rendering with disabled:",
      disabled,
      "processing:",
      isProcessing
    );

    // Wrap handlers to add logging and error boundaries
    const handleCreateOrder = useCallback(async () => {
      console.log("🚀 [PayPalWrapper] Creating order...");
      try {
        const orderId = await onCreateOrder();
        console.log("✅ [PayPalWrapper] Order created:", orderId);
        return orderId;
      } catch (error) {
        console.error("❌ [PayPalWrapper] Create order failed:", error);
        throw error;
      }
    }, [onCreateOrder]);

    const handleApprove = useCallback(
      async (data: { orderID: string }) => {
        console.log("💳 [PayPalWrapper] Approving payment:", data.orderID);
        try {
          await onApprove(data);
          console.log("✅ [PayPalWrapper] Payment approved successfully");
        } catch (error) {
          console.error("❌ [PayPalWrapper] Payment approval failed:", error);
          throw error;
        }
      },
      [onApprove]
    );

    const handleError = useCallback(
      (error: any) => {
        console.error("💥 [PayPalWrapper] PayPal error:", error);
        onError(error);
      },
      [onError]
    );

    const handleCancel = useCallback(() => {
      console.log("❌ [PayPalWrapper] Payment cancelled");
      onCancel();
    }, [onCancel]);

    // Show loading state during processing
    if (isProcessing) {
      return (
        <div className="max-w-md mx-auto text-center py-8">
          <Loader2 className="w-6 h-6 animate-spin mx-auto mb-3 text-blue-600" />
          <p className="text-sm text-gray-600 font-light">
            {processingMessage}
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Please don't close this window
          </p>
        </div>
      );
    }

    return (
      <div className="max-w-md mx-auto">
        <PayPalButtons
          createOrder={handleCreateOrder}
          onApprove={handleApprove}
          onError={handleError}
          onCancel={handleCancel}
          disabled={disabled}
          style={{
            layout: "vertical",
            color: "blue",
            shape: "rect",
            label: "pay",
            height: 50,
          }}
          // Force a stable key to prevent unnecessary unmounting
          key="stable-paypal-buttons"
        />
      </div>
    );
  }
);

PayPalWrapper.displayName = "PayPalWrapper";

export default PayPalWrapper;
