import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "~/shared/lib/cn";

const badgeVariants = cva(
  "inline-flex items-center rounded-pill px-3 py-1 text-xs font-semibold tracking-wide",
  {
    variants: {
      tone: {
        neutral: "bg-surface-muted text-muted",
        brand: "bg-brand-soft text-brand-strong",
        water: "bg-water-100 text-water-700",
      },
    },
    defaultVariants: { tone: "brand" },
  },
);

export type BadgeProps = React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants>;

export function Badge({ className, tone, ...props }: BadgeProps) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ tone }), className)}
      {...props}
    />
  );
}
