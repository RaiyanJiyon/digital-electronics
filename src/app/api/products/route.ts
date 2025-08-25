import { Product as ProductType } from "@/app/types/types";
import { connectToDB } from "@/lib/connectDB";
import { Product } from "@/models/product.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  // Connect to the database with explicit error handling
  try {
    await connectToDB();
  } catch (dbError) {
    console.error("DB Connection Error:", dbError);
    return NextResponse.json(
      { success: false, message: "Database connection failed" },
      { status: 503 }
    );
  }

  try {
    // Parse the incoming JSON payload
    const body: ProductType = await request.json();

    // Create a new product using Mongoose (no manual validation needed)
    const newProduct = await Product.create(body);

    // Return a success response
    return NextResponse.json({ success: true, data: newProduct }, { status: 201 });
  } catch (err) {
    // Handle Mongoose validation errors
    const error = err as Error;
    if (error.name === "ValidationError") {
      return NextResponse.json(
        {
          success: false,
          message: "Validation Error",
          error: error.message,
        },
        { status: 400 }
      );
    }

    // Log the error and return a failure response
    console.error("Error inserting product:", { error });
    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// Define a type for the query filters
interface ProductQueryFilters {
  price?: {
    $gte?: number;
    $lte?: number;
  };
  rating?: {
    $gte?: number;
  };
  availability?: string;
  manufacturer?: string;
  category?: string;
  $or?: Array<{
    productName?: { $regex: string; $options: string };
    description?: { $regex: string; $options: string };
    category?: { $regex: string; $options: string };
  }>;
}

export async function GET(request: Request) {
  try {
    // Get URL parameters
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "12")
    const minPrice = searchParams.get("minPrice")
    const maxPrice = searchParams.get("maxPrice")
    const rating = searchParams.get("rating")
    const availability = searchParams.get("availability")
    const manufacturer = searchParams.get("manufacturer")
    const category = searchParams.get("category")
    const search = searchParams.get("search")
    const sortBy = searchParams.get("sortBy") || "newest"

    // Calculate skip value for pagination
    const skip = (page - 1) * limit

    // Build query object
    const query: ProductQueryFilters = {}

    // Add filters to query if they exist
    if (minPrice && maxPrice) {
      query.price = { $gte: Number.parseInt(minPrice), $lte: Number.parseInt(maxPrice) }
    } else if (minPrice) {
      query.price = { $gte: Number.parseInt(minPrice) }
    } else if (maxPrice) {
      query.price = { $lte: Number.parseInt(maxPrice) }
    }

    if (rating) {
      query.rating = { $gte: Number.parseFloat(rating) }
    }

    if (availability) {
      query.availability = availability
    }

    if (manufacturer) {
      query.manufacturer = manufacturer
    }

    if (category && category !== "All Categories") {
      query.category = category
    }

    if (search) {
      query.$or = [
        { productName: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } }
      ]
    }

    // Determine sort order
    let sort = {}
    switch (sortBy) {
      case "price_low":
        sort = { price: 1 }
        break
      case "price_high":
        sort = { price: -1 }
        break
      case "rating":
        sort = { rating: -1 }
        break
      case "newest":
      default:
        sort = { createdAt: -1 }
        break
    }

    // Connect to the database
    await connectToDB()

    // Count total products matching the query
    const total = await Product.countDocuments(query)

    // Fetch products with pagination, filtering, and sorting
    const products = await Product.find(query).sort(sort).skip(skip).limit(limit)

    // Return a success response
    return NextResponse.json(
      {
        success: true,
        data: products,
        total,
        page,
        limit,
        hasMore: skip + products.length < total,
      },
      { status: 200 },
    )
  } catch (err) {
    // Handle errors
    const error = err as Error
    console.error("Error fetching products:", error)

    // Return a failure response with a meaningful error message
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch products",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
