// /app/api/auth/logout/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { sessionOptions } from "../../../../../lib/session";

export async function POST(req: NextRequest) {
  try {
    const session = await getIronSession(req, NextResponse.next(), sessionOptions);

    if (session) {
      console.log("Destroying session...");
      await session.destroy();
    } else {
      console.warn("No session found!");
    }

    const response = NextResponse.json(
      { success: true, message: "Logged out successfully" },
      { status: 200 }
    );

    // Explicitly clear the session cookie
    response.cookies.set(sessionOptions.cookieName, "", {
      path: "/",
      expires: new Date(0),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    console.log("Session destroyed and cookie cleared.");
    return response;
  } catch (error) {
    console.error("Logout error:", error);

    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error occurred" },
      { status: 500 }
    );
  }
}
