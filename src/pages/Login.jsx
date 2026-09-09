import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import { supabase } from "../lib/supabase";
import { useContext } from "react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { login } = useContext(ShopContext);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData((previous) => ({ ...previous, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
      });

      if (error) throw error;

      login(data.user);
      toast.success("Welcome back 👋");
      navigate("/");
    } catch (error) {
      toast.error(error?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return <section className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-white to-gray-50">
    <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 w-full max-w-md bg-white/70 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-xl p-8">
      <h2 className="text-2xl font-bold text-gray-900 text-center">Welcome Back</h2>
      <p className="text-gray-500 text-sm text-center mt-2">Login to continue shopping</p>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2"><FiMail className="text-gray-400 mr-2" /><input type="email" name="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} className="w-full outline-none bg-transparent text-sm" autoComplete="email" required /></div>
        <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2"><FiLock className="text-gray-400 mr-2" /><input type={showPassword ? "text" : "password"} name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="w-full outline-none bg-transparent text-sm" autoComplete="current-password" required /><button type="button" onClick={() => setShowPassword(!showPassword)} className="text-gray-400">{showPassword ? <FiEyeOff /> : <FiEye />}</button></div>
        <button type="submit" disabled={loading} className="w-full bg-black text-white py-3 rounded-full font-medium transition disabled:opacity-60">{loading ? "Logging in..." : "Login"}</button>
      </form>
      <p className="text-center text-sm text-gray-500 mt-6">Don't have an account? <Link to="/register" className="text-black font-medium hover:underline">Sign Up</Link></p>
    </motion.div>
  </section>;
};
export default Login;
