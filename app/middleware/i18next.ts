import "i18next";
import { initReactI18next } from "react-i18next";
import { createCookie } from "react-router";
import { createI18nextMiddleware } from "remix-i18next";
import resources, {
  defaultLanguage,
  supportedLanguages,
  type SupportedLanguage,
} from "~/locales";

export const localeCookie = createCookie("sfa-locale", {
  path: "/",
  sameSite: "lax",
  secure: typeof process !== "undefined" && process.env.NODE_ENV === "production",
  httpOnly: true,
  maxAge: 60 * 60 * 24 * 365,
});

const isSupportedLanguage = (value: string): value is SupportedLanguage =>
  (supportedLanguages as readonly string[]).includes(value);

export const [i18nextMiddleware, getLocale, getInstance] = createI18nextMiddleware({
  detection: {
    supportedLanguages: [...supportedLanguages],
    fallbackLanguage: defaultLanguage,
    cookie: localeCookie,
    order: ["custom", "cookie", "header"],
    async findLocale({ request }) {
      const segment = new URL(request.url).pathname.split("/")[1] ?? "";
      return isSupportedLanguage(segment) ? segment : null;
    },
  },
  i18next: {
    resources,
    supportedLngs: [...supportedLanguages],
    fallbackLng: defaultLanguage,
    defaultNS: "common",
    interpolation: { escapeValue: false },
    returnNull: false,
  },
  plugins: [initReactI18next],
});

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "common";
    resources: typeof resources.fa;
  }
}
