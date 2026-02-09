"use client";

import * as React from "react";
import { Popover as MantinePopover } from "@mantine/core";

import { cn } from "./utils";

function Popover({
  children,
  open,
  onOpenChange,
  defaultOpen,
  ...props
}: {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
}) {
  return (
    <MantinePopover
      withinPortal
      shadow="md"
      opened={open}
      onChange={onOpenChange}
      defaultOpened={defaultOpen}
      {...props}
    >
      {children}
    </MantinePopover>
  );
}

function PopoverTrigger({
  children,
  asChild,
  ...props
}: React.ComponentProps<"button"> & { asChild?: boolean }) {
  return (
    <MantinePopover.Target>
      {asChild && React.isValidElement(children) ? (
        children
      ) : (
        <button data-slot="popover-trigger" {...props}>
          {children}
        </button>
      )}
    </MantinePopover.Target>
  );
}

function PopoverContent({
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
    <MantinePopover.Dropdown
      data-slot="popover-content"
      className={cn(
        "bg-popover text-popover-foreground z-50 w-72 rounded-md border p-4 shadow-md outline-hidden",
        className
      )}
      {...props}
    >
      {children}
    </MantinePopover.Dropdown>
  );
}

function PopoverAnchor({
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div data-slot="popover-anchor" {...props}>
      {children}
    </div>
  );
}

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor };
