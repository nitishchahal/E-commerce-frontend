import React from "react";
import cover from "../assets/cover.png";
import { FiInstagram, FiTwitter, FiGithub, FiMail } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="relative mt-24 bg-gradient-to-br from-white to-gray-50 border-t border-gray-200 overflow-hidden">

      {/* 🌫️ Glow */}
      <div className="absolute bottom-[-80px] left-[-80px] w-[250px] h-[250px] bg-blue-200/30 blur-[120px] rounded-full"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-4 text-sm text-gray-600 relative z-10">

        {/* 🧠 BRAND */}
        <div>
          <img src={cover} alt="Logo" className="w-36 mb-4" />
          <p className="text-gray-500 leading-relaxed">
            Elevate your everyday lifestyle with premium, comfortable, and stylish products designed for modern living.
          </p>

          {/* SOCIAL */}
          <div className="flex gap-4 mt-6 text-lg">
            <FiInstagram className="cursor-pointer hover:text-black transition" />
            <FiTwitter className="cursor-pointer hover:text-black transition" />
            <FiGithub className="cursor-pointer hover:text-black transition" />
            <FiMail className="cursor-pointer hover:text-black transition" />
          </div>
        </div>

        {/* 🏢 COMPANY */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
          <ul className="space-y-2">
            <li className="hover:text-black cursor-pointer transition">Home</li>
            <li className="hover:text-black cursor-pointer transition">About Us</li>
            <li className="hover:text-black cursor-pointer transition">Delivery</li>
            <li className="hover:text-black cursor-pointer transition">Privacy Policy</li>
          </ul>
        </div>

        {/* 📞 CONTACT */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-4">Get in Touch</h3>
          <ul className="space-y-2">
            <li className="hover:text-black cursor-pointer transition">
              +91 96229 64940
            </li>
            <li className="hover:text-black cursor-pointer transition">
              nittysharma@gmail.com
            </li>
            <li className="hover:text-black cursor-pointer transition">
              Ludhiana, Punjab
            </li>
          </ul>
        </div>

        {/* ✉️ MINI NEWSLETTER */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-4">
            Stay Updated
          </h3>

          <div className="flex items-center bg-white/70 backdrop-blur border border-gray-200 rounded-full px-3 py-2">
            <input
              type="email"
              placeholder="Your email"
              className="bg-transparent outline-none text-sm flex-1"
            />
            <button className="text-sm bg-black text-white px-4 py-1.5 rounded-full hover:scale-105 transition">
              Join
            </button>
          </div>

          <p className="text-xs text-gray-400 mt-2">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </div>

      {/* 🔚 BOTTOM */}
      <div className="border-t border-gray-200 text-center py-6 text-xs text-gray-500">
        © {new Date().getFullYear()} JK08edits. All rights reserved. <br />
        Designed by <span className="text-gray-800 font-medium">Nitish Choudhary</span>
      </div>
    </footer>
  );
};

export default Footer;