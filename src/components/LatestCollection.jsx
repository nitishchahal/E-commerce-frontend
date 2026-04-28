import React, { useState, useEffect, useContext } from "react";
import { ShopContext } from "../context/ShopContext.jsx";
import ProductItem from "./ProductItem";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    if (products?.length) {
      const sorted = [...products]
        .sort((a, b) => b.date - a.date)
        .slice(0, 10);
      setLatestProducts(sorted);
    }
  }, [products]);

  return (
    <section className="relative py-16 px-4 md:px-10 lg:px-20 bg-white overflow-hidden">

      {/* 🌫️ Soft Glow */}
      <div className="absolute top-[-80px] right-[-80px] w-[250px] h-[250px] bg-purple-200/30 blur-[120px] rounded-full"></div>

      {/* 🧠 HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <p className="text-xs tracking-[0.3em] text-gray-500 mb-2">
          JUST DROPPED
        </p>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
          Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-400">Collection</span>
        </h2>

        <p className="mt-4 text-gray-600 max-w-xl mx-auto text-sm sm:text-base">
          Fresh styles, just in. Be the first to explore our newest arrivals.
        </p>
      </motion.div>

      {/* 🛍 PRODUCTS */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          visible: {
            transition: { staggerChildren: 0.08 },
          },
        }}
      >

        {/* 📱 MOBILE SCROLL */}
        <div className="flex gap-4 overflow-x-auto pb-4 sm:hidden scrollbar-hide">
          {latestProducts.map((item) => (
            <div key={item._id} className="min-w-[75%]">
              <ProductItem
                id={item._id}
                image={item.images || item.image}
                name={item.name}
                price={item.price}
                rating={item.aggregateRating?.average || 4.5}
                reviewCount={item.aggregateRating?.count || 0}
              />
            </div>
          ))}
        </div>

        {/* 💻 DESKTOP GRID */}
        <div className="hidden sm:grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {latestProducts.map((item) => (
            <div key={item._id} className="relative group">
              
              {/* 🆕 NEW BADGE */}
              <span className="absolute top-3 left-3 z-10 text-xs px-2 py-1 bg-black text-white rounded-full">
                NEW
              </span>

              <ProductItem
                id={item._id}
                image={item.images}
                name={item.name}
                price={item.price}
                rating={item.aggregateRating?.average || 4.5}
                reviewCount={item.aggregateRating?.count || 0}
              />
            </div>
          ))}
        </div>
      </motion.div>

      {/* 🔗 CTA */}
      <div className="flex justify-center mt-12">
        <Link to="/collection">
          <button className="group px-6 py-3 rounded-full bg-black text-white text-sm font-medium flex items-center gap-2 shadow-lg">
            Explore Collection
            <span className="group-hover:translate-x-1 transition">→</span>
          </button>
        </Link>
      </div>
    </section>
  );
};

export default LatestCollection;