"use client";
import React, { Dispatch, SetStateAction } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Check, X } from "lucide-react";

type PerPagesType = {
  value: number;
  label: string;
};

const perPagesDefaut = [
  {
    value: 5,
    label: "5",
  },
  {
    value: 10,
    label: "10",
  },
  {
    value: 15,
    label: "15",
  },
  {
    value: 20,
    label: "20",
  },
  {
    value: 25,
    label: "25",
  },
];

export default function CustomPagination({
  page,
  perPage,
  totalPages,
  setPage,
  setPerPage,
}: {
  page: number;
  perPage: number;
  totalPages: number;
  perPages?: PerPagesType[];
  setPage: Dispatch<SetStateAction<number>>,
  setPerPage: Dispatch<SetStateAction<number>>,
}) {


  return (
    <div className="flex justify-center items-center gap-3">
      <Pagination className="w-fit">
        <PaginationContent>
          <PaginationItem>
            <CustomPaginationLink
              isActive={1 === page}
              onClick={()=>setPage(1)}
            >
              {1}
            </CustomPaginationLink>
          </PaginationItem>
          {page > 3 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          {generatePaginationNumbers(page, totalPages).map((number, index) => (
            <PaginationItem key={index}>
              <CustomPaginationLink
              onClick={()=> setPage(number)}
                isActive={number === page}
              >
                {number}
              </CustomPaginationLink>
            </PaginationItem>
          ))}
          {totalPages - page >= 3 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          <PaginationItem>
            {totalPages != 1 && (
              <CustomPaginationLink
                onClick={()=> setPage(totalPages)}
                isActive={page === totalPages}
              >
                {totalPages}
              </CustomPaginationLink>
            )}
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      <Label>
        {" "}
        {page}/{totalPages} pages
      </Label>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">perPagaes</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Per Pages Options</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <div className="flex flex-col gap-3">
            {perPagesDefaut.map((pageDefault, index) => (
              <Label className="flex gap-3 items-center"
                key={index}
                onClick={()=>setPerPage(pageDefault.value)}
              >
                {pageDefault.value === perPage?
                 <Check size={15} />: <X className="text-destructive" size={15} />}
                {pageDefault.label}
              </Label>
            ))}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}


function CustomPaginationLink({isActive, children, onClick}: {isActive: boolean, children: React.ReactNode, onClick?: React.MouseEventHandler<HTMLDivElement> | undefined}){
    return <div className={`cursor-pointer w-8 h-8 ${isActive? 'bg-background': 'bg-background/40'} rounded-lg flex items-center justify-center`} onClick={onClick}>{children}</div>
}



function generatePaginationNumbers(
  currentPage: number,
  totalPages: number
): number[] {
  const result: Set<number> = new Set();
  const pageCount = 5; // Total pages to display (including the current page)

  // Ensure currentPage is within valid bounds
  if (currentPage < 1) currentPage = 1;
  if (currentPage > totalPages) currentPage = totalPages;

  // Calculate the range of pages to show
  const halfRange = Math.floor(pageCount / 2);
  let startPage = Math.max(1, currentPage - halfRange);
  let endPage = Math.min(totalPages, currentPage + halfRange);

  // Adjust if we don't have enough pages on either side
  if (endPage - startPage < pageCount - 1) {
    if (startPage === 1) {
      endPage = Math.min(totalPages, startPage + pageCount - 1);
    } else if (endPage === totalPages) {
      startPage = Math.max(1, endPage - (pageCount - 1));
    }
  }

  // Collect the pages into the result
  for (let page = startPage; page <= endPage; page++) {
    result.add(page);
  }

  // Convert the set to an array and return it, sorted
  return Array.from(result)
    .sort((a, b) => a - b)
    .slice(1, -1);
}