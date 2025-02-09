"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import HomeNavBar from "./_components/home_nav";
import Footer from "./_components/footer";

export default function Home() {
  const router = useRouter();
  return (
    <>
      <HomeNavBar />
      <div className=" flex flex-col items-center mt-[50px] lg:mt-[100px] mb-[100px] ">
        <div className="flex flex-col gap-3  w-[90%] lg:w-[75%]">
          <Label className="fill-foreground  text-[2.0rem] lg:text-[3.5rem] font-[1000] font-sans text-center leading-none break-words">
           key performance indicator platform
          </Label>
          <Label className="text-gray-500 mt-5 text-md  lg:text-xl text-center">
            Let's measure our ability to perform 
            </Label>
        </div>
        <div className="mt-10 flex flex-col md:flex-row justify-between gap-10 w-full md:w-fit px-10">
          <Button onClick={() => router.push("/login")}>
            <Label>get started</Label>
          </Button>
          <Button variant="outline" onClick={() => router.push("/about")}>
            <Label> more about us</Label>
          </Button>
        </div>
      </div>
      <Footer />
    </>
  );
}