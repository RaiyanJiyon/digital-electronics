import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

// Define the Blog interface
interface Blog {
  _id?: string; // Optional because MongoDB generates this field
  title: string;
  date: string;
  author: string;
  description: string;
  image: string;
}

export const GET = async (): Promise<NextResponse> => {
  try {
    // Connect to the database
    const db = await connectDB();
    const blogsCollection = db.collection("blogs");

    // Fetch all blogs
    const result: Blog[] = await blogsCollection.find().toArray();

    // Check if any blogs were found
    if (result.length > 0) {
      return NextResponse.json(
        { success: true, data: result },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { success: false, message: "No blogs found" },
        { status: 404 }
      );
    }
  } catch (error) {
    // Log the error and return a failure response
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
};

export const POST = async (request: Request): Promise<NextResponse> => {
  try {
    // Parse the incoming JSON payload
    const body: Blog = await request.json();

    // Validate the input
    if (!body.title || !body.date || !body.author || !body.description || !body.image) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields: 'title', 'date', 'author', 'description', or 'image'",
        },
        { status: 400 }
      );
    }

    // Connect to the database
    const db = await connectDB();
    const blogsCollection = db.collection("blogs");

    // Insert a single blog into the collection
    const result = await blogsCollection.insertOne(body);

    // Return a success response
    return NextResponse.json(
      { success: true, data: { insertedId: result.insertedId } },
      { status: 201 }
    );
  } catch (error) {
    // Log the error and return a failure response
    console.error("Error inserting blog:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
};