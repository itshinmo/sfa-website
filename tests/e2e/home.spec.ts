import { expect, test } from "@playwright/test";

test("homepage hero uses the responsive farmland picture and two CTAs", async ({
  page,
}) => {
  await page.goto("/en");

  const hero = page.locator('[data-slot="home-hero"]');
  const heading = hero.getByRole("heading", { level: 1 });

  await expect(heading).toContainText("Precise water");
  await expect(heading).toContainText("resilient farms");

  const image = hero.locator("img");
  await expect(image).toHaveAttribute("fetchpriority", "high");
  await expect(image).toHaveAttribute("loading", "eager");
  await expect(image).toHaveAttribute("decoding", "async");
  await expect(image).toHaveAttribute("alt", "A green farm field in daylight");
  await expect(image).toHaveAttribute("width", "1200");
  await expect(image).toHaveAttribute("height", "1800");

  const sources = await hero.locator("source").evaluateAll((elements) =>
    elements.map((element) => ({
      media: element.getAttribute("media"),
      srcset: element.getAttribute("srcset"),
      type: element.getAttribute("type"),
    })),
  );

  expect(sources).toEqual([
    {
      media: "(min-width: 768px)",
      srcset: "/images/homepage/hero-landscape.webp",
      type: "image/webp",
    },
    {
      media: "(min-width: 768px)",
      srcset: "/images/homepage/hero-landscape.jpg",
      type: "image/jpeg",
    },
    {
      media: null,
      srcset: "/images/homepage/hero-portrait.webp",
      type: "image/webp",
    },
  ]);

  await expect(hero.getByRole("link", { name: "Get SFA" })).toHaveAttribute(
    "href",
    "#download",
  );
  await expect(hero.getByRole("link", { name: "See how SFA works" })).toHaveAttribute(
    "href",
    "#showcase",
  );
});

test("homepage renders the selected sections in order", async ({ page }) => {
  await page.goto("/en");

  for (const name of [
    "A plan that follows the crop",
    "From field data to an irrigation decision",
    "Research results",
    "Achievements",
    "The SFA team",
    "Research partners",
    "Latest writing",
    "Frequently asked questions",
    "Bring SFA to your devices",
    "Get in touch",
  ]) {
    await expect(page.getByRole("heading", { level: 2, name })).toHaveCount(1);
  }

  await expect(page.locator("#blog article")).toHaveCount(3);
  await expect(page.locator("#research dd")).toHaveCount(4);
  await expect(page.locator("#research")).toContainText("2,000");
  await expect(page.locator('[data-slot="team-card"]')).toHaveCount(6);
  await expect(page.locator('[data-slot="partner-card"]')).toHaveCount(2);

  const firstTeamLink = page.locator('[data-slot="team-card"] a').first();
  await expect(firstTeamLink).toHaveAttribute("target", "_blank");
  await expect(firstTeamLink).toHaveAttribute("rel", "noreferrer");
});

test("FAQ answers are server-rendered and open natively", async ({ page }) => {
  await page.goto("/en", { waitUntil: "networkidle" });

  const firstItem = page.locator("#faq details").first();
  const summary = firstItem.locator("summary");

  await expect(firstItem).not.toHaveAttribute("open");
  await expect(firstItem).toContainText(
    "SFA is an AI-assisted irrigation optimization system",
  );

  await summary.focus();
  await expect(summary).toBeFocused();
  await page.keyboard.press("Enter");

  await expect(firstItem).toHaveAttribute("open");
  await expect(
    firstItem.getByText("SFA is an AI-assisted irrigation optimization system", {
      exact: false,
    }),
  ).toBeVisible();
});

test("downloads separate available links from disabled placeholders", async ({
  page,
}) => {
  await page.goto("/en");

  const downloads = page.locator("#download");
  const web = downloads.getByRole("link", { name: /Web app/i });

  await expect(web).toHaveAttribute("href", "https://sfa-agri.ir");
  await expect(web).toHaveAttribute("target", "_blank");
  await expect(web).toHaveAttribute("rel", "noreferrer");

  await expect(downloads.getByRole("button", { name: /Google Play/i })).toBeDisabled();
  await expect(downloads.getByRole("button", { name: /Windows/i })).toBeDisabled();
  await expect(downloads).toContainText("Store links will be added");
});

test("homepage header is transparent over the hero and solid elsewhere", async ({
  page,
}) => {
  await page.goto("/en");

  const header = page.locator("header");
  await expect(header).toHaveAttribute("data-transparent", "true");

  await page.evaluate(() => window.scrollTo({ top: 600, behavior: "instant" }));
  await expect(header).toHaveAttribute("data-transparent", "false");
  await expect(header).toHaveClass(/bg-background\/90/);

  await page.goto("/en/blog");
  await expect(header).toHaveAttribute("data-transparent", "false");
});

test("homepage content is visible without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({
    baseURL: test.info().project.use.baseURL,
    javaScriptEnabled: false,
    viewport: { width: 1280, height: 900 },
  });
  const page = await context.newPage();

  await page.goto("/en");

  await expect(page.getByRole("heading", { level: 1 })).toContainText("Precise water");
  await expect(
    page.getByRole("heading", { level: 2, name: "Research results" }),
  ).toHaveCount(1);
  await expect(page.locator("#download")).toContainText("Web app");

  await context.close();
});

test("homepage fits 360px and stays usable with reduced motion", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/fa");

  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );

  expect(overflow).toBeLessThanOrEqual(1);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("آب دقیق");

  await page.locator("#research").scrollIntoViewIfNeeded();
  await expect(page.locator("#research")).toContainText("۲٬۰۰۰");
});
