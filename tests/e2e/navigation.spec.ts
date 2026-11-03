import { expect, test } from "@playwright/test";

test.use({ viewport: { width: 390, height: 844 } });

test("mobile navigation closes on Escape and restores focus", async ({ page }) => {
  await page.goto("/fa", { waitUntil: "networkidle" });
  await expect(page.locator("html")).toHaveAttribute("data-hydrated", "true");

  const trigger = page.getByRole("button", { name: "باز کردن منو" });
  await trigger.click();

  const navigation = page.locator("#mobile-navigation");
  await expect(navigation).toBeVisible();

  await page.keyboard.press("Escape");

  await expect(navigation).toHaveCount(0);
  await expect(page.getByRole("button", { name: "باز کردن منو" })).toBeFocused();
});
