import { connectToDB } from "@/lib/connectDB";
import { Wishlist } from "@/models/wishlist.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { message: "Missing userId in query" },
        { status: 400 }
      );
    }

    const wishlistItem = await Wishlist.find({ userId: id });

    if (wishlistItem.length === 0) {
      return NextResponse.json(
        { message: "No wishlist items found" },
        { status: 404 }
      );
    }

    return NextResponse.json(wishlistItem, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to fetch wishlist items" },
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

    const deleteResult = await Wishlist.deleteOne({ _id: id });

    if (deleteResult.deletedCount === 0) {
      return NextResponse.json(
        { message: "Wishlist item not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Wishlist item has been deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to delete wishlist item" },
      { status: 500 }
    );
  }
}
