"use client";

import * as React from "react";
import { ScrollArea as MantineScrollArea } from "@mantine/core";

import { cn } from "./utils";

function ScrollArea({
  className,
  children,
  type,
  ...props
}: React.ComponentProps<"div"> & {
  type?: "auto" | "always" | "scroll" | "hover" | "never";
}) {
  return (
    <MantineScrollArea
      data-slot="scroll-area"
      type={type || "hover"}
      className={cn("relative", className)}
      classNames={{
        viewport: "focus-visible:ring-ring/50 size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:outline-1",
        scrollbar: "flex touch-none p-px transition-colors select-none",
        thumb: "bg-border relative flex-1 rounded-full",
      }}
      {...props}
    >
      {children}
    </MantineScrollArea>
  );
}

function ScrollBar({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<"div"> & {
  orientation?: "vertical" | "horizontal";
}) {
  return (
    <div
      data-slot="scroll-area-scrollbar"
      className={cn(
        "flex touch-none p-px transition-colors select-none",
        orientation === "vertical" &&
          "h-full w-2.5 border-l border-l-transparent",
        orientation === "horizontal" &&
          "h-2.5 flex-col border-t border-t-transparent",
        className
      )}
      {...props}
    />
  );
}

export { ScrollArea, ScrollBar };
