import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";
import { en } from "./en.js";
import { ja } from "./ja.js";
import { detectLocale, isLocale, type Locale } from "./locale.js";
import type { Messages } from "./messages.js";

/** Every supported locale's catalog. Add new locales here. */
const CATALOGS: Record<Locale, Messages> = { en, ja };

const LOCALE_STORAGE_KEY = "polyglossr.locale";

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  messages: Messages;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

function loadStoredLocale(): Locale | null {
  try {
    const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
    return stored !== null && isLocale(stored) ? stored : null;
  } catch {
    return null;
  }
}

/** Provides the active locale and its message catalog to the tree. */
export function LocaleProvider({ children }: { children: ReactNode }): ReactElement {
  const [locale, setLocaleState] = useState<Locale>(() => loadStoredLocale() ?? detectLocale());

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  function setLocale(next: Locale): void {
    setLocaleState(next);
    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, next);
    } catch {
      // Persistence is best-effort; the choice still applies for this session.
    }
  }

  const value: LocaleContextValue = { locale, setLocale, messages: CATALOGS[locale] };
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

/** Access the active locale, the setter, and the message catalog. */
export function useLocale(): LocaleContextValue {
  const value = useContext(LocaleContext);
  if (value === null) throw new Error("useLocale must be used within a LocaleProvider");
  return value;
}

/** Shorthand for the active message catalog. */
export function useMessages(): Messages {
  return useLocale().messages;
}
