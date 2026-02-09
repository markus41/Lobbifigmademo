"use client";

import * as React from "react";
import { HoverCard as MantineHoverCard } from "@mantine/core";
import { cn } from "./utils";

function HoverCard({
  children,
  open,
  onOpenChange,
  openDelay = 200,
  closeDelay = 300,
  ...props
}: {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  openDelay?: number;
  closeDelay?: number;
}) {
  return (
    <MantineHoverCard
      withinPortal
      shadow="md"
      openDelay={openDelay}
      closeDelay={closeDelay}
      {...props}
    >
      {children}
    </MantineHoverCard>
  );
}

function HoverCardTrigger({
  children,
  asChild,
  ...props
}: React.ComponentProps<"div"> & { asChild?: boolean }) {
  return (
    <MantineHoverCard.Target>
      {asChild && React.isValidElement(children) ? (
        children
      ) : (
        <div data-slot="hover-card-trigger" {...props}>
          {children}
        </div>
      )}
    </MantineHoverCard.Target>
  );
}

function HoverCardContent({
  className,
  align,
  sideOffset,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  align?: "center" | "start" | "end";
  sideOffset?: number;
}) {
  return (
    <MantineHoverCard.Dropdown
      data-slot="hover-card-content"
      className={cn(
        "bg-popover text-popover-foreground z-50 w-64 rounded-md border p-4 shadow-md",
        className
      )}
      {...props}
    >
      {children}
    </MantineHoverCard.Dropdown>
  );
}

export { HoverCard, HoverCardTrigger, HoverCardContent };
