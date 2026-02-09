"use client";

import * as React from "react";
import { Modal, type ModalProps } from "@mantine/core";
import { cn } from "./utils";
import { Button } from "./button";

interface AlertDialogContextValue {
  opened: boolean;
  setOpened: (v: boolean) => void;
}

const AlertDialogContext = React.createContext<AlertDialogContextValue>({
  opened: false,
  setOpened: () => {},
});

function AlertDialog({
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
    <AlertDialogContext.Provider value={{ opened, setOpened }}>
      {children}
    </AlertDialogContext.Provider>
  );
}

function AlertDialogTrigger({
  children,
  asChild,
  ...props
}: React.ComponentProps<"button"> & { asChild?: boolean }) {
  const { setOpened } = React.useContext(AlertDialogContext);

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
      data-slot="alert-dialog-trigger"
      onClick={() => setOpened(true)}
      {...props}
    >
      {children}
    </button>
  );
}

function AlertDialogPortal({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

function AlertDialogOverlay({ className: _className }: { className?: string }) {
  return null;
}

function AlertDialogContent({
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & Partial<ModalProps>) {
  const { opened, setOpened } = React.useContext(AlertDialogContext);

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
    </Modal>
  );
}

function AlertDialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-header"
      className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
      {...props}
    />
  );
}

function AlertDialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    />
  );
}

function AlertDialogTitle({ className, ...props }: React.ComponentProps<"h2">) {
  return (
    <h2
      data-slot="alert-dialog-title"
      className={cn("text-lg font-semibold", className)}
      {...props}
    />
  );
}

function AlertDialogDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="alert-dialog-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

function AlertDialogAction({
  className,
  onClick,
  ...props
}: React.ComponentProps<"button">) {
  const { setOpened } = React.useContext(AlertDialogContext);

  return (
    <Button
      className={className}
      onClick={(e) => {
        onClick?.(e);
        setOpened(false);
      }}
      {...props}
    />
  );
}

function AlertDialogCancel({
  className,
  onClick,
  ...props
}: React.ComponentProps<"button">) {
  const { setOpened } = React.useContext(AlertDialogContext);

  return (
    <Button
      variant="outline"
      className={className}
      onClick={(e) => {
        onClick?.(e);
        setOpened(false);
      }}
      {...props}
    />
  );
}

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
};
