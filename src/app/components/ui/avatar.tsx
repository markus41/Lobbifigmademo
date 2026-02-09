"use client";

import * as React from "react";
import {
  Avatar as MantineAvatar,
  type AvatarProps as MantineAvatarProps,
} from "@mantine/core";
import { cn } from "./utils";

interface AvatarProps extends Omit<MantineAvatarProps, "src"> {
  className?: string;
  src?: string;
  alt?: string;
  children?: React.ReactNode;
}

function Avatar({ className, src, alt, children, ...props }: AvatarProps) {
  return (
    <MantineAvatar
      data-slot="avatar"
      src={src}
      alt={alt}
      radius="xl"
      className={cn(
        "relative flex size-10 shrink-0 overflow-hidden rounded-full",
        className
      )}
      {...props}
    >
      {children}
    </MantineAvatar>
  );
}

function AvatarImage({
  className,
  src,
  alt,
  ...props
}: React.ComponentProps<"img">) {
  if (!src) return null;
  return (
    <img
      data-slot="avatar-image"
      src={src}
      alt={alt}
      className={cn("aspect-square size-full object-cover", className)}
      {...props}
    />
  );
}

function AvatarFallback({
  className,
  children,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="avatar-fallback"
      className={cn(
        "bg-muted flex size-full items-center justify-center rounded-full text-sm",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export { Avatar, AvatarImage, AvatarFallback };
