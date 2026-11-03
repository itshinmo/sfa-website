import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { cn } from "~/shared/lib/cn";

type CountUpProps = {
  value: number;
  display?: string;
  locale: "fa" | "en";
  duration?: number;
  className?: string;
};

export function CountUp({
  value,
  display,
  locale,
  duration = 1.2,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduceMotion = useReducedMotion();
  const [current, setCurrent] = useState<number | null>(null);
  const initialized = useRef(false);
  const initialInView = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const element = ref.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    // jsdom returns a zero-sized rect; keep the final value there.
    if (rect.width === 0 && rect.height === 0) return;

    const visible = rect.top < window.innerHeight && rect.bottom > 0;
    initialInView.current = visible;

    if (!visible && !reduceMotion) {
      // The number is below the fold. Start at zero now, while it is not
      // visible, so entering the viewport does not flash the final value first.
      setCurrent(0);
    }
  }, [reduceMotion]);

  useEffect(() => {
    if (!inView || reduceMotion || initialInView.current) return;

    const controls = animate(0, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setCurrent(Math.round(latest)),
    });

    return () => controls.stop();
  }, [duration, inView, reduceMotion, value]);

  const finalText =
    display ?? new Intl.NumberFormat(locale === "fa" ? "fa-IR" : "en-US").format(value);
  const text =
    reduceMotion || current === null
      ? finalText
      : new Intl.NumberFormat(locale === "fa" ? "fa-IR" : "en-US").format(current);

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {text}
    </span>
  );
}
