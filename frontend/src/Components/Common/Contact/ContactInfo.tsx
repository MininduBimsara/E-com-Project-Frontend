import React from "react";
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
  const contactDetails = [
    {
      icon: MapPin,
      title: "Visit Our Store",
      primary: "123 Galle Road, Colombo 03",
      secondary: "Sri Lanka",
      description: "Come visit our eco-friendly showroom",
      gradient: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
    },
    {
      icon: Phone,
      title: "Call Us",
      primary: "+94 77 123 4567",
      secondary: "+94 11 234 5678",
      description: "Available Mon-Fri 9AM-6PM",
      gradient: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
    },
    {
      icon: Mail,
      title: "Email Support",
      primary: "hello@harithaceylon.lk",
      secondary: "support@harithaceylon.lk",
      description: "We reply within 24 hours",
      gradient: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      primary: "+94 77 123 4567",
      secondary: "Business hours only",
      description: "Quick support via WhatsApp",
      gradient: "from-green-500 to-teal-500",
      bgColor: "bg-emerald-50",
    },
  ];

  const socialLinks = [
    { icon: Instagram, name: "Instagram", url: "#", color: "text-pink-600" },
    { icon: Facebook, name: "Facebook", url: "#", color: "text-blue-600" },
    { icon: Twitter, name: "Twitter", url: "#", color: "text-sky-600" },
    { icon: Linkedin, name: "LinkedIn", url: "#", color: "text-blue-700" },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-green-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-6xl font-light text-green-800 tracking-wider mb-4">
            Get in
          </h2>
          <h3 className="text-3xl lg:text-5xl font-light text-green-600 tracking-wider italic mb-8">
            Touch
          </h3>

          <div className="w-24 h-px bg-green-600/30 mx-auto mb-8"></div>

          <p className="text-gray-600/80 font-light leading-relaxed max-w-2xl mx-auto">
            Multiple ways to reach us. Choose what works best for you.
          </p>
        </motion.div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {contactDetails.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 h-full">
                {/* Icon */}
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 ${item.bgColor} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <item.icon
                    className={`w-8 h-8 bg-gradient-to-br ${item.gradient} bg-clip-text text-transparent`}
                  />
                </div>

                {/* Content */}
                <h3 className="text-xl font-light text-gray-900 mb-4 tracking-wide group-hover:text-green-600 transition-colors">
                  {item.title}
                </h3>

                <div className="space-y-2 mb-4">
                  <p className="text-green-600 font-light text-lg">
                    {item.primary}
                  </p>
                  <p className="text-gray-500 font-light">{item.secondary}</p>
                </div>

                <p className="text-gray-600/80 font-light text-sm leading-relaxed">
                  {item.description}
                </p>

                {/* Hover Line Effect */}
                <div className="mt-6 w-0 h-px bg-gradient-to-r from-green-600 to-emerald-600 group-hover:w-full transition-all duration-700"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Business Hours */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 mb-12"
        >
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-50 rounded-2xl mb-6">
              <Clock className="w-8 h-8 text-green-600" />
            </div>

            <h3 className="text-2xl font-light text-gray-900 mb-6 tracking-wide">
              Business Hours
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <h4 className="font-light text-gray-900 mb-2">Store Visits</h4>
                <p className="text-green-600 font-light">
                  Mon - Fri: 9AM - 6PM
                </p>
                <p className="text-green-600 font-light">Sat: 10AM - 4PM</p>
                <p className="text-gray-500 font-light text-sm">
                  Closed Sundays
                </p>
              </div>

              <div className="text-center">
                <h4 className="font-light text-gray-900 mb-2">Phone Support</h4>
                <p className="text-green-600 font-light">
                  Mon - Fri: 8AM - 7PM
                </p>
                <p className="text-green-600 font-light">Sat: 9AM - 5PM</p>
                <p className="text-gray-500 font-light text-sm">
                  Limited Sunday hours
                </p>
              </div>

              <div className="text-center">
                <h4 className="font-light text-gray-900 mb-2">
                  Online Support
                </h4>
                <p className="text-green-600 font-light">24/7 Email Support</p>
                <p className="text-green-600 font-light">
                  Live Chat: 9AM - 6PM
                </p>
                <p className="text-gray-500 font-light text-sm">
                  Quick response guaranteed
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Social Media */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-2xl font-light text-gray-900 mb-6 tracking-wide">
            Follow Us
          </h3>

          <p className="text-gray-600/80 font-light mb-8 max-w-md mx-auto">
            Stay connected with our sustainable community and get updates on new
            eco-friendly products.
          </p>

          <div className="flex justify-center space-x-6">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.url}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.2 }}
                whileHover={{ scale: 1.1, y: -3 }}
                className={`group w-14 h-14 bg-white rounded-2xl shadow-sm hover:shadow-lg border border-gray-100 flex items-center justify-center transition-all duration-300 ${social.color}`}
              >
                <social.icon className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Emergency Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl p-8 text-white text-center"
        >
          <h3 className="text-2xl font-light mb-4 tracking-wide">
            Need Immediate Help?
          </h3>
          <p className="font-light mb-6 opacity-90">
            For urgent order issues or product concerns, call our emergency
            hotline
          </p>
          <div className="text-2xl font-light tracking-wider">
            +94 77 999 8888
          </div>
          <p className="text-sm font-light opacity-80 mt-2">
            Available 24/7 for emergencies
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactInfo;
