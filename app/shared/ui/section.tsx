import type * as React from "react";
import { cn } from "~/shared/lib/cn";

type SectionProps = React.ComponentProps<"section"> & {
  tone?: "default" | "muted" | "brand";
};

const toneClasses: Record<NonNullable<SectionProps["tone"]>, string> = {
  default: "bg-background text-foreground",
  muted: "bg-surface-muted text-foreground",
  brand: "bg-brand-strong text-white",
};

export function Section({ className, tone = "default", ...props }: SectionProps) {
  return (
    <section
      data-slot="section"
      className={cn("py-16 sm:py-20 lg:py-24", toneClasses[tone], className)}
      {...props}
    />
  );
}
