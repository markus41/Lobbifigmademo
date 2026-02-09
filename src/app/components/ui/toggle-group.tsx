"use client";

import * as React from "react";

import { cn } from "./utils";
import { toggleVariants } from "./toggle";

const ToggleGroupContext = React.createContext<{
  size?: "default" | "sm" | "lg";
  variant?: "default" | "outline";
  value?: string | string[];
  onValueChange?: (value: string) => void;
  type?: "single" | "multiple";
}>({
  size: "default",
  variant: "default",
});

function ToggleGroup({
  className,
  variant,
  size,
  children,
  type = "single",
  value,
  defaultValue,
  onValueChange,
  ...props
}: React.ComponentProps<"div"> & {
  variant?: "default" | "outline";
  size?: "default" | "sm" | "lg";
  type?: "single" | "multiple";
  value?: string | string[];
  defaultValue?: string | string[];
  onValueChange?: (value: string) => void;
}) {
  return (
    <div
      data-slot="toggle-group"
      data-variant={variant}
      data-size={size}
      className={cn(
        "group/toggle-group flex w-fit items-center rounded-md data-[variant=outline]:shadow-xs",
        className
      )}
      {...props}
    >
      <ToggleGroupContext.Provider
        value={{ variant, size, value, onValueChange, type }}
      >
        {children}
      </ToggleGroupContext.Provider>
    </div>
  );
}

function ToggleGroupItem({
  className,
  children,
  variant,
  size,
  value,
  ...props
}: React.ComponentProps<"button"> & {
  variant?: "default" | "outline";
  size?: "default" | "sm" | "lg";
  value: string;
}) {
  const context = React.useContext(ToggleGroupContext);

  const isPressed = Array.isArray(context.value)
    ? context.value.includes(value)
    : context.value === value;

  return (
    <button
      data-slot="toggle-group-item"
      data-variant={context.variant || variant}
      data-size={context.size || size}
      data-state={isPressed ? "on" : "off"}
      aria-pressed={isPressed}
      className={cn(
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
        }),
        "min-w-0 flex-1 shrink-0 rounded-none shadow-none first:rounded-l-md last:rounded-r-md focus:z-10 focus-visible:z-10 data-[variant=outline]:border-l-0 data-[variant=outline]:first:border-l",
        className
      )}
      onClick={() => context.onValueChange?.(value)}
      {...props}
    >
      {children}
    </button>
  );
}

export { ToggleGroup, ToggleGroupItem };
