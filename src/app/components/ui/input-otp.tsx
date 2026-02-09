"use client";

import * as React from "react";
import { PinInput } from "@mantine/core";
import { MinusIcon } from "lucide-react";
import { cn } from "./utils";

function InputOTP({
  className,
  containerClassName,
  length = 6,
  value,
  onChange,
  disabled,
  type = "number",
  mask,
  placeholder = "",
  ...props
}: {
  className?: string;
  containerClassName?: string;
  length?: number;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  type?: "number" | "text";
  mask?: boolean;
  placeholder?: string;
  maxLength?: number;
  render?: any;
  children?: React.ReactNode;
}) {
  if (props.children) {
    return (
      <div
        data-slot="input-otp"
        className={cn(
          "flex items-center gap-2 has-disabled:opacity-50",
          containerClassName
        )}
      >
        {props.children}
      </div>
    );
  }

  return (
    <PinInput
      data-slot="input-otp"
      length={length}
      value={value}
      onChange={onChange}
      disabled={disabled}
      type={type === "number" ? "number" : "alphanumeric"}
      mask={mask}
      placeholder={placeholder}
      classNames={{
        root: cn("flex items-center gap-2", containerClassName),
        input: cn(
          "border-input h-9 w-9 rounded-md border text-center text-sm bg-input-background transition-all outline-none focus:border-ring focus:ring-ring/50 focus:ring-[3px]",
          className
        ),
      }}
    />
  );
}

function InputOTPGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-group"
      className={cn("flex items-center gap-1", className)}
      {...props}
    />
  );
}

function InputOTPSlot({
  index,
  className,
  char,
  isActive,
  hasFakeCaret,
  ...props
}: React.ComponentProps<"div"> & {
  index: number;
  char?: string;
  isActive?: boolean;
  hasFakeCaret?: boolean;
}) {
  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive}
      className={cn(
        "data-[active=true]:border-ring data-[active=true]:ring-ring/50 border-input relative flex h-9 w-9 items-center justify-center border-y border-r text-sm bg-input-background transition-all outline-none first:rounded-l-md first:border-l last:rounded-r-md data-[active=true]:z-10 data-[active=true]:ring-[3px]",
        className
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="animate-caret-blink bg-foreground h-4 w-px duration-1000" />
        </div>
      )}
    </div>
  );
}

function InputOTPSeparator({ ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="input-otp-separator" role="separator" {...props}>
      <MinusIcon />
    </div>
  );
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
