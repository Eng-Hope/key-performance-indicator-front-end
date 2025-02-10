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
import { FormSelect } from "@/app/_components/form_select";
import { addNewKpi } from "../actions";


export const NewKpiSchema = z.object({
  name: z.string().min(1),
  measurement: z.string().min(1),
  review_duration: z.string().min(1),
  target: z.string().min(1),
  weight: z.string().min(1),
});

const NewkPI = () => {
  const { toast } = useToast();
  const client = useQueryClient();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting: isLoading },
  } = useForm<z.infer<typeof NewKpiSchema>>({
    resolver: zodResolver(NewKpiSchema),
  });

  const onsubmit = handleSubmit(async (data) => {
    const message = await addNewKpi(data);

    if (message === "successful") {
      toast({
        title: "project added successful ",
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
    <div className="w-full h-fit flex justify-between items-center">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">new kpi</Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-xl">New kpi</DialogTitle>
            <DialogDescription>add  new kpi</DialogDescription>
          </DialogHeader>
          <form onSubmit={onsubmit} className="flex flex-col gap-2">
            <div className="flex flex-col gap-4 mt-10">
              <FormInput
                placeholder="Enter name"
                label="Name"
                name="name"
                type="text"
                register={register}
                error={errors.name?.message}
              />
                <FormInput
                placeholder="Enter measurement"
                label="Measurement"
                name="measurement"
                type="text"
                register={register}
                error={errors.measurement?.message}
                isTextArea
              />
                <FormInput
                placeholder="Enter target"
                label="Target"
                name="target"
                type="textarea"
                register={register}
                error={errors.target?.message}
              />
                <FormInput
                placeholder="Enter weight"
                label="Weight"
                name="weight"
                type="number"
                register={register}
                error={errors.weight?.message}
              />

              <FormSelect name="review_duration"
              error={errors.review_duration?.message}
               control={control} label="Select review duration"
                items={[{label: "daily", value: "daily"},
                 {label: "weekly", value: "weekly"},
                 {label: "monthly", value: "monthly"},
                 {label: "annualy", value: "annualy"}, ]} />
        
              <SubmitButton loading={isLoading} label="register" />
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NewkPI;
