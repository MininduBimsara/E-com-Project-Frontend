import React, { useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Package, TreePine, Users, Heart, TrendingUp } from "lucide-react";

// Animated Counter Component
const AnimatedCounter: React.FC<{
  end: number;
  suffix?: string;
  duration?: number;
}> = ({ end, suffix = "", duration = 2 }) => {
  const [count, setCount] = useState(0);
  const ref = React.useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let startTime: number;
      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min(
          (timestamp - startTime) / (duration * 1000),
          1
        );
        setCount(Math.floor(progress * end));
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, end, duration]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

const EcoImpactDashboard: React.FC = () => {
  const stats = [
    {
      icon: Package,
      value: 1250,
      suffix: "+",
      label: "Plastic-free items sold",
      description: "Products delivered without harmful plastic packaging",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      icon: TreePine,
      value: 4800,
      suffix: "kg",
      label: "CO₂ offset",
      description: "Carbon emissions reduced through our initiatives",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      icon: Users,
      value: 300,
      suffix: "+",
      label: "Conscious families supported",
      description: "Families making sustainable choices daily",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
    },
    {
      icon: Heart,
      value: 95,
      suffix: "%",
      label: "Customer satisfaction",
      description: "Happy customers loving sustainable products",
      color: "from-pink-500 to-rose-500",
      bgColor: "bg-pink-50",
      iconColor: "text-pink-600",
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
            <TrendingUp className="w-4 h-4 mr-2" />
            Real Impact Data
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Our Environmental
            <span className="block text-green-600">Impact</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Every purchase you make contributes to a healthier planet. See the
            tangible difference we're making together.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="relative bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 overflow-hidden">
                {/* Background Gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                ></div>

                {/* Icon */}
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 ${stat.bgColor} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <stat.icon className={`w-8 h-8 ${stat.iconColor}`} />
                </div>

                {/* Value */}
                <div
                  className={`text-4xl lg:text-5xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-3`}
                >
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>

                {/* Label */}
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {stat.label}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed">
                  {stat.description}
                </p>

                {/* Progress Bar */}
                <div className="mt-6 w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 + 0.5, duration: 1.5 }}
                    className={`h-full bg-gradient-to-r ${stat.color} rounded-full`}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16"
        >
          <p className="text-gray-600 mb-6">
            Want to be part of this growing impact?
          </p>
          <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
            Start Shopping Sustainably
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default EcoImpactDashboard;
