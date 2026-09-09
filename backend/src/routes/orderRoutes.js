import { Router } from "express";
import { adminListOrders, adminUpdateOrder, createOrder, getOrder, listMyOrders } from "../controllers/orderController.js";
import { adminOnly, protect } from "../middleware/auth.js";

const router = Router();
router.use(protect);
router.post("/", createOrder);
router.get("/mine", listMyOrders);
router.get("/mine/:id", getOrder);
router.get("/admin/all", adminOnly, adminListOrders);
router.patch("/admin/:id", adminOnly, adminUpdateOrder);
export default router;
