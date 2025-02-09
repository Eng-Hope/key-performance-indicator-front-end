
import { cn } from "@/lib/utils";
import Link from "next/link";

const Logo = ({ className }: { className?: string }) => {
  return (
    <Link href="/" className={cn("flex items-center", className)}>
      <img
        src="/assets/images/logo.png"
        className="w-[50px] h-[40px] stroke-foreground"
      ></img>
      <svg className="w-[90px] h-[50px]">
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          fontSize="30"
          fontWeight="bold"
          fill="none"
          strokeWidth="2"
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