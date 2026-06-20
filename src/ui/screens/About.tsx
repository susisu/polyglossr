import type { ReactElement } from "react";
import { useMessages } from "../i18n/index.js";
import styles from "./About.module.css";

interface Props {
  onHome: () => void;
}

/** About & credits, including the single global text-source attribution. */
export function About({ onHome }: Props): ReactElement {
  const messages = useMessages();
  return (
    <div className={styles["screen"]}>
      <h2 className={styles["heading"]}>{messages.about.heading}</h2>
      <p className={styles["lead"]}>{messages.about.lead}</p>

      <section className={styles["section"]}>
        <h3 className={styles["subheading"]}>{messages.about.textLicensingTitle}</h3>
        <p>{messages.about.textLicensingBody}</p>
        <ul className={styles["credits"]}>
          <li>{messages.about.udhrCredit}</li>
          <li>{messages.about.packageCredit}</li>
        </ul>
      </section>

      <section className={styles["section"]}>
        <h3 className={styles["subheading"]}>{messages.about.appTitle}</h3>
        <p>{messages.about.copyright}</p>
        <p>{messages.about.sourceCode}</p>
      </section>

      <button type="button" className={styles["back"]} onClick={onHome}>
        {messages.about.backToStages}
      </button>
    </div>
  );
}
