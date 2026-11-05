import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { Link, type LinkProps } from "react-router";
import { cn } from "~/shared/lib/cn";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-button text-sm font-semibold whitespace-nowrap transition-[background-color,color,border-color,box-shadow,transform] duration-[var(--motion-duration-fast)] ease-[var(--motion-ease-out)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-focus disabled:pointer-events-none disabled:opacity-50 motion-safe:hover:-translate-y-0.5",
  {
    variants: {
      intent: {
        primary: "bg-brand text-white shadow-card hover:bg-brand-700",
        secondary: "bg-brand-soft text-brand-strong hover:bg-brand-100",
        outline:
          "border border-border-strong bg-transparent text-foreground hover:border-brand hover:text-brand",
        ghost: "bg-transparent text-foreground hover:bg-surface-muted",
        surface:
          "bg-surface text-brand-strong shadow-card hover:bg-brand-50 focus-visible:outline-focus-inverse",
        inverse:
          "border border-white/60 bg-transparent text-white hover:border-white hover:bg-white/10 focus-visible:outline-focus-inverse",
      },
      size: {
        sm: "h-9 px-4",
        md: "h-11 px-5",
        lg: "h-13 px-7 text-base",
        icon: "size-11 p-0",
      },
    },
    defaultVariants: {
      intent: "primary",
      size: "md",
    },
  },
);

export type ButtonProps = React.ComponentProps<typeof ButtonPrimitive> &
  VariantProps<typeof buttonVariants>;

export function Button({ className, intent, size, ...props }: ButtonProps) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ intent, size }), className)}
      {...props}
    />
  );
}

export type LinkButtonProps = LinkProps &
  VariantProps<typeof buttonVariants> & {
    className?: string;
  };

export function LinkButton({ className, intent, size, ...props }: LinkButtonProps) {
  return (
    <Link
      data-slot="button-link"
      className={cn(buttonVariants({ intent, size }), className)}
      {...props}
    />
  );
}

export type AnchorButtonProps = React.ComponentProps<"a"> &
  VariantProps<typeof buttonVariants>;

export function AnchorButton({
  className,
  intent,
  size,
  children,
  ...props
}: AnchorButtonProps) {
  return (
    <a
      data-slot="button-link"
      className={cn(buttonVariants({ intent, size }), className)}
      {...props}
    >
      {children}
    </a>
  );
}
