import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  try {
     // Parse the incoming JSON payload
    const body = await request.json();
    const { title, date, author, description, image } = body;

    // Validate the input
    if (!title || !date || !author || !description || !image) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields: 'title', 'content', or 'author'",
        },
        { status: 400 }
      );
    }

      // Connect to the database
    const db = await connectDB();
    const blogsCollection = db.collection('blogs');

    // Insert a single blog into the collection
    const result = await blogsCollection.insertOne({title, date, author, description, image});

    // Return a success response
    return NextResponse.json(
        {success: true, data: {insertedId: result.insertedId}},
        {status: 201}
    )
  } catch (error) {
    console.log(error);
    return NextResponse.json(
        { success: false, message: "Internal Server Error" },
        { status: 500 }
      );
  }
};
