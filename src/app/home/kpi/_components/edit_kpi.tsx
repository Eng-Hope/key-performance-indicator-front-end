"use client";
import SubmitButton from "@/app/_components/submitting_button";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Edit, Plus } from "lucide-react";
import { getAllUsers } from "../../employees/action";
import { Skeleton } from "@/components/ui/skeleton";
import { addUserToKpi, editUserKpi } from "../actions";
import FormInput from "@/app/_components/input_field";

export const EditUserKpiSchema = z.object({
  user_id: z.number(),
  kpi_id: z.number(),
  actual: z.string().optional(),
  review: z.string().optional(),
});

const EditUserKpi = ({kpi_id, user_id, actual, review, username}
    : {kpi_id: number, user_id: number, actual?: string, review?: string, username: string }) => {
  const { toast } = useToast();
  const client = useQueryClient();

  const {
    handleSubmit,
    control,
    register,
    formState: { errors, isSubmitting: isLoading },
  } = useForm<z.infer<typeof EditUserKpiSchema>>({
    resolver: zodResolver(EditUserKpiSchema),
    defaultValues: {
        kpi_id,
        user_id,
        actual,
        review,
    }
  });
  const { data, isLoading: dataLoading } = useQuery({
    queryKey: ["users"],
    queryFn: () => getAllUsers(),
  });
  

  const onsubmit = handleSubmit(async (data) => {

    const message = await editUserKpi(data);

    if (message === "successful") {
      toast({
        title: "user added successful ",
        description: message,
      });
      client.invalidateQueries({ queryKey: ["kpi"] });
    } else {
      toast({
        variant: "destructive",
        title: "Error ",
        description: message,
        action: <ToastAction altText="ok">ok</ToastAction>,
      });
    }
  });

  return (
    <div className="w-full h-fit flex justify-between items-center self-end">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline"><Edit className="text-green-600" size={25}/></Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-xl">Edit {username} kpi</DialogTitle>
            <DialogDescription>edit kpi </DialogDescription>
          </DialogHeader>
          {dataLoading || data === undefined?
          <KpiSkeleton />
        :
        <form onSubmit={onsubmit}>
            <div className="flex flex-col gap-4 mt-10">
            <FormInput
                placeholder="Enter review"
                label="Review"
                name="review"
                type="number"
                register={register}
                error={errors.review?.message}
              />
                <FormInput
                placeholder="Enter actual"
                label="Actual"
                name="actual"
                type="text"
                register={register}
                error={errors.actual?.message}
              />

              <SubmitButton loading={isLoading} label="add" />
            </div>
          </form>  
        }
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditUserKpi;


function KpiSkeleton() {
    return (
        <div className="flex flex-col gap-3">
            <Skeleton className="h-9 w-full" />
            <Skeleton className="h-9 w-full" />
        </div>
    );
}