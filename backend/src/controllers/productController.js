import Product from "../models/Product.js";

export async function listProducts(req, res, next) {
  try {
    const { search, category, minPrice, maxPrice, sort = "newest", featured, bestseller, page = 1, limit = 12 } = req.query;
    const filter = { active: true };
    if (category) filter.category = category;
    if (featured === "true") filter.featured = true;
    if (bestseller === "true") filter.bestseller = true;
    if (search) filter.$text = { $search: search };
    if (minPrice || maxPrice) filter.price = { ...(minPrice ? { $gte: Number(minPrice) } : {}), ...(maxPrice ? { $lte: Number(maxPrice) } : {}) };
    const sortMap = { newest: { createdAt: -1 }, priceAsc: { price: 1 }, priceDesc: { price: -1 }, rating: { rating: -1 }, popular: { reviewCount: -1 } };
    const safeLimit = Math.min(Number(limit) || 12, 50);
    const safePage = Math.max(Number(page) || 1, 1);
    const [items, total] = await Promise.all([
      Product.find(filter).sort(sortMap[sort] || sortMap.newest).skip((safePage - 1) * safeLimit).limit(safeLimit).lean(),
      Product.countDocuments(filter)
    ]);
    res.json({ success: true, data: items, pagination: { page: safePage, limit: safeLimit, total, pages: Math.ceil(total / safeLimit) } });
  } catch (error) { next(error); }
}

export async function getProduct(req, res, next) {
  try {
    const item = await Product.findOne({ _id: req.params.id, active: true }).lean();
    if (!item) return res.status(404).json({ success: false, message: "Product not found" });
    res.json({ success: true, data: item });
  } catch (error) { next(error); }
}

export async function createProduct(req, res, next) {
  try { const item = await Product.create(req.body); res.status(201).json({ success: true, data: item }); } catch (error) { next(error); }
}

export async function updateProduct(req, res, next) {
  try { const item = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }); if (!item) return res.status(404).json({ success: false, message: "Product not found" }); res.json({ success: true, data: item }); } catch (error) { next(error); }
}

export async function deleteProduct(req, res, next) {
  try { const item = await Product.findByIdAndUpdate(req.params.id, { active: false }, { new: true }); if (!item) return res.status(404).json({ success: false, message: "Product not found" }); res.json({ success: true, message: "Product archived" }); } catch (error) { next(error); }
}
