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


export type PaginatedUser = Pagination<UserType>;