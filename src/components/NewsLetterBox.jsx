import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiMail } from "react-icons/fi";

const NewsletterBox = () => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setSuccess(true);
    setEmail("");

    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <section className="relative py-16 px-4 md:px-10 lg:px-20 bg-gradient-to-br from-gray-50 to-white overflow-hidden">

      {/* 🌫️ Glow */}
      <div className="absolute top-[-80px] right-[-80px] w-[250px] h-[250px] bg-blue-200/30 blur-[120px] rounded-full"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="max-w-2xl mx-auto text-center relative z-10"
      >
        {/* 🧠 TITLE */}
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
          Get 20% Off Your First Order
        </h2>

        <p className="text-gray-600 mt-4 text-sm sm:text-base">
          Join our newsletter for exclusive drops, early access, and special offers.
        </p>

        {/* ✉️ FORM */}
        <form
          onSubmit={onSubmitHandler}
          className="mt-8 flex flex-col sm:flex-row items-center gap-3 bg-white/70 backdrop-blur-xl border border-gray-200 rounded-full p-2 shadow-lg"
        >
          <div className="flex items-center w-full px-3">
            <FiMail className="text-gray-400 mr-2" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full bg-transparent outline-none text-sm"
            />
          </div>

          <button
            type="submit"
            className="group px-6 py-2 bg-black text-white rounded-full text-sm font-medium flex items-center gap-2 shadow-md hover:scale-105 active:scale-95 transition"
          >
            Subscribe
            <span className="group-hover:translate-x-1 transition">→</span>
          </button>
        </form>

        {/* ✅ SUCCESS MESSAGE */}
        {success && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-green-600 mt-4 text-sm"
          >
            🎉 You’re subscribed! Check your inbox.
          </motion.p>
        )}

        {/* 🧠 TRUST NOTE */}
        <p className="text-xs text-gray-400 mt-3">
          No spam. Unsubscribe anytime.
        </p>
      </motion.div>
    </section>
  );
};

export default NewsletterBox;