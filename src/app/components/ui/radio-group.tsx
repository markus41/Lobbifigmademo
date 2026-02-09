"use client";

import * as React from "react";
import { Radio } from "@mantine/core";
import { cn } from "./utils";

function RadioGroup({
  className,
  value,
  defaultValue,
  onValueChange,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}) {
  return (
    <Radio.Group
      data-slot="radio-group"
      value={value}
      defaultValue={defaultValue}
      onChange={onValueChange}
    >
      <div
        className={cn("grid gap-3", className)}
        {...props}
      >
        {children}
      </div>
    </Radio.Group>
  );
}

function RadioGroupItem({
  className,
  value,
  disabled,
}: {
  className?: string;
  value: string;
  disabled?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <Radio
      data-slot="radio-group-item"
      value={value}
      disabled={disabled}
      classNames={{
        radio: cn(
          "border-input text-primary size-4 shrink-0 rounded-full border shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:border-ring focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50",
          className
        ),
      }}
    />
  );
}

export { RadioGroup, RadioGroupItem };
