// lib/mongoose/connect.ts
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "";

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

let isConnected = false;

export const connectToDB = async () => {
  if (isConnected) return;

  try {
    await mongoose.connect(MONGODB_URI, {
      dbName: "digital-electronics",
      bufferCommands: false,
    });
    isConnected = true;
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    throw err;
  }
};