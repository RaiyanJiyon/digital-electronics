import mongoose, { Document, Schema } from "mongoose";

// Define the Blog interface extending Mongoose Document
export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
}

// Create the schema
const userSchema = new Schema<IUser>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      require: true,
      enum: ["user", "admin", "expert"],
      default: "user", // Set default role
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create and export the model
export const User =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);
