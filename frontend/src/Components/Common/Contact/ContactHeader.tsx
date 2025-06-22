import React from "react";
import { motion } from "framer-motion";
import { MessageSquare, Heart } from "lucide-react";

const ContactHeader: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/90 via-emerald-800/80 to-teal-900/90 z-10"></div>
        <img
          src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
          alt="Sustainable Office Space"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-16">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center bg-white/10 backdrop-blur-md border border-white/20 text-white/90 px-6 py-3 rounded-full text-sm font-light mb-12 tracking-wider"
        >
          <Heart className="w-4 h-4 mr-2 text-green-300" />
          LET'S START A CONVERSATION
        </motion.div>

        {/* Main Typography with Creative Layout */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
          style={{ transform: "none" }}
        >
          {/* Creative Split Layout */}
          <div className="relative" style={{ transform: "none" }}>
            <div
              className="text-7xl lg:text-9xl font-light text-white tracking-wider leading-none"
              style={{ transform: "none" }}
            >
              We'd
            </div>

            <div
              className="flex items-center justify-center my-8"
              style={{ transform: "none" }}
            >
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-green-300 to-transparent"></div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="mx-8 w-12 h-12 border-2 border-green-300/50 rounded-full flex items-center justify-center"
              >
                <MessageSquare className="w-6 h-6 text-green-300" />
              </motion.div>
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-green-300 to-transparent"></div>
            </div>

            <div
              className="text-6xl lg:text-8xl font-light text-green-300 tracking-wider italic leading-none"
              style={{ transform: "none" }}
            >
              Love to
            </div>

            <div
              className="mt-8 text-5xl lg:text-7xl font-light text-white tracking-wider leading-none"
              style={{ transform: "none" }}
            >
              Hear from
            </div>

            <div
              className="mt-4 text-6xl lg:text-8xl font-light text-green-200 tracking-wider leading-none"
              style={{ transform: "none" }}
            >
              You
            </div>
          </div>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-16"
        >
          <p className="text-xl lg:text-2xl text-white/80 max-w-3xl mx-auto font-light leading-relaxed">
            Whether you have questions about our sustainable products, need
            support with an order, or want to join our eco-friendly mission,
            we're here to connect.
          </p>
        </motion.div>
      </div>

      {/* Animated Background Particles */}
      <div className="absolute inset-0 z-5">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Bottom Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 z-20"
      >

      </motion.div>
    </section>
  );
};

export default ContactHeader;
