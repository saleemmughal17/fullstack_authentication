import { NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json(); // role is no longer needed

    console.log(email, password);

    if (!email || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user with hardcoded "USER" role
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: "USER", // Hardcoded role
      },
    });

    return NextResponse.json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Signup error:", error); // Log full error for debugging
    return NextResponse.json(
      { error: "Failed to register user", details: error.message },
      { status: 500 }
    );
  }
}
