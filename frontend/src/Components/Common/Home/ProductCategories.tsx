import React from 'react';
import { motion } from 'framer-motion';

const ProductCategories: React.FC = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background with natural texture */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-100 via-green-50 to-emerald-100"></div>
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%2334d399" fill-opacity="0.05"%3E%3Cpath d="M20 20c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>

      {/* Product Images - Floating */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 2, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-20 left-10 w-24 h-24 bg-gradient-to-br from-green-200 to-green-300 rounded-2xl shadow-lg opacity-40"
        />
        <motion.div
          animate={{ y: [0, 15, 0], rotate: [0, -3, 0] }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
          className="absolute bottom-32 right-16 w-32 h-32 bg-gradient-to-br from-amber-200 to-yellow-300 rounded-3xl shadow-lg opacity-30"
        />
        <motion.div
          animate={{ y: [0, -12, 0], rotate: [0, 1, 0] }}
          transition={{ duration: 6, repeat: Infinity, delay: 4 }}
          className="absolute top-1/2 right-8 w-20 h-20 bg-gradient-to-br from-emerald-200 to-teal-300 rounded-xl shadow-lg opacity-35"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Category Lines */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-8 mb-16"
        >
          {/* Soap Bar */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <h2 className="text-5xl lg:text-7xl font-light text-green-800 tracking-wider">
              Soap Bar
            </h2>
            <div className="absolute inset-0 border-b border-green-800/20 top-1/2"></div>
          </motion.div>

          {/* Lip Balm */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <h2 className="text-5xl lg:text-7xl font-light text-green-700 tracking-wider italic">
              Lip Balm
            </h2>
            <div className="absolute inset-0 border-b border-green-700/20 top-1/2"></div>
          </motion.div>

          {/* Accessories */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="relative"
          >
            <h2 className="text-5xl lg:text-7xl font-light text-green-600 tracking-wider">
              Accessories
            </h2>
            <div className="absolute inset-0 border-b border-green-600/20 top-1/2"></div>
          </motion.div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <button className="bg-transparent border-2 border-green-700 text-green-700 px-12 py-4 rounded-full font-light tracking-[0.2em] text-sm hover:bg-green-700 hover:text-white transition-all duration-500 uppercase">
            Shop All
          </button>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-green-600 rounded-full opacity-30"
        />
      </div>
    </section>
  );
};

export default ProductCategories;