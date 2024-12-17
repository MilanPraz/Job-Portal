import { NextRequest, NextResponse } from "next/server";
// import { getLocale } from "./server/utils/locale"; // You might not need this if it's unused
import { handleUnauthorized } from "./server/utils/auth"; // Custom function to handle unauthorized access
import { getSession } from "./server/utils/auth";
// import { getSession } from "./server/utils/auth"; // Assuming this gets the session

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip static file extensions (images, audio, etc.)
  if (/\.(png|svg|jpg|webp|mp3|geojson)$/.test(pathname))
    return NextResponse.next();

  // If accessing /admin, check the session
  if (pathname.startsWith("/admin")) {
    const session = await getSession();

    // If no session, redirect to login or show unauthorized message
    if (!session) {
      return handleUnauthorized(request); // Redirect or handle as needed
    }

    // If session exists, allow access to the admin page
    return NextResponse.next();
  }

  // For non-admin paths, simply allow the request to proceed
  return NextResponse.next();
}

// This ensures the middleware is applied only to paths that are not _next, API, or favicon
export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"],
};
