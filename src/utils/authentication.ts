"use server";
import { cookies } from "next/headers";
import { UserDetails } from "./types";
import { jwtVerify, SignJWT } from "jose";

export async function encriptUserDetails(details: UserDetails, time = "1y") {
  const Edetails = await new SignJWT({ details })
    .setProtectedHeader({
      alg: "HS256",
    })
    .setExpirationTime(time)
    .sign(new TextEncoder().encode(process.env.JWT_SECRET));
  return Edetails;
}

export async function decriptDetailsFromCookies() {

    const cookieStote = await cookies();
    const { payload } = await jwtVerify(
      cookieStote.get("details")?.value ?? "",
      new TextEncoder().encode(process.env.JWT_SECRET)
    );
    if(payload === undefined || null){
      throw Error("no data found");
    }
    return payload.details as UserDetails;
}

export async function isLoggedIn() {
  const cookieStore = await cookies();
  if (!cookieStore.has("auth-token") || !cookieStore.has("details")) {
    return false;
  }
  const tokens = cookieStore.get("auth-token")!.value;
  const details = await decriptDetailsFromCookies();
  //ensure there is access in the cookies
  if (tokens != null && details?.email != null && details.name != null) {
    return true;
  }
  return false;
}

export async function getToken(): Promise<string> {
  const cookiesStore = await cookies();
  return cookiesStore.get("auth-token")?.value ?? "";
}
