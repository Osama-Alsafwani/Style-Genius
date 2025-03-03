import express = require("express");
import cors from "cors";
import { connectDB } from "./config/db";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import aiRoutes from "./routes/aiRoutes";
import userRoutes from "./routes/userRoutes";
import path = require("path");

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());

// Test Route
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/ai", aiRoutes);
app.use("/analyze", express.static(path.join(__dirname, "../uploads")));
app.use("/api/users", userRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
