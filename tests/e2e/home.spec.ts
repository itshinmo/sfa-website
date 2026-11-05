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
  await page.goto("/en", { waitUntil: "networkidle" });
  await expect(page.locator("html")).toHaveAttribute("data-hydrated", "true");

  for (const name of [
    "A plan that follows the crop",
    "From field data to an irrigation decision",
    "Research results",
    "Achievements",
    "The SFA team",
    "Latest writing",
    "Frequently asked questions",
    "Bring SFA to your devices",
    "Get in touch",
  ]) {
    await expect(page.getByRole("heading", { level: 2, name })).toHaveCount(1);
  }

  await expect(page.locator("#blog article")).toHaveCount(3);
  await expect(page.locator("#research dd")).toHaveCount(4);
  await page.locator("#research").scrollIntoViewIfNeeded();
  await expect(page.locator("#research")).toContainText("2,000", {
    timeout: 10_000,
  });
  await expect(page.locator('[data-slot="team-card"]')).toHaveCount(6);
  await expect(page.locator('[data-slot="team-card-clone"]')).toHaveCount(6);
  await expect(page.locator('footer img[src*="swri"]')).toHaveCount(1);
  await expect(page.locator("footer")).toContainText("Soil and Water Research Institute");

  const firstTeamLink = page.locator('[data-slot="team-card"] a').first();
  await expect(firstTeamLink).toHaveAttribute("target", "_blank");
  await expect(firstTeamLink).toHaveAttribute("rel", "noreferrer");

  await expect(
    page.getByRole("button", {
      name: /team carousel|توقف حرکت تیم|پخش حرکت تیم/i,
    }),
  ).toHaveCount(0);
});

test("team carousel advances in both LTR and RTL", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });

  for (const [path, direction] of [
    ["/en", "ltr"],
    ["/fa", "rtl"],
  ] as const) {
    await page.goto(path, { waitUntil: "networkidle" });
    await page.locator("#team").scrollIntoViewIfNeeded();

    const track = page.locator('[data-slot="team-track"]');
    const readX = () =>
      track.evaluate((element) => {
        const transform = getComputedStyle(element).transform;
        return transform === "none" ? 0 : new DOMMatrixReadOnly(transform).m41;
      });

    await expect(track).toBeVisible();
    await page.waitForTimeout(120);

    const start = await readX();
    await expect
      .poll(async () => Math.abs((await readX()) - start), { timeout: 3000 })
      .toBeGreaterThan(4);

    const end = await readX();

    if (direction === "rtl") {
      expect(end).toBeGreaterThan(start);
    } else {
      expect(end).toBeLessThan(start);
    }
  }
});

test("FAQ answers are server-rendered and animate open", async ({ page }) => {
  await page.goto("/en", { waitUntil: "networkidle" });
  await expect(page.locator("html")).toHaveAttribute("data-hydrated", "true");

  const trigger = page.getByRole("button", { name: "What is SFA?" });
  await expect(trigger).toHaveAttribute("aria-expanded", "false");

  await trigger.focus();
  await expect(trigger).toBeFocused();
  await page.keyboard.press("Enter");

  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  await expect(
    page.getByText("SFA is an AI-assisted irrigation optimization system", {
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
  await expect(page.locator('[data-slot="faq-noscript"]')).toBeVisible();
  const faqSummary = page.locator('[data-slot="faq-noscript"] summary').first();
  await faqSummary.click();
  await expect(
    page.locator('[data-slot="faq-noscript"] details').first(),
  ).toHaveAttribute("open", "");

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

test("hero cue is a 48px anchor that hides after scrolling", async ({ page }) => {
  await page.goto("/en");

  const cue = page.locator('[data-slot="hero-scroll-cue"]');

  await expect(cue).toBeVisible();
  await expect(cue).toHaveAttribute("href", "#features");
  await expect(cue).toHaveAttribute("aria-label", "Continue to the next section");

  const box = await cue.boundingBox();
  expect(Math.round(box?.width ?? 0)).toBe(48);
  expect(Math.round(box?.height ?? 0)).toBe(48);

  await cue.focus();
  await expect(cue).toBeFocused();

  await page.evaluate(() => window.scrollTo({ top: 240, behavior: "instant" }));
  await expect(cue).toHaveAttribute("aria-hidden", "true");
  await expect(cue).toHaveAttribute("tabindex", "-1");
  await expect(cue).toBeHidden();

  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await expect(cue).toBeVisible();
  await expect(cue).not.toHaveAttribute("aria-hidden");
});

test("hero cue is static with reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/en");

  const cue = page.getByRole("link", {
    name: "Continue to the next section",
  });
  const animation = await cue.evaluate((element) => {
    const style = getComputedStyle(element);
    return {
      name: style.animationName,
      duration: style.animationDuration,
    };
  });

  expect(animation.name).toBe("none");
  await expect(cue).toBeVisible();
});

test("hero keeps its cue as a plain anchor without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({
    baseURL: test.info().project.use.baseURL,
    javaScriptEnabled: false,
    viewport: { width: 1280, height: 900 },
  });
  const page = await context.newPage();

  await page.goto("/en");

  const cue = page.locator('[data-slot="hero-scroll-cue"]');

  await expect(cue).toBeVisible();
  await expect(cue).toHaveAttribute("href", "#features");
  await expect(cue).toHaveAttribute("aria-label", "Continue to the next section");
  await expect(cue).not.toHaveAttribute("aria-hidden");

  await context.close();
});

test("homepage showcase presents three labeled app screens", async ({ page }) => {
  await page.goto("/en", { waitUntil: "networkidle" });
  await page.locator("#showcase").scrollIntoViewIfNeeded();

  const figures = page.locator('[data-slot="device-figure"]');

  await expect(figures).toHaveCount(3);

  const devices = await figures.evaluateAll((elements) =>
    elements.map((element) => element.getAttribute("data-device")),
  );
  expect(devices).toEqual(["laptop", "tablet", "phone"]);

  const expected = [
    ["/images/app/app-soil-lab.webp", "Soil lab"],
    ["/images/app/app-irrigation.webp", "Irrigation plan"],
    ["/images/app/app-assistant.webp", "AI assistant"],
  ];

  for (const [index, [src, label]] of expected.entries()) {
    const figure = figures.nth(index);
    const image = figure.locator("img");

    await expect(image).toHaveAttribute("src", src);
    await expect(image).toHaveAttribute("loading", "lazy");
    await expect(image).toHaveAttribute("decoding", "async");
    await expect(image).toHaveAttribute("width", /.+/);
    await expect(image).toHaveAttribute("height", /.+/);
    await expect(figure.locator("figcaption")).toHaveText(label);
  }

  await expect
    .poll(async () =>
      figures
        .locator("img")
        .evaluateAll((images) =>
          images.every((image) => (image as HTMLImageElement).naturalWidth > 0),
        ),
    )
    .toBe(true);

  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  expect(overflow).toBeLessThanOrEqual(1);
});
