import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { sessionOptions} from "../lib/session";


export async function middleware(req: NextRequest) {

  let res = NextResponse.next()
  const cookieStore = await cookies();

  const session = await getIronSession(req, res, sessionOptions);

  const token = cookieStore.get("auth_session");

  
  console.log(session.user)

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  const { pathname } = req.nextUrl;
   if (pathname.startsWith('/admin') && session.user.role !== 'Admin') {
    return NextResponse.redirect(new URL('/DashboardUser', req.url));
  }




  return NextResponse.next();
}

export const config = {
  matcher: [
    "/DashboardUser",
     "/admin",
     "/jobs/:path*","/addJob","/applications","/applicationlist","/api/applications","/api/getapplication","/api/jobs","/api/update2"], 
};