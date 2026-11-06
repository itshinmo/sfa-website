import type * as React from "react";
import { cn } from "~/shared/lib/cn";

export function Container({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="container"
      className={cn("mx-auto w-full max-w-(--page-max) px-(--page-gutter)", className)}
      {...props}
    />
  );
}
