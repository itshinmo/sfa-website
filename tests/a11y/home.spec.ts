import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.use({ viewport: { width: 390, height: 844 }, reducedMotion: "reduce" });

for (const path of ["/fa", "/en"]) {
  test(`homepage has no serious accessibility violations on ${path}`, async ({
    page,
  }) => {
    await page.goto(path);

    const results = await new AxeBuilder({ page }).analyze();
    const serious = results.violations.filter((violation) =>
      ["critical", "serious"].includes(violation.impact ?? ""),
    );

    expect(serious).toEqual([]);

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );

    expect(overflow).toBeLessThanOrEqual(1);
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
  });
}
