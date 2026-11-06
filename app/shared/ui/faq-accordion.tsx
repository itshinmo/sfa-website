import { Accordion } from "@base-ui/react/accordion";
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
 * Base UI supplies the disclosure semantics, keyboard behavior, and the
 * height animation. Panels stay mounted so the answers remain in the SSR
 * payload; the noscript fallback in the root layout reveals them when
 * JavaScript is unavailable.
 */
export function FaqAccordion({ items, className }: FaqAccordionProps) {
  return (
    <Accordion.Root
      data-slot="faq-accordion"
      multiple={false}
      className={cn(
        "divide-y divide-border overflow-hidden rounded-panel border border-border bg-surface",
        className,
      )}
    >
      {items.map((item) => (
        <Accordion.Item key={item.value} value={item.value} data-slot="faq-item">
          <Accordion.Header className="m-0">
            <Accordion.Trigger
              data-slot="faq-trigger"
              className="group flex min-h-14 w-full cursor-pointer items-center justify-between gap-4 px-6 py-4 text-start text-base font-semibold text-foreground-strong transition-colors duration-(--motion-duration-fast) hover:text-brand focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-focus"
            >
              <span>{item.question}</span>
              <ChevronDown
                aria-hidden="true"
                className="size-5 shrink-0 text-muted transition-transform duration-(--motion-duration-base) ease-(--motion-ease-out) group-data-panel-open:rotate-180"
              />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Panel
            data-slot="faq-panel"
            keepMounted
            className="h-(--accordion-panel-height) overflow-hidden text-sm leading-normal text-muted transition-[height,opacity,transform] duration-(--motion-duration-base) ease-(--motion-ease-out) data-ending-style:h-0 data-ending-style:-translate-y-1 data-ending-style:opacity-0 data-starting-style:h-0 data-starting-style:-translate-y-1 data-starting-style:opacity-0 sm:text-base"
          >
            <div className="px-6 pb-5">{item.answer}</div>
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
