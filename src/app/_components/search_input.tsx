"use client";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import React, { ChangeEventHandler, useState } from "react";

const SearchInput = ({
  onChange,
  containerClassName,
  className,
  placeholder,
}: {
  onChange?: ChangeEventHandler<HTMLInputElement>;
  containerClassName?: string;
  className?: string;
  placeholder?: string;
}) => {
  const [focused, setFocused] = useState(false);
  return (
    <div className={cn("relative", containerClassName)}>
      <Input
        onChange={onChange}
        onBlur={() => setFocused(false)}
        onFocus={() => setFocused(true)}
        className={cn(
          `w-full md:w-[500px] ${focused ? "" : "pl-10"}`,
          className
        )}
        placeholder={placeholder ?? "Search..."}
      />
      {!focused && (
        <Search
          className="absolute top-2 left-3 text-muted-foreground"
          size={20}
        />
      )}
    </div>
  );
};

export default SearchInput;