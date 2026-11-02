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

  useEffect(() => {
    if (!inView || reduceMotion) return;

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
