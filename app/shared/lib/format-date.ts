import type { Locale } from "~/modules/blog/domain/post";

const FALLBACK_DATE = "—";

export function formatDate(value: string, locale: Locale, fallback = FALLBACK_DATE) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return fallback;

  return new Intl.DateTimeFormat(locale === "fa" ? "fa-IR" : "en-US", {
    dateStyle: "medium",
  }).format(date);
}
