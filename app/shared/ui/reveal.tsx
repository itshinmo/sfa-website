import type { CSSProperties, ReactNode } from "react";
import { cn } from "~/shared/lib/cn";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Kept for call-site compatibility; scroll-driven ranges are not time-based. */
  delay?: number;
};

/**
 * Progressive reveal without a hydration-time hiding step. The browser's
 * view() timeline handles the entrance only when supported; elsewhere the
 * content is immediately visible. This avoids the SSR-visible → JS-hidden →
 * revealed flash that a client-only IntersectionObserver creates.
 */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  return (
    <div
      data-slot="reveal"
      className={cn("reveal", className)}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}
