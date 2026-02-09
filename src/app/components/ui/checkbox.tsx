"use client";

import {
  Checkbox as MantineCheckbox,
  type CheckboxProps as MantineCheckboxProps,
} from "@mantine/core";
import { cn } from "./utils";

interface CheckboxProps extends Omit<MantineCheckboxProps, "classNames"> {
  className?: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

function Checkbox({
  className,
  checked,
  onCheckedChange,
  onChange,
  ...props
}: CheckboxProps) {
  return (
    <MantineCheckbox
      data-slot="checkbox"
      checked={checked}
      onChange={(event) => {
        onCheckedChange?.(event.currentTarget.checked);
        onChange?.(event);
      }}
      classNames={{
        input: cn(
          "peer border bg-input-background dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
          className
        ),
      }}
      {...props}
    />
  );
}

export { Checkbox };
