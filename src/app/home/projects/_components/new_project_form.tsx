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
import { FormDatePicker } from "@/app/_components/form_datefield";
import { addNewProject } from "../actions";

export const NewProjectSchema = z.object({
  name: z.string().min(1),
  start_date: z.date(),
  description: z.string().optional(),
  end_date: z.date().optional()
});

const NewProject = () => {
  const { toast } = useToast();
  const client = useQueryClient();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting: isLoading },
  } = useForm<z.infer<typeof NewProjectSchema>>({
    resolver: zodResolver(NewProjectSchema),
  });

  const onsubmit = handleSubmit(async (data) => {
    const message = await addNewProject(data);

    if (message === "successful") {
      toast({
        title: "project added successful ",
        description: message,
      });
      client.invalidateQueries({ queryKey: ["project"] });
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
          <Button variant="outline">new project</Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-xl">New project</DialogTitle>
            <DialogDescription>add  new project</DialogDescription>
          </DialogHeader>
          <form onSubmit={onsubmit} className="flex flex-col gap-3">
            <div className="flex flex-col gap-7 mt-10">
              <FormInput
                placeholder="Enter project name"
                label="Name"
                name="name"
                type="text"
                register={register}
                error={errors.name?.message}
              />
              <FormDatePicker control={control} name="end_date" label="select end date"
              error={errors.end_date?.message} />
                 <FormDatePicker control={control} name="start_date" label="select start date"
              error={errors.start_date?.message} />
                  <FormInput
                placeholder="Enter decription"
                label="Description"
                name="description"
                type="text"
                register={register}
                error={errors.description?.message}
              />
              <SubmitButton loading={isLoading} label="register" />
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NewProject;
