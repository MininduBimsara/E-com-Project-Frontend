import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { Search, ShoppingCart, Eye, Edit, MoreVertical } from "lucide-react";
import StatusBadge from "./StatusBadge";
import {
  getOrders,
  updateOrderStatus,
} from "../../../Store/Thunks/adminThunks";
import { type Order } from "../../../Api/Admin/adminApi";
import { type AppDispatch, type RootState } from "../../../Store/store";

interface OrdersSectionProps {
  orders: Order[];
  loading?: boolean;
}

const OrdersSection: React.FC<OrdersSectionProps> = ({
  orders = [],
  loading = false,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading: reduxLoading } = useSelector(
    (state: RootState) => state.admin
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const isLoading = loading || reduxLoading.orders;

  // Filter orders based on search and status
  const filteredOrders = orders
    .filter(
      (order) =>
        order.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.id.includes(searchTerm)
    )
    .filter((order) =>
      selectedStatus ? order.status === selectedStatus : true
    );

  // Debounced search function
  const handleSearch = useCallback(
    (term: string) => {
      setSearchTerm(term);
      if (term.length > 2 || term.length === 0) {
        // Note: You might need to modify the API to support search by customer info
        dispatch(
          getOrders({
            page: 1,
            limit: 50,
            status: selectedStatus,
          })
        );
        setCurrentPage(1);
      }
    },
    [dispatch, selectedStatus]
  );

  const handleStatusFilter = useCallback(
    (status: string) => {
      setSelectedStatus(status);
      dispatch(
        getOrders({
          page: 1,
          limit: 50,
          status: status,
        })
      );
      setCurrentPage(1);
    },
    [dispatch]
  );

  const handleOrderClick = (order: Order) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
  };

  const handleCloseDetails = () => {
    setShowOrderDetails(false);
    setSelectedOrder(null);
  };

  const handleStatusUpdate = async (orderId: string, newStatus: string) => {
    try {
      await dispatch(
        updateOrderStatus({ orderId, status: newStatus })
      ).unwrap();
      // Refresh orders list after successful update
      dispatch(
        getOrders({ page: currentPage, limit: 50, status: selectedStatus })
      );

      // Update the selected order if it's currently being viewed
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder({ ...selectedOrder, status: newStatus });
      }
    } catch (error) {
      console.error("Failed to update order status:", error);
      // You might want to show a toast notification here
    }
  };

  const handleExportOrders = () => {
    // Convert orders data to CSV
    const csvContent = [
      [
        "Order ID",
        "Customer",
        "Total",
        "Status",
        "Items",
        "Payment Method",
        "Date",
      ],
      ...filteredOrders.map((order) => [
        order.id,
        order.userId, // You might want to resolve this to actual customer name
        order.totalAmount.toString(),
        order.status,
        order.items.length.toString(),
        "N/A", // You might need to add payment method to Order type
        new Date(order.createdAt).toLocaleDateString(),
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `orders_export_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const OrderDetailsModal: React.FC<{ order: Order; onClose: () => void }> = ({
    order,
    onClose,
  }) => (
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
          <h3 className="text-xl font-light text-gray-900">Order Details</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-600">Order ID</label>
            <p className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
              #{order.id}
            </p>
          </div>
          <div>
            <label className="text-sm text-gray-600">Customer ID</label>
            <p className="font-medium">{order.userId}</p>
          </div>
          <div>
            <label className="text-sm text-gray-600">Total Amount</label>
            <p className="font-medium text-lg">
              Rs. {order.totalAmount.toLocaleString()}
            </p>
          </div>
          <div>
            <label className="text-sm text-gray-600">Items</label>
            <p className="font-medium">{order.items.length} items</p>
            <div className="mt-2 space-y-1 max-h-32 overflow-y-auto">
              {order.items.map((item, index) => (
                <div key={index} className="text-sm bg-gray-50 p-2 rounded">
                  {typeof item === "string" ? item : JSON.stringify(item)}
                </div>
              ))}
            </div>
          </div>
          <div>
            <label className="text-sm text-gray-600">Status</label>
            <div className="mt-1">
              <StatusBadge status={order.status} />
            </div>
          </div>
          <div>
            <label className="text-sm text-gray-600">Order Date</label>
            <p className="font-medium">
              {new Date(order.createdAt).toLocaleString()}
            </p>
          </div>
        </div>

        <div className="flex space-x-3 mt-6">
          <select
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
            value={order.status}
            onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
          >
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <button
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            onClick={() => handleStatusUpdate(order.id, order.status)}
          >
            Update Status
          </button>
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <>
      <motion.div
        key="orders"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="space-y-6"
      >
        {/* Orders Header */}
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-sm border border-green-100/50 p-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 gap-4">
            <div>
              <h2 className="text-2xl font-light text-gray-900 tracking-wide">
                Order Management
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Track and manage customer orders
              </p>
              {orders.length > 0 && (
                <p className="text-xs text-gray-500 mt-1">
                  Showing {filteredOrders.length} of {orders.length} orders
                </p>
              )}
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:border-green-500 focus:outline-none w-full sm:w-auto"
                  disabled={isLoading}
                />
              </div>
              <select
                value={selectedStatus}
                onChange={(e) => handleStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:border-green-500 focus:outline-none"
                disabled={isLoading}
              >
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <motion.button
                whileHover={{ scale: 1.02 }}
                onClick={handleExportOrders}
                disabled={isLoading || filteredOrders.length === 0}
                className="bg-green-600 text-white px-4 py-2 rounded-lg font-light tracking-wide hover:bg-green-700 transition-colors whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Export Orders
              </motion.button>
            </div>
          </div>

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex items-center justify-center py-8">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-8 h-8 border-2 border-green-600 border-t-transparent rounded-full"
              />
              <span className="ml-3 text-gray-600">Loading orders...</span>
            </div>
          )}

          {/* Orders Table */}
          {!isLoading && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-light text-gray-600 tracking-wide">
                      ORDER ID
                    </th>
                    <th className="text-left py-3 px-4 font-light text-gray-600 tracking-wide">
                      CUSTOMER
                    </th>
                    <th className="text-left py-3 px-4 font-light text-gray-600 tracking-wide">
                      TOTAL
                    </th>
                    <th className="text-left py-3 px-4 font-light text-gray-600 tracking-wide">
                      ITEMS
                    </th>
                    <th className="text-left py-3 px-4 font-light text-gray-600 tracking-wide">
                      STATUS
                    </th>
                    <th className="text-left py-3 px-4 font-light text-gray-600 tracking-wide">
                      DATE
                    </th>
                    <th className="text-left py-3 px-4 font-light text-gray-600 tracking-wide">
                      ACTIONS
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order, index) => (
                    <motion.tr
                      key={order.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-4 px-4">
                        <span className="font-mono text-sm text-gray-700 bg-gray-100 px-2 py-1 rounded">
                          #{order.id.slice(-8)}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-medium text-gray-900">
                            Customer #{order.userId.slice(-8)}
                          </p>
                          <p className="text-sm text-gray-600">
                            ID: {order.userId}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-gray-700 font-medium">
                        Rs. {order.totalAmount.toLocaleString()}
                      </td>
                      <td className="py-4 px-4 text-gray-600">
                        {order.items.length} items
                      </td>
                      <td className="py-4 px-4">
                        <StatusBadge status={order.status} />
                      </td>
                      <td className="py-4 px-4 text-gray-600">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            onClick={() => handleOrderClick(order)}
                            className="p-1 text-gray-500 hover:text-blue-600"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            className="p-1 text-gray-500 hover:text-green-600"
                            title="Edit Order"
                          >
                            <Edit className="w-4 h-4" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            className="p-1 text-gray-500 hover:text-gray-800"
                            title="More Options"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {!isLoading && filteredOrders.length === 0 && (
            <div className="text-center py-8">
              <ShoppingCart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">
                {searchTerm || selectedStatus
                  ? "No orders found matching your criteria"
                  : "No orders available"}
              </p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Order Details Modal */}
      <AnimatePresence>
        {showOrderDetails && selectedOrder && (
          <OrderDetailsModal
            order={selectedOrder}
            onClose={handleCloseDetails}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default OrdersSection;
