import mongoose, { Document, Schema } from "mongoose";

// Define the Product interface extending Mongoose Document
export interface IProduct extends Document {
  productName: string;
  category: string;
  price: number;
  availability: string;
  rating: number;
  description: string;
  quantity: number;
  details: string;
  color: string;
  size: string;
  manufacturer: string;
  productTypes: string;
  images: string[];
  email: string;
  phoneNumber: string;
  address: string;
  status: string;
}

// Create the schema
const productSchema = new Schema<IProduct>(
  {
    productName: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    availability: { type: String, required: true },
    rating: { type: Number, required: true },
    description: { type: String, required: true },
    quantity: { type: Number, required: true },
    details: { type: String, required: true },
    color: { type: String, required: true },
    size: { type: String, required: true },
    manufacturer: { type: String, required: true },
    productTypes: { type: String, required: true },
    images: { type: [String], required: true }, // Array of image URLs
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    address: { type: String, required: true },
    status: { type: String, required: true },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Create and export the model
export const Product =
  mongoose.models.Product || mongoose.model<IProduct>("Product", productSchema);
