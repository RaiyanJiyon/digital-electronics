import { connectToDB } from "@/lib/connectDB";
import { Blog } from "@/models/blog.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Connect to the database
    await connectToDB();

    // Extract the `id` parameter from the URL
    const { id } = await params;

    // Validate the `id`
    if (!id) {
      return NextResponse.json(
        { error: "Blog ID is required" },
        { status: 400 }
      );
    }

    // Fetch the blog by ID
    const blog = await Blog.findById(id);

    // If no blog is found, return a 404 response
    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    // Return the blog data
    return NextResponse.json(blog);
  } catch (error) {
    // Log the error for debugging
    console.error("Error fetching blog:", error);

    // Return a generic error message with a 500 status code
    return NextResponse.json(
      { error: "Failed to fetch blog" },
      { status: 500 }
    );
  }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
  ) {
    try {
      // Connect to the database
      await connectToDB();
  
      // Extract the `id` parameter from the URL
      const { id } = await params;
  
      // Validate the `id`
      if (!id) {
        return NextResponse.json(
          { success: false, message: "Blog ID is required" },
          { status: 400 }
        );
      }
  
      // Delete the blog by ID
      const deletedBlog = await Blog.findByIdAndDelete(id);
  
      // If no blog is found, return a 404 response
      if (!deletedBlog) {
        return NextResponse.json(
          { success: false, message: "Blog not found" },
          { status: 404 }
        );
      }
  
      // Return a success response
      return NextResponse.json(
        { success: true, message: "Blog deleted successfully" },
        { status: 200 }
      );
    } catch (error) {
      // Log the error for debugging
      console.error("Error deleting blog:", error);
  
      // Return a generic error message with a 500 status code
      return NextResponse.json(
        {
          success: false,
          message: "Failed to delete blog",
          error: error instanceof Error ? error.message : "Unknown error",
        },
        { status: 500 }
      );
    }
  }