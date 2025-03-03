import express from "express";
import multer from "multer";
import { verifyToken } from "../middleware/auth";
import * as tf from "@tensorflow/tfjs-node";
import * as mobilenet from "@tensorflow-models/mobilenet";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post(
  "/analyze",
  verifyToken,
  upload.single("image"),
  async (req, res) => {
    try {
      //Uploading Files Locally
      const filename = `${uuidv4()}.jpg`;
      const filepath = path.join(__dirname, "../../uploads", filename);
      fs.writeFileSync(filepath, req.file!.buffer);

      // Process with TensorFlow.js
      const model = await mobilenet.load();
      const image = tf.node.decodeImage(req.file!.buffer) as tf.Tensor3D;
      const predictions = await model.classify(image);

      image.dispose();

      // Save to user's history
      const user = (req as any).user;

      await user.updateOne({
        $push: {
          analyses: {
            imageUrl: `/uploads/${filename}`,
            predictions,
            date: new Date(),
          },
        },
      });

      res.json({
        imageUrl: `/uploads/${filename}`,
        predictions,
      });
    } catch (err) {
      console.error("Analysis error:", err);
      res.status(500).json({ error: "Image analysis failed" });
    }
  }
);

export default router;
