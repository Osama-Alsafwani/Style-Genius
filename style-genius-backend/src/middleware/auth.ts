import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../model/User";

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get token from header
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ error: "No authentication token provided" });
    }

    //Verfiy token
    const decode = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };

    //Find user
    const user = await User.findById(decode.id).select("-password");

    if (!user) {
      return res.status(401).json({ error: "Invalid authentication token" });
    }

    // Attach user to request
    (req as any).user = user;
    next();
  } catch (err) {
    res.status(401).json({ error: "Authentication failed" });
  }
};
