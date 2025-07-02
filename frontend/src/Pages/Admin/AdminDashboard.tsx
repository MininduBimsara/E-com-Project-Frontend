import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart3,
  Users,
  Package,
  ShoppingCart,
  Bell,
  RefreshCw,
} from "lucide-react";

// Import dashboard sections
import OverviewSection from "../../Components/Admin/Dashboard/OverviewSection";
import UsersSection from "../../Components/Admin/Dashboard/UsersSection";
import ProductsSection from "../../Components/Admin/Dashboard/ProductsSection";
import OrdersSection from "../../Components/Admin/Dashboard/OrdersSection";
import TabButton from "../../Components/Admin/Dashboard/TabButton";
import QuickStats from "../../Components/Admin/Dashboard/QuickStats";

// Types
import {
  type DashboardStats,
  type User,
  type Product,
  type Order,
} from "../../Types/adminTypes";

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats>({
    users: 0,
    products: 0,
    orders: 0,
    revenue: 0,
    status: {
      userService: "unknown",
      productService: "unknown",
      orderService: "unknown",
    },
  });
  const [users, setUsers] = useState<User[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  // Mock data loading - Replace with actual API calls
  useEffect(() => {
    const loadDashboardData = async () => {
      // Simulate API loading
      setTimeout(() => {
        setStats({
          users: 1248,
          products: 156,
          orders: 324,
          revenue: 45680,
          status: {
            userService: "available",
            productService: "available",
            orderService: "available",
          },
        });

        // Load mock data (replace with actual API calls)
        setUsers([
          {
            _id: "1",
            username: "john_doe",
            email: "john@example.com",
            role: "customer",
            status: "active",
            createdAt: "2024-01-15T10:30:00Z",
            lastLoginAt: "2024-01-30T15:45:00Z",
            orders: 5,
            totalSpent: 12500,
          },
          // Add more mock users...
        ]);

        setProducts([
          {
            _id: "1",
            name: "Organic Cotton T-Shirt",
            price: 2500,
            category: "clothing",
            stock: 45,
            status: "active",
            createdAt: "2024-01-10T10:00:00Z",
            sold: 120,
            rating: 4.8,
          },
          // Add more mock products...
        ]);

        setOrders([
          {
            _id: "1",
            customer: "John Doe",
            customerEmail: "john@example.com",
            total: 5200,
            status: "delivered",
            createdAt: "2024-01-28T10:30:00Z",
            items: 2,
            paymentMethod: "Credit Card",
            shippingAddress: "123 Main St, Colombo 01",
          },
          // Add more mock orders...
        ]);

        setLoading(false);
      }, 1000);
    };

    loadDashboardData();
  }, []);

  const handleRefresh = () => {
    setLoading(true);
    // Reload data
    window.location.reload();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-25 to-teal-50 flex items-center justify-center">
        <motion.div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-3 border-green-600 border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-gray-600 font-light tracking-wide">
            Loading Dashboard...
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-25 to-teal-50">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-xl border-b border-green-100/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div>
              <h1 className="text-3xl font-light text-green-800 tracking-wider">
                Admin Dashboard
              </h1>
              <p className="text-sm text-gray-600 font-light tracking-wide">
                HARITHA CEYLON MANAGEMENT
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="relative p-2 text-gray-600 hover:text-green-700 transition-colors"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={handleRefresh}
                className="p-2 text-gray-600 hover:text-green-700 transition-colors"
              >
                <RefreshCw className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-64 space-y-2">
            <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-sm border border-green-100/50 p-2">
              <div className="space-y-1">
                <TabButton
                  id="overview"
                  label="Overview"
                  icon={BarChart3}
                  isActive={activeTab === "overview"}
                  onClick={() => setActiveTab("overview")}
                />
                <TabButton
                  id="users"
                  label="Users"
                  icon={Users}
                  isActive={activeTab === "users"}
                  onClick={() => setActiveTab("users")}
                  count={stats.users}
                />
                <TabButton
                  id="products"
                  label="Products"
                  icon={Package}
                  isActive={activeTab === "products"}
                  onClick={() => setActiveTab("products")}
                  count={stats.products}
                />
                <TabButton
                  id="orders"
                  label="Orders"
                  icon={ShoppingCart}
                  isActive={activeTab === "orders"}
                  onClick={() => setActiveTab("orders")}
                  count={stats.orders}
                />
              </div>
            </div>

            {/* Quick Stats */}
            <QuickStats users={users} products={products} orders={orders} />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <AnimatePresence mode="wait">
              {activeTab === "overview" && (
                <OverviewSection
                  key="overview"
                  stats={stats}
                  users={users}
                  products={products}
                  orders={orders}
                  onNavigateToTab={setActiveTab}
                />
              )}

              {activeTab === "users" && (
                <UsersSection key="users" users={users} setUsers={setUsers} />
              )}

              {activeTab === "products" && (
                <ProductsSection
                  key="products"
                  products={products}
                  setProducts={setProducts}
                />
              )}

              {activeTab === "orders" && (
                <OrdersSection
                  key="orders"
                  orders={orders}
                  setOrders={setOrders}
                />
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
