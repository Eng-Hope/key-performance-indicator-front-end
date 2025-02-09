"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";

import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import FormInput from "@/app/_components/input_field";
import { login } from "./action";
import SubmitButton from "@/app/_components/submitting_button";
import { useQueryClient } from "@tanstack/react-query";
export const LoginSchema = z.object({
  email: z.string().email({ message: "invalid email format" }),
  password: z
    .string()
    .min(6, { message: "password must contain atleast 6 characters" }),
});
const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting: isLoading },
  } = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
  });

  const { toast } = useToast();
  const router = useRouter();

  const onsubmit = handleSubmit(async (data) => {
    const message = await login(data);
    if (message === "login successful") {
      toast({
        description: message,
      });
      router.push("/home");
    } else if (message === "User is disabled") {
      router.push(`/confirm-email?email=${data.email}`);
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
    <div className="flex w-screen pb-[70px] bg-background">
      <form
        onSubmit={onsubmit}
        className="w-full xl:w-1/2 flex flex-col  border-r h-full dark:border-gray-700 px-10 xl:px-[5%] dark:bg-gray-900 bg-gray-100 py-[100px] xl:ml-6 rounded-md"
      >
        <div className="flex flex-col gap-1 ">
          <Label className="text-2xl">Welcome back 👋 </Label>
          <Label className="text-gray-500">Sign in to your account</Label>
        </div>
        <div className="flex flex-col gap-7 mt-10">
          <FormInput
            placeholder="Enter your email"
            label="Email"
            name="email"
            type="text"
            register={register}
            error={errors.email?.message}
          />
          <FormInput
            placeholder="Enter your password"
            label="Password"
            name="password"
            type="password"
            register={register}
            error={errors.password?.message}
          />
          <SubmitButton loading={isLoading} label="login" />
          <div className="flex justify-center w-full mt-3">
            <Link href="/signup" className="text-blue-400">
              Dont have an account ? sign in here
            </Link>
          </div>
        </div>
      </form>
      <div className="w-1/2  px-10 items-center justify-center hidden xl:flex">
        <Label className="p-10 text-center text-2xl">
          Excited to have you back at kpi! 🎉 , log in and lead the way. 💪
        </Label>
      </div>
    </div>
  );
};

export default Login;