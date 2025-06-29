import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
} from "lucide-react";

const ContactInfo: React.FC = () => {
  const [hoveredMethod, setHoveredMethod] = useState<string | null>(null);

  const contactMethods = [
    {
      id: "visit",
      icon: MapPin,
      label: "VISIT",
      primary: "123 Galle Road, Colombo 03",
      secondary: "Mon-Fri 9-6, Sat 10-4",
    },
    {
      id: "call",
      icon: Phone,
      label: "CALL",
      primary: "+94 77 123 4567",
      secondary: "Available Mon-Fri 9AM-6PM",
    },
    {
      id: "email",
      icon: Mail,
      label: "EMAIL",
      primary: "hello@harithaceylon.lk",
      secondary: "24 hour response",
    },
    {
      id: "chat",
      icon: MessageCircle,
      label: "CHAT",
      primary: "+94 77 123 4567",
      secondary: "WhatsApp business hours",
    },
  ];

  const socialLinks = [
    { icon: Instagram, name: "Instagram", url: "#" },
    { icon: Facebook, name: "Facebook", url: "#" },
    { icon: Twitter, name: "Twitter", url: "#" },
    { icon: Linkedin, name: "LinkedIn", url: "#" },
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-white via-green-50/30 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Minimal Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-7xl lg:text-8xl font-light text-green-800 tracking-[0.3em] mb-6">
            REACH
          </h2>
          <div className="w-20 h-px bg-green-600/30 mb-6"></div>
          <p className="text-lg font-light text-gray-600/80 max-w-md">
            Multiple ways to connect. Choose what works best for you.
          </p>
        </motion.div>

        {/* Simple Contact Methods */}
        <div className="space-y-12 mb-24">
          {contactMethods.map((method, index) => (
            <motion.div
              key={method.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onHoverStart={() => setHoveredMethod(method.id)}
              onHoverEnd={() => setHoveredMethod(null)}
              className="group cursor-pointer"
            >
              <div className="flex items-start gap-6">
                {/* Icon */}
                <div className="mt-1">
                  <method.icon className="w-6 h-6 text-green-600/60 group-hover:text-green-600 transition-colors duration-300" />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-sm font-light tracking-[0.3em] text-gray-500 mb-2">
                    {method.label}
                  </h3>
                  <p className="text-2xl font-light text-gray-900 mb-1 group-hover:text-green-700 transition-colors duration-300">
                    {method.primary}
                  </p>
                  <p className="text-sm font-light text-gray-500">
                    {method.secondary}
                  </p>
                </div>

                {/* Hover Line */}
                <div className="mt-8 flex-1 max-w-xs">
                  <div
                    className={`h-px bg-green-600/20 transition-all duration-700 ${
                      hoveredMethod === method.id ? "w-full" : "w-0"
                    }`}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Business Hours - Minimal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24 border-t border-b border-gray-100 py-12"
        >
          <div className="flex items-center gap-3 mb-8">
            <Clock className="w-5 h-5 text-green-600/60" />
            <h3 className="text-sm font-light tracking-[0.3em] text-gray-500">
              HOURS
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-sm font-light text-gray-500 mb-2">Store</p>
              <p className="font-light text-gray-900">Mon-Fri 9-6</p>
              <p className="font-light text-gray-900">Sat 10-4</p>
            </div>
            <div>
              <p className="text-sm font-light text-gray-500 mb-2">Phone</p>
              <p className="font-light text-gray-900">Mon-Fri 8-7</p>
              <p className="font-light text-gray-900">Sat 9-5</p>
            </div>
            <div>
              <p className="text-sm font-light text-gray-500 mb-2">Online</p>
              <p className="font-light text-gray-900">Always 24/7</p>
              <p className="font-light text-gray-900">Quick response</p>
            </div>
          </div>
        </motion.div>

        {/* Social Links - Minimal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h3 className="text-sm font-light tracking-[0.3em] text-gray-500 mb-6">
            SOCIAL
          </h3>
          <div className="flex gap-4">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.url}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -2 }}
                className="group"
              >
                <social.icon className="w-5 h-5 text-gray-400 group-hover:text-green-600 transition-colors duration-300" />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Emergency - Minimal */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center py-12 border-t border-gray-100"
        >
          <p className="text-sm font-light tracking-[0.3em] text-gray-500 mb-3">
            EMERGENCY 24/7
          </p>
          <p className="text-3xl font-light text-green-700 tracking-wider">
            +94 77 999 8888
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactInfo;
