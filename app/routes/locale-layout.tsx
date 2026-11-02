import { Outlet } from "react-router";
import type { Route } from "./+types/locale-layout";
import { supportedLanguages } from "~/locales";
import { SiteFooter } from "~/shared/ui/site-footer";
import { SiteHeader } from "~/shared/ui/site-header";

export function loader({ params }: Route.LoaderArgs) {
  const locale = params.locale ?? "";

  if (!(supportedLanguages as readonly string[]).includes(locale)) {
    throw new Response("Not Found", { status: 404 });
  }

  return { locale };
}

export default function LocaleLayout() {
  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader />
      <div className="flex-1">
        <Outlet />
      </div>
      <SiteFooter />
    </div>
  );
}
