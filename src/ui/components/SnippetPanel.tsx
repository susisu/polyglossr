import type { ReactElement } from "react";
import type { Direction } from "../../data/source.js";
import styles from "./SnippetPanel.module.css";

interface Props {
  snippet: string;
  direction: Direction;
  /** BCP 47 tag, set as `lang` so the browser shapes/fonts the text correctly. */
  bcp47: string;
}

/** The foreign-language text the player must identify. The star of the screen. */
export function SnippetPanel({ snippet, direction, bcp47 }: Props): ReactElement {
  return (
    <div className={styles["panel"]}>
      <p className={styles["text"]} dir={direction} lang={bcp47}>
        {snippet}
      </p>
    </div>
  );
}
