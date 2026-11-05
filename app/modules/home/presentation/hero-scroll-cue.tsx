import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "~/shared/lib/cn";

type HeroScrollCueProps = {
  label: string;
};

/**
 * Opaque cue pinned to the bottom of the viewport while the hero is in view.
 *
 * It stays a plain anchor without JavaScript, hides after a short scroll
 * without removing layout, and falls back to a static circle when motion is
 * reduced.
 */
export function HeroScrollCue({ label }: HeroScrollCueProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY <= 8);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      data-slot="hero-scroll-cue"
      data-visible={visible ? "true" : "false"}
      href="#features"
      aria-label={label}
      aria-hidden={visible ? undefined : true}
      tabIndex={visible ? undefined : -1}
      className={cn(
        "hero-scroll-cue fixed start-0 end-0 bottom-[max(1.5rem,env(safe-area-inset-bottom))] z-[var(--z-header)] mx-auto flex size-12 items-center justify-center rounded-pill border border-white/60 bg-surface text-brand-strong shadow-panel transition-[background-color,opacity,visibility] duration-[var(--motion-duration-base)] ease-[var(--motion-ease-out)] hover:bg-brand-50 focus-visible:bg-brand-50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus-inverse motion-reduce:transition-none",
        visible ? "visible opacity-50" : "pointer-events-none invisible opacity-0",
      )}
    >
      <ChevronDown aria-hidden="true" className="size-5" />
    </a>
  );
}
