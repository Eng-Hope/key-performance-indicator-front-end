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
import { Controller, Control, FieldValues, Path } from "react-hook-form";

interface FormSelectProps<T extends FieldValues> {
  name: Path<T>;
  error?: string;
  control: Control<T>;
  label: string;
  items: { value: string; label: string }[];
  placeholder?: string;
}

export const FormSelect = <T extends FieldValues>({
  name,
  error,
  control,
  label,
  items,
  placeholder,
}: FormSelectProps<T>) => {
  return (
    <div className="flex flex-col gap-2">
      <Controller
        name={name} // ✅ Now correctly typed as `Path<T>`
        control={control}
        render={({ field }) => (
          <Select onValueChange={field.onChange} value={field.value}>
            <SelectTrigger
              className={`w-full ${
                error
                  ? "border-destructive dark:border-destructive focus-visible:outline-destructive outline-destructive"
                  : ""
              }`}
            >
              <SelectValue placeholder={placeholder ?? label} />
            </SelectTrigger>
            <SelectContent className="w-full">
              <SelectGroup>
                <SelectLabel>{label}</SelectLabel>
                {items.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      />
      {error && <p className="text-destructive">{error}</p>}
    </div>
  );
};
