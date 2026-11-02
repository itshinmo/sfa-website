import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router";
import { SITE } from "~/shared/lib/site";
import { Container } from "~/shared/ui/container";

export function SiteFooter() {
  const { t } = useTranslation();
  const params = useParams();
  const locale = params.locale ?? "fa";

  return (
    <footer data-slot="site-footer" className="border-t border-border bg-surface">
      <Container className="grid gap-8 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="space-y-3">
          <p className="text-lg font-bold text-foreground-strong">{t("siteNameFull")}</p>
          <p className="max-w-sm text-sm text-muted">{t("tagline")}</p>
        </div>

        <div className="space-y-2 text-sm">
          <p className="font-semibold text-foreground-strong">{t("nav.home")}</p>
          <Link
            className="inline-flex min-h-11 min-w-11 items-center justify-center text-muted hover:text-brand"
            to={`/${locale}`}
          >
            {t("nav.home")}
          </Link>
          <Link
            className="inline-flex min-h-11 min-w-11 items-center justify-center text-muted hover:text-brand"
            to={`/${locale}/blog`}
          >
            {t("nav.blog")}
          </Link>
          <Link
            className="inline-flex min-h-11 min-w-11 items-center justify-center text-muted hover:text-brand"
            to={`/${locale}#download`}
          >
            {t("actions.download")}
          </Link>
        </div>

        <div className="space-y-2 text-sm">
          <p className="font-semibold text-foreground-strong">{t("footer.contact")}</p>
          <Link
            className="inline-flex min-h-11 min-w-11 items-center justify-center text-muted hover:text-brand"
            to={`/${locale}#contact`}
          >
            {t("nav.contact")}
          </Link>
          <a
            className="inline-flex min-h-11 min-w-11 items-center justify-center text-muted hover:text-brand"
            href={`mailto:${SITE.email}`}
          >
            {SITE.email}
          </a>
          <a
            className="inline-flex min-h-11 min-w-11 items-center justify-center text-muted hover:text-brand"
            href={SITE.webAppUrl}
            target="_blank"
            rel="noreferrer"
          >
            {SITE.webAppUrl.replace(/^https?:\/\//, "")}
          </a>
        </div>
      </Container>

      <Container className="border-t border-border py-5 text-xs text-muted">
        © {new Date().getFullYear()} {t("footer.rights")}
      </Container>
    </footer>
  );
}
