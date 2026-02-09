"use client";

import * as React from "react";
import { Carousel as MantineCarousel } from "@mantine/carousel";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "./utils";
import { Button } from "./button";

type CarouselApi = any;

type CarouselProps = {
  opts?: Record<string, any>;
  plugins?: any;
  orientation?: "horizontal" | "vertical";
  setApi?: (api: CarouselApi) => void;
  className?: string;
  children?: React.ReactNode;
};

function Carousel({
  orientation = "horizontal",
  className,
  children,
  ...props
}: CarouselProps & React.ComponentProps<"div">) {
  return (
    <MantineCarousel
      data-slot="carousel"
      orientation={orientation}
      className={cn("relative", className)}
      withControls={false}
      {...props}
    >
      {children}
    </MantineCarousel>
  );
}

function CarouselContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="carousel-content"
      className={cn("flex", className)}
      {...props}
    />
  );
}

function CarouselItem({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <MantineCarousel.Slide
      data-slot="carousel-item"
      className={cn("min-w-0 shrink-0 grow-0 basis-full", className)}
      {...props}
    />
  );
}

function CarouselPrevious({
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <Button
      data-slot="carousel-previous"
      variant="outline"
      size="icon"
      className={cn("absolute size-8 rounded-full top-1/2 -left-12 -translate-y-1/2", className)}
      {...props}
    >
      <ArrowLeft />
      <span className="sr-only">Previous slide</span>
    </Button>
  );
}

function CarouselNext({
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <Button
      data-slot="carousel-next"
      variant="outline"
      size="icon"
      className={cn("absolute size-8 rounded-full top-1/2 -right-12 -translate-y-1/2", className)}
      {...props}
    >
      <ArrowRight />
      <span className="sr-only">Next slide</span>
    </Button>
  );
}

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
};
