import express from "express";
import { verifyToken } from "../middleware/auth";
import User from "../model/User";

const router = express.Router();

router.get("/me", verifyToken, async (req, res) => {
  try {
    const user = await User.findById((req as any).user._id)
      .select("-password")
      .lean();
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
