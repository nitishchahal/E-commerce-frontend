import React, { useContext, useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import CartItem from "./CartItem";
import { motion } from "framer-motion";

const Cart = () => {
  const {
    cartItems,
    products,
    currency,
    removeFromCart,
    updateCartItemQuantity,
  } = useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

  const getProduct = (id) =>
    products.find((p) => p.id === id || p._id === id);

  useEffect(() => {
    if (!cartItems?.length) {
      setCartData([]);
      return;
    }

    const tempData = cartItems.map((item) => {
      const product = getProduct(item.id || item._id);
      const price = typeof product?.price === 'object' 
        ? product.price.current 
        : product?.price || 0;
      const image = Array.isArray(product?.images)
        ? product.images[0]
        : Array.isArray(product?.image)
        ? product.image[0]
        : product?.image;
      return {
        id: product?._id || product?.id,
        name: product?.name || "Unknown Product",
        price: price,
        image: image || assets.cover,
        size: item.size,
        quantity: item.quantity,
      };
    });

    setCartData(tempData);
  }, [cartItems, products]);

  const totalCartPrice = useMemo(() => {
    return cartData.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }, [cartData]);

  // 💸 Shipping logic (example)
  const shipping = totalCartPrice > 999 ? 0 : 99;
  const finalTotal = totalCartPrice + shipping;

  return (
    <div className="px-4 md:px-10 lg:px-20 py-12 bg-gradient-to-br from-white to-gray-50 min-h-screen">

      {/* TITLE */}
      <Title text1={"YOUR"} text2={"CART"} />

      {cartData.length > 0 ? (
        <div className="grid lg:grid-cols-3 gap-10 mt-10">

          {/* 🛒 LEFT: ITEMS */}
          <div className="lg:col-span-2 space-y-6">
            {cartData.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <CartItem
                  item={item}
                  currency={currency}
                  onRemove={() => removeFromCart(item.id, item.size)}
                  onUpdateQuantity={updateCartItemQuantity}
                />
              </motion.div>
            ))}
          </div>

          {/* 💎 RIGHT: SUMMARY */}
          <div className="bg-white/70 backdrop-blur-xl border border-gray-200 rounded-2xl p-6 shadow-lg h-fit sticky top-24">

            <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

            <div className="space-y-4 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{currency}{totalCartPrice.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>
                  {shipping === 0 ? "Free" : `${currency}${shipping}`}
                </span>
              </div>

              <hr />

              <div className="flex justify-between text-lg font-bold text-black">
                <span>Total</span>
                <span>{currency}{finalTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* 🔥 CTA */}
            <Link to="/placeorder" className="mt-6 w-full bg-black text-white py-3 rounded-full font-medium hover:scale-[1.02] active:scale-95 transition text-center block">
              Proceed to Checkout →
            </Link>

            {/* 🧠 Trust Signals */}
            <div className="mt-6 text-xs text-gray-500 space-y-1">
              <p>✔ Secure Payments</p>
              <p>✔ Easy Returns</p>
              <p>✔ Fast Delivery</p>
            </div>
          </div>
        </div>
      ) : (
        // 🛍️ EMPTY STATE
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <p className="text-2xl font-semibold mb-4">
              Your cart is empty 🛒
            </p>
            <p className="text-gray-500 mb-6">
              Looks like you haven’t added anything yet.
            </p>

            <a
              href="/collection"
              className="bg-black text-white px-6 py-3 rounded-full"
            >
              Start Shopping →
            </a>
          </motion.div>
        </div>
      )}

      {/* 📱 STICKY MOBILE CHECKOUT */}
      {cartData.length > 0 && (
        <div className="fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-xl border-t p-4 flex justify-between items-center lg:hidden z-50">
          <div>
            <p className="text-sm text-gray-500">Total</p>
            <p className="font-bold text-lg">
              {currency}{finalTotal.toFixed(2)}
            </p>
          </div>

          <Link to="/placeorder" className="bg-black text-white px-6 py-2 rounded-full">
            Checkout →
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;