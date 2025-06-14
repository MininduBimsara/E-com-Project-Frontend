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
  Leaf,
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
  cartItemCount = 3,
  isLoggedIn = true,
  userName = "Kamal",
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
      setIsScrolled(window.scrollY > 50);
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
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-xl shadow-sm border-b border-green-100/50"
          : "bg-white/90 backdrop-blur-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* Left Side - Logo */}
          <motion.div
            className="flex items-center flex-shrink-0 mr-8 lg:mr-16"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src="/logo.png"
              alt="Haritha Ceylon Logo"
              className="h-10 w-auto max-w-[120px] lg:h-12 lg:max-w-[150px] object-contain"
            />
          </motion.div>

          {/* Center - Navigation (Desktop) */}
          <div className="hidden lg:flex items-center space-x-12">
            {navigationItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                className={`relative text-sm font-light transition-all duration-300 tracking-wider ${
                  item.active
                    ? "text-green-700"
                    : "text-gray-600 hover:text-green-700"
                }`}
                whileHover={{ y: -1 }}
                transition={{ duration: 0.3 }}
              >
                {item.name.toUpperCase()}
                {item.active && (
                  <motion.div
                    className="absolute -bottom-2 left-0 right-0 h-px bg-green-700"
                    layoutId="activeTab"
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                )}
              </motion.a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={toggleMobileMenu}
            className="lg:hidden p-3 text-gray-600 hover:text-green-700 transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={{ rotate: isMenuOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </motion.div>
          </motion.button>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4 lg:space-x-6 flex-1 justify-end">
            {/* Dark Mode Toggle */}
            <motion.button
              onClick={toggleDarkMode}
              className="p-2 text-gray-600 hover:text-green-700 transition-colors duration-300"
              whileHover={{ scale: 1.1, rotate: 12 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{ rotate: isDarkMode ? 180 : 0 }}
                transition={{ duration: 0.5 }}
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </motion.div>
            </motion.button>

            {/* Cart Icon */}
            <motion.button
              onClick={onCartClick}
              className="relative p-2 text-gray-600 hover:text-green-700 transition-colors duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ShoppingBag className="w-5 h-5" />
              {cartItemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-green-600 text-white text-xs rounded-full flex items-center justify-center font-light"
                >
                  {cartItemCount > 9 ? "9+" : cartItemCount}
                </motion.span>
              )}
            </motion.button>

            {/* User Menu */}
            {isLoggedIn ? (
              <div className="relative user-menu">
                <motion.button
                  onClick={toggleUserMenu}
                  className="flex items-center space-x-3 p-2 transition-colors duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {userAvatar ? (
                    <img
                      src={userAvatar}
                      alt={userName}
                      className="w-8 h-8 lg:w-9 lg:h-9 rounded-full object-cover border-2 border-green-200"
                    />
                  ) : (
                    <div className="w-8 h-8 lg:w-9 lg:h-9 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <span className="hidden md:block text-sm font-light text-gray-700 tracking-wide">
                    {userName}
                  </span>
                  <motion.div
                    animate={{ rotate: isUserMenuOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-3 h-3 text-gray-400"
                  >
                    <div className="w-full h-px bg-current transform rotate-45 translate-y-1"></div>
                    <div className="w-full h-px bg-current transform -rotate-45 -translate-y-1"></div>
                  </motion.div>
                </motion.button>

                {/* User Dropdown */}
                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="absolute right-0 mt-4 w-56 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-green-100/50 py-2"
                    >
                      <div className="px-4 py-3 border-b border-green-100/50">
                        <div className="text-sm font-light text-gray-500 tracking-wide">
                          Signed in as
                        </div>
                        <div className="text-sm font-medium text-gray-800">
                          {userName}
                        </div>
                      </div>

                      <motion.button
                        onClick={onProfileClick}
                        className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-green-50/50 flex items-center space-x-3 transition-colors duration-200"
                        whileHover={{ x: 4 }}
                      >
                        <Settings className="w-4 h-4" />
                        <span className="font-light tracking-wide">
                          Profile Settings
                        </span>
                      </motion.button>

                      <motion.button
                        onClick={onLogoutClick}
                        className="w-full px-4 py-3 text-left text-sm text-red-600 hover:bg-red-50/50 flex items-center space-x-3 transition-colors duration-200"
                        whileHover={{ x: 4 }}
                      >
                        <LogOut className="w-4 h-4" />
                        <span className="font-light tracking-wide">Logout</span>
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <motion.button
                onClick={onLoginClick}
                className="bg-transparent border border-green-600/40 text-green-700 px-6 py-2 text-sm font-light tracking-[0.1em] hover:bg-green-600 hover:text-white transition-all duration-500"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                LOGIN
              </motion.button>
            )}
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
            transition={{ duration: 0.4 }}
            className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-green-100/50 mobile-menu"
          >
            <div className="max-w-7xl mx-auto px-4 py-8 space-y-1">
              {navigationItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className={`block px-6 py-4 text-lg font-light tracking-wider transition-all duration-300 border-b border-green-100/30 ${
                    item.active
                      ? "text-green-700 bg-green-50/50"
                      : "text-gray-600 hover:text-green-700 hover:bg-green-50/30"
                  }`}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  onClick={() => setIsMenuOpen(false)}
                  whileHover={{ x: 8 }}
                >
                  {item.name.toUpperCase()}
                  {item.active && (
                    <motion.div
                      className="w-8 h-px bg-green-700 mt-2"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: index * 0.1 + 0.2, duration: 0.3 }}
                    />
                  )}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
