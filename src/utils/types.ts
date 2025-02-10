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


export type PaginatedUser = Pagination<UserType>;

export type PaginatedDepartment = Pagination<DepartmentType>;

export type PaginatedProject = Pagination<ProjectType>;