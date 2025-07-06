import React from "react";
import { motion } from "framer-motion";
import { X, Package, Star, TrendingUp, Calendar } from "lucide-react";
import StatusBadge from "./StatusBadge";
import { type ProductModalProps } from "../../../Types/adminTypes";

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-light text-gray-900">Product Details</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Product Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-blue-100 rounded-2xl flex items-center justify-center">
            <Package className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-600 font-medium">
              Product Name
            </label>
            <p className="font-medium text-gray-900 mt-1 text-lg">
              {product.name}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-600 font-medium">Price</label>
              <p className="font-medium text-gray-900 mt-1">
                Rs. {product.price.toLocaleString()}
              </p>
            </div>
            <div>
              <label className="text-sm text-gray-600 font-medium">
                Category
              </label>
              <p className="font-medium text-gray-900 mt-1 capitalize">
                {product.category}
              </p>
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-600 font-medium">Status</label>
            <div className="mt-2">
              <StatusBadge status={product.status} />
            </div>
          </div>

          {/* Stock Status */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600 font-medium">
                Current Stock
              </span>
              <span
                className={`text-lg font-medium ${
                  product.stock === 0
                    ? "text-red-600"
                    : product.stock < 10
                    ? "text-yellow-600"
                    : "text-green-600"
                }`}
              >
                {product.stock} units
              </span>
            </div>
            {product.stock < 10 && product.stock > 0 && (
              <p className="text-xs text-yellow-600 bg-yellow-50 px-2 py-1 rounded">
                ⚠️ Low stock warning
              </p>
            )}
            {product.stock === 0 && (
              <p className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded">
                🚫 Out of stock
              </p>
            )}
          </div>

          {/* Performance Metrics */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                <p className="text-2xl font-light text-green-600">
                  {product.sold || 0}
                </p>
              </div>
              <p className="text-sm text-gray-600">Units Sold</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <Star className="w-4 h-4 text-yellow-500 mr-1" />
                <p className="text-2xl font-light text-yellow-600">
                  {product.rating || "N/A"}
                </p>
              </div>
              <p className="text-sm text-gray-600">Rating</p>
            </div>
          </div>

          {/* Revenue Calculation */}
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-green-700 font-medium">
                Total Revenue
              </span>
              <span className="text-lg font-medium text-green-700">
                Rs. {((product.sold || 0) * product.price).toLocaleString()}
              </span>
            </div>
            <p className="text-xs text-green-600 mt-1">
              Based on {product.sold || 0} units sold
            </p>
          </div>

          {/* Timestamps */}
          <div className="pt-4 border-t border-gray-200">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 text-gray-600 mr-2" />
              <div>
                <label className="text-sm text-gray-600 font-medium">
                  Added On
                </label>
                <p className="font-medium text-gray-900">
                  {new Date(product.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3 mt-8">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-light tracking-wide"
          >
            Edit Product
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors font-light tracking-wide"
          >
            View Analytics
          </motion.button>
        </div>

        {/* Stock Update Section */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <label className="text-sm text-gray-600 font-medium mb-2 block">
            Update Stock
          </label>
          <div className="flex space-x-2">
            <input
              type="number"
              placeholder="New stock quantity"
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm"
              min="0"
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-light"
            >
              Update
            </motion.button>
          </div>
        </div>

        {/* Status Update Section */}
        <div className="mt-4">
          <label className="text-sm text-gray-600 font-medium mb-2 block">
            Update Status
          </label>
          <div className="flex space-x-2">
            <select className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm">
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="out_of_stock">Out of Stock</option>
              <option value="discontinued">Discontinued</option>
            </select>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm font-light"
            >
              Update
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProductModal;
