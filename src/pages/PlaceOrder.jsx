import React, { useContext, useMemo, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const { cartItems, products, currency } = useContext(ShopContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // 🧠 MAP CART DATA
  const cartData = useMemo(() => {
    return cartItems.map((item) => {
      const product = products.find(
        (p) => p._id === item.id || p.id === item.id
      );
      const price = typeof product?.price === 'object' 
        ? product.price.current 
        : product?.price || 0;
      const image = Array.isArray(product?.images)
        ? product.images[0]
        : Array.isArray(product?.image)
        ? product.image[0]
        : product?.image;

      return {
        name: product?.name,
        price: price,
        image: image || assets.cover,
        quantity: item.quantity,
      };
    });
  }, [cartItems, products]);

  const total = cartData.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handlePlaceOrder = () => {
    setLoading(true);

    // Simulate order placement
    setTimeout(() => {
      toast.success("Order placed successfully! 🎉");
      navigate("/orders");
      setLoading(false);
    }, 1500);
  };

  return (
    <section className="min-h-screen px-4 md:px-10 lg:px-20 py-12 bg-gradient-to-br from-white to-gray-50">

      {/* 🧠 HEADER */}
      <div className="max-w-6xl mx-auto mb-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
          Checkout
        </h2>
        <p className="text-gray-600 mt-2">
          Complete your order by filling the details below.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10">

        {/* 🧾 LEFT - FORM */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/70 backdrop-blur-xl border border-gray-200 rounded-2xl p-6 shadow-md space-y-4"
        >
          <h3 className="font-semibold text-lg mb-4">Shipping Details</h3>

          {[
            "Full Name",
            "Email Address",
            "Phone Number",
            "Address",
            "City",
            "Postal Code",
          ].map((field, i) => (
            <input
              key={i}
              type="text"
              placeholder={field}
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/10"
            />
          ))}

          {/* PAYMENT */}
          <div className="mt-4">
            <p className="font-medium mb-2">Payment Method</p>
            <div className="flex gap-3 flex-wrap">
              {["COD", "UPI", "Card"].map((method) => (
                <button
                  key={method}
                  className="px-4 py-2 border rounded-full text-sm hover:bg-black hover:text-white transition"
                >
                  {method}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* 💰 RIGHT - SUMMARY */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/70 backdrop-blur-xl border border-gray-200 rounded-2xl p-6 shadow-md"
        >
          <h3 className="font-semibold text-lg mb-4">Order Summary</h3>

          {/* ITEMS */}
          <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
            {cartData.map((item, i) => (
              <div key={i} className="flex gap-4 items-center">
                <img
                  src={item.image || assets.cover}
                  alt={item.name || "Cart item"}
                  onError={(e) => {
                    e.target.src = assets.cover;
                  }}
                  className="w-16 h-16 rounded-lg object-cover"
                />

                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">
                    {item.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    Qty: {item.quantity}
                  </p>
                </div>

                <p className="text-sm font-semibold">
                  {currency}
                  {(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          {/* TOTAL */}
          <div className="border-t mt-4 pt-4 flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>
              {currency}
              {total.toFixed(2)}
            </span>
          </div>

          {/* 🔥 CTA */}
          <button
            onClick={handlePlaceOrder}
            disabled={loading}
            className="w-full mt-6 bg-black text-white py-3 rounded-full font-medium hover:scale-[1.02] active:scale-95 transition disabled:opacity-60"
          >
            {loading ? "Placing Order..." : "Place Order →"}
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default PlaceOrder;