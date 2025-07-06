import React from "react";
import { motion } from "framer-motion";
import {
  Users,
  Package,
  ShoppingCart,
  DollarSign,
  Plus,
  Download,
  BarChart3,
  Star,
} from "lucide-react";
import StatCard from "./StatCard";
import { type SectionProps, type Activity } from "../../../Types/adminTypes";

const OverviewSection: React.FC<SectionProps> = ({
  stats,
  users = [],
  products = [],
  orders = [],
  onNavigateToTab,
}) => {
  // Recent activity data
  const recentActivities: Activity[] = [
    {
      action: "New order received",
      details: "Order #324 from Jane Smith",
      time: "2 minutes ago",
      type: "order",
      icon: ShoppingCart,
    },
    {
      action: "Product updated",
      details: "Organic Cotton T-Shirt stock updated",
      time: "15 minutes ago",
      type: "product",
      icon: Package,
    },
    {
      action: "User registered",
      details: "New customer: Mike Wilson",
      time: "1 hour ago",
      type: "user",
      icon: Users,
    },
    {
      action: "Payment received",
      details: "Rs. 5,200 from Order #323",
      time: "2 hours ago",
      type: "payment",
      icon: DollarSign,
    },
  ];

  return (
    <motion.div
      key="overview"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={stats?.users || 0}
          icon={Users}
          gradient="from-blue-500 to-cyan-500"
          status={stats?.status?.userService}
          change="+12% this month"
        />
        <StatCard
          title="Products"
          value={stats?.products || 0}
          icon={Package}
          gradient="from-green-500 to-emerald-500"
          status={stats?.status?.productService}
          change="+8% this month"
        />
        <StatCard
          title="Orders"
          value={stats?.orders || 0}
          icon={ShoppingCart}
          gradient="from-purple-500 to-pink-500"
          status={stats?.status?.orderService}
          change="+23% this month"
        />
        <StatCard
          title="Revenue"
          value={`Rs. ${(stats?.revenue || 0).toLocaleString()}`}
          icon={DollarSign}
          gradient="from-orange-500 to-red-500"
          change="+15% this month"
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-sm border border-green-100/50 p-6">
        <h3 className="text-xl font-light text-gray-900 mb-6 tracking-wide">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            onClick={() => onNavigateToTab?.("products")}
            className="p-4 text-left bg-green-50 rounded-xl border border-green-200 hover:bg-green-100 transition-colors"
          >
            <Plus className="w-6 h-6 text-green-600 mb-2" />
            <p className="font-medium text-gray-900">Add Product</p>
            <p className="text-sm text-gray-600">Create new product listing</p>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            onClick={() => onNavigateToTab?.("users")}
            className="p-4 text-left bg-blue-50 rounded-xl border border-blue-200 hover:bg-blue-100 transition-colors"
          >
            <Users className="w-6 h-6 text-blue-600 mb-2" />
            <p className="font-medium text-gray-900">Manage Users</p>
            <p className="text-sm text-gray-600">
              View and update user accounts
            </p>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            className="p-4 text-left bg-purple-50 rounded-xl border border-purple-200 hover:bg-purple-100 transition-colors"
          >
            <Download className="w-6 h-6 text-purple-600 mb-2" />
            <p className="font-medium text-gray-900">Export Reports</p>
            <p className="text-sm text-gray-600">Download analytics data</p>
          </motion.button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-sm border border-green-100/50 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-light text-gray-900 tracking-wide">
            Recent Activity
          </h3>
          <button className="text-sm text-green-600 hover:text-green-700 font-light tracking-wide">
            View All
          </button>
        </div>
        <div className="space-y-4">
          {recentActivities.map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  activity.type === "order"
                    ? "bg-green-100 text-green-600"
                    : activity.type === "product"
                    ? "bg-blue-100 text-blue-600"
                    : activity.type === "user"
                    ? "bg-purple-100 text-purple-600"
                    : "bg-orange-100 text-orange-600"
                }`}
              >
                <activity.icon className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">{activity.action}</p>
                <p className="text-sm text-gray-600">{activity.details}</p>
              </div>
              <span className="text-xs text-gray-500">{activity.time}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-sm border border-green-100/50 p-6">
          <h3 className="text-lg font-light text-gray-900 mb-4 tracking-wide">
            Revenue Overview
          </h3>
          <div className="h-48 flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 rounded-xl">
            <div className="text-center">
              <BarChart3 className="w-12 h-12 text-green-600 mx-auto mb-2" />
              <p className="text-gray-600 font-light">Chart placeholder</p>
              <p className="text-sm text-gray-500">
                Revenue data visualization
              </p>
            </div>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-sm border border-green-100/50 p-6">
          <h3 className="text-lg font-light text-gray-900 mb-4 tracking-wide">
            Top Products
          </h3>
          <div className="space-y-3">
            {products.slice(0, 3).map((product, index) => (
              <div
                key={product._id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-green-600">
                      {index + 1}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">
                      {product.name}
                    </p>
                    <p className="text-xs text-gray-600">{product.sold} sold</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    Rs. {product.price.toLocaleString()}
                  </p>
                  <div className="flex items-center">
                    <Star className="w-3 h-3 text-yellow-500 fill-current" />
                    <span className="text-xs text-gray-600 ml-1">
                      {product.rating}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default OverviewSection;
