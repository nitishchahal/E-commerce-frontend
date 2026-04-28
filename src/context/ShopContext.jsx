import React, { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets"; // ✅ FIXED import
import { toast } from "react-toastify";

export const ShopContext = createContext();

export const ShopContextProvider = ({ children }) => {
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);

  // 🧠 LOAD USER
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) setUser(JSON.parse(storedUser));
    } catch (err) {
      console.error("User parse error", err);
    }
  }, []);

  // 🧠 LOAD CART
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) setCartItems(JSON.parse(storedCart));
    } catch (err) {
      console.error("Cart parse error", err);
    }
  }, []);

  // 💾 SAVE CART
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // 🔐 LOGIN
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    toast.success("Welcome back 👋");
  };

  // 🚪 LOGOUT
  const logout = () => {
    setUser(null);
    setCartItems([]); // optional: clear cart
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
    toast.success("Logged out successfully");
  };

  // 🛒 ADD TO CART
  const addToCart = (itemId, size) => {
    if (!user) {
      toast.error("Please login to add items to cart");
      return;
    }

    if (!size) {
      toast.error("Please select a size!");
      return;
    }

    setCartItems((prev) => {
      const existing = prev.find(
        (item) => item.id === itemId && item.size === size
      );

      if (existing) {
        return prev.map((item) =>
          item.id === itemId && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { id: itemId, size, quantity: 1 }];
    });

    toast.success("Added to cart 🛒");
  };

  // ❌ REMOVE ITEM
  const removeFromCart = (itemId, size) => {
    setCartItems((prev) =>
      prev.filter((item) => !(item.id === itemId && item.size === size))
    );
    toast.success("Removed from cart");
  };

  // 🔄 UPDATE QUANTITY
  const updateCartItemQuantity = (itemId, size, quantity) => {
    if (quantity <= 0) {
      removeFromCart(itemId, size);
      return;
    }

    setCartItems((prev) =>
      prev.map((item) =>
        item.id === itemId && item.size === size
          ? { ...item, quantity }
          : item
      )
    );
  };

  // 🔢 CART COUNT
  const getCartCount = () =>
    cartItems.reduce((total, item) => total + item.quantity, 0);

  const value = {
    products,
    currency: "₹",
    deliveryCharges: 50,

    // search
    search,
    setSearch,
    showSearch,
    setShowSearch,

    // cart
    cartItems,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    getCartCount,

    // auth
    user,
    login,
    logout,
  };

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
};