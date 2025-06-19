import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";

interface CartIconProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showBadge?: boolean;
}

const CartIcon: React.FC<CartIconProps> = ({
  className = "",
  size = "md",
  showBadge = true,
}) => {
  const { itemCount, openCart } = useCart();

  const sizeClasses = {
    sm: "w-5 h-5",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  const badgeVariants = {
    hidden: {
      scale: 0,
      opacity: 0,
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 15,
      },
    },
    exit: {
      scale: 0,
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
  };

  const iconVariants = {
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.2,
      },
    },
    tap: {
      scale: 0.95,
    },
  };

  return (
    <motion.button
      variants={iconVariants}
      whileHover="hover"
      whileTap="tap"
      onClick={openCart}
      className={`relative p-2 rounded-full hover:bg-green-50 transition-all duration-300 group ${className}`}
      aria-label={`Shopping cart with ${itemCount} items`}
    >
      <ShoppingCart
        className={`${sizeClasses[size]} text-green-700 group-hover:text-green-800 transition-colors duration-300`}
      />

      {/* Badge */}
      <AnimatePresence>
        {showBadge && itemCount > 0 && (
          <motion.div
            variants={badgeVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute -top-1 -right-1 bg-green-600 text-white text-xs font-medium rounded-full min-w-[1.25rem] h-5 flex items-center justify-center px-1"
          >
            {itemCount > 99 ? "99+" : itemCount}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pulse effect for new items */}
      <AnimatePresence>
        {itemCount > 0 && (
          <motion.div
            initial={{ scale: 1, opacity: 0.6 }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.6, 0, 0.6],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0 bg-green-600/20 rounded-full"
          />
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default CartIcon;
