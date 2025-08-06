import React, { createContext, useState } from "react";
import products from "../assets/assets"; // ✅ Ensure this points to a JS object, not a folder

export const ShopContext = createContext();

export const ShopContextProvider = ({ children }) => {
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const value = {
    products,
    currency: "₹",
    deliveryCharges: 50,
    search,
    setSearch,
    showSearch,
    setShowSearch,
  };

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
};
