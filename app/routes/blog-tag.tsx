import { redirect } from "react-router";
import type { Route } from "./+types/blog-tag";

export function loader({ params }: Route.LoaderArgs) {
  const locale = params.locale ?? "fa";
  const tag = params.tag ?? "";

  return redirect(`/${locale}/blog?tag=${encodeURIComponent(tag)}`);
}
