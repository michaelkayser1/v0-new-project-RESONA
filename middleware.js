import { NextResponse } from "next/server"

export function middleware(request) {
  // Only run on API routes
  if (request.nextUrl.pathname.startsWith("/api/")) {
    // Add diagnostic headers to help with debugging
    const headers = new Headers(request.headers)
    headers.set("x-middleware-cache", "no-cache")

    // Return the response with the added headers
    return NextResponse.next({
      request: {
        headers,
      },
    })
  }

  return NextResponse.next()
}

export const config = {
  matcher: "/api/:path*",
}
