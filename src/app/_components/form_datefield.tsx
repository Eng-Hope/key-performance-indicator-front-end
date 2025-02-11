"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Controller, Control, FieldValues, Path } from "react-hook-form";

interface FormDatePickerProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  error?: string;
  label: string;
}

export function FormDatePicker<T extends FieldValues>({
  control,
  name,
  error,
  label,
}: FormDatePickerProps<T>) {
  const [date, setDate] = React.useState<Date | undefined>();

  return (
    <Controller
      name={name} // Correctly typed as `Path<T>`
      control={control}
      render={({ field }) => {
        return (
          <div className="flex flex-col gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[280px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  ) + `${error === undefined ? "" : " border-destructive dark:border-destructive focus-visible:outline-destructive outline-destructive"}`}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>{label}</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(selectedDate) => {
                    setDate(selectedDate);
                    field.onChange(selectedDate);
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            {error && <p className="text-destructive">{error}</p>}
          </div>
        );
      }}
    />
  );
}
