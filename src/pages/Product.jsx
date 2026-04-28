import React, { useEffect, useState, useContext, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { motion } from "framer-motion";
import { assets } from "../assets/assets";
import {
  FiHeart,
  FiStar,
  FiCheck,
  FiArrowRight,
  FiEye,
  FiShoppingCart,
  FiTag,
  FiShield,
  FiMapPin,
  FiUser,
  FiMessageSquare,
  FiChevronRight,
  FiZoomIn,
  FiX,
} from "react-icons/fi";

const getSafeImage = (product) => {
  if (!product) return "";
  if (Array.isArray(product.images) && product.images.length) return product.images[0];
  if (Array.isArray(product.image) && product.image.length) return product.image[0];
  return product.image || "";
};

const Product = () => {
  const { productId } = useParams();
  const { products, addToCart } = useContext(ShopContext);
 const [selectedColor, setSelectedColor] = useState(null);

  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [liked, setLiked] = useState(false);
  const [preview, setPreview] = useState(false);

  const imgRef = useRef(null);

  useEffect(() => {
    if (products?.length) {
      const product = products.find((item) => item._id === productId);
      if (product) {
        setProductData(product);
        setImage(getSafeImage(product) || assets.cover);

        const related = products
          .filter((item) => item.category === product.category && item._id !== productId)
          .slice(0, 4);

        setRelatedProducts(related);
      }
    }
  }, [productId, products]);

  const flyToCart = () => {
  const cart = document.getElementById("cart-icon");
  if (!cart || !imgRef.current) return;

  const imgRect = imgRef.current.getBoundingClientRect();
  const cartRect = cart.getBoundingClientRect();

  const clone = imgRef.current.cloneNode(true);

  clone.style.position = "fixed";
  clone.style.left = imgRect.left + "px";
  clone.style.top = imgRect.top + "px";
  clone.style.width = imgRect.width + "px";
  clone.style.height = imgRect.height + "px";
  clone.style.pointerEvents = "none";
  clone.style.zIndex = 9999;

  document.body.appendChild(clone);

  // 🎯 CURVED PATH ANIMATION
  const deltaX = cartRect.left - imgRect.left;
  const deltaY = cartRect.top - imgRect.top;

  clone.animate(
    [
      {
        transform: "translate(0, 0) scale(1) rotate(0deg)",
        opacity: 1,
      },
      {
        transform: `translate(${deltaX * 0.3}px, ${deltaY * -0.3}px) scale(0.9) rotate(10deg)`,
        opacity: 0.9,
      },
      {
        transform: `translate(${deltaX * 0.6}px, ${deltaY * -0.1}px) scale(0.7) rotate(20deg)`,
        opacity: 0.7,
      },
      {
        transform: `translate(${deltaX}px, ${deltaY}px) scale(0.2) rotate(45deg)`,
        opacity: 0.3,
      },
    ],
    {
      duration: 900,
      easing: "cubic-bezier(0.22, 1, 0.36, 1)", // ✨ smooth premium motion
    }
  );

  setTimeout(() => clone.remove(), 900);
};

  if (!productData) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="px-4 md:px-10 lg:px-20 py-12 bg-gradient-to-br from-white to-gray-50">

      <div className="flex flex-col lg:flex-row gap-12">

        {/* IMAGE */}
        <div className="flex-1">
          <div className="relative bg-white rounded-2xl p-4 shadow-xl">
            <motion.img
              ref={imgRef}
              src={image || assets.cover}
              alt={productData.name}
              onError={(e) => (e.target.src = assets.cover)}
              onClick={() => setPreview(true)}
              className="w-full max-h-[500px] object-contain cursor-zoom-in"
            />

            <button
              onClick={() => setPreview(true)}
              className="absolute bottom-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:shadow-lg transition-all duration-300"
            >
              <FiZoomIn className="text-gray-700" />
            </button>

            <button
              onClick={() => setLiked(!liked)}
              className="absolute top-4 right-4 text-xl p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:shadow-lg transition-all duration-300"
            >
              <FiHeart className={`text-xl ${liked ? "fill-red-500 text-red-500" : "text-gray-400"}`} />
            </button>
          </div>

          <div className="flex gap-3 mt-4 flex-wrap">
            {productData.images?.map((img, i) => (
              <img
                key={i}
                src={img}
                onClick={() => setImage(img)}
                className="w-20 h-20 object-cover rounded-lg border cursor-pointer"
              />
            ))}
          </div>
        </div>

        {/* INFO */}
       

         <div className="flex-1 flex flex-col gap-4 sm:gap-5">

  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold leading-tight text-gray-900 tracking-tight">
    {productData.name}
  </h1>



          {/* ⭐ RATING */}
        <p className="flex items-center gap-2 text-sm text-gray-600">
  <FiStar className="text-yellow-500" />
  <span className="text-yellow-500 font-medium">
    {productData.aggregateRating?.average}
  </span>

  <span className="text-gray-500">
    ({productData.aggregateRating?.count} reviews)
  </span>
</p>

          {/* 💰 PRICE */}
       <div className="flex items-center gap-3 flex-wrap">

  {/* 💰 CURRENT PRICE */}
  <p className="text-3xl sm:text-4xl font-semibold text-gray-900">
    {productData.price.currency} {productData.price.current}
  </p>

  {/* ❌ OLD PRICE */}
  {productData.price.old && (
    <p className="text-lg text-gray-400 line-through">
      {productData.price.currency} {productData.price.old}
    </p>
  )}

  {/* 🔥 DISCOUNT BADGE */}
  {productData.price.old && (
    <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full font-medium">
      {Math.round(
        ((productData.price.old - productData.price.current) /
          productData.price.old) *
          100
      )}
      % OFF
    </span>
  )}

</div>

          {/* 🏷 BRAND + VENDOR */}
         <div className="bg-white/70 backdrop-blur-xl p-4 rounded-2xl border border-gray-200 shadow-sm">

  <div className="flex items-start justify-between gap-4">

    {/* 🏷 LEFT SIDE */}
    <div className="flex flex-col gap-2">

      {/* BRAND */}
      <p className="text-sm text-gray-500 flex items-center gap-1">
        <FiTag className="text-xs" />
        Brand
      </p>
      <p className="font-semibold text-gray-900">
        {productData.brand?.brandName}
      </p>

      <p className="text-xs text-gray-500 leading-relaxed">
        {productData.brand?.brandDescription}
      </p>

      {/* VENDOR */}
      <div className="mt-2">
        <p className="text-sm text-gray-500 flex items-center gap-1">
          <FiUser className="text-xs" />
          Sold by
        </p>

        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-800">
            {productData.vendor?.vendorName}
          </span>

          {productData.vendor?.trustedVendor && (
            <span className="text-[10px] px-2 py-0.5 bg-green-100 text-green-600 rounded-full flex items-center gap-1">
              <FiShield className="text-xs" />
              Verified
            </span>
          )}
        </div>
      </div>

    </div>

    {/* ⭐ RIGHT SIDE */}
    <div className="flex flex-col items-end text-sm">
      <div className="flex items-center gap-1">
        <FiStar className="text-yellow-500 text-sm" />
        <span className="text-yellow-500 font-medium">
          {productData.vendor?.rating}
        </span>
      </div>
      <span className="text-xs text-gray-400">Seller Rating</span>
    </div>

  </div>
</div>

          {/* DESCRIPTION */}
         <div className="bg-white/60 backdrop-blur-xl p-4 rounded-2xl border border-gray-200">

  <h3 className="text-sm font-semibold text-gray-900 mb-2">
    Product Description
  </h3>

  <p className="text-sm sm:text-base text-gray-600 leading-relaxed tracking-wide">
    {productData.description}
  </p>

</div>

          {/* COLORS */}
        
<div className="flex flex-col gap-2">

  {/* 🧠 LABEL */}
  <p className="text-sm font-semibold text-gray-900">
    Color {selectedColor && (
      <span className="text-gray-500 font-normal">
        : {selectedColor.name}
      </span>
    )}
  </p>

  {/* 🎨 COLORS */}
  <div className="flex gap-3 flex-wrap">
    {productData.colors?.map((c, i) => (
      <button
        key={i}
        onClick={() => setSelectedColor(c)}
        title={c.name}
        className={`relative w-9 h-9 rounded-full border transition-all duration-300
          ${selectedColor?.hex === c.hex
            ? "ring-2 ring-black scale-110"
            : "hover:scale-105"
          }
        `}
        style={{ backgroundColor: c.hex }}
      >

        {/* ✔ SELECTED CHECK */}
        {selectedColor?.hex === c.hex && (
          <span className="absolute inset-0 flex items-center justify-center text-white text-xs">
            <FiCheck />
          </span>
        )}

      </button>
    ))}
  </div>

</div>

          {/* SIZE */}
<div className="flex flex-col gap-2">

  {/* 🧠 LABEL */}
  <div className="flex items-center justify-between">
    <p className="text-sm font-semibold text-gray-900">
      Select Size
      {size && (
        <span className="text-gray-500 font-normal ml-1">
          : {size}
        </span>
      )}
    </p>

    <button className="text-xs text-gray-500 hover:text-black transition flex items-center gap-1">
      <FiEye className="text-xs" />
      Size Guide
    </button>
  </div>

  {/* 📏 SIZE OPTIONS */}
  <div className="flex gap-3 flex-wrap">
    {productData.sizes?.map((s) => (
      <button
        key={s}
        onClick={() => setSize(s)}
        className={`min-w-[42px] h-[42px] flex items-center justify-center rounded-lg border text-sm font-medium transition-all duration-300
          
          ${size === s
            ? "bg-black text-white border-black scale-105 shadow-md"
            : "bg-white text-gray-700 border-gray-300 hover:border-black hover:scale-105"
          }
        `}
      >
        {s}
      </button>
    ))}
  </div>

</div>
          {/* CTA */}
    <div className="group inline-block">
  <button
    onClick={() => {
      addToCart(productData._id, size);
      flyToCart();
    }}
    className="relative overflow-hidden px-6 py-3 rounded-full 
               bg-black text-white font-medium tracking-wide
               border border-black/20
               transition-all duration-300 ease-out
               active:scale-[0.98]"
  >

    {/* ✨ LIGHT SWEEP */}
    <span className="absolute inset-0 overflow-hidden rounded-full">
      <span className="absolute -left-1/2 top-0 h-full w-1/2 
                       bg-gradient-to-r from-transparent via-white/20 to-transparent 
                       skew-x-[-20deg] 
                       translate-x-[-100%] 
                       group-hover:translate-x-[200%] 
                       transition-transform duration-700 ease-out" />
    </span>

    {/* TEXT */}
    <span className="relative z-10 flex items-center gap-2">
      <FiShoppingCart className="text-sm" />
      Add to Cart
      <FiArrowRight className="text-sm transition-transform duration-300 group-hover:translate-x-1" />
    </span>

  </button>
</div>

          {/* SPECS */}
        <div className="bg-white/70 backdrop-blur-xl p-5 rounded-2xl border border-gray-200 shadow-sm">

  {/* 🧠 TITLE */}
  <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
    <FiMapPin className="text-xs" />
    Product Details
  </h3>

  {/* 📊 SPECS GRID */}
  <div className="grid grid-cols-2 gap-y-3 text-sm">

    <div className="text-gray-500">Material</div>
    <div className="text-gray-900 font-medium">
      {productData.specs?.material}
    </div>

    <div className="text-gray-500">Fit</div>
    <div className="text-gray-900 font-medium">
      {productData.specs?.fit}
    </div>

    <div className="text-gray-500">Origin</div>
    <div className="text-gray-900 font-medium">
      {productData.specs?.origin}
    </div>

    <div className="text-gray-500">Closure</div>
    <div className="text-gray-900 font-medium">
      {productData.specs?.closureType}
    </div>

    <div className="text-gray-500">Sleeve</div>
    <div className="text-gray-900 font-medium">
      {productData.specs?.sleeveLength}
    </div>

  </div>

</div>

          {/* AVAILABILITY */}
         <div className="flex items-center justify-between text-sm bg-white/60 backdrop-blur-xl px-4 py-3 rounded-xl border border-gray-200">

  {/* 🟢 STATUS */}
  <div className="flex items-center gap-2">

    <span
      className={`w-2.5 h-2.5 rounded-full ${
        productData.availability?.status === "in-stock"
          ? "bg-green-500"
          : "bg-red-500"
      }`}
    />

    <span className="text-gray-700 font-medium">
      {productData.availability?.status === "in-stock"
        ? "In Stock"
        : "Out of Stock"}
    </span>

  </div>

  {/* 📦 STOCK COUNT */}
  <span className="text-gray-500">
    {productData.availability?.stock > 0
      ? `${productData.availability.stock} left`
      : "Unavailable"}
  </span>

</div>

          {/* TAGS */}
          <div className="flex flex-wrap gap-2">

  {productData.tags?.map((t, i) => (
    <span
      key={i}
      className="px-3 py-1 text-xs font-medium rounded-full 
                 bg-gradient-to-r from-gray-100 to-gray-200 
                 text-gray-700 border border-gray-200
                 hover:from-black hover:to-black hover:text-white 
                 transition-all duration-300 cursor-pointer flex items-center gap-1"
    >
      <FiTag className="text-xs" />
      {t}
    </span>
  ))}

</div>

          {/* REVIEWS */}
          <div className="flex flex-col gap-4">

  {productData.reviews && productData.reviews.length > 0 ? (
    productData.reviews.map((r, i) => (
      <div
        key={i}
        className="bg-white/70 backdrop-blur-xl p-4 rounded-2xl border border-gray-200 shadow-sm"
      >
        {/* HEADER */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold">
              {r.user?.charAt(0)}
            </div>

            <div>
              <p className="text-sm font-medium text-gray-900">{r.user}</p>
            {r.verifiedPurchase && (
                <span className="text-[10px] text-green-600 flex items-center gap-1">
                  <FiShield className="text-xs" />
                  Verified Purchase
                </span>
              )}
            </div>
          </div>

          <div className="text-yellow-500 text-sm font-medium flex items-center gap-1">
            <FiStar />
            {r.rating}
          </div>
        </div>

        <p className="text-sm text-gray-600">{r.comment}</p>
      </div>
    ))
  ) : (
    /* ✨ EMPTY STATE */
    <div className="bg-white/60 backdrop-blur-xl p-6 rounded-2xl border border-dashed border-gray-200 text-center">

      {/* ICON */}
      <div className="text-3xl mb-2"><FiMessageSquare /></div>

      {/* TEXT */}
      <p className="text-sm font-medium text-gray-800">
        No reviews yet
      </p>

      <p className="text-xs text-gray-500 mt-1">
        Be the first to share your experience
      </p>

      {/* CTA */}
      <button className="mt-4 px-4 py-2 text-xs rounded-full bg-black text-white hover:opacity-90 transition">
        Write a Review
      </button>

    </div>
  )}

</div>

        </div>
      </div>

      {/* RELATED */}
     <div className="mt-20">

  {/* 🧠 HEADER */}
  <div className="flex items-center justify-between mb-6">
    <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
      You may also like
    </h2>

    <span className="text-xs text-gray-400">
      Based on your selection
    </span>
  </div>

  {/* 📦 GRID */}
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">

    {relatedProducts.map((item) => (
      <Link key={item._id} to={`/product/${item._id}`} className="group">

        <div className="relative bg-white/70 backdrop-blur-xl rounded-2xl p-3 border border-gray-200 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-xl">

          {/* ✨ HOVER GRADIENT */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-black/5 to-transparent" />

          {/* 🖼 IMAGE */}
          <div className="overflow-hidden rounded-xl">
            <img
              src={getSafeImage(item)}
              className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          {/* 🧠 CONTENT */}
          <div className="mt-3 space-y-1">

            <p className="text-sm font-medium text-gray-800 line-clamp-1 group-hover:text-black transition">
              {item.name}
            </p>

            {/* 💰 PRICE */}
            <p className="text-xs text-gray-500">
              {item.price?.currency} {item.price?.current}
            </p>

          </div>

          {/* ➜ ARROW */}
          <span className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 translate-x-[-5px] group-hover:translate-x-0 transition text-sm text-gray-700">
            <FiChevronRight />
          </span>

        </div>

      </Link>
    ))}

  </div>

</div>

      {/* PREVIEW */}
      {preview && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative max-w-4xl max-h-[90vh] p-4"
          >
            <img src={image} className="max-w-full max-h-full object-contain rounded-lg" />
            <button
              onClick={() => setPreview(false)}
              className="absolute top-2 right-2 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:shadow-lg transition-all duration-300"
            >
              <FiX className="text-gray-700" />
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Product;