import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { Search, Eye, Edit, Trash2, Users } from "lucide-react";
import StatusBadge from "./StatusBadge";
import UserModal from "./UserModal";
import { getUsers, updateUserStatus } from "../../../Redux/Thunks/adminThunks";
import { type User } from "../../../Api/Admin/adminApi";
import { type AppDispatch, type RootState } from "../../../Redux/Store/store";

interface UsersSectionProps {
  users: User[];
  loading?: boolean;
}

const UsersSection: React.FC<UsersSectionProps> = ({
  users = [],
  loading = false,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading: reduxLoading } = useSelector(
    (state: RootState) => state.admin
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const isLoading = loading || reduxLoading.users;

  // Filter users based on search and status
  const filteredUsers = users
    .filter(
      (user) =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((user) => (selectedStatus ? user.status === selectedStatus : true));

  // Debounced search function
  const handleSearch = useCallback(
    (term: string) => {
      setSearchTerm(term);
      if (term.length > 2 || term.length === 0) {
        dispatch(
          getUsers({
            page: 1,
            limit: 50,
            search: term,
          })
        );
        setCurrentPage(1);
      }
    },
    [dispatch]
  );

  const handleStatusFilter = useCallback(
    (status: string) => {
      setSelectedStatus(status);
      // You might want to add status filtering to the API call
      dispatch(
        getUsers({
          page: 1,
          limit: 50,
          search: searchTerm,
        })
      );
      setCurrentPage(1);
    },
    [dispatch, searchTerm]
  );

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
    setShowUserModal(true);
  };

  const handleCloseModal = () => {
    setShowUserModal(false);
    setSelectedUser(null);
  };

  const handleStatusUpdate = async (userId: string, newStatus: string) => {
    try {
      await dispatch(updateUserStatus({ userId, status: newStatus })).unwrap();
      // Refresh users list after successful update
      dispatch(getUsers({ page: currentPage, limit: 50, search: searchTerm }));
    } catch (error) {
      console.error("Failed to update user status:", error);
      // You might want to show a toast notification here
    }
  };

  const handleExportUsers = () => {
    // Convert users data to CSV
    const csvContent = [
      [
        "Username",
        "Email",
        "Status",
        "Role",
        "Orders",
        "Total Spent",
        "Created",
      ],
      ...filteredUsers.map((user) => [
        user.username,
        user.email,
        user.status,
        user.role || "customer",
        (user.orders || 0).toString(),
        (user.totalSpent || 0).toString(),
        new Date(user.createdAt).toLocaleDateString(),
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `users_export_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <>
      <motion.div
        key="users"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="space-y-6"
      >
        {/* Users Header */}
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-sm border border-green-100/50 p-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 gap-4">
            <div>
              <h2 className="text-2xl font-light text-gray-900 tracking-wide">
                User Management
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Manage user accounts and permissions
              </p>
              {users.length > 0 && (
                <p className="text-xs text-gray-500 mt-1">
                  Showing {filteredUsers.length} of {users.length} users
                </p>
              )}
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users..."
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
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="banned">Banned</option>
              </select>
              <motion.button
                whileHover={{ scale: 1.02 }}
                onClick={handleExportUsers}
                disabled={isLoading || filteredUsers.length === 0}
                className="bg-green-600 text-white px-4 py-2 rounded-lg font-light tracking-wide hover:bg-green-700 transition-colors whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Export Users
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
              <span className="ml-3 text-gray-600">Loading users...</span>
            </div>
          )}

          {/* Users Table */}
          {!isLoading && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-light text-gray-600 tracking-wide">
                      USER
                    </th>
                    <th className="text-left py-3 px-4 font-light text-gray-600 tracking-wide">
                      ROLE
                    </th>
                    <th className="text-left py-3 px-4 font-light text-gray-600 tracking-wide">
                      STATUS
                    </th>
                    <th className="text-left py-3 px-4 font-light text-gray-600 tracking-wide">
                      ORDERS
                    </th>
                    <th className="text-left py-3 px-4 font-light text-gray-600 tracking-wide">
                      SPENT
                    </th>
                    <th className="text-left py-3 px-4 font-light text-gray-600 tracking-wide">
                      JOINED
                    </th>
                    <th className="text-left py-3 px-4 font-light text-gray-600 tracking-wide">
                      ACTIONS
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user, index) => (
                    <motion.tr
                      key={user.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-medium">
                              {user.username.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              {user.username}
                            </p>
                            <p className="text-sm text-gray-600">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-gray-700 capitalize">
                          {user.role || "customer"}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <StatusBadge status={user.status} />
                      </td>
                      <td className="py-4 px-4 text-gray-600">
                        {user.orders || 0}
                      </td>
                      <td className="py-4 px-4 text-gray-600">
                        Rs. {(user.totalSpent || 0).toLocaleString()}
                      </td>
                      <td className="py-4 px-4 text-gray-600">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            onClick={() => handleUserClick(user)}
                            className="p-1 text-gray-500 hover:text-blue-600"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            className="p-1 text-gray-500 hover:text-green-600"
                            title="Edit User"
                          >
                            <Edit className="w-4 h-4" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            className="p-1 text-gray-500 hover:text-red-600"
                            title="Delete User"
                          >
                            <Trash2 className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {!isLoading && filteredUsers.length === 0 && (
            <div className="text-center py-8">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">
                {searchTerm || selectedStatus
                  ? "No users found matching your criteria"
                  : "No users available"}
              </p>
            </div>
          )}
        </div>
      </motion.div>

      {/* User Modal */}
      <AnimatePresence>
        {showUserModal && selectedUser && (
          <UserModal
            user={selectedUser}
            onClose={handleCloseModal}
            onStatusUpdate={handleStatusUpdate}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default UsersSection;
