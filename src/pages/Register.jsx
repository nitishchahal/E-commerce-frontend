import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import { FiMail, FiLock } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ShopContext } from "../context/ShopContext";
import api from "../services/api";

const Register = () => {
  const navigate = useNavigate();
  const { login } = useContext(ShopContext);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "" });
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.firstName || !form.email || !form.password) return toast.error("Please fill all required fields");
    try {
      setLoading(true);
      const name = [form.firstName, form.lastName].filter(Boolean).join(" ");
      const { data } = await api.post("/auth/register", { name, email: form.email, password: form.password });
      login({ token: data.token, user: data.user });
      toast.success("Account created 🎉");
      navigate("/");
    } catch (error) { toast.error(error.response?.data?.message || "Unable to create account"); }
    finally { setLoading(false); }
  };

  return <section className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-white to-gray-50">
    <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md bg-white/70 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-xl p-8">
      <h2 className="text-2xl font-bold text-center mb-2">Create Account</h2><p className="text-center text-sm text-gray-500 mb-6">Start your shopping journey</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-2"><input name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} className="w-1/2 p-3 border rounded-lg" required /><input name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} className="w-1/2 p-3 border rounded-lg" /></div>
        <div className="flex items-center border rounded-lg px-3 py-2"><FiMail className="text-gray-400 mr-2" /><input type="email" name="email" placeholder="Enter your email" value={form.email} onChange={handleChange} className="w-full outline-none bg-transparent" required /></div>
        <div className="flex items-center border rounded-lg px-3 py-2"><FiLock className="text-gray-400 mr-2" /><input type="password" name="password" placeholder="Create password (8+ characters)" value={form.password} onChange={handleChange} minLength="8" className="w-full outline-none" required /></div>
        <button type="submit" disabled={loading} className="w-full bg-black text-white py-3 rounded-full disabled:opacity-60">{loading ? "Creating..." : "Create Account →"}</button>
      </form>
      <p className="text-center text-sm text-gray-500 mt-6">Already have an account? <Link to="/login" className="text-black font-medium hover:underline">Login</Link></p>
    </motion.div>
  </section>;
};
export default Register;