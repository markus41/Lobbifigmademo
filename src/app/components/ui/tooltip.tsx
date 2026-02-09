"use client";

import * as React from "react";
import { Tooltip as MantineTooltip } from "@mantine/core";

import { cn } from "./utils";

function TooltipProvider({
  delayDuration: _delayDuration = 0,
  children,
}: {
  delayDuration?: number;
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

function Tooltip({
  children,
}: {
  children: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  delayDuration?: number;
}) {
  return <>{children}</>;
}

function TooltipTrigger({
  children,
  asChild,
  ...props
}: React.ComponentProps<"button"> & { asChild?: boolean }) {
  if (asChild && React.isValidElement(children)) {
    return children;
  }

  return (
    <button data-slot="tooltip-trigger" {...props}>
      {children}
    </button>
  );
}

function TooltipContent({
  className,
  sideOffset = 0,
  children,
  side = "top",
  align = "center",
  hidden,
  ...props
}: React.ComponentProps<"div"> & {
  sideOffset?: number;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  hidden?: boolean;
}) {
  if (hidden) return null;

  return (
    <MantineTooltip
      label={children}
      position={side}
      offset={sideOffset}
      withinPortal
      classNames={{
        tooltip: cn(
          "bg-primary text-primary-foreground z-50 rounded-md px-3 py-1.5 text-xs",
          className
        ),
      }}
      {...props}
    >
      <span />
    </MantineTooltip>
  );
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
