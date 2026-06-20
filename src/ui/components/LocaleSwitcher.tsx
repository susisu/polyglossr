import clsx from "clsx";
import type { ReactElement } from "react";
import type { Locale } from "../../shared/locale.js";
import { LOCALES, useLocale } from "../i18n/index.js";
import styles from "./LocaleSwitcher.module.css";

/** Short labels for the switcher, in each locale's own script. */
const LABELS: Record<Locale, string> = { en: "EN", ja: "日本語" };

/** A small inline toggle to switch the UI locale. */
export function LocaleSwitcher(): ReactElement {
  const { locale, setLocale } = useLocale();
  return (
    <div className={styles["switcher"]} role="group" aria-label="Language">
      {LOCALES.map((value) => (
        <button
          key={value}
          type="button"
          lang={value}
          className={clsx(styles["option"], value === locale && styles["active"])}
          aria-pressed={value === locale}
          onClick={() => {
            setLocale(value);
          }}
        >
          {LABELS[value]}
        </button>
      ))}
    </div>
  );
}
