"use server"
import { getToken } from "@/utils/authentication";
import { PerformanceType } from "@/utils/types";


export async function getMyPeformance(
) {
  const access_token = await getToken();

  const response = await fetch(
    `${process.env.BACKEND_URL!}/api/kpi/performance`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
  return (await response.json()) as PerformanceType;
}
