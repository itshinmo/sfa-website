import type { Route } from "./+types/robots";
import { SITE } from "~/shared/lib/site";

export function loader(_args: Route.LoaderArgs) {
  const siteUrl = SITE.url.replace(/\/+$/, "");
  const body = [
    "User-agent: *",
    "Allow: /",
    "Disallow: /design-lab",
    "",
    `Sitemap: ${siteUrl}/sitemap.xml`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
