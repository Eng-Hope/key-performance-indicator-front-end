"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import KpiNavBar from "./_components/KpiNavbar";
import KpiSidebar from "./_components/KpiSidebar";


const BusinessLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <KpiSidebar/>
      <div className="w-full px-3">
        <KpiNavBar />
        {children}
      </div>
    </SidebarProvider>
  );
};
export default BusinessLayout;