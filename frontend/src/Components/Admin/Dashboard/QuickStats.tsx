import React from "react";
import { User, Product, Order } from "../types/AdminTypes";

interface QuickStatsProps {
  users: User[];
  products: Product[];
  orders: Order[];
}

const QuickStats: React.FC<QuickStatsProps> = ({ users, products, orders }) => {
  const activeUsers = users.filter((u) => u.status === "active").length;
  const lowStockProducts = products.filter(
    (p) => p.stock < 10 && p.stock > 0
  ).length;
  const pendingOrders = orders.filter((o) => o.status === "pending").length;

  return (
    <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-sm border border-green-100/50 p-4">
      <h3 className="text-sm font-light text-gray-600 tracking-wide mb-4">
        QUICK STATS
      </h3>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Active Users</span>
          <span className="text-sm font-medium text-green-600">
            {activeUsers}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Low Stock</span>
          <span className="text-sm font-medium text-orange-600">
            {lowStockProducts}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Pending Orders</span>
          <span className="text-sm font-medium text-yellow-600">
            {pendingOrders}
          </span>
        </div>
      </div>
    </div>
  );
};

export default QuickStats;
