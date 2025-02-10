import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Controller } from "react-hook-form";

interface FormSelectProps {
  name: string;
  error?: string;
  control: any;
  label: string;
  items: { value: string; label: string }[];
  placeholder?: string;
}

export const FormSelect: React.FC<FormSelectProps> = ({
  name,
  error,
  control,
  label,
  items,
  placeholder,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          return (
            <Select onValueChange={field.onChange}>
              <SelectTrigger className={`w-full ${error === undefined? "": "border-destructive dark:border-destructive focus-visible:outline-destructive outline-destructive"}`}>
                <SelectValue
                  placeholder={placeholder === undefined ? label : placeholder}
                />
              </SelectTrigger>
              <SelectContent className="w-full">
                <SelectGroup>
                  <SelectLabel>{label}</SelectLabel>
                  {items.map((item, index) => (
                    <SelectItem
                      key={item.value + item.label + index}
                      value={item.value}
                    >
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          );
        }}
      ></Controller>
      {error && <p className="text-destructive">{error}</p>}
    </div>
  );
};