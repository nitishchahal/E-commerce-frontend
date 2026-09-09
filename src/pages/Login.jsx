import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { FiEye, FiEyeOff, FiLock, FiMail } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ShopContext } from "../context/ShopContext";
import { supabase } from "../lib/supabase";
import { getAuthErrorMessage } from "../utils/auth";

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

    const email = formData.email.trim().toLowerCase();
    const password = formData.password;

    if (!email || !password) {
      toast.error("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      if (!data?.user) throw new Error("Login succeeded but no user was returned.");

      login(data.user);
      toast.success("Welcome back 👋");
      navigate("/", { replace: true });
    } catch (error) {
      toast.error(await getAuthErrorMessage(error, "login"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-white to-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md bg-white/70 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-xl p-8"
      >
        <h2 className="text-2xl font-bold text-gray-900 text-center">Welcome Back</h2>
        <p className="text-gray-500 text-sm text-center mt-2">Login to continue shopping</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2">
            <FiMail className="text-gray-400 mr-2" />
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full outline-none bg-transparent text-sm"
              autoComplete="email"
              required
            />
          </div>

          <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2">
            <FiLock className="text-gray-400 mr-2" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full outline-none bg-transparent text-sm"
              autoComplete="current-password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((previous) => !previous)}
              className="text-gray-400"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>

          <div className="flex justify-end">
            <Link to="/forgot-password" className="text-sm text-gray-500 hover:text-black hover:underline">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-full font-medium transition disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{" "}
          <Link to="/register" className="text-black font-medium hover:underline">
            Sign Up
          </Link>
        </p>
      </motion.div>
    </section>
  );
};

export default Login;
