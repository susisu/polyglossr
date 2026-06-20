/**
 * Supported locales for the whole app — UI chrome and data-derived names alike.
 * Defined in the lowest layer so both `data` (localized stage/language names)
 * and `ui` (message catalogs) can depend on it. To add a locale: extend this
 * union, list it in `LOCALES`, add its message catalog, and fill in any
 * required `Localized` values (e.g. stage names).
 */
export type Locale = "en" | "ja";

/** Fallback locale; its data is always complete (others may fall back to it). */
export const DEFAULT_LOCALE: Locale = "en";

/** All supported locales, in display/preference order. */
export const LOCALES = ["en", "ja"] as const satisfies readonly Locale[];

/** Narrow an arbitrary string to a supported `Locale`. */
export function isLocale(value: string): value is Locale {
  return LOCALES.some((locale) => locale === value);
}

/** A value provided in every supported locale. */
export type Localized<T> = Record<Locale, T>;
