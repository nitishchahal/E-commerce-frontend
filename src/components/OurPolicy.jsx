import React from "react";
import { motion } from "framer-motion";
import { FiRefreshCw, FiShield, FiHeadphones } from "react-icons/fi";

const policies = [
  {
    icon: FiRefreshCw,
    title: "Easy Exchange",
    desc: "Hassle-free exchange policy to ensure complete satisfaction.",
  },
  {
    icon: FiShield,
    title: "Quality Assurance",
    desc: "We guarantee premium quality products with strict checks.",
  },
  {
    icon: FiHeadphones,
    title: "24/7 Support",
    desc: "Our team is always available to assist you anytime.",
  },
];

const OurPolicy = () => {
  return (
    <section className="relative py-16 px-4 md:px-10 lg:px-20 bg-gradient-to-br from-white to-gray-50 overflow-hidden">

      {/* 🌫️ Background Glow */}
      <div className="absolute top-[-80px] left-[-80px] w-[250px] h-[250px] bg-blue-200/30 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-80px] right-[-80px] w-[250px] h-[250px] bg-emerald-200/30 blur-[120px] rounded-full"></div>

      <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">

        {policies.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group p-6 rounded-2xl bg-white/70 backdrop-blur-xl border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 text-center"
            >
              {/* 🔥 ICON */}
              <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full bg-gray-100 group-hover:bg-black transition">
                <Icon className="text-xl text-gray-700 group-hover:text-white transition" />
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

export default OurPolicy;