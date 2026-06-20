import type { ReactElement, ReactNode } from "react";
import styles from "./ExternalLink.module.css";

interface Props {
  href: string;
  children: ReactNode;
}

/** A text link to an external page; opens in a new tab with a safe `rel`. */
export function ExternalLink({ href, children }: Props): ReactElement {
  return (
    <a className={styles["link"]} href={href} target="_blank" rel="noreferrer">
      {children}
    </a>
  );
}
