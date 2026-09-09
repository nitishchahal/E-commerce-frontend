import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiUser } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { supabase } from "../lib/supabase";
import { getAuthErrorMessage } from "../utils/auth";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "" });

  const handleChange = (e) => {
    setForm((previous) => ({ ...previous, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const firstName = form.firstName.trim();
    const lastName = form.lastName.trim();
    const email = form.email.trim().toLowerCase();
    const password = form.password;

    if (!firstName || !email || !password) {
      toast.error("Please fill all required fields");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    try {
      setLoading(true);

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: window.location.origin,
          data: {
            first_name: firstName,
            last_name: lastName,
            full_name: [firstName, lastName].filter(Boolean).join(" "),
          },
        },
      });

      if (error) throw error;

      // Hosted Supabase projects commonly require email confirmation before
      // password login. Treat a null session as a successful signup that needs
      // email verification instead of incorrectly attempting a login.
      if (data.user && !data.session) {
        toast.success("Account created! Please verify your email before logging in.");
        navigate("/login");
        return;
      }

      if (data.session) {
        toast.success("Account created 🎉");
        navigate("/");
        return;
      }

      toast.success("Account created. Please check your email to continue.");
      navigate("/login");
    } catch (error) {
      toast.error(await getAuthErrorMessage(error, "register"));
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
        <h2 className="text-2xl font-bold text-center mb-2">Create Account</h2>
        <p className="text-center text-sm text-gray-500 mb-6">Start your shopping journey</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-2">
            <div className="flex items-center w-1/2 border rounded-lg px-3 py-2">
              <FiUser className="text-gray-400 mr-2 shrink-0" />
              <input
                name="firstName"
                placeholder="First Name"
                value={form.firstName}
                onChange={handleChange}
                className="w-full outline-none bg-transparent"
                autoComplete="given-name"
                required
              />
            </div>
            <input
              name="lastName"
              placeholder="Last Name"
              value={form.lastName}
              onChange={handleChange}
              className="w-1/2 p-3 border rounded-lg"
              autoComplete="family-name"
            />
          </div>

          <div className="flex items-center border rounded-lg px-3 py-2">
            <FiMail className="text-gray-400 mr-2" />
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              className="w-full outline-none bg-transparent"
              autoComplete="email"
              required
            />
          </div>

          <div className="flex items-center border rounded-lg px-3 py-2">
            <FiLock className="text-gray-400 mr-2" />
            <input
              type="password"
              name="password"
              placeholder="Create password (8+ characters)"
              value={form.password}
              onChange={handleChange}
              minLength={8}
              className="w-full outline-none bg-transparent"
              autoComplete="new-password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-full disabled:opacity-60"
          >
            {loading ? "Creating..." : "Create Account →"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-black font-medium hover:underline">
            Login
          </Link>
        </p>
      </motion.div>
    </section>
  );
};

export default Register;
