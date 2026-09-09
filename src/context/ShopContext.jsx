import React, { createContext, useEffect, useState } from "react";
import { products as localProducts } from "../assets/assets";
import { toast } from "react-toastify";
import { supabase } from "../lib/supabase";

export const ShopContext = createContext();

const readStorage = (key, fallback) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

const mapSupabaseUser = (authUser) => {
  if (!authUser) return null;

  const metadata = authUser.user_metadata || {};
  const fullName = metadata.full_name ||
    [metadata.first_name, metadata.last_name].filter(Boolean).join(" ") ||
    authUser.email?.split("@")[0] ||
    "Customer";

  return {
    id: authUser.id,
    name: fullName,
    email: authUser.email || "",
    role: metadata.role || "customer",
    avatar: metadata.avatar_url || null,
  };
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
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false });

      if (error) throw error;
      if (Array.isArray(data) && data.length) setProducts(data);
    } catch {
      // Keep local catalog available until the Supabase products table is seeded.
    }
  };

  const loadUser = async () => {
    try {
      const { data, error } = await supabase.auth.getUser();
      if (error) throw error;

      const currentUser = mapSupabaseUser(data.user);
      setUser(currentUser);
      if (currentUser) localStorage.setItem("user", JSON.stringify(currentUser));
      else localStorage.removeItem("user");
    } catch {
      setUser(null);
      localStorage.removeItem("user");
    } finally {
      setAuthLoading(false);
    }
  };

  const loadOrders = async () => {
    if (!user?.id) {
      setOrders([]);
      return;
    }

    try {
      const { data, error } = await supabase
        .from("orders")
        .select("*, order_items(*)")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      toast.error(error?.message || "Unable to load orders");
    }
  };

  useEffect(() => {
    loadProducts();
    loadUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = mapSupabaseUser(session?.user || null);
      setUser(currentUser);
      if (currentUser) localStorage.setItem("user", JSON.stringify(currentUser));
      else localStorage.removeItem("user");
      setAuthLoading(false);
    });

    return () => authListener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (user) loadOrders();
    else setOrders([]);
  }, [user?.id]);

  useEffect(() => localStorage.setItem("cart", JSON.stringify(cartItems)), [cartItems]);
  useEffect(() => localStorage.setItem("wishlist", JSON.stringify(wishlistItems)), [wishlistItems]);

  const login = (authUser) => {
    const userData = mapSupabaseUser(authUser);
    setUser(userData);
    if (userData) localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error(error.message || "Unable to logout");
      return;
    }

    setUser(null);
    setOrders([]);
    setCartItems([]);
    setWishlistItems([]);
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
  };

  const addToCart = (itemId, size = "Standard") => {
    if (!user) return toast.error("Please login to add items to cart");
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === itemId && item.size === size);
      return existing
        ? prev.map((item) =>
            item.id === itemId && item.size === size
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...prev, { id: itemId, size, quantity: 1 }];
    });
    toast.success("Added to cart 🛒");
  };

  const removeFromCart = (itemId, size) => {
    setCartItems((prev) => prev.filter((item) => !(item.id === itemId && item.size === size)));
  };

  const updateCartItemQuantity = (itemId, size, quantity) => {
    if (quantity <= 0) return removeFromCart(itemId, size);
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === itemId && item.size === size ? { ...item, quantity } : item
      )
    );
  };

  const getCartCount = () => cartItems.reduce((total, item) => total + item.quantity, 0);

  const toggleWishlist = (itemId) => {
    if (!user) return toast.error("Please login to save favourites");
    setWishlistItems((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
    );
  };

  const placeOrder = async ({ shippingAddress, paymentMethod = "cod" }) => {
    if (!user?.id) throw new Error("Please login before placing an order");
    if (!cartItems.length) throw new Error("Your cart is empty");

    const productIds = cartItems.map((item) => item.id);
    const { data: productRows, error: productsError } = await supabase
      .from("products")
      .select("id, name, price, images")
      .in("id", productIds);

    if (productsError) throw productsError;

    const productsById = new Map((productRows || []).map((product) => [product.id, product]));
    const missingProduct = cartItems.find((item) => !productsById.has(item.id));
    if (missingProduct) throw new Error("One or more products are no longer available");

    const subtotal = cartItems.reduce((sum, item) => {
      const product = productsById.get(item.id);
      return sum + Number(product.price || 0) * item.quantity;
    }, 0);
    const deliveryCharge = subtotal > 999 ? 0 : 99;
    const total = subtotal + deliveryCharge;

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        user_id: user.id,
        subtotal,
        delivery_charge: deliveryCharge,
        total,
        payment_method: paymentMethod,
        status: "pending",
        shipping_address: shippingAddress,
      })
      .select()
      .single();

    if (orderError) throw orderError;

    const orderItems = cartItems.map((item) => {
      const product = productsById.get(item.id);
      return {
        order_id: order.id,
        product_id: product.id,
        product_name: product.name,
        product_image: Array.isArray(product.images) ? product.images[0] || null : null,
        size: item.size,
        quantity: item.quantity,
        unit_price: Number(product.price || 0),
        line_total: Number(product.price || 0) * item.quantity,
      };
    });

    const { error: itemsError } = await supabase.from("order_items").insert(orderItems);
    if (itemsError) {
      await supabase.from("orders").delete().eq("id", order.id);
      throw itemsError;
    }

    setCartItems([]);
    await loadOrders();
    return { ...order, order_items: orderItems };
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        currency: "₹",
        deliveryCharges: 99,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
        getCartCount,
        wishlistItems,
        toggleWishlist,
        orders,
        loadOrders,
        placeOrder,
        user,
        login,
        logout,
        authLoading,
        refreshProducts: loadProducts,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};
