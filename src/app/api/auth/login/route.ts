import { NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";
import bcrypt from "bcrypt";
import { getIronSession } from "iron-session";
import { sessionOptions } from "../../../../../lib/session";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    
    // Find user in database
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Set session
    const res = NextResponse.json({
      message: "Login successful",
      role: user.role,
    });

    const session = await getIronSession(req, res, sessionOptions);
    session.user = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    await session.save();

    return res;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
