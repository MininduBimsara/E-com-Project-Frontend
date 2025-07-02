import React from "react";
import { type StatusBadgeProps } from "../../../Types/adminTypes";

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
      case "delivered":
      case "available":
        return "bg-green-100 text-green-700 border-green-200";
      case "pending":
      case "processing":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "shipped":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "banned":
      case "cancelled":
      case "unavailable":
        return "bg-red-100 text-red-700 border-red-200";
      case "out_of_stock":
        return "bg-orange-100 text-orange-700 border-orange-200";
      case "inactive":
        return "bg-gray-100 text-gray-700 border-gray-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <span
      className={`px-3 py-1 text-xs font-medium border rounded-full ${getStatusStyle(
        status
      )}`}
    >
      {status.replace("_", " ").toUpperCase()}
    </span>
  );
};

export default StatusBadge;
