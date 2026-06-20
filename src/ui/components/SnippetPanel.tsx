import type { ReactElement } from "react";
import type { Direction } from "../../data/source.js";
import styles from "./SnippetPanel.module.css";

interface Props {
  snippet: string;
  direction: Direction;
  /** BCP 47 tag, set as `lang` so the browser shapes/fonts the text correctly. */
  bcp47: string;
}

/**
 * Han is shared across Chinese/Japanese/Korean with different preferred glyph
 * forms, so steer the right CJK Noto family by language; other scripts are
 * handled by the `--font-snippet` fallback stack.
 */
function cjkFont(bcp47: string): string | null {
  if (bcp47.startsWith("zh")) return "Noto Sans SC";
  if (bcp47.startsWith("ja")) return "Noto Sans JP";
  if (bcp47.startsWith("ko")) return "Noto Sans KR";
  return null;
}

/** The foreign-language text the player must identify. The star of the screen. */
export function SnippetPanel({ snippet, direction, bcp47 }: Props): ReactElement {
  const cjk = cjkFont(bcp47);
  const fontFamily = cjk !== null ? `"${cjk}", var(--font-snippet)` : undefined;
  return (
    <div className={styles["panel"]}>
      <p className={styles["text"]} dir={direction} lang={bcp47} style={{ fontFamily }}>
        {snippet}
      </p>
    </div>
  );
}
