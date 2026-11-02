import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

for (const path of [
  "/fa",
  "/fa/blog",
  "/en",
  "/en/blog",
  "/en/blog/soil-texture-triangle",
  "/fa/blog/مثلث-بافت-خاک",
  "/en/blog?q=texture",
  "/fa/blog?tag=soil",
  "/fa/does-not-exist",
  "/en/does-not-exist",
]) {
  test(`no serious accessibility violations on ${path}`, async ({ page }) => {
    await page.goto(path);

    const results = await new AxeBuilder({ page }).analyze();
    const serious = results.violations.filter((violation) =>
      ["critical", "serious"].includes(violation.impact ?? ""),
    );

    expect(serious).toEqual([]);
  });
}
