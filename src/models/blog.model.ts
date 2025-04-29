import mongoose, { Document, Schema } from "mongoose";

// Define the Blog interface extending Mongoose Document
export interface IBlog extends Document {
  title: string;
  date: string;
  author: string;
  description: string;
  image: string;
}

// Create the schema
const blogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true },
    date: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

// Create and export the model
export const Blog =
  mongoose.models.Blog || mongoose.model<IBlog>("Blog", blogSchema);
