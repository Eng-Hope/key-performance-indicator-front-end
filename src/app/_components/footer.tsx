import { Label } from "@/components/ui/label";
import { Contact, Locate } from "lucide-react";
import Link from "next/link";
import Logo from "./logo";

const Footer = () => {
  return (
    <div className="mt-auto pb-[100px] w-screen flex flex-col bg-accent pt-10 ">
      <div className="flex flex-col xl:flex-row items-start xl:px-[20%] px-[10px] gap-10 xl:justify-evenly pb-10">
        <FooterItem
          items={[
            {
              text: "Contacts",
              isHeader: true,
            },
            {
              icon: <Contact />,
              text: "+255718948681",
            },
            {
              icon: <Contact />,
              text: " +255746549537",
            },
            {
              text: "growyourbusiness482@gmail.com",
            },
            {
              text: "hoperichardmaleko@gmail.com",
            },
          ]}
        />

        <FooterItem
          items={[
            {
              text: "Location",
              isHeader: true,
            },
            {
              icon: <Locate />,
              text: "Kilimanjaro Tanzania",
            },
          ]}
        />
      </div>
      <div className="border w-full dark:border-gray-700 "></div>
      <div className="mt-10x mt-10 ml-10 flex flex-col md:flex-row items-center justify-center gap-7">
        <Logo />
        <Link
          href="https://github.com/Eng-Hope"
          className="hover:text-blue-500 text-foreground md:ml-auto mr-10"
        >
          © Developed by Eng Hope Richard{" "}
        </Link>
      </div>
    </div>
  );
};

export default Footer;

const FooterItem = ({
  items,
}: {
  items: { icon?: React.ReactNode; text: string; isHeader?: boolean }[];
}) => {
  return (
    <div className="flex flex-col gap-2 justify-start">
      {items.map(({ icon, text, isHeader = false }, index) => (
        <div key={index}>
          <Label
            className={`${
              isHeader ? "text-md" : "text-gray-500 dark:text-gray-400/50"
            } flex gap-2 items-center`}
          >
            {icon}
            {text}
          </Label>
        </div>
      ))}
    </div>
  );
};