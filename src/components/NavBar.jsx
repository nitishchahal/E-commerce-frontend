import React, { useState, useContext, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";
  import { FiUser, FiShoppingBag, FiLogOut, FiLogIn } from "react-icons/fi";

const NavBar = () => {
  const [visible, setVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { setShowSearch, getCartCount, user, logout } = useContext(ShopContext);
  const navigate = useNavigate();

  const navItems = ["HOME", "COLLECTION", "ABOUT", "CONTACT"];

  // 🧠 Scroll detection
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      {/* 🔥 NAVBAR */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled
            ? "py-2 bg-white/80 backdrop-blur-xl shadow-lg border-b border-gray-200"
            : "py-2 bg-white/60 backdrop-blur-lg"
          }`}
      >
        <div className="flex justify-between items-center px-4 sm:px-10">

          {/* LOGO */}
          <Link to="/" className="group">
            <motion.img
              whileHover={{ scale: 1.08 }}
              src={assets.cover}
              alt="Logo"
              className="w-36 sm:w-40"
            />
          </Link>

          {/* DESKTOP MENU */}
          <ul className="hidden sm:flex gap-10 text-sm font-medium">
            {navItems.map((item) => (
              <NavLink
                key={item}
                to={item === "HOME" ? "/" : `/${item.toLowerCase()}`}
                className="relative group"
              >
                {({ isActive }) => (
                  <>
                    <span
                      className={`transition ${isActive
                          ? "text-black"
                          : "text-gray-600 group-hover:text-black"
                        }`}
                    >
                      {item}
                    </span>

                    {/* 🔥 Premium underline */}
                    <span
                      className={`absolute left-0 -bottom-1 h-[2px] bg-gradient-to-r from-black to-gray-500 transition-all duration-300 ${isActive
                          ? "w-full"
                          : "w-0 group-hover:w-full"
                        }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </ul>

          {/* RIGHT */}
          <div className="flex items-center gap-6">

            {/* SEARCH */}
            <motion.img
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.85 }}
              src={assets.search_icon}
              onClick={() => setShowSearch(true)}
              className="w-5 h-5 cursor-pointer opacity-70 hover:opacity-100"
            />

            {/* PROFILE */}
            <div className="relative">
              <motion.img
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.95 }}
                src={assets.profile_icon}
                className="w-5 h-5 cursor-pointer opacity-70 hover:opacity-100"
                onClick={() => setProfileOpen((prev) => !prev)}
              />

              {/* 🔥 Premium dropdown */}
            
              <div className={`absolute top-10 right-0 transition-all duration-300 ${profileOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible translate-y-3"}`}>

                <div className="relative bg-white/80 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] 
                  rounded-2xl p-3 w-52 border border-gray-200">

    {/* 🔺 ARROW */}
    <div className="absolute -top-2 right-4 w-4 h-4 bg-white rotate-45 border-l border-t border-gray-200"></div>

    <div className="flex flex-col gap-1 text-sm">

      {user ? (
        <>
          {/* PROFILE */}
          <Link
            to="/profile"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition group/item"
          >
            <FiUser className="text-gray-400 group-hover/item:text-black transition" />
            <span className="text-gray-700 group-hover/item:text-black">
              My Profile
            </span>
          </Link>

          {/* ORDERS */}
          <Link
            to="/orders"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition group/item"
          >
            <FiShoppingBag className="text-gray-400 group-hover/item:text-black transition" />
            <span className="text-gray-700 group-hover/item:text-black">
              Orders
            </span>
          </Link>

          {/* DIVIDER */}
          <div className="my-1 border-t border-gray-200" />

          {/* LOGOUT */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-50 transition group/item w-full text-left"
          >
            <FiLogOut className="text-gray-400 group-hover/item:text-red-500 transition" />
            <span className="text-gray-700 group-hover/item:text-red-500">
              Log Out
            </span>
          </button>
        </>
      ) : (
        <Link
          to="/login"
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition group/item"
        >
          <FiLogIn className="text-gray-400 group-hover/item:text-black transition" />
          <span className="text-gray-700 group-hover/item:text-black">
            Login
          </span>
        </Link>
      )}

    </div>
  </div>
</div>
            </div>

            {/* CART */}
            <Link to="/cart" className="relative">
              <motion.img
                whileHover={{ scale: 1.2 }}
                src={assets.cart_icon}
                className="w-5 h-5 cursor-pointer opacity-70 hover:opacity-100"
              />

              {/* 🔥 Animated badge */}
              <motion.div
                key={getCartCount()}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 bg-black text-white rounded-full min-w-[18px] h-[18px] flex items-center justify-center text-[10px] px-[5px] font-semibold shadow-md"
              >
                {getCartCount() || 0}
              </motion.div>
            </Link>

            {/* MOBILE MENU */}
            <motion.img
              whileTap={{ scale: 0.8 }}
              onClick={() => setVisible(true)}
              src={assets.menu_icon}
              className="w-5 h-5 cursor-pointer sm:hidden"
            />
          </div>
        </div>
      </nav>

      {/* ⚠️ IMPORTANT FIX (NO OVERLAP) */}
      <div className="h-[80px]" />

      {/* 📱 MOBILE MENU */}
      <div
        className={`fixed inset-0 z-50 transition ${visible ? "visible" : "invisible"
          }`}
      >
        {/* BACKDROP */}
        <div
          className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition ${visible ? "opacity-100" : "opacity-0"
            }`}
          onClick={() => setVisible(false)}
        />

        {/* PANEL */}
        <div
          className={`absolute right-0 top-0 h-full w-[75%] max-w-xs bg-white/95 backdrop-blur-xl shadow-2xl transition-transform duration-500 ${visible ? "translate-x-0" : "translate-x-full"
            }`}
        >
          <div className="flex flex-col">

            <div
              className="p-5 border-b cursor-pointer"
              onClick={() => setVisible(false)}
            >
              Close
            </div>

            {navItems.map((item) => (
              <NavLink
                key={item}
                to={item === "HOME" ? "/" : `/${item.toLowerCase()}`}
                onClick={() => setVisible(false)}
                className="px-6 py-4 border-b text-gray-700 hover:text-black"
              >
                {item}
              </NavLink>
            ))}

            {/* Mobile Profile Options */}
            <div className="px-6 py-4 border-b">
              {user ? (
                <>
                  <p className="text-gray-700 hover:text-black cursor-pointer mb-2">My Profile</p>
                  <Link to="/orders" onClick={() => setVisible(false)} className="text-gray-700 hover:text-black cursor-pointer block mb-2">Orders</Link>
                  <p onClick={() => { handleLogout(); setVisible(false); }} className="text-red-500 hover:text-red-600 cursor-pointer">Log Out</p>
                </>
              ) : (
                <Link to="/login" onClick={() => setVisible(false)} className="text-gray-700 hover:text-black cursor-pointer">Login</Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;