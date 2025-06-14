import React from "react";
import { motion } from "framer-motion";

const ProductCategories: React.FC = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background with natural texture */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-25 to-amber-50"></div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width=%2240%22%20height=%2240%22%20viewBox=%220%200%2040%2040%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill=%22none%22%20fill-rule=%22evenodd%22%3E%3Cg%20fill=%22%2334d399%22%20fill-opacity=%220.05%22%3E%3Cpath%20d=%22M20%2020c0-11.046-8.954-20-20-20s-20%208.954-20%2020%208.954%2020%2020%2020%2020-8.954%2020-20z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
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
              Clothing
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
              Kitchen
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
