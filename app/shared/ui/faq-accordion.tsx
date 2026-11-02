import { ChevronDown } from "lucide-react";
import { cn } from "~/shared/lib/cn";

export type FaqItem = {
  value: string;
  question: string;
  answer: string;
};

type FaqAccordionProps = {
  items: FaqItem[];
  className?: string;
};

/**
 * Native disclosure elements keep every answer in the server-rendered DOM and
 * work without JavaScript. No custom accordion state or focus trap is needed.
 */
export function FaqAccordion({ items, className }: FaqAccordionProps) {
  return (
    <div
      data-slot="faq-accordion"
      className={cn(
        "divide-y divide-border overflow-hidden rounded-panel border border-border bg-surface",
        className,
      )}
    >
      {items.map((item) => (
        <details key={item.value} data-slot="faq-item" className="group">
          <summary
            data-slot="faq-trigger"
            className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-6 py-4 text-start text-base font-semibold text-foreground-strong transition-colors hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-focus [&::-webkit-details-marker]:hidden"
          >
            <span>{item.question}</span>
            <ChevronDown
              aria-hidden="true"
              className="size-5 shrink-0 text-muted transition-transform duration-[var(--motion-duration-fast)] group-open:rotate-180"
            />
          </summary>
          <div
            data-slot="faq-panel"
            className="px-6 pb-5 text-sm leading-normal text-muted sm:text-base"
          >
            {item.answer}
          </div>
        </details>
      ))}
    </div>
  );
}
