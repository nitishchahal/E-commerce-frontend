import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiArrowLeft, FiLock } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { supabase } from "../lib/supabase";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let mounted = true;

    const ensureRecoverySession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error || !data.session) {
        if (mounted) toast.error("This password reset link is invalid or has expired.");
        return;
      }
      if (mounted) setReady(true);
    };

    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (mounted && (event === "PASSWORD_RECOVERY" || session)) setReady(true);
    });

    ensureRecoverySession();

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;

      await supabase.auth.signOut();
      toast.success("Password updated successfully. Please log in.");
      navigate("/login", { replace: true });
    } catch (error) {
      toast.error(error?.message || "Unable to update password");
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

        <h2 className="text-2xl font-bold text-gray-900 text-center">Set New Password</h2>
        <p className="text-gray-500 text-sm text-center mt-2">Choose a new password for your store account.</p>

        {!ready ? (
          <div className="mt-8 text-center text-sm text-gray-500">
            Checking your reset link...
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2">
              <FiLock className="text-gray-400 mr-2" />
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="New password (8+ characters)"
                className="w-full outline-none bg-transparent text-sm"
                autoComplete="new-password"
                minLength={8}
                required
              />
            </div>

            <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2">
              <FiLock className="text-gray-400 mr-2" />
              <input
                type="password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                placeholder="Confirm new password"
                className="w-full outline-none bg-transparent text-sm"
                autoComplete="new-password"
                minLength={8}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-3 rounded-full font-medium disabled:opacity-60"
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </form>
        )}
      </motion.div>
    </section>
  );
};

export default ResetPassword;
