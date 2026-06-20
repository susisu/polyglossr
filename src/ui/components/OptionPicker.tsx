import clsx from "clsx";
import { useEffect, useRef, useState, type KeyboardEvent, type ReactElement } from "react";
import type { StageOptionView } from "../../data/selectors.js";
import { useMessages } from "../i18n/index.js";
import styles from "./OptionPicker.module.css";

interface Props {
  /** Answer candidates (the stage's options) for this question. */
  options: readonly StageOptionView[];
  /** Called with the chosen option id. */
  onPick: (optionId: string) => void;
  disabled: boolean;
}

/**
 * Free-text input that suggests the stage's options. The player must pick a
 * suggestion (arrow keys + Enter, or click) — arbitrary text can't be submitted,
 * so the answer is always a real option of the stage.
 */
export function OptionPicker({ options, onPick, disabled }: Props): ReactElement {
  const messages = useMessages();
  const [query, setQuery] = useState("");
  const [highlight, setHighlight] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const needle = query.trim().toLowerCase();
  const matches =
    needle === "" ? options : (
      options
        .filter((option) => option.search.some((s) => s.includes(needle)))
        // Rank prefix matches above mid-word matches (e.g. "r" → Russian before
        // Arabic); the sort is stable, so each group keeps the stage's order.
        .toSorted(
          (a, b) =>
            Number(b.search.some((s) => s.startsWith(needle)))
            - Number(a.search.some((s) => s.startsWith(needle))),
        )
    );
  const activeIndex = Math.min(highlight, Math.max(matches.length - 1, 0));

  function choose(optionId: string): void {
    if (!disabled) onPick(optionId);
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
        aria-controls="stage-options"
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
      <ul className={styles["options"]} id="stage-options" role="listbox">
        {matches.map((option, index) => (
          <li key={option.id} role="option" aria-selected={index === activeIndex}>
            <button
              type="button"
              className={clsx(styles["option"], index === activeIndex && styles["active"])}
              disabled={disabled}
              onClick={() => {
                choose(option.id);
              }}
              onMouseEnter={() => {
                setHighlight(index);
              }}
            >
              {option.name}
            </button>
          </li>
        ))}
        {matches.length === 0 && <li className={styles["empty"]}>{messages.picker.noMatch}</li>}
      </ul>
    </div>
  );
}
