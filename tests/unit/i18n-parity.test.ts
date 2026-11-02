import { describe, expect, it } from "vitest";
import resources from "~/locales";

function flattenKeys(value: unknown, prefix = ""): string[] {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return [prefix];
  }

  return Object.entries(value).flatMap(([key, child]) =>
    flattenKeys(child, prefix ? `${prefix}.${key}` : key),
  );
}

describe("locale parity", () => {
  it("has the same translation keys in Persian and English", () => {
    const fa = flattenKeys(resources.fa).sort();
    const en = flattenKeys(resources.en).sort();

    expect(en).toEqual(fa);
  });
});
