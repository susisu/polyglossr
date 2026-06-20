import { ExternalLink } from "../components/ExternalLink.js";
import type { Messages } from "./messages.js";

/** English UI catalog. The reference locale; other catalogs mirror its shape. */
export const en = {
  nav: { about: "About" },
  stageSelect: {
    intro: "How many of the world's languages can you recognize?",
    best: (correct, total) => `Best ${correct}/${total}`,
    unplayed: "Not played",
  },
  stageDetail: {
    play: "Play",
    back: "Back",
    best: (correct, total) => `Best ${correct}/${total}`,
    played: (count) => `${count} played`,
    strong: "Strong",
    needsWork: "Needs work",
    seenCount: (count) => `${count} seen`,
  },
  game: {
    progress: (current, total) => `${current} / ${total}`,
    mistakesLabel: (mistakes, max) => `${mistakes} of ${max} mistakes`,
    correct: "Correct",
    notQuite: "Not quite",
    youGuessed: (name) => `You guessed ${name}`,
    sourceLabel: (base, script) => `${base} · ${script}`,
  },
  picker: {
    placeholder: "What is this?",
    noMatch: "No matching option",
  },
  result: {
    won: "Completed",
    lost: "Game over",
    correctCount: (correct) => `${correct} correct`,
    subtitle: (stageName, answered) => `${stageName} · ${answered} answered`,
    playAgain: "Play again",
    backToStages: "Back to stages",
    yourGuess: (name) => `you: ${name}`,
  },
  about: {
    heading: "About PolyGlossr",
    lead: "A game about recognizing the world's written languages. You are shown a short passage and name what it is.",
    textLicensingTitle: "Text & licensing",
    textLicensingBody:
      "Every passage is an excerpt from the Universal Declaration of Human Rights.",
    udhrCredit: (
      <>
        UDHR text © United Nations. The Declaration is the most translated, copyright-free document
        in the world, reproduced here via the{" "}
        <ExternalLink href="https://www.ohchr.org/en/universal-declaration-of-human-rights">
          UN Office of the High Commissioner for Human Rights (OHCHR)
        </ExternalLink>
        .
      </>
    ),
    packageCredit: (
      <>
        Language data via the{" "}
        <ExternalLink href="https://github.com/wooorm/udhr">
          <code>udhr</code>
        </ExternalLink>{" "}
        npm package © Titus Wormer,{" "}
        <ExternalLink href="https://github.com/wooorm/udhr/blob/main/license">
          MIT License
        </ExternalLink>
        .
      </>
    ),
    appTitle: "About this app",
    copyright: "© 2026 Susisu",
    sourceCode: (
      <>
        The source code is available on{" "}
        <ExternalLink href="https://github.com/susisu/polyglossr">GitHub</ExternalLink>.
      </>
    ),
    backToStages: "Back to stages",
  },
} satisfies Messages;
