type AdvanceMarqueeOptions = {
  /** Current translation in pixels. */
  value: number;
  /** Frame delta in milliseconds. */
  delta: number;
  /** Pixels per millisecond. */
  speed: number;
  /** Width of one card set plus the gap before its duplicate. */
  period: number;
  /** Whether the document direction is right-to-left. */
  rtl: boolean;
};

/**
 * Advances a continuous marquee and wraps it over one card set.
 *
 * LTR moves toward negative X; RTL moves toward positive X so the duplicate
 * set enters from the left in the reading direction. Wrapping uses the exact
 * set width plus the inter-set gap, not half of `scrollWidth`, so the reset is
 * seamless.
 */
export function advanceMarquee({
  value,
  delta,
  speed,
  period,
  rtl,
}: AdvanceMarqueeOptions): number {
  if (period <= 0) return 0;

  const step = delta * speed;
  const next = value + (rtl ? step : -step);
  const wrapped = ((next % period) + period) % period;

  return rtl ? wrapped : wrapped - period;
}
