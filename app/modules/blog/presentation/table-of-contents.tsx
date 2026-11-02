import type { MouseEvent } from "react";
import type { BlogContentHeading } from "../domain/content-headings";

type TableOfContentsProps = {
  items: BlogContentHeading[];
  label: string;
};

function focusHeading(event: MouseEvent<HTMLAnchorElement>, id: string) {
  if (
    event.defaultPrevented ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  ) {
    return;
  }

  const target = document.getElementById(id);
  if (!target) return;

  // Handle the hash navigation ourselves so focus lands on the heading after
  // the scroll instead of returning to the document body.
  event.preventDefault();
  if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
  target.focus({ preventScroll: true });
  target.scrollIntoView({ block: "start" });
  window.history.pushState(null, "", `#${id}`);
}

export function TableOfContents({ items, label }: TableOfContentsProps) {
  if (items.length < 2) return null;

  return (
    <nav
      data-slot="post-toc"
      aria-labelledby="post-toc-heading"
      className="rounded-card border border-border bg-surface p-5 lg:sticky lg:top-[calc(var(--header-height)+1rem)]"
    >
      <h2
        id="post-toc-heading"
        className="text-sm font-bold tracking-wide text-foreground-strong uppercase"
      >
        {label}
      </h2>
      <ol className="mt-4 space-y-2 text-sm">
        {items.map((item) => (
          <li key={item.id} className={item.level === 3 ? "ps-4" : undefined}>
            <a
              href={`#${item.id}`}
              onClick={(event) => focusHeading(event, item.id)}
              className="text-muted underline-offset-4 transition-colors hover:text-brand hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
