import React from "react";
import { motion } from "framer-motion";
import {
  Leaf,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  ArrowRight,
  Award,
  Recycle,
  Heart,
} from "lucide-react";

interface FooterProps {
  onNewsletterSubmit?: (email: string) => void;
  onSocialClick?: (platform: string) => void;
}

const Footer: React.FC<FooterProps> = ({
  onNewsletterSubmit,
  onSocialClick,
}) => {
  const [email, setEmail] = React.useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      onNewsletterSubmit?.(email);
      setEmail("");
    }
  };

  const footerLinks = {
    shop: [
      { name: "All Products", href: "/products" },
      { name: "Clothing", href: "/products/clothing" },
      { name: "Kitchen", href: "/products/kitchen" },
      { name: "Accessories", href: "/products/accessories" },
      { name: "New Arrivals", href: "/products/new" },
    ],
    company: [
      { name: "About Us", href: "/about" },
      { name: "Our Mission", href: "/mission" },
      { name: "Sustainability", href: "/sustainability" },
      { name: "Blog", href: "/blog" },
      { name: "Careers", href: "/careers" },
    ],
    support: [
      { name: "Contact Us", href: "/contact" },
      { name: "FAQ", href: "/faq" },
      { name: "Shipping Info", href: "/shipping" },
      { name: "Returns", href: "/returns" },
      { name: "Size Guide", href: "/size-guide" },
    ],
    legal: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Cookie Policy", href: "/cookies" },
      { name: "Refund Policy", href: "/refunds" },
    ],
  };

  const socialLinks = [
    {
      name: "Facebook",
      icon: Facebook,
      href: "#",
      color: "hover:text-blue-600",
    },
    {
      name: "Instagram",
      icon: Instagram,
      href: "#",
      color: "hover:text-pink-600",
    },
    { name: "Twitter", icon: Twitter, href: "#", color: "hover:text-blue-400" },
    { name: "Youtube", icon: Youtube, href: "#", color: "hover:text-red-600" },
  ];

  const certifications = [
    { name: "Organic Certified", icon: Leaf, desc: "100% Organic Materials" },
    { name: "Fair Trade", icon: Award, desc: "Ethically Sourced" },
    { name: "Carbon Neutral", icon: Recycle, desc: "Zero Net Emissions" },
  ];

  return (
    <footer className="relative overflow-hidden">
      {/* Background with natural texture */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-900 via-emerald-800 to-teal-900"></div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width=%2240%22%20height=%2240%22%20viewBox=%220%200%2040%2040%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill=%22none%22%20fill-rule=%22evenodd%22%3E%3Cg%20fill=%22%23ffffff%22%20fill-opacity=%220.05%22%3E%3Cpath%20d=%22M20%2020c0-11.046-8.954-20-20-20s-20%208.954-20%2020%208.954%2020%2020%2020%2020-8.954%2020-20z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      </div>

      <div className="relative z-10">
        {/* Newsletter Section */}
        <div className="border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              <div className="inline-flex items-center text-green-400/80 px-4 py-2 text-sm font-light mb-8 tracking-wider">
                <Leaf className="w-4 h-4 mr-2" />
                STAY CONNECTED
              </div>

              <h2 className="text-4xl lg:text-6xl font-light text-white tracking-wider mb-4">
                Join Our
              </h2>
              <h3 className="text-3xl lg:text-5xl font-light text-green-400 tracking-wider italic mb-8">
                Green Community
              </h3>

              <div className="w-24 h-px bg-green-400/30 mx-auto mb-8"></div>

              <p className="text-lg text-white/70 font-light leading-relaxed mb-12 max-w-2xl mx-auto">
                Get exclusive access to new products, sustainability tips, and
                special offers. Join thousands of eco-conscious consumers making
                a difference.
              </p>

              {/* Newsletter Form */}
              <motion.form
                onSubmit={handleNewsletterSubmit}
                className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/60 font-light tracking-wide focus:outline-none focus:border-green-400 transition-all duration-300"
                  required
                />
                <motion.button
                  type="submit"
                  className="group bg-green-600 text-white px-8 py-4 font-light tracking-[0.1em] text-sm hover:bg-green-500 transition-all duration-500 flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>SUBSCRIBE</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </motion.button>
              </motion.form>
            </motion.div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Brand Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-4"
            >
              {/* Logo */}
              <div className="mb-8">
                <img
                  src="/logo.png"
                  alt="Haritha Ceylon"
                  className="h-12 w-auto max-w-[180px] object-contain filter brightness-0 invert"
                />
              </div>

              <p className="text-white/70 font-light leading-relaxed mb-8 max-w-sm">
                Creating a sustainable future through eco-friendly products.
                Every purchase makes a positive impact on our planet.
              </p>

              {/* Contact Info */}
              <div className="space-y-4 mb-8">
                <motion.div
                  className="flex items-center text-white/70 hover:text-green-400 transition-colors duration-300"
                  whileHover={{ x: 4 }}
                >
                  <MapPin className="w-4 h-4 mr-3 text-green-400" />
                  <span className="font-light text-sm">Colombo, Sri Lanka</span>
                </motion.div>
                <motion.div
                  className="flex items-center text-white/70 hover:text-green-400 transition-colors duration-300"
                  whileHover={{ x: 4 }}
                >
                  <Phone className="w-4 h-4 mr-3 text-green-400" />
                  <span className="font-light text-sm">+94 77 123 4567</span>
                </motion.div>
                <motion.div
                  className="flex items-center text-white/70 hover:text-green-400 transition-colors duration-300"
                  whileHover={{ x: 4 }}
                >
                  <Mail className="w-4 h-4 mr-3 text-green-400" />
                  <span className="font-light text-sm">
                    hello@harithaceylon.com
                  </span>
                </motion.div>
              </div>

              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.button
                    key={social.name}
                    onClick={() => onSocialClick?.(social.name.toLowerCase())}
                    className={`p-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white/70 ${social.color} transition-all duration-300 hover:bg-white/20`}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <social.icon className="w-4 h-4" />
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Links Sections */}
            <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
              {/* Shop Links */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                <h4 className="text-white font-light text-lg tracking-wider mb-6 border-b border-white/10 pb-2">
                  SHOP
                </h4>
                <ul className="space-y-3">
                  {footerLinks.shop.map((link, index) => (
                    <motion.li
                      key={link.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05, duration: 0.5 }}
                    >
                      <motion.a
                        href={link.href}
                        className="text-white/60 hover:text-green-400 font-light text-sm tracking-wide transition-all duration-300 block"
                        whileHover={{ x: 4 }}
                      >
                        {link.name}
                      </motion.a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Company Links */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h4 className="text-white font-light text-lg tracking-wider mb-6 border-b border-white/10 pb-2">
                  COMPANY
                </h4>
                <ul className="space-y-3">
                  {footerLinks.company.map((link, index) => (
                    <motion.li
                      key={link.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05, duration: 0.5 }}
                    >
                      <motion.a
                        href={link.href}
                        className="text-white/60 hover:text-green-400 font-light text-sm tracking-wide transition-all duration-300 block"
                        whileHover={{ x: 4 }}
                      >
                        {link.name}
                      </motion.a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Support Links */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <h4 className="text-white font-light text-lg tracking-wider mb-6 border-b border-white/10 pb-2">
                  SUPPORT
                </h4>
                <ul className="space-y-3">
                  {footerLinks.support.map((link, index) => (
                    <motion.li
                      key={link.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05, duration: 0.5 }}
                    >
                      <motion.a
                        href={link.href}
                        className="text-white/60 hover:text-green-400 font-light text-sm tracking-wide transition-all duration-300 block"
                        whileHover={{ x: 4 }}
                      >
                        {link.name}
                      </motion.a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Legal Links */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <h4 className="text-white font-light text-lg tracking-wider mb-6 border-b border-white/10 pb-2">
                  LEGAL
                </h4>
                <ul className="space-y-3">
                  {footerLinks.legal.map((link, index) => (
                    <motion.li
                      key={link.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05, duration: 0.5 }}
                    >
                      <motion.a
                        href={link.href}
                        className="text-white/60 hover:text-green-400 font-light text-sm tracking-wide transition-all duration-300 block"
                        whileHover={{ x: 4 }}
                      >
                        {link.name}
                      </motion.a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>

          {/* Certifications Section */}
          {/* <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="border-t border-white/10 pt-16 mt-16"
          >
            <div className="text-center mb-12">
              <h4 className="text-2xl font-light text-white tracking-wider mb-4">
                Our Certifications
              </h4>
              <div className="w-16 h-px bg-green-400/30 mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="text-center group"
                >
                  <motion.div
                    className="w-16 h-16 bg-green-600/20 backdrop-blur-sm border border-green-400/30 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-600/30 transition-all duration-300"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <cert.icon className="w-6 h-6 text-green-400" />
                  </motion.div>
                  <h5 className="text-white font-light text-lg mb-2 tracking-wide">
                    {cert.name}
                  </h5>
                  <p className="text-white/60 font-light text-sm tracking-wide">
                    {cert.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div> */}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex flex-col md:flex-row items-center justify-between gap-4"
            >
              <div className="text-white/50 font-light text-sm tracking-wide text-center md:text-left">
                © {new Date().getFullYear()} Haritha Ceylon. All rights
                reserved.
              </div>

              <motion.div
                className="flex items-center text-white/50 font-light text-sm"
                whileHover={{ scale: 1.02 }}
              >
                <span className="tracking-wide">Made with</span>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="mx-2"
                >
                  <Heart className="w-4 h-4 text-green-400 fill-current" />
                </motion.div>
                <span className="tracking-wide">for the Planet</span>
              </motion.div>

              <div className="text-white/50 font-light text-sm tracking-wide">
                Sustainable • Ethical • Conscious
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
