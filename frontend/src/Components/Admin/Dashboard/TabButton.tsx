import React from "react";
import { motion } from "framer-motion";
import { type TabButtonProps } from "../../../Types/adminTypes";

const TabButton: React.FC<TabButtonProps> = ({
  id,
  label,
  icon: Icon,
  isActive,
  onClick,
  count,
}) => (
  <motion.button
    onClick={onClick}
    className={`relative flex items-center justify-between w-full px-6 py-3 font-light tracking-wide transition-all duration-300 rounded-lg mb-1 ${
      isActive
        ? "text-green-700 bg-green-50/80"
        : "text-gray-600 hover:text-green-700 hover:bg-green-50/40"
    }`}
    whileHover={{ x: 4 }}
  >
    <div className="flex items-center space-x-3">
      <Icon className="w-4 h-4" />
      <span>{label}</span>
    </div>
    {count !== undefined && (
      <span
        className={`text-xs px-2 py-1 rounded-full ${
          isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
        }`}
      >
        {count}
      </span>
    )}
    {isActive && (
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-1 bg-green-600 rounded-r"
        layoutId="activeTab"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />
    )}
  </motion.button>
);

export default TabButton;
