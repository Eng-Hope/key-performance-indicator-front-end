import { getToken } from "@/utils/authentication";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const cookieStote = await cookies();
  const access_token = await getToken();
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL!}/api/auth/logout`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    if (response.ok) {
      cookieStote.delete("auth-token");
      cookieStote.delete("details");
      return NextResponse.json(true);
    } else {
      console.log(response);
      throw Error("arror durring logout");
    }
  } catch (e: any) {
    throw e;
  }
}
