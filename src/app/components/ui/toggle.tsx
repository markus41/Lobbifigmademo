"use client";

import * as React from "react";

import { cn } from "./utils";

const toggleVariants = ({
  variant = "default",
  size = "default",
  className,
}: {
  variant?: "default" | "outline";
  size?: "default" | "sm" | "lg";
  className?: string;
} = {}) => {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium hover:bg-muted hover:text-muted-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none transition-[color,box-shadow] whitespace-nowrap";

  const variantClasses = {
    default: "bg-transparent",
    outline:
      "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
  };

  const sizeClasses = {
    default: "h-9 px-2 min-w-9",
    sm: "h-8 px-1.5 min-w-8",
    lg: "h-10 px-2.5 min-w-10",
  };

  return cn(base, variantClasses[variant], sizeClasses[size], className);
};

function Toggle({
  className,
  variant,
  size,
  pressed,
  defaultPressed,
  onPressedChange,
  ...props
}: React.ComponentProps<"button"> & {
  variant?: "default" | "outline";
  size?: "default" | "sm" | "lg";
  pressed?: boolean;
  defaultPressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
}) {
  const [internalPressed, setInternalPressed] = React.useState(
    defaultPressed ?? false
  );
  const isPressed = pressed ?? internalPressed;

  return (
    <button
      data-slot="toggle"
      data-state={isPressed ? "on" : "off"}
      aria-pressed={isPressed}
      className={cn(toggleVariants({ variant, size, className }))}
      onClick={() => {
        const next = !isPressed;
        setInternalPressed(next);
        onPressedChange?.(next);
      }}
      {...props}
    />
  );
}

export { Toggle, toggleVariants };
