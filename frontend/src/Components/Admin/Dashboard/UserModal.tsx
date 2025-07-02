import React from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import StatusBadge from "../components/StatusBadge";
import { UserModalProps } from "../types/AdminTypes";

const UserModal: React.FC<UserModalProps> = ({ user, onClose }) => {
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
        className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-light text-gray-900">User Details</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Avatar */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full flex items-center justify-center">
            <span className="text-white text-xl font-medium">
              {user.username.charAt(0).toUpperCase()}
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-600 font-medium">
              Username
            </label>
            <p className="font-medium text-gray-900 mt-1">{user.username}</p>
          </div>
          <div>
            <label className="text-sm text-gray-600 font-medium">Email</label>
            <p className="font-medium text-gray-900 mt-1">{user.email}</p>
          </div>
          <div>
            <label className="text-sm text-gray-600 font-medium">Role</label>
            <p className="font-medium text-gray-900 mt-1 capitalize">
              {user.role}
            </p>
          </div>
          <div>
            <label className="text-sm text-gray-600 font-medium">Status</label>
            <div className="mt-2">
              <StatusBadge status={user.status} />
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
            <div className="text-center">
              <p className="text-2xl font-light text-green-600">
                {user.orders || 0}
              </p>
              <p className="text-sm text-gray-600">Total Orders</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-light text-green-600">
                Rs. {(user.totalSpent || 0).toLocaleString()}
              </p>
              <p className="text-sm text-gray-600">Total Spent</p>
            </div>
          </div>

          {/* Timestamps */}
          <div className="pt-4 border-t border-gray-200 space-y-3">
            <div>
              <label className="text-sm text-gray-600 font-medium">
                Member Since
              </label>
              <p className="font-medium text-gray-900 mt-1">
                {new Date(user.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <div>
              <label className="text-sm text-gray-600 font-medium">
                Last Login
              </label>
              <p className="font-medium text-gray-900 mt-1">
                {user.lastLoginAt
                  ? new Date(user.lastLoginAt).toLocaleString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "Never"}
              </p>
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
            Edit User
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors font-light tracking-wide"
          >
            View Orders
          </motion.button>
        </div>

        {/* Status Update Section */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <label className="text-sm text-gray-600 font-medium mb-2 block">
            Update Status
          </label>
          <div className="flex space-x-2">
            <select className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm">
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="banned">Banned</option>
            </select>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-light"
            >
              Update
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default UserModal;
