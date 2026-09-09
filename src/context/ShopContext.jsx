import React, { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { products as localProducts } from "../assets/assets";
import { toast } from "react-toastify";
import { supabase } from "../lib/supabase";

export const ShopContext = createContext();

const mapSupabaseUser = (authUser) => {
  if (!authUser) return null;
  const metadata = authUser.user_metadata || {};
  return {
    id: authUser.id,
    name:
      metadata.full_name ||
      [metadata.first_name, metadata.last_name].filter(Boolean).join(" ") ||
      authUser.email?.split("@")[0] ||
      "Customer",
    email: authUser.email || "",
  };
};

export const ShopContextProvider = ({ children }) => {
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [profile, setProfile] = useState(null);
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [customerLoading, setCustomerLoading] = useState(false);

  const loadProducts = useCallback(async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Unable to load products", error);
      setProducts(localProducts);
      return;
    }

    const localById = new Map(localProducts.map((product) => [product._id, product]));
    const merged = (data || []).map((dbProduct) => {
      const local = localById.get(dbProduct.legacy_id);
      return {
        ...(local || {}),
        ...dbProduct,
        _id: dbProduct.legacy_id || local?._id || String(dbProduct.id),
        _dbId: dbProduct.id,
        image:
          dbProduct.image ||
          (Array.isArray(dbProduct.images) && dbProduct.images[0]) ||
          local?.image ||
          [],
        images:
          Array.isArray(dbProduct.images) && dbProduct.images.length
            ? dbProduct.images
            : local?.image || [],
        category: dbProduct.category || local?.category,
        subCategory: dbProduct.sub_category || local?.subCategory,
        price: local?.price && typeof local.price === "object"
          ? { ...local.price, current: Number(dbProduct.price) }
          : Number(dbProduct.price),
        sizes: dbProduct.sizes?.length ? dbProduct.sizes : local?.sizes || [],
      };
    });

    setProducts(merged.length ? merged : localProducts);
  }, []);

  const loadProfile = useCallback(async (userId) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .maybeSingle();

    if (error) throw error;
    setProfile(data || null);
    return data;
  }, []);

  const getOrCreateCart = useCallback(async (userId) => {
    const { data: existing, error: selectError } = await supabase
      .from("carts")
      .select("id")
      .eq("user_id", userId)
      .maybeSingle();

    if (selectError) throw selectError;
    if (existing) return existing.id;

    const { data, error } = await supabase
      .from("carts")
      .insert({ user_id: userId })
      .select("id")
      .single();

    if (!error) return data.id;

    const { data: retried, error: retryError } = await supabase
      .from("carts")
      .select("id")
      .eq("user_id", userId)
      .single();

    if (retryError) throw error;
    return retried.id;
  }, []);

  const loadCart = useCallback(async (userId) => {
    const { data: cart, error } = await supabase
      .from("carts")
      .select("id, cart_items(id, product_id, size, quantity, products(id, legacy_id))")
      .eq("user_id", userId)
      .maybeSingle();

    if (error) throw error;

    setCartItems(
      (cart?.cart_items || [])
        .map((item) => ({
          rowId: item.id,
          id: item.products?.legacy_id || String(item.product_id),
          dbId: item.product_id,
          size: item.size,
          quantity: item.quantity,
        }))
        .filter((item) => item.dbId)
    );
  }, []);

  const loadWishlist = useCallback(async (userId) => {
    const { data, error } = await supabase
      .from("wishlist_items")
      .select("product_id, products(legacy_id)")
      .eq("user_id", userId);

    if (error) throw error;
    setWishlistItems((data || []).map((item) => item.products?.legacy_id).filter(Boolean));
  }, []);

  const loadAddresses = useCallback(async (userId) => {
    const { data, error } = await supabase
      .from("addresses")
      .select("*")
      .eq("user_id", userId)
      .order("is_default", { ascending: false })
      .order("created_at", { ascending: false });

    if (error) throw error;
    setAddresses(data || []);
    return data || [];
  }, []);

  const loadOrders = useCallback(async (userId = user?.id) => {
    if (!userId) {
      setOrders([]);
      return [];
    }

    const { data, error } = await supabase
      .from("orders")
      .select("*, order_items(*)")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    setOrders(data || []);
    return data || [];
  }, [user?.id]);

  const loadCustomerData = useCallback(async (userId) => {
    if (!userId) return;
    setCustomerLoading(true);
    try {
      await Promise.all([
        loadProfile(userId),
        loadCart(userId),
        loadWishlist(userId),
        loadAddresses(userId),
        loadOrders(userId),
      ]);
    } catch (error) {
      console.error("Unable to load customer data", error);
    } finally {
      setCustomerLoading(false);
    }
  }, [loadAddresses, loadCart, loadOrders, loadProfile, loadWishlist]);

  useEffect(() => {
    loadProducts();

    supabase.auth.getUser().then(({ data }) => {
      setUser(mapSupabaseUser(data.user));
      setAuthLoading(false);
      if (data.user) loadCustomerData(data.user.id);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      const nextUser = mapSupabaseUser(session?.user || null);
      setUser(nextUser);
      setAuthLoading(false);

      if (nextUser) {
        loadCustomerData(nextUser.id);
      } else {
        setProfile(null);
        setCartItems([]);
        setWishlistItems([]);
        setAddresses([]);
        setOrders([]);
      }
    });

    return () => listener.subscription.unsubscribe();
  }, [loadCustomerData, loadProducts]);

  const login = (authUser) => {
    const nextUser = mapSupabaseUser(authUser);
    setUser(nextUser);
    if (nextUser) loadCustomerData(nextUser.id);
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const resolveProduct = (legacyId) =>
    products.find((product) => String(product._id || product.legacy_id || product.id) === String(legacyId));

  const addToCart = async (itemId, size = "Standard") => {
    if (!user?.id) {
      toast.error("Please login to add items to your cart");
      return;
    }

    const product = resolveProduct(itemId);
    if (!product?._dbId) {
      toast.error("This product is not available for checkout yet.");
      return;
    }

    try {
      const cartId = await getOrCreateCart(user.id);
      const existing = cartItems.find(
        (item) => item.dbId === product._dbId && item.size === size
      );

      if (existing) {
        const { error } = await supabase
          .from("cart_items")
          .update({ quantity: Math.min(existing.quantity + 1, 20) })
          .eq("id", existing.rowId);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("cart_items")
          .insert({
            cart_id: cartId,
            product_id: product._dbId,
            size,
            quantity: 1,
          });
        if (error) throw error;
      }

      await loadCart(user.id);
      toast.success("Added to cart 🛒");
    } catch (error) {
      toast.error(error.message || "Unable to update cart");
    }
  };

  const removeFromCart = async (itemId, size) => {
    if (!user?.id) return;
    const item = cartItems.find((entry) => entry.id === itemId && entry.size === size);
    if (!item) return;

    const { error } = await supabase.from("cart_items").delete().eq("id", item.rowId);
    if (error) {
      toast.error(error.message || "Unable to remove item");
      return;
    }
    await loadCart(user.id);
  };

  const updateCartItemQuantity = async (itemId, size, quantity) => {
    if (!user?.id) return;
    const item = cartItems.find((entry) => entry.id === itemId && entry.size === size);
    if (!item) return;

    if (quantity <= 0) return removeFromCart(itemId, size);

    const { error } = await supabase
      .from("cart_items")
      .update({ quantity: Math.min(Number(quantity), 20) })
      .eq("id", item.rowId);

    if (error) {
      toast.error(error.message || "Unable to update quantity");
      return;
    }
    await loadCart(user.id);
  };

  const getCartCount = () => cartItems.reduce((total, item) => total + item.quantity, 0);

  const toggleWishlist = async (itemId) => {
    if (!user?.id) {
      toast.error("Please login to save favourites");
      return;
    }

    const product = resolveProduct(itemId);
    if (!product?._dbId) {
      toast.error("This product is not available yet.");
      return;
    }

    try {
      if (wishlistItems.includes(product._id)) {
        const { error } = await supabase
          .from("wishlist_items")
          .delete()
          .eq("user_id", user.id)
          .eq("product_id", product._dbId);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("wishlist_items")
          .insert({ user_id: user.id, product_id: product._dbId });
        if (error) throw error;
      }
      await loadWishlist(user.id);
    } catch (error) {
      toast.error(error.message || "Unable to update wishlist");
    }
  };

  const saveProfile = async (updates) => {
    if (!user?.id) throw new Error("Please login first");
    const payload = {
      id: user.id,
      first_name: updates.first_name?.trim() || null,
      last_name: updates.last_name?.trim() || null,
      full_name: updates.full_name?.trim() || null,
      phone: updates.phone?.trim() || null,
    };

    const { data, error } = await supabase
      .from("profiles")
      .upsert(payload)
      .select()
      .single();

    if (error) throw error;
    setProfile(data);
    setUser((current) => ({
      ...current,
      name: data.full_name || current?.name,
    }));
    return data;
  };

  const saveAddress = async (address) => {
    if (!user?.id) throw new Error("Please login first");

    const payload = {
      ...address,
      user_id: user.id,
      recipient_name: address.recipient_name.trim(),
      phone: address.phone.trim(),
      address_line1: address.address_line1.trim(),
      address_line2: address.address_line2?.trim() || null,
      city: address.city.trim(),
      state: address.state.trim(),
      postal_code: address.postal_code.trim(),
      country: address.country?.trim() || "India",
    };

    const query = address.id
      ? supabase.from("addresses").update(payload).eq("id", address.id).select().single()
      : supabase.from("addresses").insert(payload).select().single();

    const { data, error } = await query;
    if (error) throw error;
    await loadAddresses(user.id);
    return data;
  };

  const deleteAddress = async (addressId) => {
    const { error } = await supabase.from("addresses").delete().eq("id", addressId);
    if (error) throw error;
    await loadAddresses(user.id);
  };

  const placeOrder = async ({ addressId, paymentMethod = "cod" }) => {
    if (!user?.id) throw new Error("Please login before placing an order");
    if (!cartItems.length) throw new Error("Your cart is empty");

    const { data, error } = await supabase.rpc("checkout_cart", {
      p_address_id: addressId,
      p_payment_method: paymentMethod,
    });

    if (error) throw error;
    await Promise.all([loadCart(user.id), loadOrders(user.id)]);
    return data;
  };

  const value = useMemo(() => ({
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
    addresses,
    saveAddress,
    deleteAddress,
    profile,
    saveProfile,
    user,
    login,
    logout,
    authLoading,
    customerLoading,
    refreshProducts: loadProducts,
  }), [products, search, showSearch, cartItems, wishlistItems, orders, addresses, profile, user, authLoading, customerLoading, loadOrders, loadProducts]);

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};
