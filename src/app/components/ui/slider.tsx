"use client";

import * as React from "react";
import { Slider as MantineSlider } from "@mantine/core";

import { cn } from "./utils";

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  step = 1,
  onValueChange,
  onValueCommit,
  disabled,
  orientation,
  ...props
}: React.ComponentProps<"div"> & {
  defaultValue?: number[];
  value?: number[];
  min?: number;
  max?: number;
  step?: number;
  onValueChange?: (value: number[]) => void;
  onValueCommit?: (value: number[]) => void;
  disabled?: boolean;
  orientation?: "horizontal" | "vertical";
}) {
  const singleValue = Array.isArray(value) ? value[0] : undefined;
  const singleDefault = Array.isArray(defaultValue) ? defaultValue[0] : undefined;

  return (
    <div
      data-slot="slider"
      className={cn(
        "relative flex w-full touch-none items-center select-none",
        disabled && "opacity-50",
        className
      )}
      {...props}
    >
      <MantineSlider
        min={min}
        max={max}
        step={step}
        value={singleValue}
        defaultValue={singleDefault ?? min}
        onChange={(val) => onValueChange?.([val])}
        onChangeEnd={(val) => onValueCommit?.([val])}
        disabled={disabled}
        classNames={{
          root: "w-full",
          track: "bg-muted h-1.5 rounded-full",
          bar: "bg-primary",
          thumb: "border-primary bg-background ring-ring/50 size-4 rounded-full border shadow-sm hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden",
        }}
      />
    </div>
  );
}

export { Slider };
