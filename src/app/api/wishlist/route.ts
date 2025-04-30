import { connectToDB } from "@/lib/connectDB";
import { Wishlist } from "@/models/wishlist.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    await connectToDB();

    const { productId, productName, productImage, userId } =
      await request.json();
    console.log(productId);
    console.log(productName);
    console.log(productImage);
    console.log(userId);

    // Check if the cart item already exists
    const existingItem = await Wishlist.findOne({ productId, userId });

    if (existingItem) {
      return NextResponse.json(
        { message: "Item already in wishlist" },
        { status: 409 }
      );
    }

    // Create new cart item
    const wishlistItem = await Wishlist.create({
      productId,
      productName,
      productImage,
      userId,
    });

    return NextResponse.json(wishlistItem, { status: 201 });
  } catch (err) {
    const error = err as Error;
    console.log(error.message);
    return NextResponse.json(
      { message: "Failed to create wishlist item" },
      { status: 500 }
    );
  }
}
