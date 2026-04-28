import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-br from-[#f8fafc] via-[#eef2ff] to-[#ecfeff] overflow-hidden  rounded-2xl mt-7">

      {/* 🌫️ Background Glow Orbs */}
      <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-blue-300/30 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-120px] right-[-100px] w-[300px] h-[300px] bg-emerald-300/30 blur-[120px] rounded-full"></div>

      <div className="relative flex flex-col sm:flex-row border border-white/40 backdrop-blur-xl shadow-xl rounded-2xl overflow-hidden">

        {/* LEFT */}
        <div className="w-full sm:w-1/2 flex items-center justify-center py-16 px-8">
          <div className="text-gray-800 max-w-lg">

            {/* Label */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-4"
            >
              <span className="w-10 h-[2px] bg-blue-600"></span>
              <p className="font-semibold text-sm tracking-widest text-blue-600">
                OUR BESTSELLERS
              </p>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight"
            >
              Discover the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-500">Latest Collection</span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-4 text-gray-600 text-sm sm:text-base"
            >
              Elevate your style with our newest arrivals — curated for modern trends and timeless appeal.
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-8"
            >
              <Link to="/collection" className="group relative px-6 py-3 bg-gradient-to-r from-blue-600 to-emerald-500 text-white font-medium rounded-full shadow-lg overflow-hidden inline-block">
                
                {/* Hover Glow */}
                <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition"></span>

                <span className="relative flex items-center gap-2">
                  SHOP NOW
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="w-full sm:w-1/2 relative overflow-hidden">
          <motion.img
            src={assets.hero_img}
            alt="Hero"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.2 }}
            className="w-full h-full object-cover hover:scale-105 transition duration-700 ease-out"
          />

          {/* Glass Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;