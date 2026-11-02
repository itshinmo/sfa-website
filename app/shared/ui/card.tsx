import type * as React from "react";
import { cn } from "~/shared/lib/cn";

export function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "rounded-panel border border-border bg-surface shadow-card",
        className,
      )}
      {...props}
    />
  );
}
