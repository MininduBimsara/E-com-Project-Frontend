import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  Sun,
  Moon,
  Menu,
  X,
  User,
  LogOut,
  Settings,
  ChevronDown,
} from "lucide-react";

interface HeaderProps {
  cartItemCount?: number;
  isLoggedIn?: boolean;
  userName?: string;
  userAvatar?: string;
  onCartClick?: () => void;
  onLoginClick?: () => void;
  onLogoutClick?: () => void;
  onProfileClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  cartItemCount = 0,
  isLoggedIn = false,
  userName = "John Doe",
  userAvatar,
  onCartClick,
  onLoginClick,
  onLogoutClick,
  onProfileClick,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navigationItems = [
    { name: "Home", href: "/", active: true },
    { name: "Products", href: "/products" },
    { name: "Categories", href: "/categories" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMenuOpen && !(event.target as Element).closest(".mobile-menu")) {
        setIsMenuOpen(false);
      }
      if (isUserMenuOpen && !(event.target as Element).closest(".user-menu")) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen, isUserMenuOpen]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // Here you would typically update your theme context
  };

  const toggleMobileMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-green-100"
          : "bg-white/90 backdrop-blur-sm"
      } ${isDarkMode ? "dark" : ""}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo Section */}
          <motion.div
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-green-600 to-green-700 rounded-xl flex items-center justify-center shadow-lg">
              <div className="w-6 h-6 lg:w-7 lg:h-7 bg-white rounded-md flex items-center justify-center">
                <span className="text-green-600 font-bold text-sm lg:text-base">
                  H
                </span>
              </div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl lg:text-2xl font-bold text-gray-900">
                Haritha
                <span className="text-green-600 ml-1">Ceylon</span>
              </h1>
              <p className="text-xs text-gray-500 -mt-1">
                Sustainable Shopping
              </p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                className={`relative text-sm font-medium transition-colors duration-200 ${
                  item.active
                    ? "text-green-600"
                    : "text-gray-700 hover:text-green-600"
                }`}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                {item.name}
                {item.active && (
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-green-600 rounded-full"
                    layoutId="activeTab"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.a>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Cart Icon */}
            <motion.button
              onClick={onCartClick}
              className="relative p-2 text-gray-700 hover:text-green-600 transition-colors duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ShoppingBag className="w-6 h-6" />
              {cartItemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-green-600 text-white text-xs rounded-full flex items-center justify-center font-medium"
                >
                  {cartItemCount > 9 ? "9+" : cartItemCount}
                </motion.span>
              )}
            </motion.button>

            {/* Dark Mode Toggle */}
            <motion.button
              onClick={toggleDarkMode}
              className="p-2 text-gray-700 hover:text-green-600 transition-colors duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {isDarkMode ? (
                <Sun className="w-6 h-6" />
              ) : (
                <Moon className="w-6 h-6" />
              )}
            </motion.button>

            {/* User Menu */}
            {isLoggedIn ? (
              <div className="relative user-menu">
                <motion.button
                  onClick={toggleUserMenu}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {userAvatar ? (
                    <img
                      src={userAvatar}
                      alt={userName}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <span className="hidden md:block text-sm font-medium text-gray-700">
                    {userName.split(" ")[0]}
                  </span>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </motion.button>

                {/* User Dropdown */}
                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2"
                    >
                      <button
                        onClick={onProfileClick}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                      >
                        <Settings className="w-4 h-4" />
                        <span>Profile Settings</span>
                      </button>
                      <button
                        onClick={onLogoutClick}
                        className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <motion.button
                onClick={onLoginClick}
                className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Login
              </motion.button>
            )}

            {/* Mobile Menu Button */}
            <motion.button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 text-gray-700 hover:text-green-600 transition-colors duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white border-t border-gray-200 mobile-menu"
          >
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-2">
              {navigationItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200 ${
                    item.active
                      ? "text-green-600 bg-green-50"
                      : "text-gray-700 hover:text-green-600 hover:bg-gray-50"
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

// Demo component to show the header in action
const HeaderDemo: React.FC = () => {
  const [cartCount, setCartCount] = useState(3);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        cartItemCount={cartCount}
        isLoggedIn={isLoggedIn}
        userName="Kamal Perera"
        onCartClick={() => console.log("Cart clicked")}
        onLoginClick={() => setIsLoggedIn(true)}
        onLogoutClick={() => setIsLoggedIn(false)}
        onProfileClick={() => console.log("Profile clicked")}
      />

      {/* Demo content */}
      <div className="pt-24 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Haritha Ceylon
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Your one-stop destination for sustainable and eco-friendly products
            in Sri Lanka.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
              >
                <div className="w-full h-48 bg-gradient-to-br from-green-100 to-green-200 rounded-lg mb-4"></div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Eco Product {item}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Sustainable and environmentally friendly product description.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-green-600 font-bold">Rs. 2,500</span>
                  <button
                    onClick={() => setCartCount(cartCount + 1)}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderDemo;
