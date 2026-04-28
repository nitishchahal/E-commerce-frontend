import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { FiSearch, FiX } from "react-icons/fi";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } =
    useContext(ShopContext);

  const location = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (location.pathname.includes("/collection")) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [location]);

  return (
    <AnimatePresence>
      {showSearch && visible && (
        <motion.div
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -60, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full bg-white/80 backdrop-blur-xl border-b border-gray-200 shadow-sm"
        >
          <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-3">

            {/* 🔍 INPUT */}
            <div className="flex items-center flex-1 bg-gray-100 rounded-full px-4 py-2 transition focus-within:bg-white focus-within:shadow-md">

              <FiSearch className="text-gray-400 mr-2" />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search for products..."
                className="w-full bg-transparent outline-none text-sm placeholder:text-gray-400"
              />
            </div>

            {/* ❌ CLOSE */}
            <button
              onClick={() => setShowSearch(false)}
              className="p-2 rounded-full hover:bg-gray-100 transition"
            >
              <FiX className="text-gray-600" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchBar;