"use client";

import * as React from "react";
import { Collapse } from "@mantine/core";

interface CollapsibleContextValue {
  open: boolean;
  setOpen: (v: boolean) => void;
}

const CollapsibleContext = React.createContext<CollapsibleContextValue>({
  open: false,
  setOpen: () => {},
});

function Collapsible({
  children,
  open: controlledOpen,
  onOpenChange,
  defaultOpen = false,
  className,
  ...props
}: {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
  className?: string;
} & React.ComponentProps<"div">) {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  const open = controlledOpen ?? internalOpen;
  const setOpen = onOpenChange ?? setInternalOpen;

  return (
    <CollapsibleContext.Provider value={{ open, setOpen }}>
      <div data-slot="collapsible" className={className} {...props}>
        {children}
      </div>
    </CollapsibleContext.Provider>
  );
}

function CollapsibleTrigger({
  children,
  asChild,
  className,
  ...props
}: React.ComponentProps<"button"> & { asChild?: boolean }) {
  const { open, setOpen } = React.useContext(CollapsibleContext);

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<any>, {
      onClick: (e: React.MouseEvent) => {
        (children as React.ReactElement<any>).props?.onClick?.(e);
        setOpen(!open);
      },
      "data-state": open ? "open" : "closed",
    });
  }

  return (
    <button
      data-slot="collapsible-trigger"
      data-state={open ? "open" : "closed"}
      className={className}
      onClick={() => setOpen(!open)}
      {...props}
    >
      {children}
    </button>
  );
}

function CollapsibleContent({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { open } = React.useContext(CollapsibleContext);

  return (
    <Collapse in={open}>
      <div data-slot="collapsible-content" className={className} {...props}>
        {children}
      </div>
    </Collapse>
  );
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
