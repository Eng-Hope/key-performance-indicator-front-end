"use client";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Label } from "@/components/ui/label";

import SearchInput from "@/app/_components/search_input";
import CustomPagination from "@/components/custom/pagination";
import { getAllKpis } from "../actions";
import NewkPI from "./new_kpi_form";
import Kpi from "./kpi";
import {
    Table,
    TableCaption,
    TableCell,
    TableFooter,
    TableRow,
} from "@/components/ui/table";

const KpiList = () => {
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [query, setQuery] = useState("");

    const { data, error, isLoading } = useQuery({
        queryKey: ["kpi", { page, perPage, query }],
        queryFn: () => getAllKpis(page, perPage, query),
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
                placeholder="Search for kpi by name"
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setPage(1);
                    }}
                />
                <div>
                    <NewkPI />
                </div>

            </div>
            <hr />
            <Label className="font-semibold text-md">
                Kpi {data?.data && `(${data.total})`}
            </Label>

            {isLoading || data == undefined ? (
                <KpiSkeleton />
            ) : error !== null ? (
                <Label className="text-md text-destructive">
                    An error has occured please try again
                </Label>
            ) : (
                <div className="flex flex-col gap-10">
                    {data.data.map((kpi) =>
                        <Kpi kpi={kpi} key={kpi.id} />
                    )}
                    <Table>
                        <TableCaption>List of kpi {data.total} </TableCaption>

                        <TableFooter>
                            <TableRow>
                                <TableCell colSpan={3}>
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

export default KpiList;

function KpiSkeleton() {
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