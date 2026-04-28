import React from "react";
import {
  FiPhone,
  FiMail,
  FiMapPin,
  FiFacebook,
  FiInstagram,
  FiTwitter,
} from "react-icons/fi";
import { motion } from "framer-motion";

const contactInfo = [
  {
    icon: FiPhone,
    title: "Phone",
    value: "+91 98765 43210",
  },
  {
    icon: FiMail,
    title: "Email",
    value: "support@yourstore.com",
  },
  {
    icon: FiMapPin,
    title: "Office",
    value: "Indore, Madhya Pradesh, India",
  },
];

const ContactSection = () => {
  return (
    <section className="relative py-16 px-4 md:px-10 lg:px-20 bg-gradient-to-br from-white to-gray-50 overflow-hidden">

      {/* 🌫️ Glow */}
      <div className="absolute top-[-80px] right-[-80px] w-[250px] h-[250px] bg-blue-200/30 blur-[120px] rounded-full"></div>

      {/* 🧠 HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center mb-14"
      >
        <p className="text-xs tracking-[0.3em] text-gray-500 mb-2">
          CONTACT
        </p>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
          Get in Touch
        </h2>
        <p className="text-gray-600 mt-4 max-w-xl mx-auto">
          Have questions or need help? We’re here for you anytime.
        </p>
      </motion.div>

      {/* 💎 CONTACT INFO */}
      <div className="grid md:grid-cols-3 gap-6 mb-16">
        {contactInfo.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl bg-white/70 backdrop-blur-xl border border-gray-200 shadow-sm hover:shadow-lg transition text-center"
            >
              <div className="w-12 h-12 mx-auto flex items-center justify-center rounded-full bg-gray-100 mb-3">
                <Icon className="text-gray-700" />
              </div>
              <h3 className="font-semibold text-gray-900">{item.title}</h3>
              <p className="text-gray-600 mt-1 text-sm">{item.value}</p>
            </motion.div>
          );
        })}
      </div>

      {/* 🧾 FORM */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="bg-white/70 backdrop-blur-xl border border-gray-200 rounded-2xl p-8 shadow-md mb-16"
      >
        <h3 className="text-xl font-semibold text-gray-900 mb-6">
          Send a Message
        </h3>

        <form className="grid md:grid-cols-2 gap-4">
          {["Full Name", "Email Address", "Phone Number", "Subject"].map(
            (placeholder, i) => (
              <input
                key={i}
                type="text"
                placeholder={placeholder}
                className="p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/10 transition"
              />
            )
          )}

          <textarea
            placeholder="Your Message"
            rows="5"
            className="p-3 rounded-lg border border-gray-200 md:col-span-2 focus:outline-none focus:ring-2 focus:ring-black/10"
          />

          <button
            type="submit"
            className="md:col-span-2 bg-black text-white py-3 rounded-full font-medium hover:scale-[1.02] active:scale-95 transition"
          >
            Send Message →
          </button>
        </form>
      </motion.div>

      {/* 🗺 MAP */}
      <div className="mb-16">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Our Location
        </h3>

        <div className="rounded-2xl overflow-hidden shadow-md border">
          <iframe
            title="map"
            className="w-full h-[300px] md:h-[400px]"
            src="https://www.google.com/maps?q=Indore&output=embed"
            loading="lazy"
          ></iframe>
        </div>
      </div>

      {/* 🌐 SOCIAL */}
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Follow Us
        </h3>

        <div className="flex justify-center gap-6 text-xl text-gray-600">
          <FiFacebook className="hover:text-black cursor-pointer transition" />
          <FiInstagram className="hover:text-black cursor-pointer transition" />
          <FiTwitter className="hover:text-black cursor-pointer transition" />
        </div>

        <p className="text-gray-500 text-sm mt-4">
          Need urgent help? Call us anytime.
        </p>
      </div>
    </section>
  );
};

export default ContactSection;