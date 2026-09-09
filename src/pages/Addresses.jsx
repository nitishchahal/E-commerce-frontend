import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FiMapPin, FiPlus, FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";
import { ShopContext } from "../context/ShopContext";

const emptyAddress = {
  label: "Home",
  recipient_name: "",
  phone: "",
  address_line1: "",
  address_line2: "",
  city: "",
  state: "",
  postal_code: "",
  country: "India",
  is_default: false,
};

const Addresses = () => {
  const { addresses, saveAddress, deleteAddress } = useContext(ShopContext);
  const [form, setForm] = useState(emptyAddress);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      await saveAddress(form);
      setForm(emptyAddress);
      setOpen(false);
      toast.success("Address saved");
    } catch (error) {
      toast.error(error.message || "Unable to save address");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id) => {
    if (!window.confirm("Remove this saved address?")) return;
    try {
      await deleteAddress(id);
      toast.success("Address removed");
    } catch (error) {
      toast.error(error.message || "Unable to remove address");
    }
  };

  return (
    <section className="min-h-screen py-12 bg-gradient-to-br from-white to-gray-50">
      <div className="max-w-4xl mx-auto flex flex-wrap justify-between items-end gap-4 mb-8">
        <div><p className="text-xs tracking-[0.3em] text-gray-500 mb-2">ACCOUNT</p><h1 className="text-3xl font-bold">Saved Addresses</h1><p className="text-gray-600 mt-2">Manage secure shipping destinations for checkout.</p></div>
        <button onClick={() => setOpen(!open)} className="bg-black text-white px-5 py-3 rounded-full flex items-center gap-2"><FiPlus /> Add Address</button>
      </div>

      {open && <form onSubmit={submit} className="max-w-4xl mx-auto bg-white border rounded-2xl p-6 mb-6 grid sm:grid-cols-2 gap-3">
        {[
          ["recipient_name","Full Name"],["phone","Phone Number"],["address_line1","Address Line 1"],["address_line2","Address Line 2"],["city","City"],["state","State"],["postal_code","Postal Code"],
        ].map(([key,label]) => <input key={key} placeholder={label} required={key !== "address_line2"} value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} className={key.includes("address") ? "sm:col-span-2 border rounded-lg p-3" : "border rounded-lg p-3"} />)}
        <select value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} className="border rounded-lg p-3"><option>Home</option><option>Work</option><option>Other</option></select>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.is_default} onChange={(e) => setForm({ ...form, is_default: e.target.checked })} /> Make default address</label>
        <button disabled={saving} className="sm:col-span-2 bg-black text-white py-3 rounded-full disabled:opacity-60">{saving ? "Saving..." : "Save Address"}</button>
      </form>}

      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-5">
        {addresses.map((address) => <article key={address.id} className="bg-white border rounded-2xl p-6 relative">
          {address.is_default && <span className="absolute top-4 right-4 text-xs px-2 py-1 rounded-full bg-black text-white">Default</span>}
          <FiMapPin className="text-xl mb-3" />
          <h2 className="font-semibold">{address.label} · {address.recipient_name}</h2>
          <p className="text-sm text-gray-600 mt-2">{address.address_line1}{address.address_line2 ? ", " + address.address_line2 : ""}</p>
          <p className="text-sm text-gray-600">{address.city}, {address.state} - {address.postal_code}</p>
          <p className="text-sm text-gray-500 mt-2">{address.phone}</p>
          <button onClick={() => remove(address.id)} className="mt-5 text-sm text-red-600 flex items-center gap-2"><FiTrash2 /> Remove</button>
        </article>)}
        {!addresses.length && !open && <div className="md:col-span-2 bg-white border rounded-2xl p-10 text-center"><FiMapPin className="mx-auto text-3xl text-gray-400 mb-3" /><p className="font-medium">No saved addresses yet</p><p className="text-sm text-gray-500 mt-1">Add an address before checkout.</p><Link to="/collection" className="inline-block mt-5 underline text-sm">Continue shopping</Link></div>}
      </div>
    </section>
  );
};

export default Addresses;
