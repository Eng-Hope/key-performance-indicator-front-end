"use client"
import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { getMyPeformance } from '../actions';
import { Skeleton } from '@/components/ui/skeleton';
import { Label } from '@/components/ui/label';
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

const Performance = () => {
    const { data, error, isLoading } = useQuery({
        queryKey: ["kpi"],
        queryFn: () => getMyPeformance(),
      });

   
  if (error) {
    return (
      <Label className="text-md text-destructive">
        An error has occured please try again
      </Label>
    );
  }

  if (isLoading || data === undefined) {
    return <PerformanceSkeleton />;
  }

  let totalWeight = 0;
  let totalReview = 0;

  if (data.kpis && data.kpis.length > 0) {
      for (const kpi of data.kpis) {
          totalWeight += kpi.weight;
          totalReview +=  kpi.pivot?.review || 0;
      }
  }
  return (
  <div className='flex flex-col gap-5 bg-primary/5 mt-10 lg:px-5 lg:py-5'>
      <div className='flex justify-between items-center lg:mx-10'>
      <Label className='text-md font-semibold'>{data.name}</Label>
      <Label className='text-md font-semibold'>{data.email}</Label>
  </div>

  {data.kpis.length > 0? 
    <Table className='border'>
    <TableCaption>List of kpi {data.kpis.length} </TableCaption>
    <TableHeader>
        <TableRow>
            <TableHead>S/N</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>measure</TableHead>
            <TableHead>duration</TableHead>
            <TableHead>tartget</TableHead>
            <TableHead>weight</TableHead>
            <TableHead>actual</TableHead>
            <TableHead>review</TableHead>
        </TableRow>
    </TableHeader>
    <TableBody>
        {data.kpis.map((kpi, index) => {
            return (
                <TableRow key={kpi.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell className="font-medium">
                        {kpi.name}
                    </TableCell>
                    <TableCell className="font-medium">
                        {kpi.measurement}
                    </TableCell>
                    <TableCell className="font-medium">
                        {kpi.review_duration}
                    </TableCell>
                    <TableCell className="font-medium">
                        {kpi.target}
                    </TableCell>
                    <TableCell className="font-medium">
                        {`${kpi.weight} %`}
                    </TableCell>
                    <TableCell>
                        {kpi.pivot?.actual??"-"}
                    </TableCell>
                    <TableCell>
                        {kpi.pivot?.review === null?"-": `${kpi.pivot.review} %`}

                    </TableCell>
                </TableRow>
            );
        })}
    </TableBody>
    <TableFooter>
        <TableRow>
            <TableCell colSpan={5} />
            <TableCell >Total: {totalWeight} %</TableCell>
            <TableCell colSpan={1}/>
            <TableCell>
                Score: {totalReview} %
            </TableCell>
        </TableRow>
    </TableFooter>
</Table>
  
  : <Label className='text-muted-foreground'>No kpi found</Label>}

  </div>
  )
}

export default Performance

function PerformanceSkeleton() {
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