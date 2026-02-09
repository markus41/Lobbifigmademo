"use client";

import { Switch as MantineSwitch } from "@mantine/core";
import { cn } from "./utils";

function Switch({
  className,
  checked,
  defaultChecked,
  onCheckedChange,
  disabled,
}: {
  className?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <MantineSwitch
      data-slot="switch"
      checked={checked}
      defaultChecked={defaultChecked}
      onChange={(e) => onCheckedChange?.(e.currentTarget.checked)}
      disabled={disabled}
      classNames={{
        root: cn("inline-flex", className),
        track: cn(
          "peer h-[1.15rem] w-8 shrink-0 rounded-full border border-transparent transition-all outline-none cursor-pointer",
          "data-[checked]:bg-primary bg-switch-background",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "disabled:cursor-not-allowed disabled:opacity-50"
        ),
        thumb: "bg-card pointer-events-none block size-4 rounded-full ring-0 transition-transform",
      }}
    />
  );
}

export { Switch };
