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
import { Plus } from "lucide-react";
import { FormSelect } from "@/app/_components/form_select";
import { getAllUsers } from "../../employees/action";
import { Skeleton } from "@/components/ui/skeleton";
import { addUserToDepartment } from "../actions";

export const AddUserToDepartmentSchema = z.object({
  user_id: z.string().min(1,{ message: "invalid email format" }),
  department_id: z.number()
});

const AddUserToDepartMent = ({department_id}: {department_id: number}) => {
  const { toast } = useToast();
  const client = useQueryClient();

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting: isLoading },
  } = useForm<z.infer<typeof AddUserToDepartmentSchema>>({
    resolver: zodResolver(AddUserToDepartmentSchema),
    defaultValues: {
        department_id
    }
  });
  const { data, isLoading: dataLoading } = useQuery({
    queryKey: ["users"],
    queryFn: () => getAllUsers(),
  });
  

  const onsubmit = handleSubmit(async (data) => {

    const message = await addUserToDepartment(data);

    if (message === "successful") {
      toast({
        title: "user added successful ",
        description: message,
      });
      client.invalidateQueries({ queryKey: ["department"] });
      client.invalidateQueries({ queryKey: ["dashboard"] });

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
          <Button variant="outline"><Plus className="text-green-600" />new employee</Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-xl">Add employee</DialogTitle>
            <DialogDescription>add to department </DialogDescription>
          </DialogHeader>
          {dataLoading || data === undefined?
          <DepartmentSkeleton />
        :
        <form onSubmit={onsubmit}>
            <div className="flex flex-col gap-1 mt-10">
                <FormSelect name="user_id"
                 control={control} label="Select user"
                 error={errors.user_id?.message}
               items={data.data?.map(user => ({ label: user.email, value: user.id.toString() }))}
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

export default AddUserToDepartMent;


function DepartmentSkeleton() {
    return (
        <div className="flex flex-col gap-3">
            <Skeleton className="h-9 w-full" />
            <Skeleton className="h-9 w-full" />
        </div>
    );
}