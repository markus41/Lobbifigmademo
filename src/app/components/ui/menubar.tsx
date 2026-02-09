"use client";

import * as React from "react";
import { Menu } from "@mantine/core";
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react";

import { cn } from "./utils";

interface MenubarContextValue {
  activeMenu: string | null;
  setActiveMenu: (menu: string | null) => void;
}

const MenubarContext = React.createContext<MenubarContextValue>({
  activeMenu: null,
  setActiveMenu: () => {},
});

function Menubar({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  const [activeMenu, setActiveMenu] = React.useState<string | null>(null);

  return (
    <MenubarContext.Provider value={{ activeMenu, setActiveMenu }}>
      <div
        data-slot="menubar"
        className={cn(
          "bg-background flex h-9 items-center gap-1 rounded-md border p-1 shadow-xs",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </MenubarContext.Provider>
  );
}

function MenubarMenu({
  children,
}: {
  children: React.ReactNode;
  value?: string;
}) {
  return (
    <Menu withinPortal shadow="md" position="bottom-start">
      {children}
    </Menu>
  );
}

function MenubarGroup({ children, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="menubar-group" {...props}>
      {children}
    </div>
  );
}

function MenubarPortal({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

function MenubarRadioGroup({ children, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="menubar-radio-group" {...props}>
      {children}
    </div>
  );
}

function MenubarTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<"button">) {
  return (
    <Menu.Target>
      <button
        data-slot="menubar-trigger"
        className={cn(
          "focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex items-center rounded-sm px-2 py-1 text-sm font-medium outline-hidden select-none",
          className
        )}
        {...props}
      >
        {children}
      </button>
    </Menu.Target>
  );
}

function MenubarContent({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <Menu.Dropdown
      data-slot="menubar-content"
      className={cn(
        "bg-popover text-popover-foreground z-50 min-w-[12rem] overflow-hidden rounded-md border p-1 shadow-md",
        className
      )}
      {...props}
    >
      {children}
    </Menu.Dropdown>
  );
}

function MenubarItem({
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
      data-slot="menubar-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none",
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

function MenubarCheckboxItem({
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
      data-slot="menubar-checkbox-item"
      className={cn(
        "relative flex cursor-default items-center gap-2 rounded-xs py-1.5 pr-2 pl-8 text-sm outline-hidden select-none",
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

function MenubarRadioItem({
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
      data-slot="menubar-radio-item"
      className={cn(
        "relative flex cursor-default items-center gap-2 rounded-xs py-1.5 pr-2 pl-8 text-sm outline-hidden select-none",
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

function MenubarLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<"div"> & { inset?: boolean }) {
  return (
    <Menu.Label
      data-slot="menubar-label"
      data-inset={inset}
      className={cn(
        "px-2 py-1.5 text-sm font-medium",
        inset && "pl-8",
        className
      )}
      {...props}
    />
  );
}

function MenubarSeparator({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <Menu.Divider
      data-slot="menubar-separator"
      className={cn("-mx-1 my-1", className)}
      {...props}
    />
  );
}

function MenubarShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="menubar-shortcut"
      className={cn(
        "text-muted-foreground ml-auto text-xs tracking-widest",
        className
      )}
      {...props}
    />
  );
}

function MenubarSub({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

function MenubarSubTrigger({
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
      data-slot="menubar-sub-trigger"
      data-inset={inset}
      rightSection={<ChevronRightIcon className="ml-auto h-4 w-4" />}
      className={cn(
        "flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-none select-none",
        inset && "pl-8",
        className
      )}
    >
      {children}
    </Menu.Item>
  );
}

function MenubarSubContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="menubar-sub-content"
      className={cn(
        "bg-popover text-popover-foreground z-50 min-w-[8rem] overflow-hidden rounded-md border p-1 shadow-lg",
        className
      )}
      {...props}
    />
  );
}

export {
  Menubar,
  MenubarPortal,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarGroup,
  MenubarSeparator,
  MenubarLabel,
  MenubarItem,
  MenubarShortcut,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
};
