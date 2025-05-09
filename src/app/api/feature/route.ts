import { connectToDB } from "@/lib/connectDB";
import { Product } from "@/models/product.model";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDB();

    // Fetch products with exact rating of 5
    const featureProducts = await Product.find({ rating: 4.5 });

    // Return a success response
    return NextResponse.json(
      { success: true, data: featureProducts },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching featured products:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
