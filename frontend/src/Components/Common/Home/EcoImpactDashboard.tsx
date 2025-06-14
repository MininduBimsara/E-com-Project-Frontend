import React, { useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import {
  Package,
  TreePine,
  Users,
  Heart,
  TrendingUp,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

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

const ModernEcoImpact: React.FC = () => {
  const stats = [
    {
      icon: Package,
      value: 1250,
      suffix: "+",
      label: "Plastic-free items",
      description: "Products delivered sustainably",
      gradient: "from-emerald-400 via-green-500 to-teal-600",
      position: "top-8 left-8",
    },
    {
      icon: TreePine,
      value: 4800,
      suffix: "kg",
      label: "CO₂ offset",
      description: "Carbon emissions reduced",
      gradient: "from-blue-400 via-cyan-500 to-teal-500",
      position: "top-8 right-8",
    },
    {
      icon: Users,
      value: 300,
      suffix: "+",
      label: "Conscious families",
      description: "Making sustainable choices",
      gradient: "from-purple-400 via-violet-500 to-purple-600",
      position: "bottom-8 left-8",
    },
    {
      icon: Heart,
      value: 95,
      suffix: "%",
      label: "Customer satisfaction",
      description: "Happy eco-conscious customers",
      gradient: "from-pink-400 via-rose-500 to-pink-600",
      position: "bottom-8 right-8",
    },
  ];

  return (
    <section className="relative py-24 overflow-hidden bg-white">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-green-200/30 to-blue-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-200/30 to-pink-200/30 rounded-full blur-3xl animate-pulse delay-1000"></div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div
            className="h-full w-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-900 via-transparent to-transparent"
            style={{
              backgroundSize: "20px 20px",
              backgroundImage:
                "radial-gradient(circle, #000 1px, transparent 1px)",
            }}
          ></div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200/50 px-6 py-3 rounded-full mb-8"
          >
            <Sparkles className="w-5 h-5 text-green-600" />
            <span className="text-green-700 font-medium">Real Impact Data</span>
          </motion.div>

          <h2 className="text-5xl lg:text-7xl font-bold mb-8">
            <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
              Our Environmental
            </span>
            <br />
            <span className="bg-gradient-to-r from-green-600 via-emerald-500 to-teal-600 bg-clip-text text-transparent">
              Impact
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Every purchase creates a ripple effect of positive change.
            <br />
            Here's the measurable difference we're making together.
          </p>
        </motion.div>

        {/* Main Impact Display */}
        <div className="relative">
          {/* Central Hub */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", duration: 0.8 }}
            className="relative mx-auto w-80 h-80 lg:w-96 lg:h-96 mb-16"
          >
            {/* Main Circle */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white to-gray-50 shadow-2xl border border-gray-100">
              {/* Inner Glow */}
              <div className="absolute inset-4 rounded-full bg-gradient-to-br from-green-50 to-blue-50 opacity-60"></div>

              {/* Center Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, type: "spring" }}
                  className="mb-4"
                >
                  <TrendingUp className="w-12 h-12 text-green-600 mx-auto mb-3" />
                  <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent mb-2">
                    <AnimatedCounter end={6345} />
                  </div>
                  <p className="text-gray-600 font-medium">
                    Total Positive Actions
                  </p>
                </motion.div>
              </div>

              {/* Orbiting Elements */}
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
                  className={`absolute ${stat.position} transform -translate-x-1/2 -translate-y-1/2`}
                  style={{
                    left: `${50 + 35 * Math.cos((index * Math.PI) / 2)}%`,
                    top: `${50 + 35 * Math.sin((index * Math.PI) / 2)}%`,
                  }}
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="group cursor-pointer"
                  >
                    <div
                      className={`relative w-32 h-32 lg:w-36 lg:h-36 rounded-3xl bg-gradient-to-br ${stat.gradient} p-0.5 shadow-lg hover:shadow-xl transition-all duration-300`}
                    >
                      <div className="w-full h-full bg-white rounded-3xl p-4 flex flex-col items-center justify-center text-center">
                        <stat.icon className="w-6 h-6 text-gray-700 mb-2" />
                        <div
                          className={`text-2xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-1`}
                        >
                          <AnimatedCounter
                            end={stat.value}
                            suffix={stat.suffix}
                          />
                        </div>
                        <p className="text-xs text-gray-600 font-medium leading-tight">
                          {stat.label}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* Animated Rings */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border-2 border-dashed border-green-200/50"
            ></motion.div>
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute inset-8 rounded-full border border-dashed border-blue-200/30"
            ></motion.div>
          </motion.div>

          {/* Impact Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="text-center group"
              >
                <div className="relative inline-block mb-4">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.gradient} p-0.5 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <div className="w-full h-full bg-white rounded-2xl flex items-center justify-center">
                      <stat.icon className="w-7 h-7 text-gray-700" />
                    </div>
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {stat.label}
                </h3>
                <p className="text-sm text-gray-600">{stat.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
          className="text-center mt-20"
        >
          <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
            Ready to amplify your positive impact on the planet?
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group inline-flex items-center gap-3 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Start Your Eco Journey
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default ModernEcoImpact;
