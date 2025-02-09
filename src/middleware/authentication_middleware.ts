import { isLoggedIn } from "@/utils/authentication";
import { NextRequest, NextResponse } from "next/server";
/**
 * @param request
 * @returns
 */
export async function authenticationMiddleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/home")) {
    if (!(await isLoggedIn())) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  if (request.nextUrl.pathname.startsWith("/login")) {
    if (await isLoggedIn()) {
      return NextResponse.redirect(new URL("/home", request.url));
    }
  }

  return null;
}