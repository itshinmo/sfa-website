import { expect, test } from "@playwright/test";

test("home renders in Persian and exposes the primary CTA", async ({ page }) => {
  await page.goto("/fa");

  await expect(page).toHaveTitle(/صفا/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("آب دقیق");
  await expect(page.getByRole("link", { name: "دریافت صفا" }).first()).toBeVisible();
});

test("blog index renders posts and opens a detail page", async ({ page }) => {
  await page.goto("/en/blog");

  await expect(page.getByRole("heading", { level: 1, name: "Blog" })).toBeVisible();
  await expect(page.getByRole("article").first()).toBeVisible();

  await page
    .getByRole("link", { name: /soil texture/i })
    .first()
    .click();

  await expect(page).toHaveURL(/\/en\/blog\/soil-texture-triangle/);
  await expect(
    page.getByRole("heading", { level: 1, name: /soil texture classes/i }),
  ).toBeVisible();
});

test("language switcher keeps the locale route working", async ({ page }) => {
  await page.goto("/fa");
  await page.getByRole("link", { name: /English/ }).click();

  await expect(page).toHaveURL(/\/en$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Precise water");
});

test("blog language switch uses the translated slug", async ({ page }) => {
  await page.goto("/en/blog/soil-texture-triangle");
  await page.getByRole("link", { name: /فارسی/ }).click();

  await expect(page).toHaveURL(/\/fa\/blog\/%D9%85%D8%AB%D9%84%D8%AB/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("بافت خاک");
});

test("unknown routes render the localized 404 page", async ({ page }) => {
  const response = await page.goto("/fa/does-not-exist");

  expect(response?.status()).toBe(404);
  await expect(page).toHaveTitle("صفحه پیدا نشد");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("پیدا نشد");
});

test("global 404s use the detected locale and a document title", async ({ page }) => {
  const response = await page.goto("/does-not-exist");

  expect(response?.status()).toBe(404);
  await expect(page).toHaveTitle(/Page not found|صفحه پیدا نشد/);
});
