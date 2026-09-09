import React, { useContext, useMemo, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const emptyAddress = { label: "Home", recipient_name: "", phone: "", address_line1: "", address_line2: "", city: "", state: "", postal_code: "", country: "India", is_default: false };

const PlaceOrder = () => {
  const { cartItems, products, currency, placeOrder, addresses, saveAddress } = useContext(ShopContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [savingAddress, setSavingAddress] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [selectedAddressId, setSelectedAddressId] = useState(addresses.find((a) => a.is_default)?.id || addresses[0]?.id || null);
  const [showNewAddress, setShowNewAddress] = useState(!addresses.length);
  const [form, setForm] = useState(emptyAddress);

  const cartData = useMemo(() => cartItems.map((item) => {
    const product = products.find((p) => String(p._id || p.legacy_id) === String(item.id));
    const price = Number(product?.price?.current ?? product?.price ?? 0);
    const images = product?.images || product?.image || [];
    const image = Array.isArray(images) ? images[0] : images;
    return { ...item, name: product?.name || "Product", price, image: image || assets.cover };
  }), [cartItems, products]);

  const subtotal = cartData.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const delivery = subtotal > 999 ? 0 : 99;
  const total = subtotal + delivery;

  const saveNewAddress = async () => {
    if (!form.recipient_name || !form.phone || !form.address_line1 || !form.city || !form.state || !form.postal_code) {
      throw new Error("Please complete all required address fields");
    }
    setSavingAddress(true);
    try {
      const address = await saveAddress({ ...form, is_default: !addresses.length });
      setSelectedAddressId(address.id);
      setShowNewAddress(false);
      toast.success("Address saved");
      return address.id;
    } finally {
      setSavingAddress(false);
    }
  };

  const handlePlaceOrder = async () => {
    if (!cartItems.length) return toast.error("Your cart is empty");
    try {
      setLoading(true);
      const addressId = selectedAddressId || (await saveNewAddress());
      await placeOrder({ addressId, paymentMethod });
      toast.success("Order placed successfully! 🎉");
      navigate("/orders");
    } catch (error) {
      toast.error(error.message || "Unable to place order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen py-12 bg-gradient-to-br from-white to-gray-50">
      <div className="max-w-6xl mx-auto mb-10"><h2 className="text-3xl sm:text-4xl font-bold">Checkout</h2><p className="text-gray-600 mt-2">Choose a saved address and review your order.</p></div>
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white border rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4"><h3 className="font-semibold text-lg">Shipping Address</h3><button type="button" onClick={() => setShowNewAddress((v) => !v)} className="text-sm underline">{showNewAddress ? "Use saved" : "Add new"}</button></div>

          {!showNewAddress && addresses.length > 0 && <div className="space-y-3">{addresses.map((address) => <label key={address.id} className={"block border rounded-xl p-4 cursor-pointer " + (selectedAddressId === address.id ? "border-black bg-gray-50" : "border-gray-200")}><div className="flex gap-3"><input type="radio" checked={selectedAddressId === address.id} onChange={() => setSelectedAddressId(address.id)} /><div><p className="font-medium">{address.label} · {address.recipient_name}</p><p className="text-sm text-gray-600 mt-1">{address.address_line1}{address.address_line2 ? ", " + address.address_line2 : ""}, {address.city}, {address.state} - {address.postal_code}</p><p className="text-sm text-gray-500 mt-1">{address.phone}</p></div></div></label>)}</div>}

          {showNewAddress && <div className="grid sm:grid-cols-2 gap-3">{[["recipient_name","Full Name"],["phone","Phone Number"],["address_line1","Address Line 1"],["address_line2","Address Line 2"],["city","City"],["state","State"],["postal_code","Postal Code"]].map(([key,label]) => <input key={key} placeholder={label} value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} className={key.includes("address") ? "sm:col-span-2 border rounded-lg p-3" : "border rounded-lg p-3"} />)}<select value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} className="border rounded-lg p-3"><option>Home</option><option>Work</option><option>Other</option></select></div>}

          <div className="mt-6"><p className="font-medium mb-2">Payment Method</p><div className="flex gap-2 flex-wrap">{[["cod","Cash on Delivery"],["upi","UPI"],["card","Card"]].map(([value,label]) => <button type="button" key={value} onClick={() => setPaymentMethod(value)} className={"px-4 py-2 rounded-full border text-sm " + (paymentMethod === value ? "bg-black text-white" : "")}>{label}</button>)}</div><p className="text-xs text-gray-500 mt-3">Payment options are recorded on the order. Live payment processing can be added with a payment gateway later.</p></div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white border rounded-2xl p-6 shadow-sm"><h3 className="font-semibold text-lg mb-4">Order Summary</h3>
          <div className="space-y-4 max-h-[320px] overflow-y-auto">{cartData.map((item) => <div key={item.rowId || item.id + item.size} className="flex gap-4 items-center"><img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover" /><div className="flex-1"><p className="text-sm font-medium">{item.name}</p><p className="text-xs text-gray-500">Size: {item.size} · Qty: {item.quantity}</p></div><p className="text-sm font-semibold">{currency}{(item.price * item.quantity).toFixed(2)}</p></div>)}</div>
          <div className="border-t mt-5 pt-4 space-y-2 text-sm"><div className="flex justify-between"><span>Subtotal</span><span>{currency}{subtotal.toFixed(2)}</span></div><div className="flex justify-between"><span>Delivery</span><span>{delivery ? currency + delivery : "Free"}</span></div><div className="flex justify-between font-semibold text-lg"><span>Total</span><span>{currency}{total.toFixed(2)}</span></div></div>
          <button onClick={handlePlaceOrder} disabled={loading || savingAddress || !cartItems.length} className="w-full mt-6 bg-black text-white py-3 rounded-full font-medium disabled:opacity-60">{loading || savingAddress ? "Processing..." : "Place Order →"}</button>
        </motion.div>
      </div>
    </section>
  );
};

export default PlaceOrder;
