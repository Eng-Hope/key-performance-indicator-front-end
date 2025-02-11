"use client";
import { Label } from "@/components/ui/label";
import HomeNavBar from "./_components/home_nav";
import Footer from "./_components/footer";

export default function Home() {
  return (
    <>
      <HomeNavBar />
      <div className=" flex flex-col items-center mt-[50px] lg:mt-[100px] mb-[100px] ">
        <div className="flex flex-col gap-3  w-[90%] lg:w-[75%] pb-[100px]">
          <Label className="fill-foreground  text-[2.0rem] lg:text-[3.5rem] font-[1000] font-sans text-center leading-none break-words">
           key performance indicator platform
          </Label>
          <Label className="text-gray-500 mt-5 text-md  lg:text-xl text-center">
            Let us measure our ability to perform 
            </Label>
        </div>
      </div>
      <Footer />
    </>
  );
}