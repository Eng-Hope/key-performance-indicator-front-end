"use server";
import { cookies } from "next/headers";
import { UserDetails } from "./types";
import { jwtVerify, SignJWT } from "jose";

/**
 * encript user details
 * @param details 
 * @param time 
 * @returns 
 */
export async function encriptUserDetails(details: UserDetails, time = "1y") {
  const Edetails = await new SignJWT({ details })
    .setProtectedHeader({
      alg: "HS256",
    })
    .setExpirationTime(time)
    .sign(new TextEncoder().encode(process.env.JWT_SECRET));
  return Edetails;
}

/**
 * 
 * @returns 
 * return user details from cookies
 */
export async function decriptDetailsFromCookies() {
  try{
  const cookieStote = await cookies();
  const { payload } = await jwtVerify(
    cookieStote.get("details")?.value ?? "",
    new TextEncoder().encode(process.env.JWT_SECRET)
  );
  if (payload === undefined || null) {
    throw Error("no data found");
  }
  return payload.details as UserDetails;
}catch(e){
  console.log(e)
}
}

/**
 * 
 * @returns 
 */
export async function isLoggedIn() {
  const cookieStore = await cookies();
  //check if the user credentials are present in the cookies
  if (
    !cookieStore.has("auth-token")
    || !cookieStore.has("details") 
    || !cookieStore.has("auth-exp")) {
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



/**
 * 
 * @returns 
 * return the access token of the user 
 */
export async function getToken(): Promise<string> {

  //get the token and token expiration time from cookies
  const cookiesStore = await cookies();
  const expString = cookiesStore.get("auth-exp")?.value;
  const token: string | undefined =  cookiesStore.get("auth-token")?.value;

  //check if there is tokens
  if (token && expString) {
    //convert unix expiration to locatime
    const expirationDate = new Date(parseInt(expString) * 1000);
    const now = new Date();

    //if the token is expired then refresh it first and returns
    //new refreshed token
    if (now > expirationDate) {
     const newToken = await refreshToken(token);
     if(newToken === null){
      //logot in case of any error
      logout()
      return '';
     }
    return newToken;

    } else {
      return token
    }
  } else {
    logout();
    return ''
  }
}


async function logout() {
  const cookiesStore = await cookies();
 cookiesStore.delete("auth-token")
 cookiesStore.delete("auth-exp")
 cookiesStore.delete("details")
}

/**
 * 
 * @param access_token 
 * @returns 
 * refresh the token
 */

export async function refreshToken(access_token: string) {
  const cookiesStore = await cookies();

  try{
    const response = await fetch(`${process.env.BACKEND_URL!}/api/auth/refresh`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify({"token": access_token})
    });
    if(response.ok){
     const data = await response.json();
     //set token to the cookies
     cookiesStore.set({
      name: "auth-token",
      secure: process.env.NODE_ENV === "production",
      value: data.token,
      httpOnly: true,
      maxAge: 365 * 24 * 60 * 60,
      expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    });

    //set the expiration time of the new token to the cookies
    cookiesStore.set({
      name: "auth-exp",
      secure: process.env.NODE_ENV === "production",
      value: data.exp,
      httpOnly: true,
      maxAge: 365 * 24 * 60 * 60,
      expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    });
    return data.token as string;
    }
  else{
    return null;
  }
  }
  catch(e){
    console.log(e)
    return null;
  }
}
