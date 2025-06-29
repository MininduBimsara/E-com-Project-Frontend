import React from "react";
import { motion } from "framer-motion";
import { Truck, CreditCard, CheckCircle } from "lucide-react";

interface ProgressStepsProps {
  currentStep: number;
}

const ProgressSteps: React.FC<ProgressStepsProps> = ({ currentStep }) => {
  const steps = [
    { number: 1, title: "Shipping", icon: Truck },
    { number: 2, title: "Payment", icon: CreditCard },
    { number: 3, title: "Complete", icon: CheckCircle },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="flex justify-center mb-12"
    >
      <div className="flex items-center space-x-8">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center">
            <div
              className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-500 ${
                currentStep >= step.number
                  ? "bg-green-600 border-green-600 text-white"
                  : "bg-white border-gray-300 text-gray-400"
              }`}
            >
              <step.icon className="w-5 h-5" />
            </div>
            <div className="ml-3">
              <div
                className={`text-sm font-light tracking-wide ${
                  currentStep >= step.number
                    ? "text-green-700"
                    : "text-gray-400"
                }`}
              >
                {step.title}
              </div>
            </div>
            {index < 2 && (
              <div
                className={`w-16 h-px ml-8 transition-colors duration-500 ${
                  currentStep > step.number ? "bg-green-600" : "bg-gray-300"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default ProgressSteps;
