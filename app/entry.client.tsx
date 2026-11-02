import i18next from "i18next";
import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { I18nextProvider, initReactI18next } from "react-i18next";
import { HydratedRouter } from "react-router/dom";
import resources, { defaultLanguage, supportedLanguages } from "~/locales";

async function main() {
  const language = document.documentElement.lang || defaultLanguage;

  await i18next.use(initReactI18next).init({
    resources,
    lng: language,
    fallbackLng: defaultLanguage,
    supportedLngs: [...supportedLanguages],
    defaultNS: "common",
    interpolation: { escapeValue: false },
    returnNull: false,
  });

  startTransition(() => {
    hydrateRoot(
      document,
      <I18nextProvider i18n={i18next}>
        <StrictMode>
          <HydratedRouter />
        </StrictMode>
      </I18nextProvider>,
    );
  });
}

void main();
