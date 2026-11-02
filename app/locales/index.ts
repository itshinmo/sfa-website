import type { Resource } from "i18next";
import en from "./en";
import fa from "./fa";

export const supportedLanguages = ["fa", "en"] as const;
export type SupportedLanguage = (typeof supportedLanguages)[number];
export const defaultLanguage: SupportedLanguage = "fa";

export const resources = { fa, en } satisfies Resource;
export default resources;
