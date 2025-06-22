import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  ArrowRight,
  Sparkles,
} from "lucide-react";

const ContactInfo: React.FC = () => {
  const [activeMethod, setActiveMethod] = useState<string | null>(null);
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);

  const contactMethods = [
    {
      id: "visit",
      icon: MapPin,
      label: "VISIT",
      title: "Our Store",
      details: {
        address: "123 Galle Road, Colombo 03",
        country: "Sri Lanka",
        extra: "Come visit our eco-friendly showroom",
        hours: "Mon-Fri: 9AM-6PM | Sat: 10AM-4PM",
      },
      color: "green",
      bgPattern:
        "radial-gradient(circle at 20% 50%, rgba(34, 197, 94, 0.1) 0%, transparent 50%)",
    },
    {
      id: "call",
      icon: Phone,
      label: "CALL",
      title: "Direct Line",
      details: {
        primary: "+94 77 123 4567",
        secondary: "+94 11 234 5678",
        extra: "Available Mon-Fri 9AM-6PM",
        support: "24/7 Emergency: +94 77 999 8888",
      },
      color: "blue",
      bgPattern:
        "radial-gradient(circle at 80% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
    },
    {
      id: "email",
      icon: Mail,
      label: "EMAIL",
      title: "Write to Us",
      details: {
        primary: "hello@harithaceylon.lk",
        secondary: "support@harithaceylon.lk",
        extra: "We reply within 24 hours",
        form: "Or use our contact form below",
      },
      color: "purple",
      bgPattern:
        "radial-gradient(circle at 50% 80%, rgba(147, 51, 234, 0.1) 0%, transparent 50%)",
    },
    {
      id: "chat",
      icon: MessageCircle,
      label: "CHAT",
      title: "WhatsApp",
      details: {
        number: "+94 77 123 4567",
        hours: "Business hours only",
        extra: "Quick support via WhatsApp",
        response: "Average response: 15 minutes",
      },
      color: "emerald",
      bgPattern:
        "radial-gradient(circle at 30% 30%, rgba(16, 185, 129, 0.1) 0%, transparent 50%)",
    },
  ];

  const socialLinks = [
    {
      icon: Instagram,
      name: "Instagram",
      url: "#",
      gradient: "from-pink-500 to-rose-500",
    },
    {
      icon: Facebook,
      name: "Facebook",
      url: "#",
      gradient: "from-blue-500 to-blue-600",
    },
    {
      icon: Twitter,
      name: "Twitter",
      url: "#",
      gradient: "from-sky-400 to-sky-500",
    },
    {
      icon: Linkedin,
      name: "LinkedIn",
      url: "#",
      gradient: "from-blue-600 to-blue-700",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-green-50/20 to-emerald-50/30 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-200/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-200/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Creative Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="relative inline-block">
            <h2 className="text-6xl lg:text-8xl font-light text-green-800 tracking-[0.2em] mb-2">
              REACH
            </h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
              className="absolute -bottom-2 left-0 h-px bg-gradient-to-r from-transparent via-green-600 to-transparent"
            />
          </div>

          <h3 className="text-5xl lg:text-7xl font-light text-green-600/70 tracking-[0.15em] italic -mt-4">
            out
          </h3>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-gray-600/80 font-light leading-relaxed max-w-2xl mx-auto mt-8 text-lg"
          >
            Choose your preferred way to connect with us
          </motion.p>
        </motion.div>

        {/* Interactive Contact Methods - Vertical Timeline Style */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-1/2 transform -translate-x-px h-full w-px bg-gradient-to-b from-green-200 via-green-300 to-transparent" />

            {contactMethods.map((method, index) => (
              <motion.div
                key={method.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className={`relative flex items-center mb-16 ${
                  index % 2 === 0 ? "justify-start" : "justify-end"
                }`}
              >
                <div
                  className={`w-1/2 ${
                    index % 2 === 0 ? "pr-12 text-right" : "pl-12"
                  }`}
                  style={{ background: method.bgPattern }}
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    onClick={() =>
                      setActiveMethod(
                        activeMethod === method.id ? null : method.id
                      )
                    }
                    className="cursor-pointer group"
                  >
                    <div
                      className={`inline-flex items-center gap-4 mb-4 ${
                        index % 2 === 0 ? "flex-row-reverse" : ""
                      }`}
                    >
                      <div
                        className={`w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center group-hover:shadow-xl transition-shadow duration-300`}
                      >
                        <method.icon
                          className={`w-8 h-8 text-${method.color}-600`}
                        />
                      </div>
                      <div>
                        <p
                          className={`text-sm font-light tracking-[0.3em] text-${method.color}-600 mb-1`}
                        >
                          {method.label}
                        </p>
                        <h3 className="text-2xl font-light text-gray-800 tracking-wider">
                          {method.title}
                        </h3>
                      </div>
                    </div>

                    <AnimatePresence>
                      {activeMethod === method.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className={`overflow-hidden ${
                            index % 2 === 0 ? "text-right" : "text-left"
                          }`}
                        >
                          <div className="pt-4 space-y-2">
                            {Object.entries(method.details).map(
                              ([key, value]) => (
                                <p
                                  key={key}
                                  className="text-gray-600 font-light"
                                >
                                  {value}
                                </p>
                              )
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div
                      className={`mt-4 flex items-center gap-2 text-${
                        method.color
                      }-600 ${index % 2 === 0 ? "justify-end" : ""}`}
                    >
                      <span className="text-sm font-light tracking-wider">
                        {activeMethod === method.id ? "COLLAPSE" : "EXPAND"}
                      </span>
                      <motion.div
                        animate={{
                          rotate: activeMethod === method.id ? 90 : 0,
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        <ArrowRight className="w-4 h-4" />
                      </motion.div>
                    </div>
                  </motion.div>
                </div>

                {/* Center Dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2">
                  <motion.div
                    whileHover={{ scale: 1.5 }}
                    className={`w-4 h-4 bg-${method.color}-500 rounded-full ring-4 ring-white shadow-lg`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Creative Business Hours Display */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto mb-20"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-100/50 to-emerald-100/50 rounded-3xl blur-xl" />
            <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-12 border border-green-100">
              <div className="flex items-center justify-center mb-8">
                <Clock className="w-12 h-12 text-green-600 mr-4" />
                <h3 className="text-3xl font-light text-gray-800 tracking-wider">
                  WE'RE OPEN
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center group">
                  <div className="w-px h-12 bg-green-200 mx-auto mb-4 group-hover:bg-green-400 transition-colors" />
                  <h4 className="font-light text-gray-700 mb-3 tracking-wider">
                    STORE
                  </h4>
                  <p className="text-green-600 font-light">MON-FRI</p>
                  <p className="text-2xl font-light text-gray-800">9-6</p>
                  <p className="text-sm text-gray-500 mt-1">SAT: 10-4</p>
                </div>

                <div className="text-center group">
                  <div className="w-px h-12 bg-blue-200 mx-auto mb-4 group-hover:bg-blue-400 transition-colors" />
                  <h4 className="font-light text-gray-700 mb-3 tracking-wider">
                    PHONE
                  </h4>
                  <p className="text-blue-600 font-light">MON-FRI</p>
                  <p className="text-2xl font-light text-gray-800">8-7</p>
                  <p className="text-sm text-gray-500 mt-1">SAT: 9-5</p>
                </div>

                <div className="text-center group">
                  <div className="w-px h-12 bg-purple-200 mx-auto mb-4 group-hover:bg-purple-400 transition-colors" />
                  <h4 className="font-light text-gray-700 mb-3 tracking-wider">
                    ONLINE
                  </h4>
                  <p className="text-purple-600 font-light">ALWAYS</p>
                  <p className="text-2xl font-light text-gray-800">24/7</p>
                  <p className="text-sm text-gray-500 mt-1">INSTANT</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Creative Social Media Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-2xl font-light text-gray-800 mb-8 tracking-[0.2em]">
            CONNECT SOCIALLY
          </h3>

          <div className="flex justify-center items-center gap-8">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.url}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.2 }}
                onHoverStart={() => setHoveredSocial(social.name)}
                onHoverEnd={() => setHoveredSocial(null)}
                className="relative group"
              >
                <div className="w-20 h-20 relative">
                  {/* Background Circle */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${social.gradient} rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl`}
                  />

                  {/* Icon Container */}
                  <div className="relative w-full h-full bg-white rounded-full shadow-lg group-hover:shadow-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                    <social.icon className="w-8 h-8 text-gray-400 group-hover:text-white transition-colors duration-300" />

                    {/* Gradient overlay on hover */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${social.gradient} rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                    />

                    {/* Icon on top */}
                    <social.icon className="w-8 h-8 absolute text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>

                {/* Label */}
                <AnimatePresence>
                  {hoveredSocial === social.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
                    >
                      <p className="text-sm font-light text-gray-600 tracking-wider">
                        {social.name}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Emergency Contact - Floating Card Style */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-24 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 rounded-3xl blur-2xl opacity-20" />
          <div className="relative bg-gradient-to-r from-red-500 to-orange-500 rounded-3xl p-1">
            <div className="bg-white rounded-3xl p-8 backdrop-blur-sm">
              <div className="flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-red-500 mr-2" />
                <h3 className="text-2xl font-light text-gray-800 tracking-wider">
                  EMERGENCY HOTLINE
                </h3>
                <Sparkles className="w-6 h-6 text-orange-500 ml-2" />
              </div>

              <div className="text-center">
                <p className="text-4xl font-light text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 tracking-wider mb-2">
                  +94 77 999 8888
                </p>
                <p className="text-sm font-light text-gray-600">
                  Available 24/7 for urgent matters
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactInfo;
