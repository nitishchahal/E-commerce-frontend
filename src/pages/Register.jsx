import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import { FiMail, FiLock } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const { login } = useContext(ShopContext);

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    otp: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🧠 STEP 1 → SEND OTP
 const handleSendOTP = async () => {
  if (!form.email) {
    toast.error("Please enter email");
    return;
  }

  try {
    setLoading(true);

    await axios.post("http://localhost:5000/api/auth/send-otp", {
      email: form.email,
    });

    toast.success("OTP sent to your email 📩");
    setStep(2);
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to send OTP");
  } finally {
    setLoading(false);
  }
};

  // 🧠 STEP 2 → VERIFY OTP
  const handleVerifyOTP = async () => {
  try {
    setLoading(true);

    await axios.post("http://localhost:5000/api/auth/verify-otp", {
      email: form.email,
      otp: form.otp,
    });

    toast.success("OTP verified ✅");
    setStep(3);
  } catch (error) {
    toast.error(error.response?.data?.message || "Invalid OTP");
  } finally {
    setLoading(false);
  }
};

  // 🧠 STEP 3 → CREATE ACCOUNT
  const handleCreateAccount = async () => {
    if (!form.password) {
      toast.error("Password required");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          gender: form.gender,
          password: form.password,
        }
      );

      toast.success("Account created 🎉");

      // 🔥 AUTO LOGIN AFTER REGISTER
      const loginRes = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email: form.email,
          password: form.password,
        }
      );

      login(loginRes.data.user);
      localStorage.setItem("token", loginRes.data.token);

      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
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
        {/* TITLE */}
        <h2 className="text-2xl font-bold text-center mb-4">
          {step === 1 && "Create Account"}
          {step === 2 && "Verify OTP"}
          {step === 3 && "Set Password"}
        </h2>

        {/* STEP 1 */}
        {step === 1 && (
          <div className="space-y-4">
            <div className="flex gap-2">
              <input
                name="firstName"
                placeholder="First Name"
                onChange={handleChange}
                className="w-1/2 p-3 border rounded-lg"
              />
              <input
                name="lastName"
                placeholder="Last Name"
                onChange={handleChange}
                className="w-1/2 p-3 border rounded-lg"
              />
            </div>

            <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-black transition">
              <FiMail className="text-gray-400 mr-2" />
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                onChange={handleChange}
                className="w-full outline-none bg-transparent"
              />
            </div>

            <select
              name="gender"
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
            >
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>

            <button
              onClick={handleSendOTP}
              disabled={loading}
              className="w-full bg-black text-white py-3 rounded-full disabled:opacity-60"
            >
              {loading ? "Sending..." : "Send OTP →"}
            </button>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="space-y-4">
            <input
              name="otp"
              placeholder="Enter OTP"
              onChange={handleChange}
              className="w-full p-3 border rounded-lg text-center tracking-widest"
            />

            <button
              onClick={handleVerifyOTP}
              className="w-full bg-black text-white py-3 rounded-full"
            >
              Verify OTP →
            </button>
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div className="space-y-4">
            <div className="flex items-center border rounded-lg px-3 py-2">
              <FiLock className="text-gray-400 mr-2" />
              <input
                type="password"
                name="password"
                placeholder="Create Password"
                onChange={handleChange}
                className="w-full outline-none"
              />
            </div>

            <button
              onClick={handleCreateAccount}
              disabled={loading}
              className="w-full bg-black text-white py-3 rounded-full disabled:opacity-60"
            >
              {loading ? "Creating..." : "Create Account →"}
            </button>
          </div>
        )}

        {/* BACK TO LOGIN */}
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