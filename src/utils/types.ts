import exp from "constants";

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

export type PaginatedUser = Pagination<UserType>;

export type PaginatedDepartment = Pagination<DepartmentType>;

export type PaginatedProject = Pagination<ProjectType>;

export type PaginatedKpi = Pagination<KpiType>;