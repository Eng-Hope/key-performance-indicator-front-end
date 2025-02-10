
"use server";

import { z } from "zod";
import { SignInSchema } from "./_components/new_user_form";
import { getToken } from "@/utils/authentication";
import { PaginatedUser } from "@/utils/types";

/**
 * sign up the user
 * @param data 
 * @returns 
 */
export async function signUp(
  data: z.infer<typeof SignInSchema> 
) {
  try {
    const access_token = await getToken();
    const response = await fetch(`${process.env.BACKEND_URL!}/api/auth/register`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
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

/**
 * fetch users 
 * @param page 
 * @param perpage 
 * @param query 
 * @returns 
 */
export async function getAllUsers(
  page?: number,
  perpage?: number,
  query?: string
) {
  const access_token = await getToken();

  const response = await fetch(
    `${process.env.BACKEND_URL!}/api/users?size=${perpage}&page=${page}&query=${query}`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
  return (await response.json()) as PaginatedUser;
}