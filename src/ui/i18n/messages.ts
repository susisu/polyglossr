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
  stageSelect: {
    /** One-line tagline on the stage list — what the game is, not how to play. */
    intro: string;
    /** Best score shown on a played stage's card. */
    best: (correct: number, total: number) => string;
    /** Shown on a stage's card before it has ever been played. */
    unplayed: string;
  };
  stageDetail: {
    play: string;
    back: string;
    best: (correct: number, total: number) => string;
    played: (count: number) => string;
    /** Heading for the player's strongest answers in this stage. */
    strong: string;
    /** Heading for the answers the player most often misses in this stage. */
    needsWork: string;
    seenCount: (count: number) => string;
  };
  game: {
    progress: (current: number, total: number) => string;
    mistakesLabel: (mistakes: number, max: number) => string;
    quit: string;
    correct: string;
    notQuite: string;
    youGuessed: (name: string) => string;
    /** Answer label "Language · Script" (script omitted for single-script langs). */
    sourceLabel: (base: string, script: string) => string;
  };
  picker: {
    /** Input prompt; phrased generically since a stage may ask for a language, family, or script. */
    placeholder: string;
    noMatch: string;
  };
  result: {
    won: string;
    lost: string;
    correctCount: (correct: number) => string;
    subtitle: (stageName: string, answered: number) => string;
    playAgain: string;
    backToStages: string;
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
    /** Title of the section about the app itself. */
    appTitle: string;
    /** Copyright line for the app. */
    copyright: string;
    /** Link to the app's source code repository. */
    sourceCode: ReactNode;
    backToStages: string;
  };
}
