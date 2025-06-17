import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronRight,
  ShoppingCart,
  Package,
  Database,
  User,
  AlertCircle,
  CheckCircle,
  Minus,
  Plus,
  X,
} from "lucide-react";

const CartFlowDiagrams = () => {
  const [activeFlow, setActiveFlow] = useState("add-to-cart");

  const FlowStep = ({
    icon: Icon,
    title,
    description,
    status = "default",
    delay = 0,
  }) => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.5 }}
      className={`flex items-center p-4 rounded-lg border-2 ${
        status === "success"
          ? "border-green-200 bg-green-50"
          : status === "error"
          ? "border-red-200 bg-red-50"
          : status === "warning"
          ? "border-amber-200 bg-amber-50"
          : "border-green-100 bg-white/90"
      } backdrop-blur-sm`}
    >
      <div
        className={`p-2 rounded-lg mr-4 ${
          status === "success"
            ? "bg-green-100 text-green-600"
            : status === "error"
            ? "bg-red-100 text-red-600"
            : status === "warning"
            ? "bg-amber-100 text-amber-600"
            : "bg-green-100 text-green-600"
        }`}
      >
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1">
        <h3 className="font-light text-green-800 tracking-wider">{title}</h3>
        <p className="text-sm text-gray-600 mt-1">{description}</p>
      </div>
    </motion.div>
  );

  const Arrow = ({ delay = 0 }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.3 }}
      className="flex justify-center my-2"
    >
      <ChevronRight className="w-6 h-6 text-green-600" />
    </motion.div>
  );

  const flows = {
    "add-to-cart": {
      title: "Add to Cart Flow",
      description: "What happens when a user adds a product to their cart",
      steps: [
        {
          icon: User,
          title: "User Action",
          description: 'User clicks "Add to Cart" button on product page',
          delay: 0,
        },
        {
          icon: ShoppingCart,
          title: "Frontend Request",
          description:
            "POST /api/cart/{userId}/add with productId and quantity",
          delay: 0.2,
        },
        {
          icon: Package,
          title: "Product Validation",
          description:
            "Cart service calls Product service to get current details",
          delay: 0.4,
        },
        {
          icon: AlertCircle,
          title: "Stock Check",
          description: "Verifies product is active and has sufficient stock",
          delay: 0.6,
          status: "warning",
        },
        {
          icon: Database,
          title: "Save to Database",
          description: "Adds item to user's cart or updates existing quantity",
          delay: 0.8,
          status: "success",
        },
        {
          icon: CheckCircle,
          title: "Return Updated Cart",
          description: "Sends back complete cart with product details",
          delay: 1.0,
          status: "success",
        },
      ],
    },
    "view-cart": {
      title: "View Cart Flow",
      description: "How the cart page displays current cart contents",
      steps: [
        {
          icon: User,
          title: "User Navigation",
          description: "User visits cart page or opens cart sidebar",
          delay: 0,
        },
        {
          icon: ShoppingCart,
          title: "Fetch Cart",
          description: "GET /api/cart/{userId} to retrieve user's cart",
          delay: 0.2,
        },
        {
          icon: Database,
          title: "Load Cart Data",
          description: "Cart service retrieves cart items from database",
          delay: 0.4,
        },
        {
          icon: Package,
          title: "Enrich with Products",
          description: "For each item, fetches current product details",
          delay: 0.6,
        },
        {
          icon: AlertCircle,
          title: "Price/Stock Check",
          description: "Compares stored price with current price, checks stock",
          delay: 0.8,
          status: "warning",
        },
        {
          icon: CheckCircle,
          title: "Display Cart",
          description:
            "Shows cart with images, names, current prices, and totals",
          delay: 1.0,
          status: "success",
        },
      ],
    },
    "update-quantity": {
      title: "Update Quantity Flow",
      description: "Process when user changes item quantity in cart",
      steps: [
        {
          icon: User,
          title: "Quantity Change",
          description: "User clicks [+] or [-] buttons or enters new quantity",
          delay: 0,
        },
        {
          icon: ShoppingCart,
          title: "Update Request",
          description:
            "PUT /api/cart/{userId}/item/{productId} with new quantity",
          delay: 0.2,
        },
        {
          icon: Package,
          title: "Stock Validation",
          description: "Checks if requested quantity is available in stock",
          delay: 0.4,
          status: "warning",
        },
        {
          icon: Database,
          title: "Update Database",
          description: "Saves new quantity or removes item if quantity = 0",
          delay: 0.6,
        },
        {
          icon: CheckCircle,
          title: "Recalculate Totals",
          description: "Updates subtotal, total, and item count",
          delay: 0.8,
          status: "success",
        },
        {
          icon: CheckCircle,
          title: "Return Updated Cart",
          description: "Sends back refreshed cart data to frontend",
          delay: 1.0,
          status: "success",
        },
      ],
    },
  };

  const currentFlow = flows[activeFlow];

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-green-50 to-emerald-25 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="font-light text-4xl text-green-800 tracking-wider mb-4">
          Cart Microservice Flows
        </h1>
        <p className="text-gray-600 leading-relaxed">
          Interactive diagrams showing how your cart service handles different
          user actions
        </p>
      </motion.div>

      {/* Flow Selector */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-wrap gap-4 justify-center mb-8"
      >
        {Object.entries(flows).map(([key, flow]) => (
          <motion.button
            key={key}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveFlow(key)}
            className={`px-6 py-3 rounded-lg font-light tracking-wider transition-all duration-300 ${
              activeFlow === key
                ? "bg-green-600 text-white shadow-lg"
                : "bg-white/90 text-green-800 hover:bg-green-100 border border-green-200"
            }`}
          >
            {flow.title}
          </motion.button>
        ))}
      </motion.div>

      {/* Current Flow Diagram */}
      <motion.div
        key={activeFlow}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white/95 backdrop-blur-sm rounded-lg p-8 border border-green-100 shadow-lg"
      >
        <div className="text-center mb-8">
          <h2 className="font-light text-2xl text-green-800 tracking-wider mb-2">
            {currentFlow.title}
          </h2>
          <p className="text-gray-600">{currentFlow.description}</p>
        </div>

        <div className="space-y-2">
          {currentFlow.steps.map((step, index) => (
            <div key={index}>
              <FlowStep {...step} />
              {index < currentFlow.steps.length - 1 && (
                <Arrow delay={step.delay + 0.1} />
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Data Structure Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="mt-8 bg-white/95 backdrop-blur-sm rounded-lg p-6 border border-green-100"
      >
        <h3 className="font-light text-xl text-green-800 tracking-wider mb-4 flex items-center">
          <Database className="w-6 h-6 mr-2" />
          Sample Cart Data Structure
        </h3>
        <div className="bg-gray-50 rounded-lg p-4 overflow-x-auto">
          <pre className="text-sm text-gray-700 font-mono">
            {`{
  "userId": "user123",
  "items": [
    {
      "productId": "bamboo-utensils-001",
      "quantity": 2,
      "priceAtAdd": 24.99,
      "addedAt": "2024-01-15T10:30:00Z",
      "product": {
        "name": "Bamboo Utensil Set",
        "price": 24.99,
        "stock": 48,
        "imageUrl": "/images/bamboo-utensils.jpg",
        "ecoRating": 5
      }
    }
  ],
  "subtotal": 49.98,
  "shipping": 5.00,
  "total": 54.98,
  "totalItems": 2
}`}
          </pre>
        </div>
      </motion.div>

      {/* Key Features */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4 }}
        className="mt-8 grid md:grid-cols-2 gap-6"
      >
        <div className="bg-white/95 backdrop-blur-sm rounded-lg p-6 border border-green-100">
          <h3 className="font-light text-lg text-green-800 tracking-wider mb-4 flex items-center">
            <CheckCircle className="w-5 h-5 mr-2" />
            Key Benefits
          </h3>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span>Real-time stock validation prevents overselling</span>
            </li>
            <li className="flex items-start">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span>Always shows current product prices and details</span>
            </li>
            <li className="flex items-start">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span>Automatic total calculations with shipping</span>
            </li>
            <li className="flex items-start">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span>Seamless integration with product catalog</span>
            </li>
          </ul>
        </div>

        <div className="bg-white/95 backdrop-blur-sm rounded-lg p-6 border border-green-100">
          <h3 className="font-light text-lg text-green-800 tracking-wider mb-4 flex items-center">
            <Package className="w-5 h-5 mr-2" />
            Technical Features
          </h3>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span>Independent microservice architecture</span>
            </li>
            <li className="flex items-start">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span>RESTful API with consistent response format</span>
            </li>
            <li className="flex items-start">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span>MongoDB for flexible cart data storage</span>
            </li>
            <li className="flex items-start">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span>Error handling and validation at every step</span>
            </li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

export default CartFlowDiagrams;
