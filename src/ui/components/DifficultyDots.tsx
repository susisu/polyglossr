import clsx from "clsx";
import type { ReactElement } from "react";
import { useMessages } from "../i18n/index.js";
import styles from "./DifficultyDots.module.css";

interface Props {
  value: number;
  max?: number;
}

/** A row of filled/empty dots showing a stage's difficulty. */
export function DifficultyDots({ value, max = 5 }: Props): ReactElement {
  const messages = useMessages();
  return (
    <span
      className={styles["difficulty"]}
      aria-label={messages.stageSelect.difficultyLabel(value, max)}
    >
      {Array.from({ length: max }, (_, i) => (
        <span key={i} className={clsx(styles["dot"], i < value && styles["dotOn"])} />
      ))}
    </span>
  );
}
