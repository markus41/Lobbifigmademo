"use client";

import * as React from "react";
import { Drawer as MantineDrawer } from "@mantine/core";
import { cn } from "./utils";

interface DrawerContextValue {
  opened: boolean;
  setOpened: (v: boolean) => void;
  direction?: "top" | "right" | "bottom" | "left";
}

const DrawerContext = React.createContext<DrawerContextValue>({
  opened: false,
  setOpened: () => {},
});

function Drawer({
  children,
  open,
  onOpenChange,
  direction = "bottom",
}: {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  direction?: "top" | "right" | "bottom" | "left";
}) {
  const [internalOpened, setInternalOpened] = React.useState(false);
  const opened = open ?? internalOpened;
  const setOpened = onOpenChange ?? setInternalOpened;

  return (
    <DrawerContext.Provider value={{ opened, setOpened, direction }}>
      {children}
    </DrawerContext.Provider>
  );
}

function DrawerTrigger({
  children,
  asChild,
  ...props
}: React.ComponentProps<"button"> & { asChild?: boolean }) {
  const { setOpened } = React.useContext(DrawerContext);

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<any>, {
      onClick: (e: React.MouseEvent) => {
        (children as React.ReactElement<any>).props?.onClick?.(e);
        setOpened(true);
      },
    });
  }

  return (
    <button data-slot="drawer-trigger" onClick={() => setOpened(true)} {...props}>
      {children}
    </button>
  );
}

function DrawerPortal({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

function DrawerClose({
  children,
  ...props
}: React.ComponentProps<"button">) {
  const { setOpened } = React.useContext(DrawerContext);

  return (
    <button data-slot="drawer-close" onClick={() => setOpened(false)} {...props}>
      {children}
    </button>
  );
}

function DrawerOverlay({ className: _className }: { className?: string }) {
  return null;
}

function DrawerContent({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  const { opened, setOpened, direction } = React.useContext(DrawerContext);

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
      position={positionMap[direction || "bottom"]}
      withCloseButton={false}
      overlayProps={{ backgroundOpacity: 0.5, blur: 2 }}
      classNames={{
        content: cn("bg-background", className),
        body: "p-0 flex flex-col h-full",
      }}
      {...props}
    >
      {(direction === "bottom") && (
        <div className="bg-muted mx-auto mt-4 h-2 w-[100px] shrink-0 rounded-full" />
      )}
      {children}
    </MantineDrawer>
  );
}

function DrawerHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-header"
      className={cn("flex flex-col gap-1.5 p-4", className)}
      {...props}
    />
  );
}

function DrawerFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-footer"
      className={cn("mt-auto flex flex-col gap-2 p-4", className)}
      {...props}
    />
  );
}

function DrawerTitle({ className, ...props }: React.ComponentProps<"h2">) {
  return (
    <h2
      data-slot="drawer-title"
      className={cn("text-foreground font-semibold", className)}
      {...props}
    />
  );
}

function DrawerDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="drawer-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
};
