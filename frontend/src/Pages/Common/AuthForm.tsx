import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye,
  EyeOff,
  User,
  Mail,
  Lock,
  Upload,
  Leaf,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  X,
} from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess?: (userData: any) => void;
}

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
  profileImage?: File;
}

const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onAuthSuccess,
}) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [profilePreview, setProfilePreview] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  // Form states
  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
  });

  const [registerData, setRegisterData] = useState<RegisterData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "customer",
    profileImage: undefined,
  });

  const roles = [
    { value: "customer", label: "Customer" },
    { value: "seller", label: "Seller" },
    { value: "admin", label: "Admin" },
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setRegisterData({ ...registerData, profileImage: file });
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!isLogin) {
      if (!registerData.username.trim()) {
        newErrors.username = "Username is required";
      } else if (registerData.username.length < 3) {
        newErrors.username = "Username must be at least 3 characters";
      }

      if (registerData.password !== registerData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }

      if (registerData.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters";
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const currentEmail = isLogin ? loginData.email : registerData.email;

    if (!currentEmail.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(currentEmail)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!isLogin && !registerData.password.trim()) {
      newErrors.password = "Password is required";
    }

    if (isLogin && !loginData.password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const userData = isLogin
        ? { email: loginData.email, username: "User" }
        : { ...registerData, id: Date.now() };

      onAuthSuccess?.(userData);
      onClose();
    } catch (error) {
      console.error("Auth error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    // Simulate Google OAuth
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    onAuthSuccess?.({ email: "user@gmail.com", username: "Google User" });
    onClose();
    setIsLoading(false);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-10 p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="px-8 pt-8 pb-6 text-center border-b border-gray-100">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-4"
            >
              
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p className="text-sm font-light text-gray-500 tracking-wider mb-2">
                SUSTAINABLE LIVING
              </p>
              <h1 className="text-3xl lg:text-4xl font-light text-gray-900 tracking-wider mb-2">
                {isLogin ? "Welcome Back" : "Create Account"}
              </h1>
              <div className="w-16 h-px bg-green-600/30 mx-auto"></div>
            </motion.div>
          </div>

          {/* Form Container */}
          <div className="p-8">
            <AnimatePresence mode="wait">
              {isLogin ? (
                // LOGIN FORM
                <motion.form
                  key="login"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleSubmit}
                  className="max-w-md mx-auto space-y-6"
                >
                  {/* Email Field */}
                  <div className="space-y-2">
                    <label className="text-sm font-light text-gray-600 tracking-wide">
                      Email
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        value={loginData.email}
                        onChange={(e) =>
                          setLoginData({ ...loginData, email: e.target.value })
                        }
                        className={`w-full bg-gray-50/80 border-2 ${
                          errors.email ? "border-red-300" : "border-gray-200/60"
                        } rounded-xl px-4 py-4 pl-12 text-gray-900 font-light placeholder-gray-400 focus:border-green-600 focus:bg-white transition-all duration-300 focus:outline-none`}
                        placeholder="your@email.com"
                      />
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    </div>
                    {errors.email && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs text-red-500 flex items-center"
                      >
                        <AlertCircle className="w-3 h-3 mr-1" />
                        {errors.email}
                      </motion.p>
                    )}
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2">
                    <label className="text-sm font-light text-gray-600 tracking-wide">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={loginData.password}
                        onChange={(e) =>
                          setLoginData({
                            ...loginData,
                            password: e.target.value,
                          })
                        }
                        className={`w-full bg-gray-50/80 border-2 ${
                          errors.password
                            ? "border-red-300"
                            : "border-gray-200/60"
                        } rounded-xl px-4 py-4 pl-12 pr-12 text-gray-900 font-light placeholder-gray-400 focus:border-green-600 focus:bg-white transition-all duration-300 focus:outline-none`}
                        placeholder="••••••••"
                      />
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs text-red-500 flex items-center"
                      >
                        <AlertCircle className="w-3 h-3 mr-1" />
                        {errors.password}
                      </motion.p>
                    )}
                  </div>

                  {/* Forgot Password */}
                  <div className="text-right">
                    <button
                      type="button"
                      className="text-sm text-green-600 hover:text-green-700 font-light tracking-wide transition-colors"
                    >
                      Forgot Password?
                    </button>
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-xl font-light tracking-[0.1em] text-sm hover:from-green-700 hover:to-emerald-700 transition-all duration-500 flex items-center justify-center group disabled:opacity-50"
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>LOGIN</span>
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                      </>
                    )}
                  </motion.button>
                </motion.form>
              ) : (
                // REGISTER FORM - 2 COLUMNS
                <motion.form
                  key="register"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  {/* Profile Image Upload - Centered */}
                  <div className="text-center mb-6">
                    <label className="text-sm font-light text-gray-600 tracking-wide block mb-3">
                      Profile Image
                    </label>
                    <div className="flex justify-center">
                      <label className="cursor-pointer group">
                        <div className="relative w-24 h-24 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl border-2 border-dashed border-green-300 hover:border-green-500 transition-all duration-300 flex items-center justify-center overflow-hidden">
                          {profilePreview ? (
                            <img
                              src={profilePreview}
                              alt="Profile Preview"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <Upload className="w-8 h-8 text-green-500 group-hover:text-green-600 transition-colors" />
                          )}
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>

                  {/* Two Column Layout */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="space-y-5">
                      {/* Username Field */}
                      <div className="space-y-2">
                        <label className="text-sm font-light text-gray-600 tracking-wide">
                          Username
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={registerData.username}
                            onChange={(e) =>
                              setRegisterData({
                                ...registerData,
                                username: e.target.value,
                              })
                            }
                            className={`w-full bg-gray-50/80 border-2 ${
                              errors.username
                                ? "border-red-300"
                                : "border-gray-200/60"
                            } rounded-xl px-4 py-3 pl-12 text-gray-900 font-light placeholder-gray-400 focus:border-green-600 focus:bg-white transition-all duration-300 focus:outline-none`}
                            placeholder="Enter username"
                          />
                          <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        </div>
                        {errors.username && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-xs text-red-500 flex items-center"
                          >
                            <AlertCircle className="w-3 h-3 mr-1" />
                            {errors.username}
                          </motion.p>
                        )}
                      </div>

                      {/* Email Field */}
                      <div className="space-y-2">
                        <label className="text-sm font-light text-gray-600 tracking-wide">
                          Email
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            value={registerData.email}
                            onChange={(e) =>
                              setRegisterData({
                                ...registerData,
                                email: e.target.value,
                              })
                            }
                            className={`w-full bg-gray-50/80 border-2 ${
                              errors.email
                                ? "border-red-300"
                                : "border-gray-200/60"
                            } rounded-xl px-4 py-3 pl-12 text-gray-900 font-light placeholder-gray-400 focus:border-green-600 focus:bg-white transition-all duration-300 focus:outline-none`}
                            placeholder="your@email.com"
                          />
                          <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        </div>
                        {errors.email && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-xs text-red-500 flex items-center"
                          >
                            <AlertCircle className="w-3 h-3 mr-1" />
                            {errors.email}
                          </motion.p>
                        )}
                      </div>

                      {/* Role Selection */}
                      <div className="space-y-2">
                        <label className="text-sm font-light text-gray-600 tracking-wide">
                          Role
                        </label>
                        <select
                          value={registerData.role}
                          onChange={(e) =>
                            setRegisterData({
                              ...registerData,
                              role: e.target.value,
                            })
                          }
                          className="w-full bg-gray-50/80 border-2 border-gray-200/60 rounded-xl px-4 py-3 text-gray-900 font-light focus:border-green-600 focus:bg-white transition-all duration-300 focus:outline-none"
                        >
                          {roles.map((role) => (
                            <option key={role.value} value={role.value}>
                              {role.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-5">
                      {/* Password Field */}
                      <div className="space-y-2">
                        <label className="text-sm font-light text-gray-600 tracking-wide">
                          Password
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            value={registerData.password}
                            onChange={(e) =>
                              setRegisterData({
                                ...registerData,
                                password: e.target.value,
                              })
                            }
                            className={`w-full bg-gray-50/80 border-2 ${
                              errors.password
                                ? "border-red-300"
                                : "border-gray-200/60"
                            } rounded-xl px-4 py-3 pl-12 pr-12 text-gray-900 font-light placeholder-gray-400 focus:border-green-600 focus:bg-white transition-all duration-300 focus:outline-none`}
                            placeholder="••••••••"
                          />
                          <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                          >
                            {showPassword ? (
                              <EyeOff className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                        {errors.password && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-xs text-red-500 flex items-center"
                          >
                            <AlertCircle className="w-3 h-3 mr-1" />
                            {errors.password}
                          </motion.p>
                        )}
                      </div>

                      {/* Confirm Password Field */}
                      <div className="space-y-2">
                        <label className="text-sm font-light text-gray-600 tracking-wide">
                          Confirm Password
                        </label>
                        <div className="relative">
                          <input
                            type={showConfirmPassword ? "text" : "password"}
                            value={registerData.confirmPassword}
                            onChange={(e) =>
                              setRegisterData({
                                ...registerData,
                                confirmPassword: e.target.value,
                              })
                            }
                            className={`w-full bg-gray-50/80 border-2 ${
                              errors.confirmPassword
                                ? "border-red-300"
                                : "border-gray-200/60"
                            } rounded-xl px-4 py-3 pl-12 pr-12 text-gray-900 font-light placeholder-gray-400 focus:border-green-600 focus:bg-white transition-all duration-300 focus:outline-none`}
                            placeholder="••••••••"
                          />
                          <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <button
                            type="button"
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                        {errors.confirmPassword && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-xs text-red-500 flex items-center"
                          >
                            <AlertCircle className="w-3 h-3 mr-1" />
                            {errors.confirmPassword}
                          </motion.p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Submit Button - Full Width */}
                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-xl font-light tracking-[0.1em] text-sm hover:from-green-700 hover:to-emerald-700 transition-all duration-500 flex items-center justify-center group disabled:opacity-50 mt-6"
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>CREATE ACCOUNT</span>
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                      </>
                    )}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>

            {/* Divider */}
            <div className="my-8 flex items-center">
              <div className="flex-1 h-px bg-gray-200"></div>
              <span className="px-4 text-xs text-gray-400 font-light tracking-wider">
                OR
              </span>
              <div className="flex-1 h-px bg-gray-200"></div>
            </div>

            {/* Google OAuth Button */}
            <div className="max-w-md mx-auto">
              <motion.button
                onClick={handleGoogleAuth}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-white border-2 border-gray-200 text-gray-700 py-4 rounded-xl font-light tracking-[0.1em] text-sm hover:border-green-600 hover:text-green-700 transition-all duration-500 flex items-center justify-center group"
              >
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span>Continue with Google</span>
              </motion.button>
            </div>

            {/* Toggle Between Forms */}
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600 font-light">
                {isLogin
                  ? "Don't have an account?"
                  : "Already have an account?"}{" "}
                <button
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setErrors({});
                  }}
                  className="text-green-600 hover:text-green-700 font-medium tracking-wide transition-colors"
                >
                  {isLogin ? "Create Account" : "Login"}
                </button>
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AuthModal;
