import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
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

// Import thunks
import {
  getDashboardStats,
  getUsers,
  getProducts,
  getOrders,
  verifyAdminAuth,
} from "../../Redux/Thunks/adminThunks";

// Types
import { type AppDispatch, type RootState } from "../../Redux/Store/store";

const AdminDashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [activeTab, setActiveTab] = useState("overview");

  // Redux state
  const { admin, dashboardStats, users, products, orders, loading, error } =
    useSelector((state: RootState) => state.admin);

  // Component loading states
  const [initialLoading, setInitialLoading] = useState(true);

  // Load initial dashboard data
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        // Verify admin authentication first
        await dispatch(verifyAdminAuth()).unwrap();

        // Load dashboard data
        await Promise.all([
          dispatch(getDashboardStats()),
          dispatch(getUsers({ page: 1, limit: 50 })),
          dispatch(getProducts({ page: 1, limit: 50 })),
          dispatch(getOrders({ page: 1, limit: 50 })),
        ]);
      } catch (error) {
        console.error("Failed to load dashboard data:", error);
        // Handle authentication error - redirect to login
        window.location.href = "/admin/login";
      } finally {
        setInitialLoading(false);
      }
    };

    loadInitialData();
  }, [dispatch]);

  // Handle tab-specific data loading
  useEffect(() => {
    switch (activeTab) {
      case "users":
        if ((!users || users.data.length === 0) && !loading.users) {
          dispatch(getUsers({ page: 1, limit: 50 }));
        }
        break;
      case "products":
        if ((!products || products.data.length === 0) && !loading.products) {
          dispatch(getProducts({ page: 1, limit: 50 }));
        }
        break;
      case "orders":
        if ((!orders || orders.data.length === 0) && !loading.orders) {
          dispatch(getOrders({ page: 1, limit: 50 }));
        }
        break;
    }
  }, [activeTab, dispatch, users, products, orders, loading]);

  const handleRefresh = async () => {
    try {
      await Promise.all([
        dispatch(getDashboardStats()),
        dispatch(getUsers({ page: 1, limit: 50 })),
        dispatch(getProducts({ page: 1, limit: 50 })),
        dispatch(getOrders({ page: 1, limit: 50 })),
      ]);
    } catch (error) {
      console.error("Failed to refresh dashboard data:", error);
    }
  };

  if (initialLoading) {
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
              {admin && (
                <p className="text-xs text-gray-500">
                  Welcome back, {admin.username}
                </p>
              )}
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
                disabled={loading.dashboard}
                className="p-2 text-gray-600 hover:text-green-700 transition-colors disabled:opacity-50"
              >
                <RefreshCw
                  className={`w-5 h-5 ${
                    loading.dashboard ? "animate-spin" : ""
                  }`}
                />
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
                  count={dashboardStats?.users || users?.data?.length || 0}
                />
                <TabButton
                  id="products"
                  label="Products"
                  icon={Package}
                  isActive={activeTab === "products"}
                  onClick={() => setActiveTab("products")}
                  count={
                    dashboardStats?.products || products?.data?.length || 0
                  }
                />
                <TabButton
                  id="orders"
                  label="Orders"
                  icon={ShoppingCart}
                  isActive={activeTab === "orders"}
                  onClick={() => setActiveTab("orders")}
                  count={dashboardStats?.orders || orders?.data?.length || 0}
                />
              </div>
            </div>

            {/* Quick Stats */}
            <QuickStats
              users={users?.data || []}
              products={products?.data || []}
              orders={orders?.data || []}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Error Display */}
            {(error.auth ||
              error.dashboard ||
              error.users ||
              error.products ||
              error.orders) && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6"
              >
                <p className="text-red-700 text-sm">
                  Error:{" "}
                  {error.auth ||
                    error.dashboard ||
                    error.users ||
                    error.products ||
                    error.orders}
                </p>
              </motion.div>
            )}

            <AnimatePresence mode="wait">
              {activeTab === "overview" && (
                <OverviewSection
                  key="overview"
                  stats={dashboardStats}
                  users={users?.data || []}
                  products={products?.data || []}
                  orders={orders?.data || []}
                  onNavigateToTab={setActiveTab}
                />
              )}

              {activeTab === "users" && (
                <UsersSection
                  key="users"
                  users={users?.data || []}
                  loading={loading.users}
                />
              )}

              {activeTab === "products" && (
                <ProductsSection
                  key="products"
                  products={products?.data || []}
                  loading={loading.products}
                />
              )}

              {activeTab === "orders" && (
                <OrdersSection
                  key="orders"
                  orders={orders?.data || []}
                  loading={loading.orders}
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
