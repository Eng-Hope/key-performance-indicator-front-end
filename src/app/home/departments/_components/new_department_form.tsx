"use client";
import FormInput from "@/app/_components/input_field";
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
import { useQueryClient } from "@tanstack/react-query";
import { addNewDepartment } from "../actions";

export const NewDepartmentSchema = z.object({
  name: z.string().min(1)
});

const NewDepartment = () => {
  const { toast } = useToast();
  const client = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting: isLoading },
  } = useForm<z.infer<typeof NewDepartmentSchema>>({
    resolver: zodResolver(NewDepartmentSchema),
  });

  const onsubmit = handleSubmit(async (data) => {
    const message = await addNewDepartment(data);

    if (message === "successful") {
      toast({
        title: "department added successful ",
        description: message,
      });
      client.invalidateQueries({ queryKey: ["department"] });
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
    <div className="w-full h-fit flex justify-between items-center">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">new department</Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-xl">New department</DialogTitle>
            <DialogDescription>add  new department</DialogDescription>
          </DialogHeader>
          <form onSubmit={onsubmit} className="flex flex-col gap-3">
            <div className="flex flex-col gap-7 mt-10">
              <FormInput
                placeholder="Enter user name"
                label="Name"
                name="name"
                type="text"
                register={register}
                error={errors.name?.message}
              />
              <SubmitButton loading={isLoading} label="register" />
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NewDepartment;
