"use client";

import * as React from "react";
import { AspectRatio as MantineAspectRatio } from "@mantine/core";

function AspectRatio({
  ratio,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  ratio?: number;
}) {
  return (
    <MantineAspectRatio
      data-slot="aspect-ratio"
      ratio={ratio}
      {...props}
    >
      {children}
    </MantineAspectRatio>
  );
}

export { AspectRatio };
