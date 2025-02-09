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
import { Label } from "@/components/ui/label";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useQueryClient } from "@tanstack/react-query";
import { signUp } from "../action";

export const SignInSchema = z.object({
  email: z.string().email({ message: "invalid email format" }),
  password: z
    .string()
    .min(6, { message: "password must contain atleast 6 characters" }),
 name: z.string().min(1, {message: "name is required"})
});

const NewUser = () => {
  const { toast } = useToast();
  const client = useQueryClient();

    const {
      register,
      handleSubmit,
      control,
      formState: { errors, isSubmitting: isLoading },
    } = useForm<z.infer<typeof SignInSchema>>({
      resolver: zodResolver(SignInSchema),
    });

  const onsubmit = handleSubmit(async (data) => {
    const message = await signUp(data);

    if (message === "successful") {
      toast({
        title: "Sign up successful login to continue ",
        description: message,
      });
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
      <Label className="text-xl underline">List of users</Label>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">new user</Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-xl">New user</DialogTitle>
            <DialogDescription>
              add a new user
            </DialogDescription>
          </DialogHeader>
        <form
        onSubmit={onsubmit}
        className="flex flex-col gap-3"
      >
        <div className="flex flex-col gap-7 mt-10">
          <FormInput
            placeholder="Enter user name"
            label="Name"
            name="name"
            type="text"
            register={register}
            error={errors.name?.message}
          />

          <FormInput
            placeholder="Enter email"
            label="Email"
            name="email"
            type="text"
            register={register}
            error={errors.email?.message}
          />
          <FormInput
            placeholder="Enter password"
            label="Password"
            name="password"
            type="password"
            register={register}
            error={errors.password?.message}
          />
          <SubmitButton loading={isLoading} label="register" />
        </div>
      </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NewUser;