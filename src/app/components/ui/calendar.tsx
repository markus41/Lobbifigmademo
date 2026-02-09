"use client";

import { DatePicker, type DatePickerProps } from "@mantine/dates";
import { cn } from "./utils";

interface CalendarProps extends Omit<DatePickerProps, "classNames"> {
  className?: string;
  classNames?: Record<string, string>;
  showOutsideDays?: boolean;
  mode?: "single" | "range" | "multiple";
}

function Calendar({
  className,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DatePicker
      data-slot="calendar"
      className={cn("p-3", className)}
      hideOutsideDates={!showOutsideDays}
      classNames={{
        calendarHeader: "flex justify-center pt-1 relative items-center w-full",
        calendarHeaderLevel: "text-sm font-medium",
        day: "size-8 p-0 font-normal text-sm rounded-md hover:bg-accent hover:text-accent-foreground",
        weekday: "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
      }}
      {...props}
    />
  );
}

export { Calendar };
export type { CalendarProps };
