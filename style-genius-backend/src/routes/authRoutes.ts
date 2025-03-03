import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User, { zodUserSchema } from "../model/User";

const router = express.Router();

// Registration Route
router.post("/register", async (req: Request, res: Response) => {
  try {
    const validatedData = zodUserSchema.parse(req.body);
    const exists = await User.findOne({ email: validatedData.email });

    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(validatedData.password, salt);
    // create a new user
    const user = await User.create({
      email: validatedData.email,
      password: hashPassword,
    });

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.status(201).json({ token });
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).json({ error: err.message });
    }
    return res.status(400).json({ error: "Unknown error" });
  }
});

// Login Route
router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = zodUserSchema.parse(req.body);
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.json({ token, email: user.email });
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).json({ error: err.message });
    }
    return res.status(400).json({ error: "Unknown error" });
  }
});

export default router;
