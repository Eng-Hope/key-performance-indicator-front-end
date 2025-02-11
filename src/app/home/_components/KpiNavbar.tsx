import Logo from "@/app/_components/logo";
import { ThemeSwitcher } from "@/components/theme_switcher";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { UserDetails } from "@/utils/types";
import { decriptDetailsFromCookies } from "@/utils/authentication";

const KpiNavBar = () => {
   const {data, isLoading, error} = useQuery({queryKey: ["user-details"],
     queryFn: decriptDetailsFromCookies})
  return (
    <nav className="flex w-full items-end mb-3">
      <SidebarTrigger />
      <div className="w-full flex justify-center content-center ">
        <Label className="text-md lg:text-xl font-bold">
          {isLoading ? (
            <Skeleton className="h-6 w-[200px]" />
          ) :  data === undefined? "": `Welcome ${data?.name}`}
        </Label>
      </div>
      <div className="ml-auto flex items-center gap-10 mr-0 mt-2 lg:mr-5 w-fit">
        <ThemeSwitcher />
        <Logo className="hidden lg:flex" />
      </div>
    </nav>
  );
};

export default KpiNavBar;