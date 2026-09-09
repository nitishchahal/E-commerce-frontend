import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import { connectDatabase } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";

const app = express();
const port = Number(process.env.PORT) || 5000;

app.disable("x-powered-by");
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL?.split(",").map((value) => value.trim()) || "http://localhost:5173", credentials: true }));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, limit: 200, standardHeaders: "draft-8", legacyHeaders: false }));

app.get("/", (req, res) => res.json({ success: true, name: "E-Commerce API", version: "1.0.0" }));
app.get("/api/health", (req, res) => res.json({ success: true, status: "ok", timestamp: new Date().toISOString() }));
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use(notFound);
app.use(errorHandler);

connectDatabase()
  .then(() => app.listen(port, () => console.log(`API running on port ${port}`)))
  .catch((error) => { console.error("Database startup failed", error); process.exit(1); });

export default app;
