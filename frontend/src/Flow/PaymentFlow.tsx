import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PaymentFlowDocumentation = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedFlow, setSelectedFlow] = useState('paypal');
  const [showApiDetails, setShowApiDetails] = useState(false);

  // Payment flow steps for different methods
  const paymentFlows = {
    paypal: [
      {
        id: 1,
        title: "1. Initiate Payment",
        description: "User clicks 'Pay with PayPal' button",
        frontend: "dispatch(createPayPalOrder({ orderId, amount }))",
        backend: "POST /paypal/create-order",
        payload: {
          orderId: "ORDER_12345",
          amount: 99.99
        },
        response: {
          success: true,
          data: {
            orderId: "ORDER_12345",
            paypalOrderId: "PAYPAL_ORDER_789",
            links: [
              { href: "https://paypal.com/approve?token=...", rel: "approve", method: "GET" },
              { href: "https://api.paypal.com/capture", rel: "capture", method: "POST" }
            ]
          }
        },
        status: "pending"
      },
      {
        id: 2,
        title: "2. Create PayPal Order",
        description: "Backend creates order with PayPal API",
        frontend: "Waiting for backend response...",
        backend: "PayPal API: POST /v2/checkout/orders",
        payload: {
          intent: "CAPTURE",
          purchase_units: [{
            reference_id: "ORDER_12345",
            amount: { currency_code: "USD", value: "99.99" }
          }],
          application_context: {
            return_url: "https://yoursite.com/payment-success",
            cancel_url: "https://yoursite.com/checkout"
          }
        },
        response: {
          id: "PAYPAL_ORDER_789",
          status: "CREATED",
          links: [...]
        },
        status: "processing"
      },
      {
        id: 3,
        title: "3. Redirect to PayPal",
        description: "User is redirected to PayPal for approval",
        frontend: "window.location.href = approvalUrl",
        backend: "No backend call (user on PayPal site)",
        payload: "User authenticates and approves payment on PayPal",
        response: "PayPal redirects back with token parameter",
        status: "awaiting_approval"
      },
      {
        id: 4,
        title: "4. Return from PayPal",
        description: "User returns with approval token",
        frontend: "URLParams: ?token=PAYPAL_ORDER_789",
        backend: "No immediate call (waiting for capture)",
        payload: "Extract token from URL parameters",
        response: "Token extracted successfully",
        status: "approved"
      },
      {
        id: 5,
        title: "5. Capture Payment",
        description: "Frontend triggers payment capture",
        frontend: "dispatch(capturePayPalPayment({ orderId, paypalOrderId }))",
        backend: "POST /paypal/capture-order",
        payload: {
          orderId: "ORDER_12345",
          paypalOrderId: "PAYPAL_ORDER_789"
        },
        response: {
          success: true,
          message: "Payment captured successfully",
          data: {
            payment: {
              _id: "PAYMENT_456",
              transaction_id: "TXN-1234567890",
              payment_status: "completed",
              amount: 99.99
            },
            order: { status: "confirmed" }
          }
        },
        status: "completed"
      },
      {
        id: 6,
        title: "6. Update Order Status",
        description: "Backend updates order status in Order Service",
        frontend: "Payment completed state updated",
        backend: "PUT /api/orders/{orderId}/payment-confirmation",
        payload: {
          paymentStatus: "paid",
          status: "confirmed",
          paymentId: "TXN-1234567890",
          paymentMethod: "paypal"
        },
        response: {
          success: true,
          message: "Order status updated"
        },
        status: "finalized"
      }
    ],
    stripe: [
      {
        id: 1,
        title: "1. Create Payment Intent",
        description: "Initialize Stripe payment (Coming Soon)",
        frontend: "dispatch(createStripePayment({ orderId, amount }))",
        backend: "POST /stripe/create-payment-intent",
        payload: { orderId: "ORDER_12345", amount: 99.99 },
        response: { client_secret: "pi_xxx_secret_xxx" },
        status: "pending"
      },
      {
        id: 2,
        title: "2. Confirm Payment",
        description: "User enters card details and confirms",
        frontend: "stripe.confirmCardPayment(client_secret)",
        backend: "Stripe handles card processing",
        payload: "Card details and billing info",
        response: "Payment confirmation",
        status: "completed"
      }
    ]
  };

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
    processing: "bg-blue-100 text-blue-800 border-blue-300",
    awaiting_approval: "bg-purple-100 text-purple-800 border-purple-300",
    approved: "bg-green-100 text-green-800 border-green-300",
    completed: "bg-emerald-100 text-emerald-800 border-emerald-300",
    finalized: "bg-gray-100 text-gray-800 border-gray-300"
  };

  const currentFlow = paymentFlows[selectedFlow];
  const currentStep = currentFlow[activeStep];

  return (
    <div className="max-w-6xl mx-auto p-8 bg-white/95 backdrop-blur-sm">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-light text-green-800 tracking-wider mb-4">
          Payment Flow Documentation
        </h1>
        <div className="h-px bg-green-200 w-32 mx-auto mb-6"></div>
        <p className="text-gray-600 font-light text-lg">
          Interactive step-by-step guide to payment processing
        </p>
      </motion.div>

      {/* Flow Selector */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <h2 className="text-xl font-light text-gray-800 mb-4 tracking-wider">
          Select Payment Method
        </h2>
        <div className="flex space-x-4">
          {Object.keys(paymentFlows).map((flow) => (
            <button
              key={flow}
              onClick={() => {
                setSelectedFlow(flow);
                setActiveStep(0);
              }}
              className={`px-6 py-3 rounded-lg border-2 transition-all duration-300 font-light tracking-wider capitalize ${
                selectedFlow === flow
                  ? 'border-green-600 bg-green-50 text-green-800'
                  : 'border-gray-200 text-gray-600 hover:border-green-300'
              }`}
            >
              {flow}
              {flow === 'stripe' && <span className="ml-2 text-xs text-gray-400">(Coming Soon)</span>}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Progress Bar */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-light text-gray-800 tracking-wider">
            Progress: Step {activeStep + 1} of {currentFlow.length}
          </h3>
          <button
            onClick={() => setShowApiDetails(!showApiDetails)}
            className="px-4 py-2 text-sm border border-green-600 text-green-600 rounded hover:bg-green-50 transition-colors duration-300"
          >
            {showApiDetails ? 'Hide' : 'Show'} API Details
          </button>
        </div>
        <div className="flex space-x-2">
          {currentFlow.map((step, index) => (
            <div
              key={step.id}
              className={`flex-1 h-2 rounded-full cursor-pointer transition-all duration-300 ${
                index <= activeStep ? 'bg-green-600' : 'bg-gray-200'
              }`}
              onClick={() => setActiveStep(index)}
            />
          ))}
        </div>
      </motion.div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Step Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-1"
        >
          <h3 className="text-lg font-light text-gray-800 mb-4 tracking-wider">
            Steps Overview
          </h3>
          <div className="space-y-2">
            {currentFlow.map((step, index) => (
              <motion.div
                key={step.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveStep(index)}
                className={`p-4 rounded-lg border cursor-pointer transition-all duration-300 ${
                  index === activeStep
                    ? 'border-green-600 bg-green-50'
                    : 'border-gray-200 hover:border-green-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-800 text-sm">
                    {step.title}
                  </h4>
                  <span className={`px-2 py-1 rounded-full text-xs border ${statusColors[step.status]}`}>
                    {step.status}
                  </span>
                </div>
                <p className="text-xs text-gray-600 mt-1">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Step Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-2"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white border border-green-100 rounded-lg p-6"
            >
              {/* Step Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-light text-green-800 tracking-wider">
                    {currentStep.title}
                  </h2>
                  <p className="text-gray-600 font-light mt-1">
                    {currentStep.description}
                  </p>
                </div>
                <span className={`px-4 py-2 rounded-full text-sm border font-medium ${statusColors[currentStep.status]}`}>
                  {currentStep.status.replace('_', ' ')}
                </span>
              </div>

              {/* Frontend Action */}
              <div className="mb-6">
                <h3 className="text-lg font-light text-gray-800 mb-3 tracking-wider">
                  Frontend Action
                </h3>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <code className="text-blue-800 font-mono text-sm">
                    {currentStep.frontend}
                  </code>
                </div>
              </div>

              {/* Backend Call */}
              <div className="mb-6">
                <h3 className="text-lg font-light text-gray-800 mb-3 tracking-wider">
                  Backend API Call
                </h3>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <code className="text-green-800 font-mono text-sm">
                    {currentStep.backend}
                  </code>
                </div>
              </div>

              {/* API Details */}
              <AnimatePresence>
                {showApiDetails && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    {/* Request Payload */}
                    <div>
                      <h4 className="text-md font-light text-gray-800 mb-3 tracking-wider">
                        Request Payload
                      </h4>
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <pre className="text-gray-700 text-xs overflow-x-auto">
                          {JSON.stringify(currentStep.payload, null, 2)}
                        </pre>
                      </div>
                    </div>

                    {/* Response */}
                    <div>
                      <h4 className="text-md font-light text-gray-800 mb-3 tracking-wider">
                        Response
                      </h4>
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <pre className="text-gray-700 text-xs overflow-x-auto">
                          {JSON.stringify(currentStep.response, null, 2)}
                        </pre>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-100">
                <button
                  onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                  disabled={activeStep === 0}
                  className="px-6 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-light tracking-wider"
                >
                  Previous
                </button>

                <span className="text-sm text-gray-500 font-light">
                  {activeStep + 1} / {currentFlow.length}
                </span>

                <button
                  onClick={() => setActiveStep(Math.min(currentFlow.length - 1, activeStep + 1))}
                  disabled={activeStep === currentFlow.length - 1}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-light tracking-wider"
                >
                  Next
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Quick Reference */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-12 pt-8 border-t border-green-100"
      >
        <h3 className="text-xl font-light text-gray-800 mb-6 tracking-wider">
          Quick Reference
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h4 className="font-medium text-blue-800 mb-2">Redux Thunks</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• createPayPalOrder</li>
              <li>• capturePayPalPayment</li>
              <li>• fetchPaymentHistory</li>
              <li>• fetchPaymentDetails</li>
            </ul>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h4 className="font-medium text-green-800 mb-2">API Endpoints</h4>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• POST /paypal/create-order</li>
              <li>• POST /paypal/capture-order</li>
              <li>• GET /history</li>
              <li>• GET /:transactionId</li>
            </ul>
          </div>
          
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
            <h4 className="font-medium text-purple-800 mb-2">Payment States</h4>
            <ul className="text-sm text-purple-700 space-y-1">
              <li>• pending</li>
              <li>• processing</li>
              <li>• completed</li>
              <li>• failed</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentFlowDocumentation;