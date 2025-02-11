"use server"

import { getToken } from "@/utils/authentication";
import { PaginatedDepartment } from "@/utils/types";
import { z } from "zod";
import { AddUserToDepartmentSchema } from "./_components/add_users";
import { NewDepartmentSchema } from "./_components/new_department_form";

export async function getAllDepartments(
  page?: number,
  perpage?: number,
  query?: string
) {
  const access_token = await getToken();

  const response = await fetch(
    `${process.env.BACKEND_URL!}/api/department?size=${perpage}&page=${page}&query=${query}`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
  return (await response.json()) as PaginatedDepartment;
}


export async function addUserToDepartment(
  data: z.infer<typeof AddUserToDepartmentSchema> 
) {
  try {
    const access_token = await getToken();
    const response = await fetch(`${process.env.BACKEND_URL!}/api/department/add-users`, {
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


export async function addNewDepartment(
    data: z.infer<typeof NewDepartmentSchema> 
  ) {
    try {
      const access_token = await getToken();
      const response = await fetch(`${process.env.BACKEND_URL!}/api/department`, {
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