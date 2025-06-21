import React from "react";
import { motion } from "framer-motion";
import { MapPin, Navigation, Car, Bus, Clock } from "lucide-react";

const LocationMap: React.FC = () => {
  const directions = [
    {
      icon: Car,
      title: "By Car",
      description: "Free parking available",
      details: [
        "Take Galle Road towards Colombo 03",
        "Look for the green Haritha Ceylon sign",
        "Parking available behind the building"
      ],
      time: "15 min from city center",
      color: "text-blue-600",
      bg: "bg-blue-50"
    },
    {
      icon: Bus,
      title: "By Public Transport",
      description: "Multiple bus routes available",
      details: [
        "Bus routes: 100, 101, 102, 138",
        "Stop: Galle Road - Bambalapitiya",
        "2-minute walk from bus stop"
      ],
      time: "20 min from Fort",
      color: "text-green-600",
      bg: "bg-green-50"
    },
    {
      icon: Navigation,
      title: "By Ride-Hailing",
      description: "PickMe, Uber available",
      details: [
        "Search: Haritha Ceylon, Galle Road",
        "Use landmark: Near Majestic City",
        "Drop-off point right outside"
      ],
      time: "Varies by location",
      color: "text-purple-600",
      bg: "bg-purple-50"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-6xl font-light text-green-800 tracking-wider mb-4">
            Visit Our
          </h2>
          <h3 className="text-3xl lg:text-5xl font-light text-green-600 tracking-wider italic mb-8">
            Store
          </h3>
          
          <div className="w-24 h-px bg-green-600/30 mx-auto mb-8"></div>
          
          <p className="text-gray-600/80 font-light leading-relaxed max-w-2xl mx-auto">
            Located in the heart of Colombo, our eco-friendly showroom is easily accessible by all modes of transport.
          </p>
        </motion.div>

        {/* Map Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-green-50/50 to-blue-50/30 rounded-3xl p-8 mb-16 backdrop-blur-sm border border-green-100/50"
        >
          {/* Mock Map */}
          <div className="relative bg-gray-100 rounded-2xl h-96 mb-8 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-blue-100 opacity-50"></div>
            
            {/* Mock Map Content */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-green-600 rounded-full mb-4 shadow-lg">
                  <MapPin className="w-10 h-10 text-white" />
                </div>
                <h4 className="text-xl font-light text-gray-800 mb-2">
                  Haritha Ceylon Store
                </h4>
                <p className="text-gray-600 font-light">
                  123 Galle Road, Colombo 03
                </p>
              </div>
            </div>

            {/* Map Grid Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div 
                className="w-full h-full"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
                  `,
                  backgroundSize: '20px 20px'
                }}
              ></div>
            </div>

            {/* Mock Roads */}
            <div className="absolute top-1/2 left-0 right-0 h-8 bg-gray-300/50 transform -translate-y-1/2"></div>
            <div className="absolute top-0 bottom-0 left-1/2 w-6 bg-gray-300/30 transform -translate-x-1/2"></div>
          </div>

          {/* Address Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-100/50">
              <MapPin className="w-8 h-8 text-green-600 mx-auto mb-3" />
              <h4 className="font-light text-gray-900 mb-2">Address</h4>
              <p className="text-green-600 font-light">123 Galle Road</p>
              <p className="text-gray-500 font-light text-sm">Colombo 03, Sri Lanka</p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-100/50">
              <Clock className="w-8 h-8 text-green-600 mx-auto mb-3" />
              <h4 className="font-light text-gray-900 mb-2">Store Hours</h4>
              <p className="text-green-600 font-light">Mon - Fri: 9AM - 6PM</p>
              <p className="text-gray-500 font-light text-sm">Sat: 10AM - 4PM</p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-100/50">
              <Car className="w-8 h-8 text-green-600 mx-auto mb-3" />
              <h4 className="font-light text-gray-900 mb-2">Parking</h4>
              <p className="text-green-600 font-light">Free Parking</p>
              <p className="text-gray-500 font-light text-sm">Behind the building</p>
            </div>
          </div>
        </motion.div>

        {/* Directions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h3 className="text-3xl font-light text-gray-900 text-center mb-12 tracking-wide">
            How to Get Here
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {directions.map((direction, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white rounded-3xl p-8 shadow-sm hover:shadow-lg border border-gray-100 transition-all duration-500"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 ${direction.bg} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <direction.icon className={`w-8 h-8 ${direction.color}`} />
                </div>

                <h4 className="text-xl font-light text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                  {direction.title}
                </h4>

                <p className="text-gray-600 font-light mb-4 text-sm">
                  {direction.description}
                </p>

                <ul className="space-y-2 mb-4">
                  {direction.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-600 font-light text-sm">{detail}</span>
                    </li>
                  ))}
                </ul>

                <div className={`inline-flex items-center px-3 py-1 ${direction.bg} rounded-full text-xs font-light ${direction.color}`}>
                  <Clock className="w-3 h-3 mr-1" />
                  {direction.time}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Landmarks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 text-center"
        >
          <h3 className="text-2xl font-light text-gray-900 mb-6 tracking-wide">
            Nearby Landmarks
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              "Majestic City Mall",
              "Bambalapitiya Railway Station", 
              "Galle Face Green",
              "Independence Square"
            ].map((landmark, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-green-100/50"
              >
                <p className="text-gray-700 font-light text-sm">{landmark}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
    );
}
export default LocationMap;