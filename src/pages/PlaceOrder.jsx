import React, { useContext, useMemo, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const { cartItems, products, currency, placeOrder, deliveryCharges, user } = useContext(ShopContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [form, setForm] = useState({ name: user?.name || "", email: user?.email || "", phone: "", address: "", city: "", state: "", postalCode: "" });

  const cartData = useMemo(() => cartItems.map((item) => {
    const product = products.find((p) => String(p._id || p.id) === String(item.id));
    const price = Number(product?.price?.current ?? product?.price ?? 0);
    const image = Array.isArray(product?.images) ? product.images[0] : Array.isArray(product?.image) ? product.image[0] : product?.image;
    return { id: item.id, name: product?.name || "Product", price, image: image || assets.cover, quantity: item.quantity };
  }), [cartItems, products]);

  const total = cartData.reduce((sum, item) => sum + item.price * item.quantity, 0) + deliveryCharges;
  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handlePlaceOrder = async () => {
    if (!cartItems.length) return toast.error("Your cart is empty");
    if (!form.name || !form.phone || !form.address || !form.city || !form.state || !form.postalCode) return toast.error("Please complete the shipping address");
    try {
      setLoading(true);
      await placeOrder({ shippingAddress: form, paymentMethod });
      toast.success("Order placed successfully! 🎉");
      navigate("/orders");
    } catch (error) { toast.error(error.response?.data?.message || error.message || "Unable to place order"); }
    finally { setLoading(false); }
  };

  return <section className="min-h-screen px-4 md:px-10 lg:px-20 py-12 bg-gradient-to-br from-white to-gray-50">
    <div className="max-w-6xl mx-auto mb-10"><h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Checkout</h2><p className="text-gray-600 mt-2">Complete your order securely.</p></div>
    <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="bg-white/70 border border-gray-200 rounded-2xl p-6 shadow-md space-y-4">
        <h3 className="font-semibold text-lg">Shipping Details</h3>
        {[
          ["name","Full Name"],["email","Email Address"],["phone","Phone Number"],["address","Address"],["city","City"],["state","State"],["postalCode","Postal Code"]
        ].map(([name, placeholder]) => <input key={name} name={name} value={form[name]} onChange={update} placeholder={placeholder} className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/10" />)}
        <div><p className="font-medium mb-2">Payment Method</p><div className="flex gap-3 flex-wrap">{[["cod","Cash on Delivery"],["upi","UPI"],["card","Card"]].map(([value,label]) => <button type="button" key={value} onClick={() => setPaymentMethod(value)} className={`px-4 py-2 border rounded-full text-sm transition ${paymentMethod === value ? "bg-black text-white" : ""}`}>{label}</button>)}</div></div>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="bg-white/70 border border-gray-200 rounded-2xl p-6 shadow-md"><h3 className="font-semibold text-lg mb-4">Order Summary</h3>
        <div className="space-y-4 max-h-[300px] overflow-y-auto">{cartData.map((item) => <div key={item.id} className="flex gap-4 items-center"><img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover" /><div className="flex-1"><p className="text-sm font-medium">{item.name}</p><p className="text-xs text-gray-500">Qty: {item.quantity}</p></div><p className="text-sm font-semibold">{currency}{(item.price * item.quantity).toFixed(2)}</p></div>)}</div>
        <div className="border-t mt-4 pt-4 space-y-2 text-sm"><div className="flex justify-between"><span>Delivery</span><span>{currency}{deliveryCharges}</span></div><div className="flex justify-between font-semibold text-lg"><span>Total</span><span>{currency}{total.toFixed(2)}</span></div></div>
        <button onClick={handlePlaceOrder} disabled={loading || !cartItems.length} className="w-full mt-6 bg-black text-white py-3 rounded-full font-medium disabled:opacity-60">{loading ? "Placing Order..." : "Place Order →"}</button>
      </motion.div>
    </div>
  </section>;
};
export default PlaceOrder;