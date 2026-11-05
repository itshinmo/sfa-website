import { useTranslation } from "react-i18next";
import { data, Link } from "react-router";
import type { Route } from "./+types/not-found";
import { getInstance, getLocale } from "~/middleware/i18next";
import { Container } from "~/shared/ui/container";

export async function loader({ context }: Route.LoaderArgs) {
  const locale = getLocale(context);
  const t = getInstance(context).getFixedT(locale, "notFound");

  return data(
    {
      locale,
      title: t("title"),
      description: t("description"),
    },
    { status: 404 },
  );
}

export const meta: Route.MetaFunction = ({ loaderData }) => {
  if (!loaderData) return [];

  return [
    { title: loaderData.title },
    { name: "description", content: loaderData.description },
    { name: "robots", content: "noindex, nofollow" },
  ];
};

export default function NotFound({ loaderData }: Route.ComponentProps) {
  const { t } = useTranslation("notFound");
  const { locale } = loaderData;

  return (
    <main id="main-content" tabIndex={-1} className="flex min-h-[60svh] items-center">
      <Container className="flex max-w-2xl flex-col items-start gap-6 py-20">
        <p className="text-sm font-semibold tracking-[0.2em] text-brand uppercase">404</p>
        <h1 className="text-4xl font-black sm:text-6xl">{t("title")}</h1>
        <p className="text-lg text-muted">{t("description")}</p>
        <div className="flex flex-wrap gap-3">
          <Link
            className="rounded-button bg-brand px-6 py-3 text-sm font-semibold text-white"
            to={`/${locale}`}
          >
            {t("backHome")}
          </Link>
          <Link
            className="rounded-button border border-border px-6 py-3 text-sm font-semibold text-foreground"
            to={`/${locale}/blog`}
          >
            {t("backBlog")}
          </Link>
        </div>
      </Container>
    </main>
  );
}
