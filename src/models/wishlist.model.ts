import mongoose, { Document, Schema } from "mongoose";

export interface IWishlist extends Document {
    productId: string,
    productName: string,
    productImage: string,
    userId: string,
}

const wishlistSchema = new Schema<IWishlist>(
    {
        productId: {type: String, required: true},
        productName: {type: String, required: true},
        productImage: {type: String, required: true},
        userId: {type: String, required: true},
    },
    {
        timestamps: true
    }
)

export const Wishlist = mongoose.models.Wishlist || mongoose.model("Wishlist", wishlistSchema);