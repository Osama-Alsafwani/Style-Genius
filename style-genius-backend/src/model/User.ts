import mongoose, { Schema, Document } from "mongoose";
import { z } from "zod";

// Zod Validation Schema
export const zodUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  stylePreferences: z.array(z.string()).optional(),
});

// TypeScript Interfaces
interface Prediction {
  className: string;
  probability: number;
}

interface Analysis {
  imageUrl: string;
  predictions: Prediction[];
  date: Date;
}

export interface UserDocument extends Document {
  email: string;
  password: string;
  stylePreferences: string[];
  analyses: Analysis[];
}

// Mongoose Schema
const userSchema = new Schema<UserDocument>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  stylePreferences: {
    type: [String],
    default: [],
  },
  analyses: {
    type: [
      {
        imageUrl: String,
        predictions: [
          {
            className: String,
            probability: Number,
          },
        ],
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    default: [],
  },
});

export default mongoose.model<UserDocument>("User", userSchema);
