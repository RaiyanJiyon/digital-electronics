import mongoose, { Document, Schema } from "mongoose";

export interface ICart extends Document {
    productId: string,
    quantity: number,
    productName: string,
    productImage: string,
    productPrice: number,
    userId: string,
}

const cartSchema = new Schema<ICart>(
    {
        productId: {type: String, required: true},
        quantity: {type: Number, required: true},
        productName: {type: String, required: true},
        productImage: {type: String, required: true},
        productPrice: {type: Number, required: true},
        userId: {type: String, required: true},
    },
    {
        timestamps: true
    }
)

export const Cart = mongoose.models.Cart || mongoose.model("Cart", cartSchema);