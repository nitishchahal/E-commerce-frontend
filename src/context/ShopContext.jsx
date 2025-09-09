// src/context/ShopContext.jsx
import React, { createContext, useEffect, useState } from "react";
import products from "../assets/assets";
import { toast } from "react-toastify";

export const ShopContext = createContext();

export const ShopContextProvider = ({ children }) => {
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const addToCart = async (itemId, size) => {
    let cartData = structuredClone(cartItems);

    if (!size) {
      toast.error("Please select a size!");
      return;
    }

    if (cartData.some(item => item.id === itemId && item.size === size)) {
      cartData = cartData.map(item => {
        if (item.id === itemId && item.size === size) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
    } else {
      cartData.push({ id: itemId, size, quantity: 1 });
    }

    setCartItems(cartData);
  };

  const getCartCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };
  
  // New function to remove a product from the cart
  const removeFromCart = (itemId, size) => {
    setCartItems((prevItems) => 
      prevItems.filter(item => !(item.id === itemId && item.size === size))
    );
    toast.success("Product removed from cart!");
  };

  const value = {
    products,
    currency: "₹",
    deliveryCharges: 50,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    removeFromCart, // Add the new function to the context value
    getCartCount,
  };

  useEffect(() => {
    console.log("Cart Items Updated:", cartItems);
  }, [cartItems]);

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
};