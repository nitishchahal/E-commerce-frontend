import React from "react";
import { motion } from "framer-motion";
import { FiCreditCard, FiUsers, FiRefreshCw, FiTruck, FiHeadphones } from "react-icons/fi";

const features = [
  {
    icon: FiCreditCard,
    title: "Flexible Payments",
    desc: "Multiple payment options including UPI, cards, net banking, and COD.",
  },
  {
    icon: FiUsers,
    title: "Trusted by Customers",
    desc: "Maintaining a 4.9/5 rating with thousands of satisfied buyers.",
  },
  {
    icon: FiRefreshCw,
    title: "Easy Returns",
    desc: "Simple 7-day return policy with fast and transparent refunds.",
  },
  {
    icon: FiTruck,
    title: "Fast Delivery",
    desc: "Reliable delivery within 2–4 business days with tracking.",
  },
  {
    icon: FiHeadphones,
    title: "24/7 Support",
    desc: "Always here to help — quick, friendly, and efficient support.",
  },
];

const AboutSection = () => {
  return (
    <section className="relative py-16 px-4 md:px-10 lg:px-20 bg-gradient-to-br from-white to-gray-50 overflow-hidden">

      {/* 🌫️ Glow */}
      <div className="absolute top-[-80px] left-[-80px] w-[250px] h-[250px] bg-blue-200/30 blur-[120px] rounded-full"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto text-center"
      >
        {/* 🧠 TITLE */}
        <p className="text-xs tracking-[0.3em] text-gray-500 mb-2">
          WHO WE ARE
        </p>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
          About Our Brand
        </h2>

        {/* 📝 STORY */}
        <p className="text-gray-600 mt-6 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
          We’re committed to delivering premium quality products with a seamless shopping experience. 
          Every item is carefully selected to balance style, comfort, and affordability — so you can shop with confidence.
        </p>

        <p className="text-gray-600 mt-4 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
          From fast delivery to responsive customer support, we focus on every detail that makes your experience better.
        </p>
      </motion.div>

      {/* 💎 FEATURES */}
      <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">

        {features.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group p-6 rounded-2xl bg-white/70 backdrop-blur-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300"
            >
              {/* ICON */}
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 group-hover:bg-black transition mb-4">
                <Icon className="text-gray-700 group-hover:text-white transition" />
              </div>

              {/* TITLE */}
              <h3 className="text-lg font-semibold text-gray-900">
                {item.title}
              </h3>

              {/* DESC */}
              <p className="text-gray-600 mt-2 text-sm sm:text-base">
                {item.desc}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default AboutSection;