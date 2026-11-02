import { describe, expect, it } from "vitest";
import { formatDate } from "~/shared/lib/format-date";
import { formatNumber } from "~/shared/lib/format-number";

describe("formatDate", () => {
  it("formats a valid ISO date per locale", () => {
    expect(formatDate("2026-06-12T12:00:00.000Z", "en")).toMatch(/2026/);
    expect(formatDate("2026-06-12T12:00:00.000Z", "fa")).toMatch(/[۰-۹]/);
  });

  it("returns a safe fallback for invalid dates", () => {
    expect(() => formatDate("not-a-date", "fa")).not.toThrow();
    expect(formatDate("not-a-date", "fa")).toBe("—");
    expect(formatDate("2026-13-40T08:00:00.000Z", "en")).toBe("—");
  });

  it("accepts a custom fallback", () => {
    expect(formatDate("", "en", "Unknown")).toBe("Unknown");
  });
});

describe("formatNumber", () => {
  it("uses Persian digits for fa", () => {
    expect(formatNumber(10, "fa")).toBe("۱۰");
  });

  it("keeps Latin digits for en", () => {
    expect(formatNumber(10, "en")).toBe("10");
  });
});
