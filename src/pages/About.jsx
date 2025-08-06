import React from 'react';
import { motion } from 'framer-motion';

const AboutSection = () => {
  return (
    <motion.section
      className="max-w-6xl mx-auto px-4 sm:px-6 py-12"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-12">
        <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">About Us</h2>

        <p className="text-gray-600 text-lg leading-relaxed mb-4">
          Welcome to our store! We are committed to providing top-notch products with quality service.
          With a wide range of items curated for our customers, we strive to deliver the best shopping experience.
        </p>

        <p className="text-gray-600 text-lg leading-relaxed mb-4">
          Our team works around the clock to ensure timely deliveries and prompt support. Every product is carefully checked before shipping, and our return policies are transparent and customer-friendly.
        </p>

        <div className="grid sm:grid-cols-2 gap-6 mt-8">
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-red-100 p-6 rounded-xl shadow-sm"
          >
            <h3 className="text-xl font-semibold text-red-700 mb-2">Payment Methods</h3>
            <p className="text-gray-700">
              We accept credit cards, UPI, net banking, and COD for convenience.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-blue-100 p-6 rounded-xl shadow-sm"
          >
            <h3 className="text-xl font-semibold text-blue-700 mb-2">Trusted Buyers</h3>
            <p className="text-gray-700">
              Our customers trust us — we maintain a 4.9/5 rating across platforms.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-yellow-100 p-6 rounded-xl shadow-sm"
          >
            <h3 className="text-xl font-semibold text-yellow-700 mb-2">Return Policies</h3>
            <p className="text-gray-700">
              Hassle-free returns within 7 days. Transparent process and quick refunds.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-green-100 p-6 rounded-xl shadow-sm"
          >
            <h3 className="text-xl font-semibold text-green-700 mb-2">Delivery Timing</h3>
            <p className="text-gray-700">
              We deliver most items within 2–4 business days, with tracking provided.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-purple-100 p-6 rounded-xl shadow-sm col-span-2"
          >
            <h3 className="text-xl font-semibold text-purple-700 mb-2">Customer Service</h3>
            <p className="text-gray-700">
              Our 24/7 support team is here to resolve your queries — fast, friendly, and efficient.
            </p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default AboutSection;
