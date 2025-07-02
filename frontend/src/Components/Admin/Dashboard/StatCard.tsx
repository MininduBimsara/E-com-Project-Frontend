import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { StatCardProps } from "../types/AdminTypes";

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  gradient,
  status,
  change,
  changeType = "increase",
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="relative bg-white/95 backdrop-blur-xl rounded-2xl p-6 shadow-sm border border-green-100/50 hover:shadow-lg transition-all duration-300 group"
  >
    {/* Background Pattern */}
    <div className="absolute top-0 right-0 w-20 h-20 opacity-5">
      <div
        className={`w-full h-full bg-gradient-to-br ${gradient} rounded-full transform translate-x-4 -translate-y-4`}
      ></div>
    </div>

    <div className="relative z-10">
      <div className="flex items-center justify-between mb-4">
        <div
          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} p-0.5 group-hover:scale-110 transition-transform duration-300`}
        >
          <div className="w-full h-full bg-white rounded-xl flex items-center justify-center">
            <Icon className="w-6 h-6 text-gray-700" />
          </div>
        </div>
        {status && (
          <div
            className={`w-3 h-3 rounded-full ${
              status === "available"
                ? "bg-green-500"
                : status === "unavailable"
                ? "bg-red-500"
                : "bg-yellow-500"
            }`}
          ></div>
        )}
      </div>

      <div className="space-y-2">
        <p className="text-sm font-light text-gray-600 tracking-wide">
          {title}
        </p>
        <p className="text-2xl font-light text-gray-900">
          {typeof value === "number" ? value.toLocaleString() : value}
        </p>
        {change && (
          <p
            className={`text-xs flex items-center ${
              changeType === "increase" ? "text-green-600" : "text-red-600"
            }`}
          >
            {changeType === "increase" ? (
              <ArrowUpRight className="w-3 h-3 mr-1" />
            ) : (
              <ArrowDownRight className="w-3 h-3 mr-1" />
            )}
            {change}
          </p>
        )}
      </div>
    </div>
  </motion.div>
);

export default StatCard;
