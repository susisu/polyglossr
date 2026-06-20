import clsx from "clsx";
import { useEffect, useRef, useState, type ReactElement } from "react";
import type { Locale } from "../../shared/locale.js";
import { LOCALES, useLocale } from "../i18n/index.js";
import styles from "./LocaleSwitcher.module.css";

/** Each locale's name in its own script. */
const LABELS: Record<Locale, string> = { en: "English", ja: "日本語" };

/** A globe glyph marking the control as a language switch. */
function GlobeIcon(): ReactElement {
  return (
    <svg
      className={styles["globe"]}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c2.6 2.5 2.6 15.5 0 18M12 3c-2.6 2.5-2.6 15.5 0 18" />
    </svg>
  );
}

/** A dropdown to switch the UI locale; the trigger shows the current language. */
export function LocaleSwitcher(): ReactElement {
  const { locale, setLocale } = useLocale();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return undefined;
    function handlePointerDown(event: PointerEvent): void {
      const target = event.target;
      if (target instanceof Node && ref.current !== null && !ref.current.contains(target)) {
        setOpen(false);
      }
    }
    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [open]);

  function select(value: Locale): void {
    setLocale(value);
    setOpen(false);
  }

  return (
    <div
      ref={ref}
      className={styles["switcher"]}
      onKeyDown={(event) => {
        if (event.key === "Escape") setOpen(false);
      }}
    >
      <button
        type="button"
        className={styles["trigger"]}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Language"
        onClick={() => {
          setOpen((value) => !value);
        }}
      >
        <GlobeIcon />
        <span>{LABELS[locale]}</span>
        <span className={clsx(styles["chevron"], open && styles["chevronUp"])} aria-hidden="true" />
      </button>
      {open && (
        <ul className={styles["menu"]} role="menu">
          {LOCALES.map((value) => (
            <li key={value} role="none">
              <button
                type="button"
                role="menuitemradio"
                aria-checked={value === locale}
                lang={value}
                className={clsx(styles["item"], value === locale && styles["itemActive"])}
                onClick={() => {
                  select(value);
                }}
              >
                <span className={styles["check"]} aria-hidden="true">
                  {value === locale ? "✓" : ""}
                </span>
                {LABELS[value]}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
