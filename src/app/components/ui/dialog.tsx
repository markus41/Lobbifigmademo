"use client";

import * as React from "react";
import { Modal, type ModalProps } from "@mantine/core";
import { XIcon } from "lucide-react";
import { cn } from "./utils";

interface DialogContextValue {
  opened: boolean;
  setOpened: (v: boolean) => void;
}

const DialogContext = React.createContext<DialogContextValue>({
  opened: false,
  setOpened: () => {},
});

function Dialog({
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
    <DialogContext.Provider value={{ opened, setOpened }}>
      {children}
    </DialogContext.Provider>
  );
}

function DialogTrigger({
  children,
  asChild,
  ...props
}: React.ComponentProps<"button"> & { asChild?: boolean }) {
  const { setOpened } = React.useContext(DialogContext);

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<any>, {
      onClick: (e: React.MouseEvent) => {
        (children as React.ReactElement<any>).props?.onClick?.(e);
        setOpened(true);
      },
    });
  }

  return (
    <button
      data-slot="dialog-trigger"
      onClick={() => setOpened(true)}
      {...props}
    >
      {children}
    </button>
  );
}

function DialogPortal({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

function DialogClose({
  children,
  asChild,
  ...props
}: React.ComponentProps<"button"> & { asChild?: boolean }) {
  const { setOpened } = React.useContext(DialogContext);

  return (
    <button
      data-slot="dialog-close"
      onClick={() => setOpened(false)}
      {...props}
    >
      {children}
    </button>
  );
}

function DialogOverlay({ className: _className }: { className?: string }) {
  return null;
}

function DialogContent({
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & Partial<ModalProps>) {
  const { opened, setOpened } = React.useContext(DialogContext);

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      withCloseButton={false}
      centered
      overlayProps={{ backgroundOpacity: 0.5, blur: 2 }}
      classNames={{
        content: cn(
          "bg-background rounded-lg border p-6 shadow-lg",
          className
        ),
        body: "p-0",
      }}
      {...props}
    >
      {children}
      <button
        className="ring-offset-background focus:ring-ring absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
        onClick={() => setOpened(false)}
      >
        <XIcon />
        <span className="sr-only">Close</span>
      </button>
    </Modal>
  );
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
      {...props}
    />
  );
}

function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    />
  );
}

function DialogTitle({ className, ...props }: React.ComponentProps<"h2">) {
  return (
    <h2
      data-slot="dialog-title"
      className={cn("text-lg leading-none font-semibold", className)}
      {...props}
    />
  );
}

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="dialog-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
