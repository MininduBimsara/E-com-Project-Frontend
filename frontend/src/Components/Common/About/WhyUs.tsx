import React from "react";
import { motion } from "framer-motion";
import { Recycle, Leaf, Truck, Users } from "lucide-react";

const WhyHarithaCeylon: React.FC = () => {
  const values = [
    {
      icon: Recycle,
      title: "Zero-Waste Packaging",
      description:
        "All our products arrive in plastic-free, compostable packaging that leaves no trace on our planet.",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      icon: Leaf,
      title: "100% Organic Products",
      description:
        "Every item in our collection is certified organic, sustainably sourced, and free from harmful chemicals.",
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
    {
      icon: Truck,
      title: "Carbon Neutral Deliveries",
      description:
        "We offset 100% of our delivery emissions and use electric vehicles wherever possible in Sri Lanka.",
      color: "text-teal-600",
      bgColor: "bg-teal-50",
    },
    {
      icon: Users,
      title: "Supporting Sri Lankan Artisans",
      description:
        "We partner with local craftspeople and communities to preserve traditional skills and provide fair wages.",
      color: "text-amber-600",
      bgColor: "bg-amber-50",
    },
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background with natural texture */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-25 to-teal-50"></div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width=%2260%22%20height=%2260%22%20viewBox=%220%200%2060%2060%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill=%22none%22%20fill-rule=%22evenodd%22%3E%3Cg%20fill=%22%2310b981%22%20fill-opacity=%220.04%22%3E%3Ccircle%20cx=%2230%22%20cy=%2230%22%20r=%2230%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center text-green-700/60 px-4 py-2 text-sm font-light mb-8 tracking-wider">
            <Leaf className="w-4 h-4 mr-2" />
            OUR VALUES
          </div>

          <h2 className="text-6xl lg:text-8xl font-light text-green-800 tracking-wider mb-4">
            Why
          </h2>
          <h3 className="text-4xl lg:text-6xl font-light text-green-600 tracking-wider italic mb-8">
            Haritha Ceylon?
          </h3>

          <div className="w-24 h-px bg-green-600/30 mx-auto mb-8"></div>

          <p className="text-lg text-gray-600/80 max-w-3xl mx-auto font-light leading-relaxed">
            We believe that conscious choices today create a healthier tomorrow.
            Here's what makes us different in the world of sustainable commerce.
          </p>
        </motion.div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group relative"
            >
              {/* Value Card */}
              <div className="relative py-12 px-8 lg:px-12 border-b border-green-600/10 hover:border-green-600/20 transition-all duration-500">
                <div className="space-y-6">
                  {/* Icon */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                    className={`w-16 h-16 ${value.bgColor} rounded-2xl flex items-center justify-center group-hover:shadow-lg transition-all duration-500`}
                  >
                    <value.icon className={`w-8 h-8 ${value.color}`} />
                  </motion.div>

                  {/* Title */}
                  <h4 className="text-2xl lg:text-3xl font-light text-gray-900 tracking-wide group-hover:text-green-600 transition-colors duration-500">
                    {value.title}
                  </h4>

                  {/* Description */}
                  <p className="text-gray-600/80 font-light leading-relaxed">
                    {value.description}
                  </p>

                  {/* Decorative Line */}
                  <div className="pt-4">
                    <div
                      className={`w-12 h-px ${value.color.replace(
                        "text-",
                        "bg-"
                      )}/30 group-hover:w-24 transition-all duration-700`}
                    ></div>
                  </div>
                </div>

                {/* Hover Effect Line */}
                <div className="absolute bottom-0 left-0 w-0 h-px bg-green-600 group-hover:w-full transition-all duration-700"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          {[
            { value: "2,500+", label: "Happy Customers", suffix: "" },
            { value: "12.8", label: "Tonnes CO₂ Offset", suffix: "t" },
            { value: "95%", label: "Plastic-Free Products", suffix: "" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.9 + index * 0.1 }}
              className="group text-center border-b border-green-600/10 pb-4 hover:border-green-400/30 transition-all duration-500"
            >
              <div className="text-3xl lg:text-4xl font-light text-green-600 mb-2 group-hover:text-green-500 transition-colors">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600/80 font-light tracking-wider uppercase">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyHarithaCeylon;
