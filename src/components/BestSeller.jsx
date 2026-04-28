import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "./ProductItem";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSellers, setBestSellers] = useState([]);

  useEffect(() => {
    if (products?.length) {
      const bestProduct = products.filter((item) => item.bestseller);
      setBestSellers(bestProduct.slice(0, 8));
    }
  }, [products]);

  return (
    <section className="relative py-16 px-4 md:px-10 lg:px-20 bg-gradient-to-br from-white to-gray-50 overflow-hidden">

      {/* 🌫️ Background Glow */}
      <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-blue-200/30 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-100px] right-[-100px] w-[300px] h-[300px] bg-emerald-200/30 blur-[120px] rounded-full"></div>

      {/* 🧠 HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="text-center mb-12 relative z-10"
      >
        <p className="text-sm tracking-widest text-gray-500 mb-2">
          TRENDING NOW
        </p>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
          Best <span className="text-transparent bg-clip-text bg-gradient-to-r from-black to-gray-500">Sellers</span>
        </h2>

        <p className="mt-4 text-gray-600 max-w-xl mx-auto text-sm sm:text-base">
          Handpicked favorites loved by our customers. Explore what everyone is buying right now.
        </p>
      </motion.div>

      {/* 🛍 PRODUCTS */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.08,
            },
          },
        }}
        className="relative z-10"
      >
        {/* 📱 Mobile Scroll */}
        <div className="flex gap-4 overflow-x-auto pb-4 sm:hidden scrollbar-hide">
          {bestSellers.map((item) => (
            <div key={item._id} className="min-w-[70%]">
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

        {/* 💻 Desktop Grid */}
        <div className="hidden sm:grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {bestSellers.map((item) => (
            <ProductItem
              key={item._id}
              id={item._id}
              image={item.images || item.image}
              name={item.name}
              price={item.price}
              rating={item.aggregateRating?.average || 4.5}
              reviewCount={item.aggregateRating?.count || 0}
            />
          ))}
        </div>
      </motion.div>

      {/* 🔗 VIEW ALL */}
      <div className="flex justify-center mt-12">
        <Link to="/collection">
          <button className="group px-6 py-3 rounded-full bg-black text-white text-sm font-medium flex items-center gap-2 shadow-lg">
            View All Products
            <span className="group-hover:translate-x-1 transition">→</span>
          </button>
        </Link>
      </div>
    </section>
  );
};

export default BestSeller;