import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle } from "lucide-react";

interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: string;
}

const FAQSection: React.FC = () => {
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Questions" },
    { id: "orders", name: "Orders & Shipping" },
    { id: "products", name: "Products" },
    { id: "sustainability", name: "Sustainability" },
    { id: "returns", name: "Returns & Exchanges" },
  ];

  const faqs: FAQ[] = [
    {
      id: 1,
      question: "How long does shipping take?",
      answer:
        "We offer free shipping across Sri Lanka with delivery within 2-5 business days for Colombo and suburbs, and 3-7 days for other areas. Express shipping is available for urgent orders.",
      category: "orders",
    },
    {
      id: 2,
      question: "Are your products really eco-friendly?",
      answer:
        "Yes! All our products are independently certified for their environmental credentials. We provide detailed sustainability reports for each product, including carbon footprint, materials sourcing, and end-of-life disposal information.",
      category: "sustainability",
    },
    {
      id: 3,
      question: "What is your return policy?",
      answer:
        "We offer a 30-day return policy for unused items in original packaging. Since we care about the environment, returned items are refurbished when possible or donated to local charities.",
      category: "returns",
    },
    {
      id: 4,
      question: "Do you offer bulk discounts?",
      answer:
        "Yes! We offer tiered discounts for bulk orders: 5% off for orders over Rs. 25,000, 10% off for orders over Rs. 50,000, and custom pricing for corporate orders above Rs. 100,000.",
      category: "orders",
    },
    {
      id: 5,
      question: "How do you ensure product quality?",
      answer:
        "Every product undergoes rigorous testing for quality and sustainability. We work directly with certified suppliers and conduct regular audits to ensure our standards are maintained.",
      category: "products",
    },
    {
      id: 6,
      question: "What makes your packaging sustainable?",
      answer:
        "Our packaging is 100% plastic-free, using biodegradable materials like cornstarch-based peanuts, recycled cardboard, and reusable hemp bags. All packaging materials decompose within 90 days.",
      category: "sustainability",
    },
    {
      id: 7,
      question: "Can I track my order?",
      answer:
        "Absolutely! Once your order ships, you'll receive a tracking number via SMS and email. You can track your package in real-time through our website or the courier's tracking system.",
      category: "orders",
    },
    {
      id: 8,
      question: "Do you offer gift wrapping?",
      answer:
        "Yes! We offer beautiful, sustainable gift wrapping using recycled materials and natural decorations. Gift wrapping is available for an additional Rs. 250 per item.",
      category: "orders",
    },
  ];

  const filteredFAQs =
    activeCategory === "all"
      ? faqs
      : faqs.filter((faq) => faq.category === activeCategory);

  const toggleQuestion = (id: number) => {
    setActiveQuestion(activeQuestion === id ? null : id);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-green-50/50 to-blue-50/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center text-green-700/60 px-4 py-2 text-sm font-light mb-8 tracking-wider">
            <HelpCircle className="w-4 h-4 mr-2" />
            FREQUENTLY ASKED QUESTIONS
          </div>

          <h2 className="text-4xl lg:text-6xl font-light text-green-800 tracking-wider mb-4">
            Have
          </h2>
          <h3 className="text-3xl lg:text-5xl font-light text-green-600 tracking-wider italic mb-8">
            Questions?
          </h3>

          <div className="w-24 h-px bg-green-600/30 mx-auto mb-8"></div>

          <p className="text-gray-600/80 font-light leading-relaxed max-w-2xl mx-auto">
            Find answers to commonly asked questions about our products,
            shipping, and sustainability practices.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-full text-sm font-light tracking-wider transition-all duration-300 ${
                activeCategory === category.id
                  ? "bg-green-600 text-white shadow-lg"
                  : "bg-white/80 text-gray-600 hover:bg-green-50 hover:text-green-600 border border-gray-200"
              }`}
            >
              {category.name}
            </motion.button>
          ))}
        </motion.div>

        {/* FAQ List */}
        <div className="space-y-4">
          <AnimatePresence>
            {filteredFAQs.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100/50 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
              >
                <motion.button
                  onClick={() => toggleQuestion(faq.id)}
                  className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-green-50/50 transition-colors duration-300"
                >
                  <h3 className="text-lg font-light text-gray-900 tracking-wide pr-8">
                    {faq.question}
                  </h3>

                  <motion.div
                    animate={{ rotate: activeQuestion === faq.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    {activeQuestion === faq.id ? (
                      <Minus className="w-5 h-5 text-green-600" />
                    ) : (
                      <Plus className="w-5 h-5 text-gray-400" />
                    )}
                  </motion.div>
                </motion.button>

                <AnimatePresence>
                  {activeQuestion === faq.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-8 pb-6 pt-2">
                        <div className="w-full h-px bg-green-600/10 mb-4"></div>
                        <p className="text-gray-600/80 font-light leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16 bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-100/50"
        >
          <h3 className="text-2xl font-light text-gray-900 mb-4 tracking-wide">
            Still Have Questions?
          </h3>
          <p className="text-gray-600/80 font-light mb-6 leading-relaxed">
            Can't find what you're looking for? Our friendly customer service
            team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 font-light tracking-[0.1em] text-sm transition-all duration-300 rounded-2xl shadow-lg hover:shadow-xl"
            >
              CONTACT SUPPORT
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-transparent border border-green-600/40 text-green-700 px-8 py-3 font-light tracking-[0.1em] text-sm hover:bg-green-600 hover:text-white transition-all duration-500 rounded-2xl"
            >
              LIVE CHAT
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
