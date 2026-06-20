import { DEFAULT_LOCALE, isLocale, type Locale } from "../../shared/locale.js";

export { DEFAULT_LOCALE, LOCALES, isLocale, type Locale } from "../../shared/locale.js";

/** Pick the best supported locale from the browser's language preferences. */
export function detectLocale(): Locale {
  const prefs = typeof navigator === "undefined" ? [] : navigator.languages;
  for (const pref of prefs) {
    const base = pref.toLowerCase().split("-")[0];
    if (base !== undefined && isLocale(base)) return base;
  }
  return DEFAULT_LOCALE;
}
