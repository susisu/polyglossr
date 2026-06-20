/**
 * Supported UI locales. To add one, extend this union, add its catalog to
 * `CATALOGS` in `context.tsx`, and list it in `LOCALES` below.
 */
export type Locale = "en";

/** Fallback locale when the browser's preferences match nothing supported. */
export const DEFAULT_LOCALE: Locale = "en";

/** All supported locales, in preference order for the switcher. */
export const LOCALES = ["en"] as const satisfies readonly Locale[];

/** Narrow an arbitrary string to a supported `Locale`. */
export function isLocale(value: string): value is Locale {
  return LOCALES.some((locale) => locale === value);
}

/** Pick the best supported locale from the browser's language preferences. */
export function detectLocale(): Locale {
  const prefs = typeof navigator === "undefined" ? [] : navigator.languages;
  for (const pref of prefs) {
    const base = pref.toLowerCase().split("-")[0];
    if (base !== undefined && isLocale(base)) return base;
  }
  return DEFAULT_LOCALE;
}
