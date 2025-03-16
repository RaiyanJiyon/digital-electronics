import { connectDB } from "@/lib/connectDB";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

// Define the Blog type
interface Blog {
  _id: ObjectId; // Use ObjectId for type safety
  title: string;
  date: string;
  author: string;
  description: string;
  image: string;
}

export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
): Promise<NextResponse> => {
  try {
    // Validate the `id` parameter
    if (!ObjectId.isValid(params.id)) {
      return NextResponse.json(
        { success: false, message: "Invalid 'id' parameter" },
        { status: 400 }
      );
    }

    // Convert the `id` to an ObjectId
    const blogId = new ObjectId(params.id);

    // Connect to the database
    const db = await connectDB();
    const blogsCollection = db.collection("blogs");

    // Fetch the blog by ID
    const result = await blogsCollection.findOne<Blog>({ _id: blogId });

    if (result) {
      // Blog found, return it with a 200 status
      return NextResponse.json(
        { success: true, data: result },
        { status: 200 }
      );
    } else {
      // Blog not found, return a 404 status
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    // Log the error and return a failure response
    console.error("Error fetching blog:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
};