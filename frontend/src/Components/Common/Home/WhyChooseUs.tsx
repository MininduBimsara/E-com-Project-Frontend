import React from "react";
import { motion } from "framer-motion";
import {
  Package,
  Truck,
  MapPin,
  Award,
  CheckCircle,
  Sparkles,
} from "lucide-react";

const WhyChooseUs: React.FC = () => {
  const features = [
    {
      icon: Package,
      title: "Plastic-free Packaging",
      description:
        "All our products come in biodegradable or reusable packaging materials that protect both your products and our planet.",
      gradient: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
      benefits: [
        "100% biodegradable",
        "Reusable materials",
        "Zero plastic waste",
      ],
    },
    {
      icon: Truck,
      title: "Carbon Neutral Shipping",
      description:
        "We offset 100% of shipping emissions and use eco-friendly delivery methods to minimize our environmental footprint.",
      gradient: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      benefits: [
        "100% carbon offset",
        "Eco-friendly delivery",
        "Local distribution",
      ],
    },
    {
      icon: MapPin,
      title: "Locally Sourced Products",
      description:
        "Supporting Sri Lankan artisans and reducing transportation footprint by sourcing materials and products locally.",
      gradient: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
      benefits: [
        "Support local artisans",
        "Reduced transportation",
        "Community impact",
      ],
    },
    {
      icon: Award,
      title: "Verified Eco-Ratings",
      description:
        "Independent certification ensures authentic sustainability credentials for every product in our collection.",
      gradient: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50",
      benefits: [
        "Independent verification",
        "Transparent ratings",
        "Authentic credentials",
      ],
    },
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
          <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4 mr-2" />
            Why Choose Us
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Why Choose
            <span className="block text-green-600">Haritha Ceylon?</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We're committed to making sustainable shopping accessible,
            transparent, and impactful for everyone in Sri Lanka and beyond.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="relative bg-white rounded-3xl p-8 shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden h-full">
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
                  <div
                    className={`w-full h-full bg-gradient-to-br ${feature.gradient} rounded-full transform translate-x-8 -translate-y-8`}
                  ></div>
                </div>

                {/* Icon */}
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 ${feature.bgColor} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon
                    className={`w-8 h-8 bg-gradient-to-br ${feature.gradient} bg-clip-text text-transparent`}
                  />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-green-600 transition-colors">
                    {feature.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed mb-6">
                    {feature.description}
                  </p>

                  {/* Benefits List */}
                  <div className="space-y-3">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <motion.div
                        key={benefitIndex}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + benefitIndex * 0.1 }}
                        className="flex items-center space-x-3"
                      >
                        <div
                          className={`w-2 h-2 rounded-full bg-gradient-to-r ${feature.gradient}`}
                        ></div>
                        <span className="text-gray-700 text-sm font-medium">
                          {benefit}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Hover Effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-3 transition-opacity duration-500`}
                ></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-white rounded-3xl p-8 shadow-sm border border-gray-100"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">100%</div>
              <div className="text-gray-600 text-sm">
                Eco-Certified Products
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">
                1000+
              </div>
              <div className="text-gray-600 text-sm">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">24/7</div>
              <div className="text-gray-600 text-sm">Customer Support</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">
                30 Day
              </div>
              <div className="text-gray-600 text-sm">Return Policy</div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Make a Difference?
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of conscious consumers who are making sustainable
            choices every day. Your journey towards eco-friendly living starts
            here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
              Start Shopping Now
            </button>
            <button className="border-2 border-green-600 text-green-600 hover:bg-green-50 px-8 py-4 rounded-2xl font-semibold transition-all duration-300">
              Learn More About Us
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
