import React, { useContext, useRef, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHeart, FaShoppingCart, FaArrowRight, FaStar, FaEye } from "react-icons/fa";

const ProductItem = ({ id, image, name, price, rating = 4.5, reviewCount = 0 }) => {
  const { currency, addToCart } = useContext(ShopContext);
  const cardRef = useRef(null);
  const [liked, setLiked] = useState(false);

  // Handle both old and new product structure
  const actualPrice = typeof price === 'object' ? price.current : price;
  const imageUrl =
    Array.isArray(image) && image.length > 0
      ? image[0]
      : "https://via.placeholder.com/300";

  // 🧠 CLEAN 3D TILT (reduced intensity)
  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = ((y / rect.height) - 0.5) * 6;
    const rotateY = ((x / rect.width) - 0.5) * -6;

    cardRef.current.style.transform =
      `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  };

  const resetTilt = () => {
    cardRef.current.style.transform =
      "perspective(1000px) rotateX(0) rotateY(0) scale(1)";
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    // For demo purposes, assume size "M"
    addToCart(id, "M");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="group"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={resetTilt}
        className="relative rounded-2xl overflow-hidden bg-white/70 backdrop-blur-xl border border-gray-200 
                   shadow-sm hover:shadow-xl transition-all duration-500"
      >
        <Link to={`/product/${id}`}>

          {/* 🌫️ VERY SUBTLE HOVER LIGHT */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-black/5 to-transparent" />

          {/* IMAGE */}
          <div className="relative overflow-hidden">
            <img
              src={imageUrl}
              alt={name}
              className="w-full h-[260px] object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* ❤️ Wishlist */}
            <button
              onClick={(e) => {
                e.preventDefault();
                setLiked(!liked);
              }}
              className="absolute top-3 right-3 bg-white/80 backdrop-blur p-2 rounded-full shadow-sm 
                         opacity-0 group-hover:opacity-100 transition"
            >
              <FaHeart className={liked ? "text-red-500" : "text-gray-400"} />
            </button>

            {/* 👁️ Quick View */}
            <button
              onClick={(e) => e.preventDefault()}
              className="absolute top-3 left-3 bg-white/80 backdrop-blur p-2 rounded-full shadow-sm 
                         opacity-0 group-hover:opacity-100 transition"
            >
              <FaEye className="text-gray-600" />
            </button>

            {/* 🛒 CTA */}
            <motion.button
  onClick={handleAddToCart}
  initial={{ opacity: 0, y: 20 }}
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  animate={{ opacity: 0, y: 20 }}
  className="absolute bottom-4 left-1/2 -translate-x-1/2 
             group-hover:opacity-100 group-hover:translate-y-0
             transition-all duration-300 ease-out
             px-5 py-2.5 text-sm font-medium rounded-full 
             bg-black text-white shadow-lg flex items-center gap-2"
>
  {/* subtle hover layer */}
  <span className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition"></span>

  <span className="relative flex items-center gap-2">
    <FaShoppingCart className="text-sm" />
    Add to Cart
  </span>
</motion.button>
          </div>

          {/* CONTENT */}
          <div className="p-4">
            <h3 className="text-gray-800 font-medium text-sm sm:text-base line-clamp-1">
              {name}
            </h3>

            {/* ⭐ CLEAN RATING */}
            <div className="flex items-center mt-1 gap-1">
              {Array(5).fill().map((_, i) => (
                <FaStar key={i} className={`text-xs ${
                  i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'
                }`} />
              ))}
              <span className="text-xs text-gray-500 ml-1">{rating.toFixed(1)}</span>
            </div>

            <div className="flex justify-between items-center mt-2">
              <p className="text-lg font-semibold text-gray-900">
                <span className="text-sm text-gray-500 mr-1">
                  {currency}
                </span>
                {actualPrice.toFixed(2)}
              </p>

              <span className="opacity-0 group-hover:opacity-100 transition">
                <FaArrowRight className="text-gray-600" />
              </span>
            </div>
          </div>
        </Link>
      </div>
    </motion.div>
  );
};

export default ProductItem;