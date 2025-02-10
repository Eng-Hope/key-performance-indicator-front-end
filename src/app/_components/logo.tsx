
import { cn } from "@/lib/utils";
import Link from "next/link";

const Logo = ({ className }: { className?: string }) => {
  return (
    <Link href="/" className={cn("flex items-center", className)}>
      <img
        src="/assets/images/logo.png"
        className="w-[40px] h-[30px] stroke-foreground"
      ></img>
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