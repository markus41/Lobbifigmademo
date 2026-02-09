"use client";

import {
  Badge as MantineBadge,
  type BadgeProps as MantineBadgeProps,
} from "@mantine/core";
import { cn } from "./utils";

type BadgeVariant = "default" | "secondary" | "destructive" | "outline";

const variantMap: Record<BadgeVariant, { mantineVariant: string; color: string; className: string }> = {
  default: {
    mantineVariant: "filled",
    color: "blue",
    className: "border-transparent bg-primary text-primary-foreground",
  },
  secondary: {
    mantineVariant: "light",
    color: "gray",
    className: "border-transparent bg-secondary text-secondary-foreground",
  },
  destructive: {
    mantineVariant: "filled",
    color: "red",
    className: "border-transparent bg-destructive text-white",
  },
  outline: {
    mantineVariant: "outline",
    color: "gray",
    className: "text-foreground border",
  },
};

interface BadgeProps extends Omit<MantineBadgeProps, "variant"> {
  variant?: BadgeVariant;
  className?: string;
  asChild?: boolean;
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const config = variantMap[variant];

  return (
    <MantineBadge
      data-slot="badge"
      variant={config.mantineVariant as any}
      radius="md"
      className={cn(
        "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 gap-1 transition-[color,box-shadow] overflow-hidden",
        config.className,
        className
      )}
      {...props}
    />
  );
}

const badgeVariants = (props?: { variant?: BadgeVariant }) => {
  const variant = props?.variant ?? "default";
  const config = variantMap[variant];
  return cn(
    "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 gap-1",
    config.className
  );
};

export { Badge, badgeVariants };
