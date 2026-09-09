import React, { createContext, useEffect, useState } from "react";
import { products as localProducts } from "../assets/assets";
import { toast } from "react-toastify";
import api from "../services/api";

export const ShopContext = createContext();

const readStorage = (key, fallback) => {
  try { const value = localStorage.getItem(key); return value ? JSON.parse(value) : fallback; }
  catch { return fallback; }
};

export const ShopContextProvider = ({ children }) => {
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [products, setProducts] = useState(localProducts);
  const [cartItems, setCartItems] = useState(() => readStorage("cart", []));
  const [wishlistItems, setWishlistItems] = useState(() => readStorage("wishlist", []));
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(() => readStorage("user", null));
  const [authLoading, setAuthLoading] = useState(true);

  const loadProducts = async () => {
    try {
      const { data } = await api.get("/products");
      const list = data?.data || data?.products || [];
      if (Array.isArray(list) && list.length) setProducts(list);
    } catch {
      // Keep existing product data available while the backend is not seeded.
    }
  };

  const loadUser = async () => {
    if (!localStorage.getItem("token")) { setAuthLoading(false); return; }
    try {
      const { data } = await api.get("/auth/me");
      const currentUser = data.user;
      setUser(currentUser);
      localStorage.setItem("user", JSON.stringify(currentUser));
    } catch {
      setUser(null);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    } finally { setAuthLoading(false); }
  };

  const loadOrders = async () => {
    if (!localStorage.getItem("token")) { setOrders([]); return; }
    try {
      const { data } = await api.get("/orders/mine");
      setOrders(data.data || []);
    } catch (error) {
      if (error.response?.status !== 401) toast.error("Unable to load orders");
    }
  };

  useEffect(() => { loadProducts(); loadUser(); }, []);
  useEffect(() => { if (user) loadOrders(); else setOrders([]); }, [user]);
  useEffect(() => localStorage.setItem("cart", JSON.stringify(cartItems)), [cartItems]);
  useEffect(() => localStorage.setItem("wishlist", JSON.stringify(wishlistItems)), [wishlistItems]);

  const login = ({ token, user: userData }) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    setUser(null); setOrders([]);
    localStorage.removeItem("token"); localStorage.removeItem("user");
    toast.success("Logged out successfully");
  };

  const addToCart = (itemId, size = "Standard") => {
    if (!user) return toast.error("Please login to add items to cart");
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === itemId && item.size === size);
      return existing ? prev.map((item) => item.id === itemId && item.size === size ? { ...item, quantity: item.quantity + 1 } : item) : [...prev, { id: itemId, size, quantity: 1 }];
    });
    toast.success("Added to cart 🛒");
  };

  const removeFromCart = (itemId, size) => {
    setCartItems((prev) => prev.filter((item) => !(item.id === itemId && item.size === size)));
  };

  const updateCartItemQuantity = (itemId, size, quantity) => {
    if (quantity <= 0) return removeFromCart(itemId, size);
    setCartItems((prev) => prev.map((item) => item.id === itemId && item.size === size ? { ...item, quantity } : item));
  };

  const getCartCount = () => cartItems.reduce((total, item) => total + item.quantity, 0);

  const toggleWishlist = (itemId) => {
    if (!user) return toast.error("Please login to save favourites");
    setWishlistItems((prev) => prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]);
  };

  const placeOrder = async ({ shippingAddress, paymentMethod = "cod" }) => {
    if (!cartItems.length) throw new Error("Your cart is empty");
    const items = cartItems.map((item) => ({ product: item.id, size: item.size, quantity: item.quantity }));
    const { data } = await api.post("/orders", { items, shippingAddress, paymentMethod });
    setCartItems([]);
    await loadOrders();
    return data.data;
  };

  return <ShopContext.Provider value={{
    products, currency: "₹", deliveryCharges: 99,
    search, setSearch, showSearch, setShowSearch,
    cartItems, addToCart, removeFromCart, updateCartItemQuantity, getCartCount,
    wishlistItems, toggleWishlist,
    orders, loadOrders, placeOrder,
    user, login, logout, authLoading,
    refreshProducts: loadProducts
  }}>{children}</ShopContext.Provider>;
};
