import React from "react";
import { motion } from "framer-motion";
import { assets } from "../assets/assets";

const CartItem = ({ item, currency, onRemove, onUpdateQuantity }) => {
  const handleRemove = () => onRemove(item.id, item.size);

  const handleIncrease = () =>
    onUpdateQuantity(item.id, item.size, item.quantity + 1);

  const handleDecrease = () => {
    if (item.quantity > 1) {
      onUpdateQuantity(item.id, item.size, item.quantity - 1);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="group flex flex-col sm:flex-row items-center gap-4 p-4 rounded-2xl 
                 bg-white/70 backdrop-blur-xl border border-gray-200 shadow-md 
                 hover:shadow-xl transition-all duration-300"
    >
      {/* 🖼 IMAGE */}
      <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
        {item.image ? (
          <img
            src={item.image || assets.cover}
            alt={item.name || "Product image"}
            onError={(e) => {
              e.target.src = assets.cover;
            }}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
            No Image
          </div>
        )}
      </div>

      {/* 🧾 DETAILS */}
      <div className="flex-1 w-full">
        <h3 className="font-semibold text-gray-900 text-sm sm:text-base line-clamp-1">
          {item.name}
        </h3>

        <div className="flex gap-4 mt-1 text-sm text-gray-500">
          {item.size && <span>Size: {item.size}</span>}
          <span>{currency}{item.price}</span>
        </div>

        {/* ⚡ QUANTITY */}
        <div className="flex items-center gap-3 mt-3">
          <button
            onClick={handleDecrease}
            className="w-8 h-8 rounded-full border flex items-center justify-center 
                       hover:bg-black hover:text-white transition"
          >
            −
          </button>

          <span className="font-medium">{item.quantity}</span>

          <button
            onClick={handleIncrease}
            className="w-8 h-8 rounded-full border flex items-center justify-center 
                       hover:bg-black hover:text-white transition"
          >
            +
          </button>
        </div>
      </div>

      {/* 💰 PRICE */}
      <div className="text-right min-w-[80px]">
        <p className="font-bold text-lg text-gray-900">
          {currency}{(item.price * item.quantity).toFixed(2)}
        </p>
      </div>

      {/* 🗑 REMOVE */}
      <button
        onClick={handleRemove}
        className="p-2 rounded-full hover:bg-red-100 text-gray-500 hover:text-red-600 transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M6 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm6 0a1 1 0 011 1v6a1 1 0 11-2 0V9a1 1 0 011-1z" />
          <path
            fillRule="evenodd"
            d="M4 6h12v10a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm3-3a1 1 0 00-.894.553L5.382 4H3a1 1 0 000 2h14a1 1 0 100-2h-2.382l-.724-1.447A1 1 0 0012 2H7z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </motion.div>
  );
};

export default CartItem;