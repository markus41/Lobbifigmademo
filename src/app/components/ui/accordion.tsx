"use client";

import {
  Accordion as MantineAccordion,
  type AccordionProps as MantineAccordionProps,
  type AccordionItemProps as MantineAccordionItemProps,
  type AccordionControlProps as MantineAccordionControlProps,
  type AccordionPanelProps as MantineAccordionPanelProps,
} from "@mantine/core";
import { cn } from "./utils";

interface AccordionProps extends Omit<MantineAccordionProps, "classNames"> {
  className?: string;
}

function Accordion({ className, ...props }: AccordionProps) {
  return (
    <MantineAccordion
      data-slot="accordion"
      variant="separated"
      classNames={{
        root: cn(className),
        item: "border-b last:border-b-0 border-none",
        control: "px-0 hover:bg-transparent",
        chevron: "text-muted-foreground",
        content: "px-0 pt-0 pb-4",
        label: "text-sm font-medium",
      }}
      {...props}
    />
  );
}

interface AccordionItemProps extends Omit<MantineAccordionItemProps, "classNames"> {
  className?: string;
}

function AccordionItem({ className, ...props }: AccordionItemProps) {
  return (
    <MantineAccordion.Item
      data-slot="accordion-item"
      className={cn("border-b last:border-b-0", className)}
      {...props}
    />
  );
}

interface AccordionTriggerProps extends Omit<MantineAccordionControlProps, "classNames"> {
  className?: string;
}

function AccordionTrigger({ className, ...props }: AccordionTriggerProps) {
  return (
    <MantineAccordion.Control
      data-slot="accordion-trigger"
      className={cn(
        "flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all hover:underline",
        className
      )}
      {...props}
    />
  );
}

interface AccordionContentProps extends Omit<MantineAccordionPanelProps, "classNames"> {
  className?: string;
}

function AccordionContent({ className, ...props }: AccordionContentProps) {
  return (
    <MantineAccordion.Panel
      data-slot="accordion-content"
      className={cn("text-sm", className)}
      {...props}
    />
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
