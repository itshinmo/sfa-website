import { Menu } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, NavLink, useLocation, useMatches, useParams } from "react-router";
import { cn } from "~/shared/lib/cn";
import { Button, LinkButton } from "~/shared/ui/button";
import { Container } from "~/shared/ui/container";

const navItems = [
  { key: "home", to: "" },
  { key: "blog", to: "/blog" },
] as const;

type BlogAlternate = { locale: string; slug: string };

function findBlogAlternates(matches: ReturnType<typeof useMatches>) {
  for (const match of matches) {
    const data = match.loaderData as
      { post?: { alternates?: BlogAlternate[] } } | undefined;
    if (data?.post?.alternates?.length) return data.post.alternates;
  }
  return undefined;
}

function LanguageSwitcher({ inverse }: { inverse: boolean }) {
  const { i18n, t } = useTranslation();
  const location = useLocation();
  const matches = useMatches();
  const params = useParams();
  const locale = params.locale ?? i18n.resolvedLanguage ?? "fa";
  const otherLocale = locale === "fa" ? "en" : "fa";
  const label = otherLocale === "fa" ? t("language.fa") : t("language.en");

  const alternates = findBlogAlternates(matches);
  const alternate = alternates?.find((item) => item.locale === otherLocale);

  let target = `/${otherLocale}`;
  if (alternate) {
    target = `/${otherLocale}/blog/${encodeURIComponent(alternate.slug)}`;
  } else {
    const segments = location.pathname.split("/").filter(Boolean);
    const rest = segments.slice(1).join("/");
    target = `/${otherLocale}${rest ? `/${rest}` : ""}${location.search}`;
  }

  return (
    <Link
      data-slot="language-switcher"
      to={target}
      className={cn(
        "inline-flex min-h-11 items-center rounded-pill border px-3 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2",
        inverse
          ? "border-white/50 text-white hover:border-white hover:bg-white/10 focus-visible:outline-focus-inverse"
          : "border-border text-muted hover:border-brand hover:text-brand focus-visible:outline-focus",
      )}
      aria-label={`${t("language.label")}: ${label}`}
    >
      {label}
    </Link>
  );
}

export function SiteHeader() {
  const { t } = useTranslation();
  const params = useParams();
  const location = useLocation();
  const locale = params.locale ?? "fa";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLElement>(null);
  const isHome =
    location.pathname === `/${locale}` || location.pathname === `/${locale}/`;
  const transparent = isHome && !scrolled && !open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, [location.pathname]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header
      data-slot="site-header"
      data-transparent={transparent ? "true" : "false"}
      className={cn(
        "sticky top-0 z-[var(--z-header)] border-b transition-colors duration-[var(--motion-duration-base)] ease-[var(--motion-ease-in-out)]",
        transparent
          ? "border-transparent bg-brand-950/35 backdrop-blur-sm"
          : "border-border/80 bg-background/90 backdrop-blur-md",
      )}
    >
      <Container className="flex h-[var(--header-height)] items-center justify-between gap-4">
        <Link
          to={`/${locale}`}
          className={cn(
            "flex min-h-11 min-w-11 items-center gap-3 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4",
            transparent
              ? "focus-visible:outline-focus-inverse"
              : "focus-visible:outline-focus",
          )}
        >
          <span
            className={cn(
              "flex size-9 items-center justify-center rounded-full text-xs font-bold transition-colors",
              transparent ? "bg-surface text-brand-strong" : "bg-brand text-white",
            )}
          >
            SFA
          </span>
          <span className="hidden flex-col sm:flex">
            <span
              className={cn(
                "text-sm font-bold transition-colors",
                transparent ? "text-white" : "text-foreground-strong",
              )}
            >
              {t("siteName")}
            </span>
            <span
              className={cn(
                "text-[10px] transition-colors",
                transparent ? "text-white/80" : "text-muted",
              )}
            >
              {t("siteNameFull")}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label={t("siteName")}>
          {navItems.map((item) => (
            <NavLink
              key={item.key}
              to={`/${locale}${item.to}`}
              end={item.key === "home"}
              className={({ isActive }) =>
                cn(
                  "rounded-pill px-4 py-3 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2",
                  transparent
                    ? [
                        isActive
                          ? "bg-white/15 text-white"
                          : "text-white hover:bg-white/10 hover:text-white",
                        "focus-visible:outline-focus-inverse",
                      ]
                    : [
                        isActive
                          ? "bg-brand-soft text-brand-strong"
                          : "text-muted hover:bg-surface-muted hover:text-foreground",
                        "focus-visible:outline-focus",
                      ],
                )
              }
            >
              {t(`nav.${item.key}`)}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher inverse={transparent} />
          <LinkButton
            className="hidden sm:inline-flex"
            intent={transparent ? "surface" : "primary"}
            size="md"
            to={`/${locale}#download`}
          >
            {t("actions.download")}
          </LinkButton>
          <Button
            ref={menuButtonRef}
            className={cn(
              "md:hidden",
              transparent &&
                "text-white hover:bg-white/10 focus-visible:outline-focus-inverse",
            )}
            intent="ghost"
            size="icon"
            aria-label={open ? t("a11y.closeMenu") : t("a11y.openMenu")}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen((value) => !value)}
          >
            <Menu aria-hidden="true" className="size-5" />
          </Button>
        </div>
      </Container>

      {open && (
        <nav
          id="mobile-navigation"
          className="border-t border-border bg-background md:hidden"
          aria-label={t("siteName")}
        >
          <Container className="flex flex-col gap-1 py-3">
            {navItems.map((item) => (
              <NavLink
                key={item.key}
                to={`/${locale}${item.to}`}
                end={item.key === "home"}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "inline-flex min-h-11 items-center rounded-md px-3 text-sm font-medium",
                    isActive
                      ? "bg-brand-soft text-brand-strong"
                      : "text-muted hover:bg-surface-muted",
                  )
                }
              >
                {t(`nav.${item.key}`)}
              </NavLink>
            ))}
            <Link
              to={`/${locale}#download`}
              onClick={() => setOpen(false)}
              className="inline-flex min-h-11 items-center rounded-md px-3 text-sm font-semibold text-brand"
            >
              {t("actions.download")}
            </Link>
          </Container>
        </nav>
      )}
    </header>
  );
}
