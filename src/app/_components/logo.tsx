
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const Logo = ({ className }: { className?: string }) => {
  return (
    <Link href="/" className={cn("flex items-center", className)}>
      <Image
      alt="logo"
        src="/assets/images/logo.png"
        className="w-[40px] h-[30px] stroke-foreground"
      ></Image>
      <svg className="w-[40px] h-[30px]">
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          fontSize="20"
          fontWeight="bold"
          fill="none"
          strokeWidth="1.5"
          dy=".35em"
          className="stroke-foreground"
        >
          kpi
        </text>
      </svg>
    </Link>
  );
};

export default Logo;