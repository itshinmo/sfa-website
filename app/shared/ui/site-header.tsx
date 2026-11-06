import { AnimatePresence, motion } from "motion/react";
import { Menu } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, NavLink, useLocation, useParams } from "react-router";
import { cn } from "~/shared/lib/cn";
import { Button, LinkButton } from "~/shared/ui/button";
import { Container } from "~/shared/ui/container";
import { LanguageSwitcher } from "~/shared/ui/language-switcher";

const navItems = [
  { key: "home", to: "" },
  { key: "blog", to: "/blog" },
] as const;

export function SiteHeader() {
  const { t } = useTranslation();
  const params = useParams();
  const location = useLocation();
  const locale = params.locale ?? "fa";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
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
        "sticky top-0 z-(--z-header) border-b transition-[background-color,border-color,box-shadow] duration-(--motion-duration-base) ease-(--motion-ease-in-out)",
        transparent
          ? "border-transparent bg-brand-950/35 shadow-none backdrop-blur-sm"
          : "border-border/80 bg-background/90 shadow-sm backdrop-blur-md",
      )}
    >
      <Container className="flex h-(--header-height) items-center justify-between gap-4">
        <Link
          to={`/${locale}`}
          className={cn(
            "group flex min-h-11 min-w-11 items-center gap-3 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4",
            transparent
              ? "focus-visible:outline-focus-inverse"
              : "focus-visible:outline-focus",
          )}
        >
          <span
            className={cn(
              "flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-xl border-2 transition-[background-color,border-color,transform] duration-(--motion-duration-base) ease-(--motion-ease-out) motion-safe:group-hover:scale-105 motion-safe:group-hover:-rotate-2",
              transparent ? "border-white/70 bg-surface" : "border-brand bg-surface",
            )}
          >
            <img
              src="/images/brand/sfa-512x512.png"
              alt=""
              width={40}
              height={40}
              className="size-9 object-contain"
            />
          </span>
          <span className="sr-only sm:hidden">
            {t("siteName")} {t("siteNameFull")}
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
                  "group relative rounded-pill px-4 py-3 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2",
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
            <motion.span
              className="flex"
              animate={{ rotate: open ? 90 : 0 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <Menu aria-hidden="true" className="size-5" />
            </motion.span>
          </Button>
        </div>
      </Container>

      <AnimatePresence initial={false}>
        {open && (
          <motion.nav
            id="mobile-navigation"
            key="mobile-navigation"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-border bg-background md:hidden"
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
                      "inline-flex min-h-11 items-center rounded-md px-3 text-sm font-medium transition-colors",
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
                className="inline-flex min-h-11 items-center rounded-md px-3 text-sm font-semibold text-brand transition-colors hover:bg-surface-muted"
              >
                {t("actions.download")}
              </Link>
            </Container>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
