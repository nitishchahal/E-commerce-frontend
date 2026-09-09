import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 160 },
  description: { type: String, required: true, maxlength: 3000 },
  price: { type: Number, required: true, min: 0 },
  compareAtPrice: { type: Number, min: 0 },
  category: { type: String, required: true, trim: true, index: true },
  subCategory: { type: String, trim: true },
  sizes: [{ type: String, trim: true }],
  colors: [{ type: String, trim: true }],
  images: [{ type: String, required: true }],
  stock: { type: Number, default: 0, min: 0 },
  rating: { type: Number, default: 0, min: 0, max: 5 },
  reviewCount: { type: Number, default: 0, min: 0 },
  featured: { type: Boolean, default: false },
  bestseller: { type: Boolean, default: false },
  active: { type: Boolean, default: true, index: true }
}, { timestamps: true });

productSchema.index({ name: "text", description: "text", category: "text" });

export default mongoose.model("Product", productSchema);
