import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../Redux/Store/store"; // Adjust path as needed
import { verifyAuth, logoutUser } from "../../Redux/Thunks/authThunks"; // Adjust path as needed
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
import AuthModal from "../../Pages/Common/AuthForm";
import { useCart } from "../../Context/CartContext";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const { itemCount, openCart } = useCart();

  // Redux selectors
  const { user, isAuthenticated, loading, error } = useSelector(
    (state: RootState) => state.user
  );
  // const { items: cartItems } = useSelector((state: RootState) => state.cart || { items: [] });

  const cartItemCount = 0; // cartItems.length || 0;
  const isLoggedIn = isAuthenticated;
  const userName = user?.name || user?.firstName || user?.username || "";
  const userAvatar = user?.avatar || user?.profilePicture || "";

  // Get current path
  const location = useLocation();
  const currentPath = location.pathname;

  const navigationItems = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  // Function to check if a navigation item is active
  const isActiveRoute = (href: string) => {
    if (href === "/") {
      return currentPath === "/";
    }
    return currentPath.startsWith(href);
  };

  // Verify authentication on component mount
  useEffect(() => {
    dispatch(verifyAuth());
  }, [dispatch]);

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
    // TODO: Dispatch Redux action to update theme
  };

  const toggleMobileMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleLoginClick = () => {
    setIsAuthModalOpen(true);
  };

  const handleAuthSuccess = (userData: any) => {
    setIsAuthModalOpen(false);
    // Verify auth again to update the state
    dispatch(verifyAuth());
  };

  const handleCartClick = () => {
    openCart(); // Opens the cart sidebar
  };

  const handleLogoutClick = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      setIsUserMenuOpen(false);
      // Optionally redirect to home page
      // navigate('/');
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleProfileClick = () => {
    setIsUserMenuOpen(false);
    // TODO: Navigate to profile page
    console.log("Profile clicked");
  };

  return (
    <>
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
              {navigationItems.map((item, index) => {
                const isActive = isActiveRoute(item.href);
                return (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    className={`relative text-sm font-light transition-all duration-300 tracking-wider ${
                      isActive
                        ? "text-green-700"
                        : "text-gray-600 hover:text-green-700"
                    }`}
                    whileHover={{ y: -1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {item.name.toUpperCase()}
                    {isActive && (
                      <motion.div
                        className="absolute -bottom-2 left-0 right-0 h-px bg-green-700"
                        layoutId="activeTab"
                        initial={{ opacity: 0, scaleX: 0 }}
                        animate={{ opacity: 1, scaleX: 1 }}
                        transition={{ duration: 0.5 }}
                      />
                    )}
                  </motion.a>
                );
              })}
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
                onClick={handleCartClick}
                className="relative p-2 text-gray-600 hover:text-green-700 transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label={`Shopping cart with ${itemCount} items`}
              >
                <ShoppingBag className="w-5 h-5" />
                {/* Cart badge with actual item count */}
                <AnimatePresence>
                  {itemCount > 0 && (
                    <motion.span
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      whileHover={{ scale: 1.1 }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 15,
                      }}
                      className="absolute -top-1 -right-1 w-5 h-5 bg-green-600 text-white text-xs rounded-full flex items-center justify-center font-light"
                    >
                      {itemCount > 9 ? "9+" : itemCount}
                    </motion.span>
                  )}
                </AnimatePresence>

                {/* Pulse animation for new items */}
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

              {/* Authentication Section */}
              {loading ? (
                // Loading state
                <div className="flex items-center space-x-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="w-6 h-6 border-2 border-green-600 border-t-transparent rounded-full"
                  />
                  <span className="text-sm font-light text-gray-600">
                    Loading...
                  </span>
                </div>
              ) : isLoggedIn && userName ? (
                // User Menu (when logged in)
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
                        onError={(e) => {
                          // Fallback to initials if image fails to load
                          const target = e.target as HTMLImageElement;
                          target.style.display = "none";
                        }}
                      />
                    ) : (
                      <div className="w-8 h-8 lg:w-9 lg:h-9 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-medium">
                          {userName.charAt(0).toUpperCase()}
                        </span>
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
                          <div className="text-sm font-medium text-gray-800 truncate">
                            {user?.email || userName}
                          </div>
                        </div>

                        <motion.button
                          onClick={handleProfileClick}
                          className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-green-50/50 flex items-center space-x-3 transition-colors duration-200"
                          whileHover={{ x: 4 }}
                        >
                          <Settings className="w-4 h-4" />
                          <span className="font-light tracking-wide">
                            Profile Settings
                          </span>
                        </motion.button>

                        <motion.button
                          onClick={handleLogoutClick}
                          className="w-full px-4 py-3 text-left text-sm text-red-600 hover:bg-red-50/50 flex items-center space-x-3 transition-colors duration-200"
                          whileHover={{ x: 4 }}
                          disabled={loading}
                        >
                          <LogOut className="w-4 h-4" />
                          <span className="font-light tracking-wide">
                            {loading ? "Logging out..." : "Logout"}
                          </span>
                        </motion.button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                // Login Button (when not logged in)
                <motion.button
                  onClick={handleLoginClick}
                  className="bg-transparent border border-green-600/40 text-green-700 px-6 py-2 text-sm font-light tracking-[0.1em] hover:bg-green-600 hover:text-white transition-all duration-500"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={loading}
                >
                  {loading ? "LOADING..." : "LOGIN"}
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
                {navigationItems.map((item, index) => {
                  const isActive = isActiveRoute(item.href);
                  return (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      className={`block px-6 py-4 text-lg font-light tracking-wider transition-all duration-300 border-b border-green-100/30 ${
                        isActive
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
                      {isActive && (
                        <motion.div
                          className="w-8 h-px bg-green-700 mt-2"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{
                            delay: index * 0.1 + 0.2,
                            duration: 0.3,
                          }}
                        />
                      )}
                    </motion.a>
                  );
                })}

                {/* Mobile Authentication Section */}
                <div className="pt-4 border-t border-green-100/50 mt-4">
                  {isLoggedIn && userName ? (
                    <div className="space-y-2">
                      <div className="px-6 py-2 text-sm font-light text-gray-500">
                        Signed in as {userName}
                      </div>
                      <motion.button
                        onClick={handleProfileClick}
                        className="w-full text-left px-6 py-3 text-gray-700 hover:bg-green-50/50 flex items-center space-x-3"
                        whileHover={{ x: 8 }}
                      >
                        <Settings className="w-4 h-4" />
                        <span>Profile Settings</span>
                      </motion.button>
                      <motion.button
                        onClick={handleLogoutClick}
                        className="w-full text-left px-6 py-3 text-red-600 hover:bg-red-50/50 flex items-center space-x-3"
                        whileHover={{ x: 8 }}
                        disabled={loading}
                      >
                        <LogOut className="w-4 h-4" />
                        <span>{loading ? "Logging out..." : "Logout"}</span>
                      </motion.button>
                    </div>
                  ) : (
                    <motion.button
                      onClick={handleLoginClick}
                      className="w-full mx-6 bg-transparent border border-green-600/40 text-green-700 px-6 py-3 text-sm font-light tracking-[0.1em] hover:bg-green-600 hover:text-white transition-all duration-500"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={loading}
                    >
                      {loading ? "LOADING..." : "LOGIN"}
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />

      {/* Error Display (Optional) */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-24 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-lg z-50"
        >
          <p className="text-sm">{error}</p>
        </motion.div>
      )}
    </>
  );
}

export default Header;
