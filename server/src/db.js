import mongoose from "mongoose";
import { CONFIG } from "./env.js";

export async function connectDB() {
  mongoose.set("strictQuery", true);
  await mongoose.connect(CONFIG.MONGO_URI, {
    serverSelectionTimeoutMS: 10000
  });
  console.log("✅ Mongo connected");
}
