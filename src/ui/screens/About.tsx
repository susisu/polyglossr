import type { ReactElement } from "react";
import styles from "./About.module.css";

interface Props {
  onHome: () => void;
}

/** About & credits, including the single global text-source attribution. */
export function About({ onHome }: Props): ReactElement {
  return (
    <div className={styles["screen"]}>
      <h2 className={styles["heading"]}>About PolyGlossr</h2>
      <p className={styles["lead"]}>
        A quiet game about recognizing the world&apos;s written languages. You are shown a short
        passage and name the language it is written in.
      </p>

      <section className={styles["section"]}>
        <h3 className={styles["subheading"]}>Text &amp; licensing</h3>
        <p>
          Every passage is an excerpt from the{" "}
          <strong>Universal Declaration of Human Rights</strong>
          {" — "}the same document in every language. The specific language and source of each
          passage are not shown during play, by design.
        </p>
        <ul className={styles["credits"]}>
          <li>
            UDHR text © United Nations. The Declaration is the most translated, copyright-free
            document in the world, reproduced here via the{" "}
            <a
              className={styles["link"]}
              href="https://www.ohchr.org/en/universal-declaration-of-human-rights"
              target="_blank"
              rel="noreferrer"
            >
              UN Office of the High Commissioner for Human Rights (OHCHR)
            </a>
            .
          </li>
          <li>
            Language data via the{" "}
            <a
              className={styles["link"]}
              href="https://github.com/wooorm/udhr"
              target="_blank"
              rel="noreferrer"
            >
              <code>udhr</code>
            </a>{" "}
            npm package © Titus Wormer,{" "}
            <a
              className={styles["link"]}
              href="https://github.com/wooorm/udhr/blob/main/license"
              target="_blank"
              rel="noreferrer"
            >
              MIT License
            </a>
            .
          </li>
        </ul>
      </section>

      <button type="button" className={styles["back"]} onClick={onHome}>
        Back to stages
      </button>
    </div>
  );
}
