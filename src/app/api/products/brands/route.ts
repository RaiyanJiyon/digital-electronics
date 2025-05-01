import { connectToDB } from "@/lib/connectDB";
import { Product } from "@/models/product.model";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Connect to the database
    await connectToDB();

    // Get distinct manufacturers/brands
    const brands = await Product.distinct("manufacturer");

    // Return a success response
    return NextResponse.json({ success: true, brands }, { status: 200 });
  } catch (err) {
    // Handle errors
    const error = err as Error;
    console.error("Error fetching brands:", error);

    // Return a failure response with a meaningful error message
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch brands",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
