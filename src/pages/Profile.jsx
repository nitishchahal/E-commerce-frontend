import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiMail, FiUser, FiPhone, FiLogOut, FiMapPin } from "react-icons/fi";
import { toast } from "react-toastify";
import { ShopContext } from "../context/ShopContext";

const Profile = () => {
  const navigate = useNavigate();
  const { user, profile, saveProfile, logout } = useContext(ShopContext);
  const [form, setForm] = useState({ first_name: "", last_name: "", full_name: "", phone: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setForm({
      first_name: profile?.first_name || "",
      last_name: profile?.last_name || "",
      full_name: profile?.full_name || user?.name || "",
      phone: profile?.phone || "",
    });
  }, [profile, user]);

  if (!user) return null;

  const submit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      await saveProfile(form);
      toast.success("Profile updated");
    } catch (error) {
      toast.error(error.message || "Unable to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      toast.error(error.message || "Unable to logout");
    }
  };

  return (
    <section className="min-h-screen py-12 bg-gradient-to-br from-white to-gray-50">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-xl p-8">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center text-xl font-semibold">{(form.full_name || user.name || "C").charAt(0).toUpperCase()}</div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{form.full_name || user.name}</h2>
            <p className="text-gray-500 text-sm flex items-center gap-2"><FiMail /> {user.email}</p>
          </div>
        </div>

        <form onSubmit={submit} className="grid sm:grid-cols-2 gap-4">
          <label className="text-sm text-gray-600">First name<input value={form.first_name} onChange={(e) => setForm({ ...form, first_name: e.target.value })} className="mt-1 w-full border rounded-lg p-3 text-gray-900" /></label>
          <label className="text-sm text-gray-600">Last name<input value={form.last_name} onChange={(e) => setForm({ ...form, last_name: e.target.value })} className="mt-1 w-full border rounded-lg p-3 text-gray-900" /></label>
          <label className="text-sm text-gray-600 sm:col-span-2">Display name<input required value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} className="mt-1 w-full border rounded-lg p-3 text-gray-900" /></label>
          <label className="text-sm text-gray-600 sm:col-span-2">Phone<input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="mt-1 w-full border rounded-lg p-3 text-gray-900" /></label>
          <div className="sm:col-span-2 flex flex-wrap gap-3 pt-2">
            <button disabled={saving} className="flex-1 min-w-[180px] py-3 rounded-full bg-black text-white disabled:opacity-60">{saving ? "Saving..." : "Save Profile"}</button>
            <Link to="/addresses" className="flex-1 min-w-[180px] py-3 rounded-full border text-center flex items-center justify-center gap-2"><FiMapPin /> Manage Addresses</Link>
          </div>
        </form>

        <button onClick={handleLogout} className="w-full mt-4 py-3 rounded-full border border-red-200 text-red-600 flex items-center justify-center gap-2 hover:bg-red-50"><FiLogOut /> Logout</button>
      </motion.div>
    </section>
  );
};

export default Profile;
