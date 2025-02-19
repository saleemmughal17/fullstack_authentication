import { NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { sessionOptions } from "../../../../../lib/session";

export async function POST(req: Request) {
  const res = NextResponse.json({ message: "Logout successful" });
  const session = await getIronSession(req, res, sessionOptions);
  session.destroy();
  return res;
}
