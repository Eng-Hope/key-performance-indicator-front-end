"use client";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Label } from "@/components/ui/label";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
import SearchInput from "@/app/_components/search_input";
import { getAllUsers } from "../action";
import CustomPagination from "@/components/custom/pagination";

const UserList = () => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [query, setQuery] = useState("");

  const { data, error, isLoading } = useQuery({
    queryKey: ["users", { page, perPage, query }],
    queryFn: () => getAllUsers(page, perPage, query),
  });
  if (error) {
    return (
      <Label className="text-md text-destructive">
        An error has occured please try again
      </Label>
    );
  }

  return (
    <div className="flex flex-col gap-5 pb-[100px] mt-5">
      <div className="flex flex-col gap-3 lg:gap-0 lg:flex-row lg:justify-between lg:items-center">
        <SearchInput
        placeholder="Search for employees by name"
          onChange={(e) => {
            setQuery(e.target.value);
            setPage(1);
          }}
        />
      </div>
      <hr />
      <Label className="font-semibold text-md">
        Users {data?.data && `(${data.total})`}
      </Label>

      {isLoading || data == undefined ? (
        <UserSkeleton />
      ) : error !== null ? (
        <Label className="text-md text-destructive">
          An error has occured please try again
        </Label>
      ) : (
        <div className="flex flex-col gap-10">
          <Table>
      <TableCaption>List of employees {data.total} </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>S/N</TableHead>
       <TableHead>Name</TableHead>
          <TableHead>email</TableHead>
          <TableHead>created at</TableHead>
          <TableHead>updated at</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.data?.map((user, index) => {
          return (
            <TableRow key={user.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell className="font-medium">
                {user.name}
              </TableCell>
              <TableCell className="font-medium">
                {user.email}
              </TableCell>
              <TableCell>{user.created_at.slice(0, 10)}</TableCell>
              <TableCell>
                {user.updated_at.slice(0, 10)}
              </TableCell>
              
            </TableRow>
          );
        })}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={5}>
            <CustomPagination
              setPage={setPage}
              setPerPage={setPerPage}
              perPage={perPage}
              page={page}
              totalPages={data.last_page}
            />
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
        </div>
      )}
    </div>
  );
};

export default UserList;

function UserSkeleton() {
  return (
    <div className="flex flex-col gap-3">
    <Skeleton className="h-9 w-full" />
    <Skeleton className="h-9 w-full" />
    <Skeleton className="h-9 w-full" />
    <Skeleton className="h-9 w-full" />
    <Skeleton className="h-9 w-full" />
  </div>
  );
}