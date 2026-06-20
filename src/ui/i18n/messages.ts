import type { ReactNode } from "react";

/**
 * All user-facing UI chrome strings, grouped by screen/area. Each locale
 * provides one `Messages` value; static text is a string, interpolated text is
 * a function (type-safe placeholders, no template parsing), and rich markup is
 * a `ReactNode`. The brand name "PolyGlossr" is intentionally not here — it is
 * a proper noun rendered as a literal.
 */
export interface Messages {
  nav: {
    about: string;
  };
  footer: {
    /** Footer credit link; opens the About screen. */
    credit: string;
  };
  stageSelect: {
    intro: string;
    difficultyLabel: (value: number, max: number) => string;
    optionCount: (count: number) => string;
  };
  game: {
    progress: (current: number, total: number) => string;
    mistakesLabel: (mistakes: number, max: number) => string;
    quit: string;
    correct: string;
    notQuite: string;
    youGuessed: (name: string) => string;
    continue: string;
    /** Answer label "Language · Script" (script omitted for single-script langs). */
    sourceLabel: (base: string, script: string) => string;
  };
  picker: {
    placeholder: string;
    noMatch: string;
  };
  result: {
    won: string;
    lost: string;
    correctCount: (correct: number) => string;
    subtitle: (stageName: string, answered: number) => string;
    playAgain: string;
    stages: string;
    yourGuess: (name: string) => string;
  };
  about: {
    heading: string;
    lead: string;
    textLicensingTitle: string;
    /** Intro paragraph of the text & licensing section. */
    textLicensingBody: ReactNode;
    /** UDHR text attribution; must retain the UN/OHCHR credit and link. */
    udhrCredit: ReactNode;
    /** udhr package attribution; must retain the author and MIT license credit. */
    packageCredit: ReactNode;
    backToStages: string;
  };
}
