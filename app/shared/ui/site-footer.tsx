import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router";
import { SITE } from "~/shared/lib/site";
import { Container } from "~/shared/ui/container";

function FooterNavLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      className="inline-flex min-h-11 items-center text-start text-muted transition-colors hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
      to={to}
    >
      {children}
    </Link>
  );
}

export function SiteFooter() {
  const { t } = useTranslation();
  const params = useParams();
  const locale = params.locale ?? "fa";

  return (
    <footer data-slot="site-footer" className="border-t border-border bg-surface">
      <Container className="grid gap-8 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center overflow-hidden rounded-xl border-2 border-brand bg-surface">
              <img
                src="/images/brand/sfa-512x512.png"
                alt=""
                width={40}
                height={40}
                loading="lazy"
                decoding="async"
                className="size-9 object-contain"
              />
            </span>
            <p className="text-lg font-bold text-foreground-strong">
              {t("siteNameFull")}
            </p>
          </div>
          <p className="max-w-sm text-sm text-muted">{t("tagline")}</p>
        </div>

        <nav
          className="flex flex-col items-start gap-0.5 text-sm"
          aria-label={t("nav.home")}
        >
          <p className="mb-1 font-semibold text-foreground-strong">{t("nav.home")}</p>
          <FooterNavLink to={`/${locale}`}>{t("nav.home")}</FooterNavLink>
          <FooterNavLink to={`/${locale}/blog`}>{t("nav.blog")}</FooterNavLink>
          <FooterNavLink to={`/${locale}#download`}>
            {t("actions.download")}
          </FooterNavLink>
        </nav>

        <nav
          className="flex flex-col items-start gap-0.5 text-sm"
          aria-label={t("footer.contact")}
        >
          <p className="mb-1 font-semibold text-foreground-strong">
            {t("footer.contact")}
          </p>
          <FooterNavLink to={`/${locale}#contact`}>{t("nav.contact")}</FooterNavLink>
          <a
            className="inline-flex min-h-11 items-center text-start text-muted transition-colors hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
            href={`mailto:${SITE.email}`}
          >
            {SITE.email}
          </a>
          <a
            className="inline-flex min-h-11 items-center text-start text-muted transition-colors hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
            href={SITE.webAppUrl}
            target="_blank"
            rel="noreferrer"
          >
            {SITE.webAppUrl.replace(/^https?:\/\//, "")}
          </a>
        </nav>
      </Container>

      <Container className="border-t border-border py-6">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
          <p className="text-xs font-semibold tracking-[0.16em] text-muted uppercase">
            {t("footer.partners")}
          </p>
          <div className="flex items-center gap-3">
            <span className="flex size-14 items-center justify-center overflow-hidden rounded-full border border-border bg-white p-1">
              <img
                src="/images/partners/swri.png"
                alt={t("footer.partnerName")}
                width={144}
                height={144}
                loading="lazy"
                decoding="async"
                className="size-full object-contain"
              />
            </span>
            <p className="text-sm font-medium text-muted">{t("footer.partnerName")}</p>
          </div>
        </div>
      </Container>

      <Container className="border-t border-border py-5">
        <p className="text-center text-xs text-muted">
          © {new Date().getFullYear()} {t("footer.rights")}
        </p>
      </Container>
    </footer>
  );
}
