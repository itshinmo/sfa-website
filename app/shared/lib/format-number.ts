import type { Locale } from "~/modules/blog/domain/post";

export function formatNumber(value: number, locale: Locale) {
  return new Intl.NumberFormat(locale === "fa" ? "fa-IR" : "en-US").format(value);
}
