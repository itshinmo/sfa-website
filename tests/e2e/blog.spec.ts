import { expect, test } from "@playwright/test";

test("blog search updates results, announces the count, and is noindexed", async ({
  page,
}) => {
  await page.goto("/en/blog");

  await page.getByLabel("Search the blog").fill("classes");
  await page.getByRole("button", { name: "Search" }).click();

  await expect(page).toHaveURL(/\/en\/blog\?q=classes$/);
  await expect(page.getByRole("status")).toContainText(/1 result for “classes”/);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  await expect(page.getByRole("link", { name: /soil texture classes/i })).toBeVisible();

  await page.getByRole("link", { name: "Clear filters" }).click();

  await expect(page).toHaveURL(/\/en\/blog$/);
  await expect(page.getByRole("status")).toContainText("10 articles");
});

test("blog tag filters are links with an accessible current state", async ({ page }) => {
  await page.goto("/en/blog");

  const topics = page.getByRole("navigation", { name: "Topics" });
  await topics.getByRole("link", { name: /^Water/ }).click();

  await expect(page).toHaveURL(/\/en\/blog\?tag=water$/);
  await expect(page.getByRole("status")).toContainText("Topics: Water");
  await expect(topics.getByRole("link", { name: /^Water/ })).toHaveAttribute(
    "aria-current",
    "page",
  );
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
});

test("blog supports multiple filters and removing them independently", async ({
  page,
}) => {
  await page.goto("/en/blog");

  const topics = page.getByRole("navigation", { name: "Topics" });
  await topics.getByRole("link", { name: /^Water/ }).click();
  await expect(page).toHaveURL(/\/en\/blog\?tag=water$/);

  await topics.getByRole("link", { name: /^Research/ }).click();
  await expect(page).toHaveURL(/\/en\/blog\?tag=water&tag=research$/);
  await expect(page.getByRole("status")).toContainText("Topics: Water, Research");
  await expect(page.getByRole("article")).toHaveCount(1);

  const remove = page.getByRole("link", { name: "Remove Water" });
  await expect(remove).toBeVisible();
  await remove.click();

  await expect(page).toHaveURL(/\/en\/blog\?tag=research$/);
  await expect(page.getByRole("status")).toContainText("Topics: Research");
  await expect(page.getByRole("article")).toHaveCount(4);
});

test("blog pagination moves between pages", async ({ page }) => {
  await page.goto("/en/blog");

  await expect(page.getByRole("article")).toHaveCount(9);

  await page.getByRole("link", { name: "Next" }).click();

  await expect(page).toHaveURL(/\/en\/blog\?page=2$/);
  await expect(page.getByRole("article")).toHaveCount(1);

  const pagination = page.getByRole("navigation", { name: "Pagination" });
  await expect(pagination).toContainText("Page 2 of 2");

  await page.getByRole("link", { name: "Previous" }).click();

  await expect(page).toHaveURL(/\/en\/blog$/);
  await expect(page.getByRole("article")).toHaveCount(9);
});

test("blog search empty state offers a way to clear filters", async ({ page }) => {
  await page.goto("/en/blog?q=no-such-article");

  await expect(page.getByText("No article matched your search.")).toBeVisible();
  await expect(page.getByRole("link", { name: "Clear filters" }).first()).toBeVisible();
});

test("blog detail builds a table of contents from structured headings", async ({
  page,
}) => {
  await page.goto("/en/blog/soil-texture-triangle", { waitUntil: "networkidle" });
  await expect(page.locator("html")).toHaveAttribute("data-hydrated", "true");

  const toc = page.getByRole("navigation", { name: "On this page" });
  await expect(toc).toBeVisible();

  const link = toc.getByRole("link", { name: /Sandy Soil Group/ });
  await expect(link).toHaveAttribute("href", "#reference-section-1");

  await link.click();

  await expect(page).toHaveURL(/#reference-section-1$/);
  await expect(page.locator("#reference-section-1")).toBeVisible();
  await expect(page.locator("#reference-section-1")).toBeFocused();
});

test("blog table of contents sticks while the article scrolls", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/en/blog/soil-texture-triangle", { waitUntil: "networkidle" });

  const toc = page.getByRole("navigation", { name: "On this page" });
  await expect(toc).toHaveCSS("position", "sticky");

  const headerHeight = await page
    .locator("header")
    .first()
    .evaluate((element) => element.getBoundingClientRect().height);
  const initial = await toc.boundingBox();

  await page.evaluate(() => window.scrollTo({ top: 1600, behavior: "instant" }));
  await page.waitForTimeout(150);

  const stuck = await toc.boundingBox();
  const expectedTop = headerHeight + 16;

  expect(initial?.y ?? 0).toBeGreaterThan(expectedTop);
  expect(Math.abs((stuck?.y ?? 0) - expectedTop)).toBeLessThanOrEqual(2);
});

test("blog table of contents precedes the body on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/en/blog/soil-texture-triangle", { waitUntil: "networkidle" });

  const cover = await page.locator('[data-slot="post-cover"]').boundingBox();
  const toc = await page.locator('[data-slot="post-toc"]').boundingBox();
  const body = await page.locator('[data-slot="post-body"]').boundingBox();

  expect(toc?.y ?? 0).toBeGreaterThan(cover?.y ?? 0);
  expect(toc?.y ?? 0).toBeLessThan(body?.y ?? 0);
});

test("skip link moves focus to main content", async ({ page }) => {
  await page.goto("/en/blog");

  await page.keyboard.press("Tab");
  const skipLink = page.getByRole("link", { name: "Skip to main content" });
  await expect(skipLink).toBeFocused();

  await page.keyboard.press("Enter");
  await expect(page.locator("#main-content")).toBeFocused();
});

test("blog detail exposes breadcrumbs and related reading", async ({ page }) => {
  await page.goto("/en/blog/soil-texture-triangle");

  const breadcrumbs = page.getByRole("navigation", { name: "Breadcrumb" });
  await expect(breadcrumbs.getByRole("link", { name: "Blog" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Related reading" })).toBeVisible();
});

test("case-study headings follow the content locale", async ({ page }) => {
  await page.goto("/fa/blog/نتایج-پایلوت-اس-اف-ای");

  await expect(page.getByRole("heading", { level: 2, name: "چالش" })).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: "راه‌حل" })).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: "نتایج" })).toBeVisible();
});

test("fallback content shows a visible notice and declares its content locale", async ({
  page,
}) => {
  await page.goto("/en/blog/مثلث-بافت-خاک");

  await expect(page.getByRole("note")).toContainText("not available in English");

  const heading = page.getByRole("heading", { level: 1 });
  await expect(heading).toContainText("بافت خاک");
  await expect(heading).toHaveAttribute("lang", "fa");
  await expect(heading).toHaveAttribute("dir", "rtl");

  const body = page.locator('[data-slot="post-body"]');
  await expect(body).toHaveAttribute("lang", "fa");
  await expect(body).toHaveAttribute("dir", "rtl");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
});

test("Persian blog counts and reading time use Persian digits", async ({ page }) => {
  await page.goto("/fa/blog");

  await expect(page.getByRole("status")).toContainText("۱۰ مقاله");
  await expect(page.getByRole("status")).toContainText("صفحه ۱ از ۲");

  await page.goto("/fa/blog/مثلث-بافت-خاک");
  await expect(page.getByText("۶ دقیقه مطالعه")).toBeVisible();
});
