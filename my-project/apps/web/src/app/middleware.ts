import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Middleware for User and Admin
export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value; // Get JWT from cookies
  const pathname = request.nextUrl.pathname;
  // console.log("token:", token);

  // Public routes (visible to everyone)
  if (pathname === "/" || pathname === "/auth/:path") {
    return NextResponse.next();
  }

  // If no token, redirect to login
  if (!token) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}
// Apply Middleware only to secure routes
export const config = {
  matcher: ["/user/:path*", "/admin/:path*"], // Protect these routes
};
