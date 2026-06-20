import clsx from "clsx";
import { useEffect, useRef, useState, type KeyboardEvent, type ReactElement } from "react";
import type { Language } from "../../data/language.js";
import { languageName } from "../../data/selectors.js";
import { useLocale, useMessages } from "../i18n/index.js";
import styles from "./LanguagePicker.module.css";

interface Props {
  /** Candidate logical languages for this stage. */
  languages: readonly Language[];
  /** Called with the chosen logical language id. */
  onPick: (langId: string) => void;
  disabled: boolean;
}

/**
 * Free-text input that suggests the stage's languages. The player must pick a
 * suggestion (arrow keys + Enter, or click) — arbitrary text can't be submitted,
 * so the answer is always a real logical language. Candidates are distinct
 * languages, so multi-script languages appear once.
 */
export function LanguagePicker({ languages, onPick, disabled }: Props): ReactElement {
  const messages = useMessages();
  const { locale } = useLocale();
  const [query, setQuery] = useState("");
  const [highlight, setHighlight] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Suggest and match on the localized display name (the text the player types).
  const candidates = languages.map((language) => ({
    id: language.id,
    name: languageName(language.id, locale),
  }));
  const needle = query.trim().toLowerCase();
  const matches =
    needle === "" ? candidates : (
      candidates
        .filter((candidate) => candidate.name.toLowerCase().includes(needle))
        // Rank prefix matches above mid-word matches (e.g. "r" → Russian before
        // Arabic); the sort is stable, so each group keeps the stage's order.
        .toSorted(
          (a, b) =>
            Number(b.name.toLowerCase().startsWith(needle))
            - Number(a.name.toLowerCase().startsWith(needle)),
        )
    );
  const activeIndex = Math.min(highlight, Math.max(matches.length - 1, 0));

  function choose(langId: string): void {
    if (!disabled) onPick(langId);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>): void {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setHighlight((h) => Math.min(h + 1, matches.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setHighlight((h) => Math.max(h - 1, 0));
    } else if (event.key === "Enter") {
      event.preventDefault();
      const match = matches[activeIndex];
      if (match !== undefined) choose(match.id);
    } else if (event.key === "Escape") {
      setQuery("");
      setHighlight(0);
    }
  }

  return (
    <div className={styles["picker"]}>
      <input
        ref={inputRef}
        className={styles["input"]}
        type="text"
        role="combobox"
        aria-expanded={matches.length > 0}
        aria-controls="language-options"
        aria-autocomplete="list"
        autoComplete="off"
        placeholder={messages.picker.placeholder}
        value={query}
        disabled={disabled}
        onChange={(event) => {
          setQuery(event.target.value);
          setHighlight(0);
        }}
        onKeyDown={handleKeyDown}
      />
      <ul className={styles["options"]} id="language-options" role="listbox">
        {matches.map((candidate, index) => (
          <li key={candidate.id} role="option" aria-selected={index === activeIndex}>
            <button
              type="button"
              className={clsx(styles["option"], index === activeIndex && styles["active"])}
              disabled={disabled}
              onClick={() => {
                choose(candidate.id);
              }}
              onMouseEnter={() => {
                setHighlight(index);
              }}
            >
              {candidate.name}
            </button>
          </li>
        ))}
        {matches.length === 0 && <li className={styles["empty"]}>{messages.picker.noMatch}</li>}
      </ul>
    </div>
  );
}
