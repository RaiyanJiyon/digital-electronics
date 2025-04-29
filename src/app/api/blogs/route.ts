import { Blog as BlogType } from "@/app/types/types";
import { connectToDB } from "@/lib/connectDB";
import { Blog } from "@/models/blog.model";
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
    const body: BlogType = await request.json();

    // Create a new blog using Mongoose (no manual validation needed)
    const newBlog = await Blog.create(body);

    // Return a success response
    return NextResponse.json({ success: true, data: newBlog }, { status: 201 });
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
    console.error("Error inserting blog:", { error });
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

export async function GET() {
  try {
    // Connect to the database
    await connectToDB();

    // Fetch all blogs, sorted by createdAt in descending order (newest first)
    const blogs = await Blog.find().sort({ createdAt: -1 });

    // Return a success response
    return NextResponse.json(
      { success: true, data: blogs },
      { status: 200 }
    );
  } catch (err) {
    // Handle errors
    const error = err as Error;
    console.error("Error fetching blogs:", error);

    // Return a failure response with a meaningful error message
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch blogs",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}