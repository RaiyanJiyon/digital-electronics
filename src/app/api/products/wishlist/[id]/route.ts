import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

// Define the POST API for Wishlist
export const POST = async (request: Request): Promise<NextResponse> => {
    try {
      // Parse the request body
      const body = await request.json();
      const { productId, userId } = body;
  
      // Validate required fields
      if (!productId) {
        return NextResponse.json(
          { message: "Product ID is required" },
          { status: 400 }
        );
      }
  
      // Connect to the database
      const db = await connectDB();
  
      // Fetch the product from the database
      const productsCollection = db.collection("products");
      const product = await productsCollection.findOne({ _id: productId });
  
      if (!product) {
        return NextResponse.json(
          { message: "Product not found" },
          { status: 404 }
        );
      }
  
      // Insert the product into the wishlist collection
      const wishlistCollection = db.collection("wishlist");
  
      // Check if the product is already in the wishlist (optional)
      const existingItem = await wishlistCollection.findOne({
        productId,
        userId, // Optional: Include userId if users are authenticated
      });
  
      if (existingItem) {
        return NextResponse.json(
          { message: "Product already in wishlist" },
          { status: 409 }
        );
      }
  
      // Add the product to the wishlist
      const newItem = {
        productId,
        userId, // Optional: Include userId if users are authenticated
        addedAt: new Date(),
      };
  
      const result = await wishlistCollection.insertOne(newItem);
  
      // Return success response
      return NextResponse.json(
        { message: "Product added to wishlist successfully", wishlistItem: newItem },
        { status: 201 }
      );
    } catch (error) {
      console.error("Error adding product to wishlist:", error);
  
      // Return error response
      return NextResponse.json(
        { message: "An error occurred while adding the product to the wishlist" },
        { status: 500 }
      );
    }
  };