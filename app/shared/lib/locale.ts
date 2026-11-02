export type AppLocale = "fa" | "en";

export function toLocale(value: string | undefined): AppLocale {
  return value === "en" ? "en" : "fa";
}
