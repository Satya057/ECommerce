import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value

  // Public paths that don't require authentication
  const publicPaths = ["/login", "/register"]

  // Check if the path is public
  if (publicPaths.includes(request.nextUrl.pathname)) {
    // If user is logged in and tries to access login/register, redirect to home
    if (token) {
      return NextResponse.redirect(new URL("/", request.url))
    }
    // Allow access to public paths for non-authenticated users
    return NextResponse.next()
  }

  // Protected routes - redirect to login if no token
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}

