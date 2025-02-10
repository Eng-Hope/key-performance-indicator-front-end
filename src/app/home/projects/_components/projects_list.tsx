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
import CustomPagination from "@/components/custom/pagination";
import { getAllProjects } from "../actions";
import NewProject from "./new_project_form";
import AddUserToProject from "./add_users";

const ProjectList = () => {
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [query, setQuery] = useState("");

    const { data, error, isLoading } = useQuery({
        queryKey: ["project", { page, perPage, query }],
        queryFn: () => getAllProjects(page, perPage, query),
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
                placeholder="Search for project by name"
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setPage(1);
                    }}
                />
                <div>
                    <NewProject />
                </div>

            </div>
            <hr />
            <Label className="font-semibold text-md">
                Project {data?.data && `(${data.total})`}
            </Label>

            {isLoading || data == undefined ? (
                <ProjectSkeleton />
            ) : error !== null ? (
                <Label className="text-md text-destructive">
                    An error has occured please try again
                </Label>
            ) : (
                <div className="flex flex-col gap-10">
                    {data.data.map((project, index) =>
                        <div key={project.id} className="border p-2 flex flex-col gap-5">
                       <div>
                       <div className="flex w-full items-center self-end">
                                <AddUserToProject project_id={project.id} />
                            </div>
                            <div className="flex justify-between items-center py-3 px-5">
                                <Label> {project.name}</Label>
                               <div className="flex flex-col gap-3">
                               <Label> start {project.start_date.slice(0, 10)}</Label>
                               <Label> end {project.end_date === null? "-":project.end_date.slice(0, 10)}</Label>
                               </div>
                            </div>

                            <div className="text-center">
                                <Label className="text-muted-foreground">{project.description}</Label>
                            </div>
                       </div>

                            {project.users.length > 0 ?
                                <Table>
                                    <TableCaption>List of users {project.users.length} </TableCaption>
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
                                        {project.users.map((user, index) => {
                                            return (
                                                <TableRow key={`${project.id}-${user.id}`}>
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
                                : <Label className="text-muted-foreground">no employees in {project.name}</Label>
                            }

                        </div>
                    )}
                    <Table>
                        <TableCaption>List of project {data.total} </TableCaption>

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

export default ProjectList;

function ProjectSkeleton() {
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