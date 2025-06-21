import React from "react";
import { motion } from "framer-motion";
import { MessageSquare, Phone, Mail } from "lucide-react";

const ContactHeader: React.FC = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background with natural texture */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-25 to-teal-50"></div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width=%2240%22%20height=%2240%22%20viewBox=%220%200%2040%2040%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill=%22none%22%20fill-rule=%22evenodd%22%3E%3Cg%20fill=%22%2334d399%22%20fill-opacity=%220.03%22%3E%3Cpath%20d=%22M20%2020c0-11.046-8.954-20-20-20s-20%208.954-20%2020%208.954%2020%2020%2020%2020-8.954%2020-20z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20 transform-none"
          style={{ transform: "none" }}
        >
          <div className="inline-flex items-center text-green-700/60 px-4 py-2 text-sm font-light mb-8 tracking-wider">
            <MessageSquare className="w-4 h-4 mr-2" />
            GET IN TOUCH
          </div>

          <h1 className="text-6xl lg:text-9xl font-light text-green-800 tracking-wider mb-4 transform-none">
            Contact
          </h1>
          <h2 className="text-4xl lg:text-7xl font-light text-green-600 tracking-wider mb-8 transform-none italic">
            Us
          </h2>

          <div className="w-24 h-px bg-green-600/30 mx-auto mb-8"></div>

          <p className="text-lg text-gray-600/80 max-w-2xl mx-auto font-light leading-relaxed">
            We'd love to hear from you. Send us a message and we'll respond as
            soon as possible.
          </p>
        </motion.div>

        {/* Quick Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          {[
            {
              icon: Phone,
              title: "Call Us",
              value: "+94 77 123 4567",
              subtitle: "Mon-Fri 9AM-6PM",
            },
            {
              icon: Mail,
              title: "Email Us",
              value: "hello@harithaceylon.lk",
              subtitle: "We reply within 24h",
            },
            {
              icon: MessageSquare,
              title: "Live Chat",
              value: "Available Now",
              subtitle: "Instant support",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
              className="group text-center border-b border-green-600/10 pb-6 hover:border-green-600/30 transition-all duration-500"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/80 backdrop-blur-sm rounded-2xl mb-4 group-hover:bg-green-50 transition-all duration-300 shadow-sm">
                <item.icon className="w-7 h-7 text-green-600" />
              </div>

              <h3 className="text-lg font-light text-gray-900 mb-2 tracking-wide">
                {item.title}
              </h3>

              <p className="text-green-600 font-light mb-1">{item.value}</p>

              <p className="text-sm text-gray-500 font-light">
                {item.subtitle}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ContactHeader;
