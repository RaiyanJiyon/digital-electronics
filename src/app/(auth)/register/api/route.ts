import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

// Define the expected structure of the request payload
interface UserPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string
}

export const POST = async (request: Request) => {
  try {
    // Parse the incoming JSON payload
    const newUser: UserPayload = await request.json();

    // Validate the payload
    if (!newUser.email || !newUser.password) {
      return new NextResponse(
        JSON.stringify({ message: "Email and password are required." }),
        { status: 400 }
      );
    }

    // Connect to the database
    const db = await connectDB();
    const usersCollection = db.collection("users");

    // Check if the user already exists
    const existingUser = await usersCollection.findOne({
      email: newUser.email,
    });
    if (existingUser) {
      return new NextResponse(
        JSON.stringify({ message: "User already exists." }),
        { status: 409 }
      );
    }

    // Hash the password
    const hashedPassword = bcrypt.hashSync(newUser.password, 12);

    // Insert the new user into the database
    const response = await usersCollection.insertOne({
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      password: hashedPassword,
      role: "buyer"
    });

    // Return a success response
    return new NextResponse(
      JSON.stringify({
        message: "User registered successfully.",
        userId: response.insertedId,
      }),
      { status: 201 }
    );
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error during user registration:", error.message);

    // Return a generic error response
    return new NextResponse(
      JSON.stringify({
        message: "An error occurred while registering the user.",
      }),
      { status: 500 }
    );
  }
};
