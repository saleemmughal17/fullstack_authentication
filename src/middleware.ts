import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";

interface SessionData {
  user?: {
    role: string;
  };
}

export async function middleware(req: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get("user_session");



  console.log("Token from cookies:", token?.value);
  console.log("Current Path:", req.nextUrl.pathname);



  // Ensure SESSION_SECRET is present
  if (!process.env.SESSION_SECRET) {
    throw new Error("Missing SESSION_SECRET environment variable");
  }

  // Retrieve the session
  const session = await getIronSession<SessionData>(req, new Response(), {
    password: process.env.SESSION_SECRET as string, // Ensure password is correctly provided
    cookieName: "user_session",
  });

  if(!token){
    return NextResponse.redirect(new URL("/login", req.url));

  }

  const userRole = session.user?.role;
  console.log("User Role:", userRole);

  // Redirect based on user role
  if (userRole === "admin" && req.nextUrl.pathname !== "/AdminDashboard") {
    return NextResponse.redirect(new URL("/AdminDashboard", req.url));
  }

  if (userRole === "user" && req.nextUrl.pathname !== "/DashboardUser") {
    return NextResponse.redirect(new URL("/DashboardUser", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/DashboardUser", "/AdminDashboard"], // ✅ Protect these routes
};
// middleware 