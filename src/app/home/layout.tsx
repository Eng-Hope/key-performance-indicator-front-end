"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import KpiNavBar from "./_components/KpiNavbar";
import KpiSidebar from "./_components/KpiSidebar";
import { useQuery } from "@tanstack/react-query";
import { decriptDetailsFromCookies } from "@/utils/authentication";


const BusinessLayout = ({ children }: { children: React.ReactNode }) => {
     const {data, isLoading, error} = useQuery({queryKey: ["user-details"],
       queryFn: decriptDetailsFromCookies})
  return (
    <SidebarProvider>
      <KpiSidebar role={data?.role??""} isLoading={isLoading}/>
      <div className="w-full px-3">
        <KpiNavBar />
        {children}
      </div>
    </SidebarProvider>
  );
};
export default BusinessLayout;