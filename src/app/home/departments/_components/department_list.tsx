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
import { useRouter } from "next/navigation";
import CustomPagination from "@/components/custom/pagination";
import { getAllDepartments } from "../actions";
import AddUserToDepartMent from "./add_users";
import NewDepartment from "./new_department_form";

const DepartmentList = () => {
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [query, setQuery] = useState("");
    const router = useRouter();

    const { data, error, isLoading } = useQuery({
        queryKey: ["department", { page, perPage, query }],
        queryFn: () => getAllDepartments(page, perPage, query),
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
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setPage(1);
                    }}
                />
                    <div>
                    <NewDepartment />
                    </div>
                
            </div>
            <hr />
            <Label className="font-semibold text-md">
                Departments {data?.data && `(${data.total})`}
            </Label>

            {isLoading || data == undefined ? (
                <DepartmentSkeleton />
            ) : error !== null ? (
                <Label className="text-md text-destructive">
                    An error has occured please try again
                </Label>
            ) : (
                <div className="flex flex-col gap-10">
                    {data.data.map((department, index) =>
                        <div key={department.id} className="border p-2">
                            <div className="flex w-full items-center self-end">
                                <AddUserToDepartMent department_id={department.id}/>
                            </div>
                            <div className="flex justify-between items-center py-3">
                                <Label> {department.name}</Label>
                                <Label> created at {department.created_at.slice(0, 10)}</Label>
                            </div>

                            {department.users.length > 0 ?
                                    <Table>
                                        <TableCaption>List of users {department.users.length} </TableCaption>
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
                                            {department.users.map((user, index) => {
                                                return (
                                                    <TableRow key={`${department.id}-${user.id}`}>
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
                                    </Table>
                                    : <Label>no employees in {department.name}</Label>
                            }

                        </div>
                    )}
                    <Table>
                    <TableCaption>List of departments {data.total} </TableCaption>

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

export default DepartmentList;

function DepartmentSkeleton() {
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