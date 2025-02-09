
"use server";

import { z } from "zod";
import { SignInSchema } from "./page";
import { redirect } from "next/navigation";

export async function signUp(
  data: z.infer<typeof SignInSchema> 
) {
  try {
    const response = await fetch(`${process.env.BACKEND_URL!}/api/auth/register`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      return "successful";
    } else {
      const response_data = (await response.json());
      return response_data.description;
    }
  } catch (e: any) {
    console.log(e);
    return "An error has occured please try again";
  }
}
