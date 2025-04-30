import { connectToDB } from "@/lib/connectDB";
import { Cart } from "@/models/cart.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    await connectToDB();

    const {
      productId,
      quantity,
      productName,
      productImage,
      productPrice,
      userId,
    } = await request.json();
    console.log(productId);
    console.log(quantity);
    console.log(productName);
    console.log(productImage);
    console.log(productPrice);
    console.log(userId);

    const cartItem = await Cart.create({
      productId,
      quantity,
      productName,
      productImage,
      productPrice,
      userId,
    });

    return NextResponse.json(cartItem, { status: 201 });
  } catch (err) {
    const error = err as Error;
    console.log(error.message);
    return NextResponse.json(
      { message: "Failed to create cart item" },
      { status: 500 }
    );
  }
}
