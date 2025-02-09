"use client";

import Logo from "./logo";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { ThemeSwitcher } from "@/components/theme_switcher";

const HomeNavBar = () => {
  const [isMenusShown, setIsMenuShown] = useState(false);
  return (
    <nav className="flex w-screen  bg-background items-center content-center px-3 xl:px-10  pt-3 py-2 lg:py-5 sticky">
      <Logo />
      <div className="hidden xl:flex justify-end items-center gap-10 pr-5 pt-5 pb-5 ml-auto h-full">
        <NavBarCustomLink
          setIsMenuShown={setIsMenuShown}
          href="/"
          label="home"
        />
        <NavBarCustomLink href="/login" label="login" />
        <NavBarCustomLink href="/about" label="about" />
        {/* separator */}
        <div className="border h-7 dark:border-gray-700 " />
        <ThemeSwitcher />
      </div>
      <Menu
        onClick={() => setIsMenuShown(!isMenusShown)}
        size={29}
        className="text-foreground block xl:hidden ml-auto cursor-pointer hover:text-gray-500"
      />
      {isMenusShown && (
        <div className="xl:hidden flex flex-col items-center justify-center gap-7 absolute right-0 bg-accent w-fit px-[70px] py-[50px] h-fit top-[-10px]">
          <X
            onClick={() => setIsMenuShown(false)}
            className="text-foreground block xl:hidden cursor-pointer hover:text-gray-500"
          />
          <ThemeSwitcher />
          {/* separator */}
          <div className="border w-full dark:border-gray-700 " />
          <NavBarCustomLink
            setIsMenuShown={setIsMenuShown}
            href="/"
            label="home"
          />
          <NavBarCustomLink
            setIsMenuShown={setIsMenuShown}
            href="/login"
            label="login"
          />
          <NavBarCustomLink
            setIsMenuShown={setIsMenuShown}
            href="/about"
            label="about"
          />
        </div>
      )}
    </nav>
  );
};

export default HomeNavBar;

const NavBarCustomLink = ({
  href,
  label,
  setIsMenuShown,
}: {
  href: string;
  label?: string;
  setIsMenuShown?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const pathName = usePathname();
  return (
    <Link
      onClick={() =>
        setIsMenuShown == undefined ? null : setIsMenuShown(false)
      }
      href={href}
      className={`font-semibold hover:text-blue-500 hover:underline text-md
       cursor-pointer  ${
         pathName == href ? "text-blue-500 underline" : "text-foreground"
       }`}
    >
      {label}
    </Link>
  );
};
