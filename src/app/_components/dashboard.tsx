"use client"
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";



import React from 'react'
import { getDashboard } from "../home/actions";

const Dashboard = () => {
    const { data, isLoading } = useQuery({
        queryKey: ["dashboard"],
        queryFn: () => getDashboard(),
      });

      if(isLoading){
        return <DashboardSkeleton />
      }
      
    
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-5 gap-y-10 mt-10">
    <DashboardItem label="Total employees" value={data?.user_count??0}/>
    <DashboardItem label="Projects" value={data?.project_count??0}/>
    <DashboardItem label="kpi count" value={data?.kpi_count??0}/>
    <DashboardItem label="Total departments" value={data?.department_counr??0}/>
</div>
  )
}

export default Dashboard


function DashboardItem({label, value}: {label: string, value: number}){
    return <div className="flex justify-between 
    items-center px-5 lg:px-10 py-10 bg-primary/15 dark:bg-primary/5
     hover:bg-primary/20 dark:hover:bg-primary/10 rounded-md 
     hover:translate-y-[-2px] transition-all duration-200 ease-in">
    <Label>{label}</Label>
    <Label>{value}</Label>
   </div>
}

function DashboardSkeleton() {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-10">
        <Skeleton className="h-[100px] w-full" />
        <Skeleton className="h-[100px] w-full" />
        <Skeleton className="h-[100px] w-full" />
        <Skeleton className="h-[100px] w-full" />
      </div>
    );
  }