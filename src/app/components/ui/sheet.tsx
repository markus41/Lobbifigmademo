"use client";

import * as React from "react";
import { Drawer as MantineDrawer } from "@mantine/core";
import { XIcon } from "lucide-react";

import { cn } from "./utils";

interface SheetContextValue {
  opened: boolean;
  setOpened: (v: boolean) => void;
}

const SheetContext = React.createContext<SheetContextValue>({
  opened: false,
  setOpened: () => {},
});

function Sheet({
  children,
  open,
  onOpenChange,
  defaultOpen = false,
}: {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
}) {
  const [internalOpened, setInternalOpened] = React.useState(defaultOpen);
  const opened = open ?? internalOpened;
  const setOpened = onOpenChange ?? setInternalOpened;

  return (
    <SheetContext.Provider value={{ opened, setOpened }}>
      {children}
    </SheetContext.Provider>
  );
}

function SheetTrigger({
  children,
  asChild,
  ...props
}: React.ComponentProps<"button"> & { asChild?: boolean }) {
  const { setOpened } = React.useContext(SheetContext);

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<any>, {
      onClick: (e: React.MouseEvent) => {
        (children as React.ReactElement<any>).props?.onClick?.(e);
        setOpened(true);
      },
    });
  }

  return (
    <button data-slot="sheet-trigger" onClick={() => setOpened(true)} {...props}>
      {children}
    </button>
  );
}

function SheetClose({
  children,
  ...props
}: React.ComponentProps<"button">) {
  const { setOpened } = React.useContext(SheetContext);

  return (
    <button data-slot="sheet-close" onClick={() => setOpened(false)} {...props}>
      {children}
    </button>
  );
}

function SheetPortal({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

function SheetOverlay({ className: _className }: { className?: string }) {
  return null;
}

function SheetContent({
  className,
  children,
  side = "right",
  ...props
}: React.ComponentProps<"div"> & {
  side?: "top" | "right" | "bottom" | "left";
}) {
  const { opened, setOpened } = React.useContext(SheetContext);

  const positionMap: Record<string, "top" | "right" | "bottom" | "left"> = {
    top: "top",
    right: "right",
    bottom: "bottom",
    left: "left",
  };

  return (
    <MantineDrawer
      opened={opened}
      onClose={() => setOpened(false)}
      position={positionMap[side]}
      withCloseButton={false}
      overlayProps={{ backgroundOpacity: 0.5, blur: 2 }}
      size={side === "left" || side === "right" ? "sm" : undefined}
      classNames={{
        content: cn(
          "bg-background flex flex-col gap-4 shadow-lg",
          className
        ),
        body: "p-0 flex flex-col h-full",
      }}
      {...props}
    >
      {children}
      <button
        className="ring-offset-background focus:ring-ring absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none"
        onClick={() => setOpened(false)}
      >
        <XIcon className="size-4" />
        <span className="sr-only">Close</span>
      </button>
    </MantineDrawer>
  );
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-header"
      className={cn("flex flex-col gap-1.5 p-4", className)}
      {...props}
    />
  );
}

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn("mt-auto flex flex-col gap-2 p-4", className)}
      {...props}
    />
  );
}

function SheetTitle({
  className,
  ...props
}: React.ComponentProps<"h2">) {
  return (
    <h2
      data-slot="sheet-title"
      className={cn("text-foreground font-semibold", className)}
      {...props}
    />
  );
}

function SheetDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="sheet-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  SheetPortal,
  SheetOverlay,
};
