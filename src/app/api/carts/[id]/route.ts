import { connectToDB } from "@/lib/connectDB";
import { Cart } from "@/models/cart.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDB();

    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { message: "Missing userId is required" },
        { status: 400 }
      );
    }

    const cartItem = await Cart.find({ userId: id });

    if (cartItem.length === 0) {
      return NextResponse.json(
        { message: "No cart items found" },
        { status: 404 }
      );
    }

    return NextResponse.json(cartItem, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to fetch cart items" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDB();

    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { message: "Missing userId in query" },
        { status: 400 }
      );
    }

    const deleteResult = await Cart.deleteOne({ _id: id });

    if (deleteResult.deletedCount === 0) {
      return NextResponse.json(
        { message: "Cart item not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Cart item has been deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to delete cart item" },
      { status: 500 }
    );
  }
}
