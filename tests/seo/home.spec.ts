import { expect, test } from "@playwright/test";

function jsonLdEntries(html: string) {
  return [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)].map(
    (match) => JSON.parse(match[1]) as Record<string, unknown>,
  );
}

test("homepage carries canonical, hreflang, social, and structured data", async ({
  request,
}) => {
  const response = await request.get("/en");
  const html = await response.text();

  expect(response.status()).toBe(200);
  expect(html).toContain("<title>SFA | Irrigation optimization for arid farms</title>");
  expect(html).toContain('name="description"');
  expect(html).toMatch(/rel="canonical" href="[^"]+\/en"/);
  expect(html.toLowerCase()).toContain('hreflang="fa"');
  expect(html.toLowerCase()).toContain('hreflang="en"');
  expect(html.toLowerCase()).toContain('hreflang="x-default"');
  expect(html).toContain('property="og:type" content="website"');
  expect(html).toContain('property="og:title"');
  expect(html).toContain('property="og:image"');
  expect(html).toContain('name="twitter:card" content="summary_large_image"');
  expect(html).toContain('name="twitter:image"');

  const entries = jsonLdEntries(html);
  const organization = entries.find((entry) => entry["@type"] === "Organization");
  const website = entries.find((entry) => entry["@type"] === "WebSite");

  expect(organization).toMatchObject({
    name: "Smart Farm Aqua",
    alternateName: "SFA",
  });
  expect(String(organization?.logo)).toContain("/images/brand/sfa-512x512.png");
  expect(website).toMatchObject({ inLanguage: "en" });
  expect(String(website?.url)).toMatch(/\/en$/);
});

test("homepage preloads and server-renders the responsive hero image", async ({
  request,
}) => {
  const response = await request.get("/en");
  const html = await response.text();

  expect(html).toContain('<picture data-slot="home-hero-picture">');
  expect(html).toContain("/images/homepage/hero-landscape.webp");
  expect(html).toContain("/images/homepage/hero-portrait.webp");
  expect(html.toLowerCase()).toContain('fetchpriority="high"');
  expect(html).toContain('loading="eager"');
  expect(html).toContain('decoding="async"');
  expect(html).toContain('media="(min-width: 768px)"');
  expect(html).toContain('media="(max-width: 767px)"');
  expect(html).toContain("A green farm field in daylight");
});

test("homepage server-renders every selected content section", async ({ request }) => {
  const response = await request.get("/en");
  const html = await response.text();

  for (const text of [
    "A plan that follows the crop",
    "From field data to an irrigation decision",
    "Research results",
    "Achievements",
    "The SFA team",
    "Latest writing",
    "Frequently asked questions",
    "Bring SFA to your devices",
    "Get in touch",
    "Detailed Examination of the 12 Soil Texture Classes in the Soil Texture Triangle",
    "SFA is an AI-assisted irrigation optimization system",
    "Soil and Water Research Institute",
    "Google Play",
    "info@sfa-agri.ir",
  ]) {
    expect(html, text).toContain(text);
  }
});

test("Persian homepage localizes the document and hero", async ({ request }) => {
  const response = await request.get("/fa");
  const html = await response.text();

  expect(response.status()).toBe(200);
  expect(html).toContain('<html lang="fa" dir="rtl"');
  expect(html).toContain("آب دقیق");
  expect(html).toContain("دریافت صفا");
  expect(html).toMatch(/rel="canonical" href="[^"]+\/fa"/);
  expect(html.toLowerCase()).toContain('hreflang="x-default"');
  expect(html).toContain("نمایی از یک مزرعه سرسبز در نور روز");
});
