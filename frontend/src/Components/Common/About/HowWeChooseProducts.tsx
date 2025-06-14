import React, { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Leaf, Award, Search, ArrowRight } from "lucide-react";

const HowWeChooseProducts: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const criteria = [
    {
      step: "01",
      title: "Sustainable Materials",
      description:
        "We prioritize products made from renewable, biodegradable, or recycled materials that minimize environmental impact.",
      details: [
        "Organic cotton, bamboo, hemp, and other natural fibers",
        "Recycled plastics and metals where unavoidable",
        "Biodegradable alternatives to synthetic materials",
        "FSC-certified wood and paper products",
      ],
      icon: Leaf,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      step: "02",
      title: "Ethical Sourcing",
      description:
        "Every product must meet our strict standards for fair labor practices and community support.",
      details: [
        "Fair trade certified suppliers",
        "No child labor or exploitative practices",
        "Living wages for all workers",
        "Support for local communities and artisans",
      ],
      icon: Award,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
    {
      step: "03",
      title: "Verified Eco-Ratings",
      description:
        "All products undergo rigorous testing and certification to ensure they meet our environmental standards.",
      details: [
        "Third-party environmental certifications",
        "Life cycle assessment analysis",
        "Carbon footprint calculation",
        "Biodegradability and compostability testing",
      ],
      icon: CheckCircle,
      color: "text-teal-600",
      bgColor: "bg-teal-50",
    },
    {
      step: "04",
      title: "Quality & Durability",
      description:
        "We choose products built to last, reducing waste through longevity and superior craftsmanship.",
      details: [
        "Rigorous quality testing protocols",
        "Minimum 2-year product warranties",
        "Repairable and upgradeable designs",
        "Timeless aesthetics that won't go out of style",
      ],
      icon: Search,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
    },
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background with natural texture */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-green-25 to-emerald-50"></div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-15">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width=%2240%22%20height=%2240%22%20viewBox=%220%200%2040%2040%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill=%22none%22%20fill-rule=%22evenodd%22%3E%3Cg%20fill=%22%2334d399%22%20fill-opacity=%220.05%22%3E%3Cpath%20d=%22M20%2020c0-11.046-8.954-20-20-20s-20%208.954-20%2020%208.954%2020%2020%2020%2020-8.954%2020-20z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
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
            <CheckCircle className="w-4 h-4 mr-2" />
            OUR PROCESS
          </div>

          <h2 className="text-6xl lg:text-8xl font-light text-green-800 tracking-wider mb-4">
            How We
          </h2>
          <h3 className="text-4xl lg:text-6xl font-light text-green-600 tracking-wider italic mb-8">
            Choose Products
          </h3>

          <div className="w-24 h-px bg-green-600/30 mx-auto mb-8"></div>

          <p className="text-lg text-gray-600/80 max-w-3xl mx-auto font-light leading-relaxed">
            Every product in our collection goes through a comprehensive
            evaluation process. We don't just sell products – we curate
            solutions for sustainable living.
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="space-y-8">
          {criteria.map((criterion, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group relative cursor-pointer"
              onHoverStart={() => setActiveStep(index)}
              onHoverEnd={() => setActiveStep(null)}
            >
              {/* Step Line */}
              <div className="relative py-12 border-b border-green-600/10">
                <div className="flex flex-col lg:flex-row items-start gap-8">
                  {/* Step Number & Icon */}
                  <div className="flex items-center gap-6 min-w-fit">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                      className="text-6xl lg:text-8xl font-light text-green-600/20 group-hover:text-green-600/40 transition-colors duration-500"
                    >
                      {criterion.step}
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                      className={`w-16 h-16 ${criterion.bgColor} rounded-2xl flex items-center justify-center group-hover:shadow-lg transition-all duration-500`}
                    >
                      <criterion.icon
                        className={`w-8 h-8 ${criterion.color}`}
                      />
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    {/* Title */}
                    <h4 className="text-3xl lg:text-4xl font-light text-gray-900 tracking-wide mb-4 group-hover:text-green-600 transition-colors duration-500">
                      {criterion.title}
                    </h4>

                    {/* Description */}
                    <p className="text-lg text-gray-600/80 font-light leading-relaxed mb-6 max-w-3xl">
                      {criterion.description}
                    </p>

                    {/* Details - Show on Hover */}
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{
                        opacity: activeStep === index ? 1 : 0,
                        height: activeStep === index ? "auto" : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-green-600/10">
                        <h5 className="text-sm font-medium text-green-700 mb-4 tracking-wider uppercase">
                          Key Requirements:
                        </h5>
                        <ul className="space-y-2">
                          {criterion.details.map((detail, detailIndex) => (
                            <li
                              key={detailIndex}
                              className="flex items-start text-sm text-gray-600"
                            >
                              <div className="w-1 h-1 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>

                    {/* Interactive Hint */}
                    <motion.div
                      animate={{
                        opacity: activeStep === index ? 0 : 1,
                      }}
                      className="flex items-center text-sm text-green-600/60 mt-4"
                    >
                      <span>Hover to see detailed requirements</span>
                      <ArrowRight className="w-3 h-3 ml-2" />
                    </motion.div>
                  </div>
                </div>

                {/* Hover Effect Line */}
                <motion.div
                  className="absolute bottom-0 left-0 h-px bg-green-600"
                  initial={{ width: "0%" }}
                  animate={{
                    width: activeStep === index ? "100%" : "0%",
                  }}
                  transition={{ duration: 0.7 }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Process Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 lg:p-12 border border-green-600/10"
        >
          <div className="text-center">
            <div className="inline-flex items-center text-green-700/60 px-4 py-2 text-sm font-light mb-6 tracking-wider">
              <Award className="w-4 h-4 mr-2" />
              THE RESULT
            </div>

            <h4 className="text-2xl lg:text-3xl font-light text-gray-900 mb-6 tracking-wide">
              Only 12% of evaluated products make it to our shelves
            </h4>

            <p className="text-gray-600/80 font-light leading-relaxed max-w-2xl mx-auto mb-8">
              Our rigorous selection process ensures that every product you
              purchase from Haritha Ceylon contributes to a more sustainable
              future while meeting the highest standards of quality and ethics.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              {[
                { number: "500+", label: "Products Evaluated Monthly" },
                { number: "48hrs", label: "Average Review Time" },
                { number: "98%", label: "Customer Satisfaction Rate" },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="text-center py-4 border-b border-green-600/20"
                >
                  <div className="text-2xl font-light text-green-600 mb-1">
                    {stat.number}
                  </div>
                  <div className="text-xs text-gray-600/80 font-light tracking-wider uppercase">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowWeChooseProducts;
