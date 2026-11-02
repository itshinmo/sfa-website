import { expect, test } from "@playwright/test";

test("blog detail is server-rendered with SEO metadata", async ({ request }) => {
  const response = await request.get("/en/blog/soil-texture-triangle");
  const html = await response.text();

  expect(response.status()).toBe(200);
  expect(html).toContain("<h1");
  expect(html).toContain("soil texture classes");
  expect(html).toContain('rel="canonical"');
  expect(html).toContain('hreflang="fa"');
  expect(html).toContain("application/ld+json");
  expect(html).toContain("BlogPosting");
});

test("blog detail exposes breadcrumbs, TOC targets, and breadcrumb JSON-LD", async ({
  request,
}) => {
  const response = await request.get("/en/blog/soil-texture-triangle");
  const html = await response.text();

  expect(html).toContain("BreadcrumbList");
  expect(html).toContain('aria-label="Breadcrumb"');
  expect(html).toContain('aria-labelledby="post-toc-heading"');
  expect(html).toContain("On this page");
  expect(html).toContain('href="#reference-section-1"');
  expect(html).toContain('id="reference-section-1"');
  expect(html).toContain('hreflang="x-default"');
});

test("search and tag query pages are noindex while the blog index is indexable", async ({
  request,
}) => {
  const clean = await request.get("/en/blog");
  const cleanHtml = await clean.text();

  expect(clean.status()).toBe(200);
  expect(cleanHtml).toContain('rel="canonical"');
  expect(cleanHtml).toContain('hreflang="fa"');
  expect(cleanHtml).not.toContain("noindex");

  for (const path of ["/en/blog?q=texture", "/fa/blog?tag=soil"]) {
    const filtered = await request.get(path);
    const html = await filtered.text();

    expect(filtered.status()).toBe(200);
    expect(html).toContain('name="robots"');
    expect(html).toContain("noindex");
  }
});

test("sitemap.xml lists localized pages and alternates", async ({ request }) => {
  const response = await request.get("/sitemap.xml");
  const xml = await response.text();

  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toContain("application/xml");
  expect(xml).toContain("<urlset");
  expect(xml).toContain("/fa/blog");
  expect(xml).toContain("/en/blog");
  expect(xml).toContain("/en/blog/soil-texture-triangle");
  expect(xml).toContain(encodeURIComponent("مثلث-بافت-خاک"));
  expect(xml).toContain('hreflang="fa"');
  expect(xml).toContain('hreflang="x-default"');
  expect(xml).toContain("<lastmod>");
});

test("robots.txt points crawlers at the sitemap", async ({ request }) => {
  const response = await request.get("/robots.txt");
  const body = await response.text();

  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toContain("text/plain");
  expect(body).toContain("User-agent: *");
  expect(body).toContain("Disallow: /design-lab");
  expect(body).toContain("Sitemap:");
  expect(body).toContain("/sitemap.xml");
});

test("RSS feeds render per locale", async ({ request }) => {
  const fa = await request.get("/fa/rss.xml");
  const faXml = await fa.text();
  const en = await request.get("/en/rss.xml");
  const enXml = await en.text();

  expect(fa.status()).toBe(200);
  expect(fa.headers()["content-type"]).toContain("application/rss+xml");
  expect(faXml).toContain("<rss");
  expect(faXml).toContain("<language>fa-IR</language>");
  expect(faXml).toContain("<item>");
  expect(faXml).toContain("کلاس بافت خاک");

  expect(en.status()).toBe(200);
  expect(en.headers()["content-type"]).toContain("application/rss+xml");
  expect(enXml).toContain("<language>en-US</language>");
  expect(enXml).toContain("soil texture classes");
});

test("fallback detail pages still render content on the server", async ({ request }) => {
  const slug = encodeURIComponent("مثلث-بافت-خاک");
  const response = await request.get(`/en/blog/${slug}`);
  const html = await response.text();

  expect(response.status()).toBe(200);
  expect(html).toContain("بافت خاک");
  expect(html).toContain("not available in English");
  expect(html).toMatch(/<h1[^>]*lang="fa"[^>]*dir="rtl"/);
  expect(html).toMatch(/data-slot="post-body"[^>]*lang="fa"[^>]*dir="rtl"/);
  expect(html).toContain('<html lang="en" dir="ltr"');
});

test("404 pages carry a localized title, description, and noindex", async ({
  request,
}) => {
  const cases: {
    path: string;
    title: string;
    headers?: Record<string, string>;
  }[] = [
    {
      path: "/does-not-exist",
      title: "صفحه پیدا نشد",
      headers: { "Accept-Language": "fa" },
    },
    { path: "/fa/does-not-exist", title: "صفحه پیدا نشد" },
    { path: "/en/does-not-exist", title: "Page not found" },
  ];

  for (const { path, title, headers } of cases) {
    const response = await request.get(path, { headers });
    const html = await response.text();

    expect(response.status(), path).toBe(404);
    expect(html, path).toContain(`<title>${title}</title>`);
    expect(html, path).toContain('name="description"');
    expect(html, path).toContain("noindex");
  }
});

test("HTML cache headers separate clean pages from filters and errors", async ({
  request,
}) => {
  const publicCache = "public, max-age=0, s-maxage=300, stale-while-revalidate=3600";

  for (const path of ["/fa", "/en/blog", "/en/blog/soil-texture-triangle"]) {
    const response = await request.get(path);
    expect(response.headers()["cache-control"], path).toBe(publicCache);
  }

  for (const path of ["/en/blog?q=texture", "/fa/blog?tag=soil", "/en/nope"]) {
    const response = await request.get(path);
    expect(response.headers()["cache-control"], path).toBe("no-store");
  }
});

test("the locale cookie is only rewritten when it differs", async ({ request }) => {
  const first = await request.get("/fa/blog");
  const setCookie = first.headers()["set-cookie"];

  expect(setCookie).toContain("sfa-locale=");

  const cookie = setCookie?.split(";")[0];
  expect(cookie).toBeTruthy();

  const second = await request.get("/fa/blog", {
    headers: { Cookie: cookie ?? "" },
  });

  expect(second.headers()["set-cookie"]).toBeUndefined();
});

test("home is server-rendered in both locales", async ({ request }) => {
  const fa = await request.get("/fa");
  const en = await request.get("/en");
  const faHtml = await fa.text();
  const enHtml = await en.text();

  expect(faHtml).toContain("آب دقیق");
  expect(faHtml).toContain("دریافت صفا");
  expect(enHtml).toContain("Precise water");
  expect(enHtml).toContain("Get SFA");
});
