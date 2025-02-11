
import {
  decriptDetailsFromCookies,
} from "@/utils/authentication";
import { NextRequest, NextResponse } from "next/server";

/**
 * check if the user has the permission to visit the requested route
 * @param request
 * @returns
 */
export async function authorizationMiddleware(request: NextRequest) {
  const url = request.nextUrl.pathname;
  const details = await decriptDetailsFromCookies();

  console.log("details", details, "url", url)

  const response = NextResponse.redirect(
    new URL("/permission-rejected", request.url)
  );

  if (!url.startsWith("/home")) {
    return null;
  }

  if ((url === "/home") || (url === "/home/performance") || (url === "/home/auth/logout")) {
    return null;
  }

  if(details === undefined){
    return response;
  }

  if(details.role !== "admin"){
    return response;
 }

  return null;
}