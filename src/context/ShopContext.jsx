import React, { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";

export const ShopContext = createContext();
const readStorage = (key, fallback) => { try { const value = localStorage.getItem(key); return value ? JSON.parse(value) : fallback; } catch { return fallback; } };

export const ShopContextProvider = ({ children }) => {
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => { setUser(readStorage("user", null)); setCartItems(readStorage("cart", [])); setWishlistItems(readStorage("wishlist", [])); setOrders(readStorage("orders", [])); }, []);
  useEffect(() => localStorage.setItem("cart", JSON.stringify(cartItems)), [cartItems]);
  useEffect(() => localStorage.setItem("wishlist", JSON.stringify(wishlistItems)), [wishlistItems]);
  useEffect(() => localStorage.setItem("orders", JSON.stringify(orders)), [orders]);

  const login = (userData) => { setUser(userData); localStorage.setItem("user", JSON.stringify(userData)); toast.success(`Welcome back, ${userData?.name || "shopper"} 👋`); };
  const logout = () => { setUser(null); localStorage.removeItem("user"); toast.success("Logged out successfully"); };

  const addToCart = (itemId, size = "Standard") => {
    if (!user) return toast.error("Please login to add items to cart");
    setCartItems((prev) => { const existing = prev.find((item) => item.id === itemId && item.size === size); return existing ? prev.map((item) => item.id === itemId && item.size === size ? { ...item, quantity: item.quantity + 1 } : item) : [...prev, { id: itemId, size, quantity: 1 }]; });
    toast.success("Added to cart 🛒");
  };
  const removeFromCart = (itemId, size) => { setCartItems((prev) => prev.filter((item) => !(item.id === itemId && item.size === size))); toast.success("Removed from cart"); };
  const updateCartItemQuantity = (itemId, size, quantity) => { if (quantity <= 0) return removeFromCart(itemId, size); setCartItems((prev) => prev.map((item) => item.id === itemId && item.size === size ? { ...item, quantity } : item)); };
  const getCartCount = () => cartItems.reduce((total, item) => total + item.quantity, 0);

  const toggleWishlist = (itemId) => {
    if (!user) return toast.error("Please login to save favourites");
    setWishlistItems((prev) => { const exists = prev.includes(itemId); toast.success(exists ? "Removed from wishlist" : "Saved to wishlist ❤️"); return exists ? prev.filter((id) => id !== itemId) : [...prev, itemId]; });
  };

  const placeOrder = (orderData = {}) => {
    if (!cartItems.length) return toast.error("Your cart is empty");
    const order = { id: `ORD-${Date.now().toString().slice(-8)}`, items: cartItems, status: "Confirmed", createdAt: new Date().toISOString(), ...orderData };
    setOrders((prev) => [order, ...prev]); setCartItems([]); toast.success("Order placed successfully 🎉"); return order;
  };

  return <ShopContext.Provider value={{ products, currency: "₹", deliveryCharges: 50, search, setSearch, showSearch, setShowSearch, cartItems, addToCart, removeFromCart, updateCartItemQuantity, getCartCount, wishlistItems, toggleWishlist, orders, placeOrder, user, login, logout }}>{children}</ShopContext.Provider>;
};