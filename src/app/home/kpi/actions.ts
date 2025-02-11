"use server"

import { getToken } from "@/utils/authentication";
import {PaginatedKpi } from "@/utils/types";
import { z } from "zod";
import { NewKpiSchema } from "./_components/new_kpi_form";
import { AddUserToKpiSchema } from "./_components/add_users";
import { EditUserKpiSchema } from "./_components/edit_kpi";

export async function getAllKpis(
  page?: number,
  perpage?: number,
  query?: string
) {
  const access_token = await getToken();

  const response = await fetch(
    `${process.env.BACKEND_URL!}/api/kpi?size=${perpage}&page=${page}&query=${query}`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
  return (await response.json()) as PaginatedKpi;
}


export async function addUserToKpi(
  data: z.infer<typeof AddUserToKpiSchema> 
) {
  try {
    const access_token = await getToken();
    const response = await fetch(`${process.env.BACKEND_URL!}/api/kpi/add-users`, {
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
  } catch (e) {
    console.log(e);
    return "An error has occured please try again";
  }
}


export async function addNewKpi(
    data: z.infer<typeof NewKpiSchema> 
  ) {
    try {
      const access_token = await getToken();
      const response = await fetch(`${process.env.BACKEND_URL!}/api/kpi`, {
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
    } catch (e) {
      console.log(e);
      return "An error has occured please try again";
    }
  }





export async function editUserKpi(
    data: z.infer<typeof EditUserKpiSchema> 
  ) {
    try {
      const access_token = await getToken();
      const response = await fetch(`${process.env.BACKEND_URL!}/api/kpi`, {
        method: "PUT",
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
    } catch (e) {
      console.log(e);
      return "An error has occured please try again";
    }
  }