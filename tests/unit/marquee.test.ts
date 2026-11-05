import { describe, expect, it } from "vitest";
import { advanceMarquee } from "~/shared/lib/marquee";

const base = { delta: 16, speed: 0.032, period: 1000 };

describe("advanceMarquee", () => {
  it("moves toward negative X in LTR", () => {
    expect(advanceMarquee({ ...base, value: 0, rtl: false })).toBeCloseTo(-0.512);
    expect(advanceMarquee({ ...base, value: -500, rtl: false })).toBeCloseTo(-500.512);
  });

  it("moves toward positive X in RTL", () => {
    expect(advanceMarquee({ ...base, value: 0, rtl: true })).toBeCloseTo(0.512);
    expect(advanceMarquee({ ...base, value: 500, rtl: true })).toBeCloseTo(500.512);
  });

  it("wraps seamlessly at the end of the set in both directions", () => {
    expect(advanceMarquee({ ...base, value: -999.8, rtl: false })).toBeCloseTo(-0.312);
    expect(advanceMarquee({ ...base, value: 999.8, rtl: true })).toBeCloseTo(0.312);
  });

  it("keeps a stale direction value inside the correct range", () => {
    const ltr = advanceMarquee({ ...base, value: 500, rtl: false });
    const rtl = advanceMarquee({ ...base, value: -500, rtl: true });

    expect(ltr).toBeLessThanOrEqual(0);
    expect(ltr).toBeGreaterThan(-1000);
    expect(rtl).toBeGreaterThanOrEqual(0);
    expect(rtl).toBeLessThan(1000);
  });
});
