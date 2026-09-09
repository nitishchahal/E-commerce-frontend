import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { supabase } from "../lib/supabase";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail) {
      toast.error("Please enter your email address");
      return;
    }

    try {
      setLoading(true);
      const redirectTo = `${window.location.origin}/reset-password`;

      const { error } = await supabase.auth.resetPasswordForEmail(normalizedEmail, {
        redirectTo,
      });

      if (error) throw error;

      toast.success("Password reset link sent. Check your email.");
    } catch (error) {
      toast.error(error?.message || "Unable to send password reset email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-white to-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white/70 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-xl p-8"
      >
        <Link to="/login" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black mb-6">
          <FiArrowLeft /> Back to login
        </Link>

        <h2 className="text-2xl font-bold text-gray-900 text-center">Forgot Password?</h2>
        <p className="text-gray-500 text-sm text-center mt-2">Enter your email and we'll send you a secure reset link.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2">
            <FiMail className="text-gray-400 mr-2" />
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full outline-none bg-transparent text-sm"
              autoComplete="email"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-full font-medium disabled:opacity-60"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      </motion.div>
    </section>
  );
};

export default ForgotPassword;
