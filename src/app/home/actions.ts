"use server"
import { getToken } from "@/utils/authentication"
import { DashbordType } from "@/utils/types";
export async function getDashboard(

) {
  const access_token = await getToken();
  const response = await fetch(
    `${process.env.BACKEND_URL!}/api/dashboard`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
  return (await response.json()) as DashbordType;
}
