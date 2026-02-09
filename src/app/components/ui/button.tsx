"use client";

import * as React from "react";
import { cn } from "./utils";

type ButtonVariant = "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
type ButtonSize = "default" | "sm" | "lg" | "icon";

const variantClasses: Record<ButtonVariant, string> = {
  default:
    "bg-primary text-primary-foreground shadow-[0_12px_28px_-18px_rgba(0,0,0,0.45)] hover:bg-primary/92 hover:shadow-[0_18px_38px_-20px_rgba(0,0,0,0.55)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[0_10px_22px_-16px_rgba(0,0,0,0.4)]",
  destructive:
    "bg-destructive text-white hover:bg-destructive/90",
  outline:
    "border border-border/80 bg-white/70 text-foreground shadow-[0_6px_16px_-12px_rgba(0,0,0,0.2)] backdrop-blur-md hover:bg-white hover:text-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
  secondary:
    "bg-secondary text-secondary-foreground border border-border/70 shadow-[0_8px_18px_-14px_rgba(0,0,0,0.25)] hover:bg-secondary/85 hover:-translate-y-0.5",
  ghost:
    "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
  link: "text-primary underline-offset-4 hover:underline",
};

const sizeClasses: Record<ButtonSize, string> = {
  default: "h-9 px-4 py-2 has-[>svg]:px-3",
  sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
  lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
  icon: "size-9 rounded-md",
};

interface ButtonProps extends React.ComponentProps<"button"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    return (
      <button
        ref={ref}
        data-slot="button"
        className={cn(
          "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

const buttonVariants = (props?: { variant?: ButtonVariant; size?: ButtonSize; className?: string }) => {
  const variant = props?.variant ?? "default";
  const size = props?.size ?? "default";
  return cn(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
    variantClasses[variant],
    sizeClasses[size],
    props?.className
  );
};

export { Button, buttonVariants };
export type { ButtonVariant, ButtonSize, ButtonProps };
