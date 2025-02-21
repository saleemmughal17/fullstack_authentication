import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";
import bcrypt from "bcrypt";

// Define interface for expected body
interface CreateUserRequest {
  email: string;
  password: string;
  name: string;
}

export async function POST(req: Request) {
  try {
    // Parse JSON from the request body
    const { email, password, name }: CreateUserRequest = await req.json();

    console.log('Received email, password, and name:', email, password, name);

    // Check if the required fields are provided
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Attempt to create a new user in the database with a hardcoded "USER" role
    const user = await prisma.user.create({
      data: {
        name, // name is correctly defined in your schema
        email,
        password: hashedPassword,
        role: "USER", // Hardcoded role for now
      },
    });

    // Return success response
    return NextResponse.json({ message: "User registered successfully" });

  } catch (error) {
    // Log full error for better debugging
    console.error("Signup error:", error);

    // Handle different types of errors
    if (error instanceof Error) {
      return NextResponse.json(
        { error: "Failed to register user", details: error.message },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        { error: "Unknown error occurred", details: JSON.stringify(error) },
        { status: 500 }
      );
    }
  }
}
