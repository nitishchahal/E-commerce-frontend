import React from "react";
import { motion } from "framer-motion";

const Title = ({ text1, text2, subtitle }) => {
  return (
    <div className="mb-10 text-center">

      {/* SMALL LABEL */}
      <p className="text-xs tracking-[0.3em] text-gray-500 mb-2">
        {text1}
      </p>

      {/* MAIN TITLE */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900"
      >
        {text2}
      </motion.h2>

      {/* OPTIONAL SUBTITLE */}
      {subtitle && (
        <p className="text-gray-600 mt-3 max-w-xl mx-auto text-sm sm:text-base">
          {subtitle}
        </p>
      )}

      {/* DIVIDER */}
      <div className="w-10 h-[2px] bg-gray-300 mx-auto mt-4 rounded-full"></div>
    </div>
  );
};

export default Title;