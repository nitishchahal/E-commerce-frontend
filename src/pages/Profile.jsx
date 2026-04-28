import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiMail, FiUser, FiPhone, FiLogOut } from "react-icons/fi";
import { toast } from "react-toastify";
import { ShopContext } from "../context/ShopContext";

const Profile = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(ShopContext);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null); // 🧠 sync context
    toast.success("Logged out successfully 👋");
    navigate("/login");
  };

  if (!user) return null;

  return (
    <section className="min-h-screen px-4 md:px-10 lg:px-20 py-12 bg-gradient-to-br from-white to-gray-50">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl mx-auto bg-white/70 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-xl p-8"
      >

        {/* 🧠 HEADER */}
        <div className="flex flex-col items-center mb-8">

          {/* AVATAR */}
          <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-2xl font-semibold text-gray-700">
            {user.firstName?.charAt(0)}
          </div>

          <h2 className="text-xl font-bold mt-3 text-gray-900">
            {user.firstName} {user.lastName}
          </h2>

          <p className="text-gray-500 text-sm">
            {user.contact}
          </p>
        </div>

        {/* 💎 INFO */}
        <div className="space-y-4">

          <div className="flex items-center justify-between border p-4 rounded-xl">
            <div className="flex items-center gap-3">
              <FiUser className="text-gray-400" />
              <span className="text-gray-700">Full Name</span>
            </div>
            <span className="text-gray-900 font-medium">
              {user.firstName} {user.lastName}
            </span>
          </div>

          <div className="flex items-center justify-between border p-4 rounded-xl">
            <div className="flex items-center gap-3">
              <FiMail className="text-gray-400" />
              <span className="text-gray-700">Contact</span>
            </div>
            <span className="text-gray-900 font-medium">
              {user.contact}
            </span>
          </div>

          <div className="flex items-center justify-between border p-4 rounded-xl">
            <div className="flex items-center gap-3">
              <FiPhone className="text-gray-400" />
              <span className="text-gray-700">Gender</span>
            </div>
            <span className="text-gray-900 font-medium">
              {user.gender}
            </span>
          </div>

        </div>

        {/* ⚡ ACTIONS */}
        <div className="mt-8 space-y-3">

          <button
            onClick={() => toast.info("Edit feature coming soon")}
            className="w-full py-3 rounded-full border border-gray-300 hover:bg-gray-100 transition"
          >
            Edit Profile
          </button>

          <button
            onClick={handleLogout}
            className="w-full py-3 rounded-full bg-black text-white flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition"
          >
            <FiLogOut />
            Logout
          </button>

        </div>

      </motion.div>
    </section>
  );
};

export default Profile;