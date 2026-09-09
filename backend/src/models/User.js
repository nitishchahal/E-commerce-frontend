import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, minlength: 2, maxlength: 80 },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
  password: { type: String, required: true, minlength: 8, select: false },
  role: { type: String, enum: ["customer", "admin"], default: "customer" },
  avatar: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model("User", userSchema);
