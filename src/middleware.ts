import { NextRequest, NextResponse } from "next/server";
import { authenticationMiddleware } from "./middleware/authentication_middleware";
import { authorizationMiddleware } from "./middleware/authorization_middleware";

export default async function middleware(request: NextRequest) {
  const authentication = await authenticationMiddleware(request);
  if (authentication != null) {
    return authentication;
  }

  if (request.nextUrl.pathname.startsWith("/home")) {
    const authorization = await authorizationMiddleware(request);
    if (authorization != null) {
      return authorization;
    }
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};