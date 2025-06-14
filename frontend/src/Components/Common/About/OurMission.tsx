import React from "react";
import { motion } from "framer-motion";
import { Leaf, Globe, Users } from "lucide-react";

const OurMissionSection: React.FC = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background with natural texture */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-25 to-teal-50"></div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-15">
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
            <Globe className="w-4 h-4 mr-2" />
            OUR PURPOSE
          </div>

          <h2 className="text-6xl lg:text-8xl font-light text-green-800 tracking-wider mb-8">
            Mission
          </h2>

          <div className="w-24 h-px bg-green-600/30 mx-auto"></div>
        </motion.div>

        {/* Main Content - Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Mission Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="relative">
              <h3 className="text-4xl lg:text-5xl font-light text-green-800 tracking-wide mb-6">
                Nurturing Sustainable
              </h3>
              <h4 className="text-3xl lg:text-4xl font-light text-green-600 italic tracking-wide mb-8">
                Communities
              </h4>
              <div className="w-16 h-px bg-green-600/40 mb-8"></div>
            </div>

            <div className="space-y-6 text-gray-600/90 font-light leading-relaxed">
              <p className="text-lg">
                At{" "}
                <span className="text-green-700 font-medium">
                  Haritha Ceylon
                </span>
                , we believe that every purchase has the power to create
                positive change. Our mission is to promote ethical consumption
                while reducing environmental impact across Sri Lanka and beyond.
              </p>

              <p className="text-lg">
                We carefully curate products that honor both our planet and the
                communities that create them. From supporting local artisans to
                ensuring carbon-neutral deliveries, every decision reflects our
                commitment to sustainable living.
              </p>

              <p className="text-lg">
                Together, we're building a future where conscious choices become
                the norm, and every transaction contributes to a healthier, more
                equitable world.
              </p>
            </div>

            {/* Mission Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8">
              {[
                {
                  icon: <Leaf className="w-6 h-6" />,
                  title: "Planet First",
                  desc: "Every product choice considers environmental impact",
                },
                {
                  icon: <Users className="w-6 h-6" />,
                  title: "Community Focus",
                  desc: "Supporting local artisans and ethical practices",
                },
                {
                  icon: <Globe className="w-6 h-6" />,
                  title: "Global Impact",
                  desc: "Creating positive change beyond borders",
                },
              ].map((pillar, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  className="text-center group"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 text-green-700 rounded-full mb-3 group-hover:bg-green-600 group-hover:text-white transition-all duration-300">
                    {pillar.icon}
                  </div>
                  <h5 className="font-medium text-gray-800 mb-2 text-sm tracking-wide">
                    {pillar.title}
                  </h5>
                  <p className="text-xs text-gray-600/80 font-light leading-relaxed">
                    {pillar.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Mission Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-green-100/50 to-blue-100/50 h-96 lg:h-[500px]">
              <img
                src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Hands holding a young plant with earth"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />

              {/* Image Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-green-900/20 via-transparent to-transparent"></div>

              {/* Floating Elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-light text-green-700 shadow-lg"
              >
                🌱 Growing Together
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-light text-green-700 shadow-lg"
              >
                💚 With Purpose
              </motion.div>
            </div>

            {/* Decorative Elements */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.8 }}
              className="absolute -top-4 -left-4 w-8 h-8 bg-green-400/20 rounded-full"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 1 }}
              className="absolute -bottom-4 -right-4 w-6 h-6 bg-emerald-400/30 rounded-full"
            />
          </motion.div>
        </div>

        {/* Impact Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="border-t border-green-600/10 pt-16"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "2,500+", label: "Eco Products Delivered", suffix: "" },
              { value: "15", label: "Tonnes CO₂ Saved", suffix: "t" },
              { value: "150+", label: "Local Artisans Supported", suffix: "" },
              { value: "98%", label: "Sustainable Materials Used", suffix: "" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                className="group"
              >
                <div className="text-3xl lg:text-4xl font-light text-green-600 mb-2 group-hover:text-green-700 transition-colors">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600/80 font-light tracking-wide">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default OurMissionSection;
