import type { Locale } from "./i18n";

const dictionaries = {
  es: () => import("@/messages/es.json").then((m) => m.default),
  ca: () => import("@/messages/ca.json").then((m) => m.default),
  en: () => import("@/messages/en.json").then((m) => m.default),
};

export async function getDictionary(locale: Locale) {
  return dictionaries[locale]();
}
