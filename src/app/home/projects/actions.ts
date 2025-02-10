"use server"

import { getToken } from "@/utils/authentication";
import {PaginatedProject } from "@/utils/types";
import { z } from "zod";
import { NewProjectSchema } from "./_components/new_project_form";
import { AddUserToProjectSchema } from "./_components/add_users";

export async function getAllProjects(
  page?: number,
  perpage?: number,
  query?: string
) {
  const access_token = await getToken();

  const response = await fetch(
    `${process.env.BACKEND_URL!}/api/project?size=${perpage}&page=${page}&query=${query}`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
  return (await response.json()) as PaginatedProject;
}


export async function addUserToProject(
  data: z.infer<typeof AddUserToProjectSchema> 
) {
  try {
    const access_token = await getToken();
    const response = await fetch(`${process.env.BACKEND_URL!}/api/project/add-users`, {
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


export async function addNewProject(
    data: z.infer<typeof NewProjectSchema> 
  ) {
    try {
      const access_token = await getToken();
      const response = await fetch(`${process.env.BACKEND_URL!}/api/project`, {
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