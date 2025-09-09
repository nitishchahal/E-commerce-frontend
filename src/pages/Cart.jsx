import React, { useContext, useEffect, useState, useMemo } from "react";
import { ShopContext } from "../context/ShopContext"; 
import Title from "../components/Title";
import CartItem from "./CartItem"; // Assumed path

const Cart = () => {
  const { cartItems, products, currency, removeFromCart, updateCartItemQuantity } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  // Helper: get product details by ID (support _id or id)
  const getProduct = (id) => products.find((p) => p.id === id || p._id === id);

  useEffect(() => {
    if (!cartItems?.length) {
      setCartData([]);
      return;
    }

    const tempData = cartItems.map((item) => {
      const product = getProduct(item.id || item._id);
      return {
        id: product?._id || product?.id,
        name: product?.name || "Unknown Product",
        price: product?.price || 0,
        image: Array.isArray(product?.image) ? product.image[0] : product?.image,
        size: item.size,
        quantity: item.quantity,
      };
    });

    setCartData(tempData);
  }, [cartItems, products]);

  const totalCartPrice = useMemo(() => {
    return cartData.reduce((total, item) => total + (item.price * item.quantity), 0);
  }, [cartData]);

  return (
    <div className="cart-container">
      <Title text1={"YOUR"} text2={"CART"} />
      {cartData.length > 0 ? (
        <>
          <div className="cart-list">
            {cartData.map((item, index) => (
              <CartItem
                key={index}
                item={item}
                currency={currency}
                onRemove={() => removeFromCart(item.id, item.size)}
                onUpdateQuantity={updateCartItemQuantity}
              />
            ))}
          </div>
          <div className="cart-summary">
            <p className="total-text">Subtotal</p>
            <p className="total-price">
              {currency}
              {totalCartPrice.toFixed(2)}
            </p>
          </div>
        </>
      ) : (
        <p className="empty-cart">Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;