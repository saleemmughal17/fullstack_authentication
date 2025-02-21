import { NextRequest } from "next/server";

export async function getUserFromSession(req: NextRequest) {
  const session = req.cookies.get("session_token");
  // Add your actual session validation and user fetching logic here
  return { role: "admin" }; // Example mock role, replace with real user data
}
