import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";


export async function middleware(req: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_session");



  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }




  return NextResponse.next();
}

export const config = {
  matcher: [
    "/DashboardUser",
     "/admin",
     "/jobs","/addJob","/applications","/applicationlist","/api/applications","/api/getapplication","/api/jobs","/api/update2"], 
};