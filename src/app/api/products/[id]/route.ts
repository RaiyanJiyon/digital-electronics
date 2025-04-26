import { connectDB } from "@/lib/connectDB";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";


// Define the GET API
export const GET = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params; // Extract the product ID from the URL parameters

    // Validate the ObjectId
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid product ID" },
        { status: 400 }
      );
    }

    // Connect to the database
    const db = await connectDB();
    const productsCollection = db.collection("products");

    // Find the product with the specified ID
    const result = await productsCollection.findOne({
      _id: new ObjectId(id),
    });

    // Check if the product was found
    if (!result) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    // Return success response with the product data
    return NextResponse.json(
      { success: true, data: result },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching product:", error);

    // Return error response
    return NextResponse.json(
      { success: false, message: "An error occurred while fetching the product" },
      { status: 500 }
    );
  }
};

// Define the DELETE API
export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    console.log(params);
    const { id } = params; // Extract the product ID from the URL parameters

    // Validate the ObjectId
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid product ID" },
        { status: 400 }
      );
    }

    // Connect to the database
    const db = await connectDB();
    const productsCollection = db.collection("products");

    // Delete the product with the specified ID
    const result = await productsCollection.deleteOne({
      _id: new ObjectId(id),
    });

    // Check if the product was found and deleted
    if (result.deletedCount === 0) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    // Return success response
    return NextResponse.json(
      { message: "Product deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting product:", error);

    // Return error response
    return NextResponse.json(
      { message: "An error occurred while deleting the product" },
      { status: 500 }
    );
  }
};
