import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/root-redirect.ts"),
  route("design-lab", "routes/design-lab.tsx"),
  route("sitemap.xml", "routes/sitemap.ts"),
  route("robots.txt", "routes/robots.ts"),
  route(":locale/rss.xml", "routes/rss.ts"),
  route(":locale", "routes/locale-layout.tsx", [
    index("routes/home.tsx"),
    route("blog", "routes/blog-index.tsx"),
    route("blog/tag/:tag", "routes/blog-tag.tsx"),
    route("blog/:slug", "routes/blog-detail.tsx"),
    route("*", "routes/locale-not-found.tsx"),
  ]),
  route("*", "routes/not-found.tsx"),
] satisfies RouteConfig;
