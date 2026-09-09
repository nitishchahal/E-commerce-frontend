import mongoose from "mongoose";
import Order from "../models/Order.js";
import Product from "../models/Product.js";

export async function createOrder(req, res, next) {
  try {
    const { items, shippingAddress, paymentMethod = "cod" } = req.body;
    if (!Array.isArray(items) || !items.length) return res.status(400).json({ success: false, message: "Order must contain at least one item" });
    if (!shippingAddress?.name || !shippingAddress?.phone || !shippingAddress?.address || !shippingAddress?.city || !shippingAddress?.state || !shippingAddress?.postalCode) return res.status(400).json({ success: false, message: "Complete shipping address is required" });

    const ids = items.map((item) => item.product);
    if (ids.some((id) => !mongoose.isValidObjectId(id))) return res.status(400).json({ success: false, message: "Invalid product id" });
    const products = await Product.find({ _id: { $in: ids }, active: true }).lean();
    const byId = new Map(products.map((product) => [String(product._id), product]));
    const normalizedItems = [];
    let subtotal = 0;

    for (const item of items) {
      const product = byId.get(String(item.product));
      const quantity = Number(item.quantity);
      if (!product) return res.status(400).json({ success: false, message: "One or more products are unavailable" });
      if (!Number.isInteger(quantity) || quantity < 1) return res.status(400).json({ success: false, message: "Invalid quantity" });
      if (product.stock < quantity) return res.status(400).json({ success: false, message: `${product.name} has insufficient stock` });
      const lineTotal = product.price * quantity;
      subtotal += lineTotal;
      normalizedItems.push({ product: product._id, name: product.name, image: product.images?.[0] || "", size: item.size || product.sizes?.[0] || "Standard", quantity, price: product.price });
    }

    const shippingFee = subtotal >= 1999 ? 0 : 99;
    const total = subtotal + shippingFee;
    const order = await Order.create({ user: req.user._id, items: normalizedItems, shippingAddress, paymentMethod, subtotal, shippingFee, total, status: "confirmed" });
    res.status(201).json({ success: true, data: order });
  } catch (error) { next(error); }
}

export async function listMyOrders(req, res, next) {
  try { const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 }).lean(); res.json({ success: true, data: orders }); } catch (error) { next(error); }
}

export async function getOrder(req, res, next) {
  try { const order = await Order.findOne({ _id: req.params.id, user: req.user._id }).lean(); if (!order) return res.status(404).json({ success: false, message: "Order not found" }); res.json({ success: true, data: order }); } catch (error) { next(error); }
}

export async function adminListOrders(req, res, next) {
  try { const orders = await Order.find().populate("user", "name email").sort({ createdAt: -1 }).lean(); res.json({ success: true, data: orders }); } catch (error) { next(error); }
}

export async function adminUpdateOrder(req, res, next) {
  try { const allowed = ["pending", "confirmed", "processing", "shipped", "delivered", "cancelled"]; if (!allowed.includes(req.body.status)) return res.status(400).json({ success: false, message: "Invalid order status" }); const order = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status, ...(req.body.paymentStatus ? { paymentStatus: req.body.paymentStatus } : {}) }, { new: true, runValidators: true }); if (!order) return res.status(404).json({ success: false, message: "Order not found" }); res.json({ success: true, data: order }); } catch (error) { next(error); }
}
