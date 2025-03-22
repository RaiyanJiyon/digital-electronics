import { connectDB } from "@/lib/connectDB";
import { Product } from "@/lib/types";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

// Define the POST API
export const POST = async (request: Request): Promise<NextResponse> => {
  try {
    const body: Product = await request.json();
    const {
      product_name,
      category,
      price,
      availability = "In stock",
      rating,
      description,
      quantity,
      details,
      color,
      size,
      manufacturer,
      product_types,
      images,
      email,
      phone_number,
      address,
    } = body;

    // Validate required fields
    if (
      !product_name ||
      !category ||
      !price ||
      !rating ||
      !description ||
      !quantity ||
      !details ||
      !color ||
      !size ||
      !manufacturer ||
      !product_types ||
      !Array.isArray(images) ||
      images.length === 0 ||
      !email ||
      !phone_number ||
      !address
    ) {
      return NextResponse.json(
        { message: "Invalid or missing fields in the request body" },
        { status: 400 }
      );
    }

    // Validate price and rating
    if (typeof price !== "number" || price <= 0) {
      return NextResponse.json(
        { message: "Price must be a positive number" },
        { status: 400 }
      );
    }
    if (typeof rating !== "number" || rating < 1 || rating > 5) {
      return NextResponse.json(
        { message: "Rating must be between 1 and 5" },
        { status: 400 }
      );
    }

    // Validate image URLs
    if (!images.every((url) => isValidUrl(url))) {
      return NextResponse.json(
        { message: "Invalid image URL(s)" },
        { status: 400 }
      );
    }

    // Connect to the database
    const db = await connectDB();
    const productsCollection = db.collection("products");

    // Insert the new product
    const newProduct = {
      product_name,
      category,
      price,
      availability,
      rating,
      description,
      quantity,
      details,
      color,
      size,
      manufacturer,
      product_types,
      images,
      email,
      phone_number,
      address,
    };

    const result = await productsCollection.insertOne(newProduct);

    // Return success response
    return NextResponse.json(
      { message: "Product added successfully", product: newProduct },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding product:", error);

    // Return error response
    return NextResponse.json(
      { message: "An error occurred while adding the product" },
      { status: 500 }
    );
  }
};

// Define the GET API
export const GET = async (request: Request) => {
    try {
        // Parse query parameters for pagination (optional)
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get("page") || "1", 10);
        const limit = parseInt(searchParams.get("limit") || "10", 10);

        // Connect to the database
        const db = await connectDB();
        const productsCollection = db.collection("products");

        // Calculate skip value for pagination
        const skip = (page - 1) * limit;

        // Fetch products with pagination
        const result: Product[] = await productsCollection
            .find()
            .skip(skip)
            .limit(limit)
            .toArray();

        // Get total count of products
        const total = await productsCollection.countDocuments();

        // Return success response
        return NextResponse.json(
            { success: true, data: result, total, page, limit },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching products:", error);

        // Return error response
        return NextResponse.json(
            { success: false, message: "An error occurred while fetching products" },
            { status: 500 }
        );
    }
};
