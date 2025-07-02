import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Eye, Edit, Trash2, Users } from "lucide-react";
import StatusBadge from "./StatusBadge";
import UserModal from "./UserModal";
import { type User, type SectionProps } from "../../../Types/adminTypes";

const UsersSection: React.FC<SectionProps> = ({ users = [], setUsers }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Filter users based on search and status
  const filteredUsers = users
    .filter(
      (user) =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((user) => (selectedStatus ? user.status === selectedStatus : true));

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
    setShowUserModal(true);
  };

  const handleCloseModal = () => {
    setShowUserModal(false);
    setSelectedUser(null);
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
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:border-green-500 focus:outline-none w-full sm:w-auto"
                />
              </div>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:border-green-500 focus:outline-none"
              >
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="banned">Banned</option>
              </select>
              <motion.button
                whileHover={{ scale: 1.02 }}
                className="bg-green-600 text-white px-4 py-2 rounded-lg font-light tracking-wide hover:bg-green-700 transition-colors whitespace-nowrap"
              >
                Export Users
              </motion.button>
            </div>
          </div>

          {/* Users Table */}
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
                    key={user._id}
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
                          <p className="text-sm text-gray-600">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-gray-700 capitalize">
                        {user.role}
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
                        >
                          <Eye className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          className="p-1 text-gray-500 hover:text-green-600"
                        >
                          <Edit className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          className="p-1 text-gray-500 hover:text-red-600"
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

          {filteredUsers.length === 0 && (
            <div className="text-center py-8">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">
                No users found matching your criteria
              </p>
            </div>
          )}
        </div>
      </motion.div>

      {/* User Modal */}
      <AnimatePresence>
        {showUserModal && selectedUser && (
          <UserModal user={selectedUser} onClose={handleCloseModal} />
        )}
      </AnimatePresence>
    </>
  );
};

export default UsersSection;
