import { useEffect, type MouseEvent } from "react";
import { useTranslation } from "react-i18next";
import {
  data,
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from "react-router";
import type { Route } from "./+types/root";
import { getLocale, i18nextMiddleware, localeCookie } from "./middleware/i18next";
import "./app.css";

export const middleware = [i18nextMiddleware];

export const links: Route.LinksFunction = () => [
  { rel: "icon", href: "/favicon.ico", sizes: "any" },
  { rel: "icon", type: "image/png", href: "/icon-192.png", sizes: "192x192" },
  { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
  { rel: "manifest", href: "/site.webmanifest" },
  {
    rel: "preload",
    href: "/fonts/BYekan/BYekan.ttf",
    as: "font",
    type: "font/ttf",
    crossOrigin: "anonymous",
  },
  {
    rel: "preload",
    href: "/fonts/BYekan/BYekanBold.ttf",
    as: "font",
    type: "font/ttf",
    crossOrigin: "anonymous",
  },
];

export async function loader({ request, context }: Route.LoaderArgs) {
  const locale = getLocale(context);
  const currentLocale = await localeCookie.parse(request.headers.get("Cookie"));
  const headers = new Headers();

  if (currentLocale !== locale) {
    headers.set("Set-Cookie", await localeCookie.serialize(locale));
  }

  return data({ locale }, { headers });
}

export function Layout({ children }: { children: React.ReactNode }) {
  const { t, i18n } = useTranslation();
  const language = i18n.resolvedLanguage ?? i18n.language;
  const direction = i18n.dir(language);

  const handleSkipLink = (event: MouseEvent<HTMLAnchorElement>) => {
    if (
      event.defaultPrevented ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    const main = document.getElementById("main-content");
    if (!main) return;

    event.preventDefault();
    if (!main.hasAttribute("tabindex")) main.setAttribute("tabindex", "-1");
    main.focus({ preventScroll: true });
    main.scrollIntoView({ block: "start" });
    window.history.pushState(null, "", "#main-content");
  };

  return (
    <html lang={language} dir={direction}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#f7f1e3" />
        <Meta />
        <Links />
        <noscript>
          <style>{`
            [data-slot="site-header"][data-transparent="true"] {
              background: var(--color-background);
              border-bottom-color: var(--color-border);
            }
            [data-slot="site-header"][data-transparent="true"] a,
            [data-slot="site-header"][data-transparent="true"] button,
            [data-slot="site-header"][data-transparent="true"] span {
              color: var(--color-foreground);
            }
          `}</style>
        </noscript>
      </head>
      <body>
        <a
          href="#main-content"
          onClick={handleSkipLink}
          className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-brand focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          {t("a11y.skipToContent")}
        </a>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App({ loaderData }: Route.ComponentProps) {
  const { i18n } = useTranslation();
  const location = useLocation();
  const segment = location.pathname.split("/")[1];
  const locale = segment === "fa" || segment === "en" ? segment : loaderData.locale;

  useEffect(() => {
    if (i18n.language !== locale) {
      void i18n.changeLanguage(locale);
    }
  }, [i18n, locale]);

  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const { t } = useTranslation("notFound");

  let title = t("title");
  let description = t("description");
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    if (error.status !== 404) {
      title = `${error.status} ${error.statusText}`.trim();
      description = error.data ? String(error.data) : description;
    }
  } else if (import.meta.env.DEV && error instanceof Error) {
    description = error.message;
    stack = error.stack;
  }

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="mx-auto flex min-h-svh max-w-3xl flex-col justify-center gap-6 px-6 py-16"
    >
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="noindex, nofollow" />
      <p className="text-sm font-semibold tracking-[0.2em] text-brand uppercase">SFA</p>
      <h1 className="text-4xl font-bold sm:text-5xl">{title}</h1>
      <p className="max-w-xl text-lg text-muted">{description}</p>
      <a
        className="w-fit rounded-pill bg-brand px-6 py-3 text-sm font-semibold text-white"
        href="/fa"
      >
        {t("backHome")}
      </a>
      {stack && (
        <pre className="mt-4 max-w-full overflow-x-auto rounded-card bg-surface p-4 text-xs">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
