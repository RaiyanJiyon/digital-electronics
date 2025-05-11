import { connectToDB } from "@/lib/connectDB";
import { Product } from "@/models/product.model";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDB();

    // Find all products with category "Smartphones"
    const smartphoneProducts = await Product.find({
      category: "Smartphones",
    });

    return NextResponse.json(smartphoneProducts);
  } catch (error) {
    console.error("Error fetching smartphone products:", error);
    return NextResponse.json(
      { error: "Failed to fetch smartphone products" },
      { status: 500 }
    );
  }
}
