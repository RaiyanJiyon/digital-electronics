import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { connectToDB } from "@/lib/connectDB";
import { User } from "@/models/user.model";

export const POST = async (request: NextRequest) => {
  try {
    // Parse the incoming JSON payload
    const newUser = await request.json();

    // Validate the payload (optional, as Mongoose handles validation)
    if (!newUser.email || !newUser.password) {
      return new NextResponse(
        JSON.stringify({ message: "Email and password are required." }),
        { status: 400 }
      );
    }

    // Connect to the database
    await connectToDB();

    // Check if the user already exists
    const existingUser = await User.findOne({ email: newUser.email });
    if (existingUser) {
      return new NextResponse(
        JSON.stringify({ message: "User already exists." }),
        { status: 409 }
      );
    }

    // Hash the password
    const hashedPassword = bcrypt.hashSync(newUser.password, 12);

    // Create and save the new user
    const createdUser = await User.create({
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      password: hashedPassword,
      role: "user", // Use one of the allowed roles ("user", "admin", "expert")
    });

    // Return a success response
    return new NextResponse(
      JSON.stringify({
        message: "User registered successfully.",
        userId: createdUser._id,
      }),
      { status: 201 }
    );
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error during user registration:", error);

    // Return a generic error response
    return new NextResponse(
      JSON.stringify({
        message: "An error occurred while registering the user.",
      }),
      { status: 500 }
    );
  }
};