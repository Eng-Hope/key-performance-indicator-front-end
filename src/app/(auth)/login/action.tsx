"use server";
import { z } from "zod";
import { LoginSchema } from "./page";
import { cookies } from "next/headers";
import { encriptUserDetails } from "@/utils/authentication";


/**
 * login the user
 * @param data 
 * @returns 
 */
export async function login(data: z.infer<typeof LoginSchema>) {
  const cookieStote = await cookies();
  try {
    const response = await fetch(`${process.env.BACKEND_URL!}/api/auth/login`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const token = await response.json();

      //set authentication token to the cookies
      cookieStote.set({
        name: "auth-token",
        secure: process.env.NODE_ENV === "production",
        value: token.token,
        httpOnly: true,
        maxAge: 365 * 24 * 60 * 60,
        expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
      });

      //set token expiration time to the cookies
      cookieStote.set({
        name: "auth-exp",
        secure: process.env.NODE_ENV === "production",
        value: token.exp,
        httpOnly: true,
        maxAge: 365 * 24 * 60 * 60,
        expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
      });

      //encript user details and set them to the cookies
      const details = await encriptUserDetails(token.user);
      cookieStote.set({
        name: "details",
        value: details,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 365 * 24 * 60 * 60,
        expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
      });
      return "login successful";
    } else {
      const response_data = await response.json();
      return response_data.description;
    }
  } catch (e: any) {
    console.log(e);

    return "An error has occured please try again";
  }
}
