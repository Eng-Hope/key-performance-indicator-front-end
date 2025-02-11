import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email({ message: "invalid email format" }),
  password: z
    .string()
    .min(6, { message: "password must contain atleast 6 characters" }),
});
export type UserDetails = {
  name: string;
  email: string;
  role: string;
};
export enum TOKEN_TYPE {
  ACCESS = "ACCESS",
  REFRESH = "REFRESH",
}


export interface Pagination<T> {
  data: T[];
    total: number;
    last_page: number;
}

export type UserType = {
  id: number,
  name: string,
  email: string,
  created_at: string,
  updated_at: string
}

export type DepartmentType = {
  id: number;
  name: string;
  created_at: string;
  users: UserType[]
}


export type ProjectType = {
  id: number;
  name: string;
  start_date: string;
  end_date: string | null;
  description: string | null;
  created_at: string;
  users: UserType[]
}


export type KpiType = {
  
    id: number,
    name: string,
    measurement: string,
    review_duration: string,
    target: string,
    weight: number,
    created_at: string,
    updated_at:string,
    users: {
          id: number,
          name: string,
          email: string,
            pivot: {
                review: string | null,
                actual: number | null,
                created_at: string,
                updated_at: string
            }
        }[]
}


export type PerformanceType = {
  id: number,
  name: string,
  email: string,
    kpis: 
        {
          id: number,
    name: string,
    measurement: string,
    review_duration: string,
    target: string,
    weight: number,
    created_at: string,
    updated_at:string,
            pivot: {
              review: number | null,
              actual: string | null,
              created_at: string,
              updated_at: string
            }
        }[]
}

export type DashbordType = {
    user_count: number,
    project_count: number,
    department_counr: number,
    kpi_count: number
}

export type PaginatedUser = Pagination<UserType>;

export type PaginatedDepartment = Pagination<DepartmentType>;

export type PaginatedProject = Pagination<ProjectType>;

export type PaginatedKpi = Pagination<KpiType>;