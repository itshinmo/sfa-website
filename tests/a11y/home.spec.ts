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

test("homepage hero cue has no serious accessibility violations", async ({ page }) => {
  await page.goto("/en");

  const results = await new AxeBuilder({ page }).analyze();
  const serious = results.violations.filter((violation) =>
    ["critical", "serious"].includes(violation.impact ?? ""),
  );

  expect(serious).toEqual([]);

  const cue = page.getByRole("link", {
    name: "Continue to the next section",
  });
  const box = await cue.boundingBox();

  expect(Math.round(box?.width ?? 0)).toBeGreaterThanOrEqual(44);
  expect(Math.round(box?.height ?? 0)).toBeGreaterThanOrEqual(44);
  await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
});
