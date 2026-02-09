"use client";

import * as React from "react";
import {
  Alert as MantineAlert,
  type AlertProps as MantineAlertProps,
} from "@mantine/core";
import { cn } from "./utils";

type AlertVariant = "default" | "destructive";

interface AlertProps extends Omit<MantineAlertProps, "variant"> {
  variant?: AlertVariant;
  className?: string;
}

function Alert({ className, variant = "default", children, ...props }: AlertProps) {
  return (
    <MantineAlert
      data-slot="alert"
      color={variant === "destructive" ? "red" : "gray"}
      variant={variant === "destructive" ? "light" : "light"}
      className={cn(
        "relative w-full rounded-lg border px-4 py-3 text-sm",
        variant === "default" && "bg-card text-card-foreground",
        variant === "destructive" && "text-destructive bg-card border-destructive/50",
        className
      )}
      {...props}
    >
      {children}
    </MantineAlert>
  );
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight",
        className
      )}
      {...props}
    />
  );
}

function AlertDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed",
        className
      )}
      {...props}
    />
  );
}

export { Alert, AlertTitle, AlertDescription };
