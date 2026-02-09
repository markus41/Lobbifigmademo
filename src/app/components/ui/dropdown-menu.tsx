"use client";

import * as React from "react";
import { Menu } from "@mantine/core";
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react";
import { cn } from "./utils";

function DropdownMenu({ children }: { children: React.ReactNode }) {
  return <Menu withinPortal shadow="md" position="bottom-start">{children}</Menu>;
}

function DropdownMenuPortal({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

function DropdownMenuTrigger({
  children,
  asChild,
  ...props
}: React.ComponentProps<"button"> & { asChild?: boolean }) {
  return (
    <Menu.Target>
      {asChild && React.isValidElement(children) ? (
        children
      ) : (
        <button data-slot="dropdown-menu-trigger" {...props}>
          {children}
        </button>
      )}
    </Menu.Target>
  );
}

function DropdownMenuContent({
  className,
  sideOffset,
  ...props
}: React.ComponentProps<"div"> & { sideOffset?: number }) {
  return (
    <Menu.Dropdown
      data-slot="dropdown-menu-content"
      className={cn(
        "bg-popover text-popover-foreground z-50 min-w-[8rem] overflow-hidden rounded-md border p-1 shadow-md",
        className
      )}
      {...props}
    />
  );
}

function DropdownMenuGroup({ children, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="dropdown-menu-group" {...props}>{children}</div>;
}

function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  children,
  onClick,
  disabled,
}: {
  className?: string;
  inset?: boolean;
  variant?: "default" | "destructive";
  children?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <Menu.Item
      data-slot="dropdown-menu-item"
      data-variant={variant}
      className={cn(
        "relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none select-none",
        variant === "destructive" && "text-destructive",
        inset && "pl-8",
        className
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </Menu.Item>
  );
}

function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  onCheckedChange,
  disabled,
}: {
  className?: string;
  children?: React.ReactNode;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <Menu.Item
      data-slot="dropdown-menu-checkbox-item"
      className={cn(
        "relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-none select-none",
        className
      )}
      onClick={() => onCheckedChange?.(!checked)}
      disabled={disabled}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        {checked && <CheckIcon className="size-4" />}
      </span>
      {children}
    </Menu.Item>
  );
}

function DropdownMenuRadioGroup({ children, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="dropdown-menu-radio-group" {...props}>{children}</div>;
}

function DropdownMenuRadioItem({
  className,
  children,
  checked,
  onClick,
  disabled,
}: {
  className?: string;
  children?: React.ReactNode;
  checked?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <Menu.Item
      data-slot="dropdown-menu-radio-item"
      className={cn(
        "relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-none select-none",
        className
      )}
      onClick={onClick}
      disabled={disabled}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        {checked && <CircleIcon className="size-2 fill-current" />}
      </span>
      {children}
    </Menu.Item>
  );
}

function DropdownMenuLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<"div"> & { inset?: boolean }) {
  return (
    <Menu.Label
      data-slot="dropdown-menu-label"
      className={cn("px-2 py-1.5 text-sm font-medium", inset && "pl-8", className)}
      {...props}
    />
  );
}

function DropdownMenuSeparator({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <Menu.Divider
      data-slot="dropdown-menu-separator"
      className={cn("-mx-1 my-1", className)}
      {...props}
    />
  );
}

function DropdownMenuShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn("text-muted-foreground ml-auto text-xs tracking-widest", className)}
      {...props}
    />
  );
}

function DropdownMenuSub({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

function DropdownMenuSubTrigger({
  className,
  inset,
  children,
}: {
  className?: string;
  inset?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <Menu.Item
      data-slot="dropdown-menu-sub-trigger"
      rightSection={<ChevronRightIcon className="ml-auto size-4" />}
      className={cn(
        "flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm",
        inset && "pl-8",
        className
      )}
    >
      {children}
    </Menu.Item>
  );
}

function DropdownMenuSubContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dropdown-menu-sub-content"
      className={cn(
        "bg-popover text-popover-foreground z-50 min-w-[8rem] overflow-hidden rounded-md border p-1 shadow-lg",
        className
      )}
      {...props}
    />
  );
}

export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
};
