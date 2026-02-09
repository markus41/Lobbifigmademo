"use client";

import * as React from "react";
import { Tabs as MantineTabs } from "@mantine/core";

import { cn } from "./utils";

function Tabs({
  className,
  defaultValue,
  value,
  onValueChange,
  children,
}: {
  className?: string;
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children?: React.ReactNode;
}) {
  return (
    <MantineTabs
      data-slot="tabs"
      defaultValue={defaultValue}
      value={value}
      onChange={(val) => onValueChange?.(val || "")}
      className={cn("flex flex-col gap-2", className)}
    >
      {children}
    </MantineTabs>
  );
}

function TabsList({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <MantineTabs.List
      data-slot="tabs-list"
      className={cn(
        "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-xl p-[3px]",
        className
      )}
    >
      {children}
    </MantineTabs.List>
  );
}

function TabsTrigger({
  className,
  value,
  children,
  disabled,
}: {
  className?: string;
  value: string;
  children?: React.ReactNode;
  disabled?: boolean;
}) {
  return (
    <MantineTabs.Tab
      data-slot="tabs-trigger"
      value={value}
      disabled={disabled}
      className={cn(
        "data-[active]:bg-card dark:data-[active]:text-foreground text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-xl border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50",
        className
      )}
    >
      {children}
    </MantineTabs.Tab>
  );
}

function TabsContent({
  className,
  value,
  children,
}: {
  className?: string;
  value: string;
  children?: React.ReactNode;
}) {
  return (
    <MantineTabs.Panel
      data-slot="tabs-content"
      value={value}
      className={cn("flex-1 outline-none", className)}
    >
      {children}
    </MantineTabs.Panel>
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
