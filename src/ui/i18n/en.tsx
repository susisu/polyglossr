import { ExternalLink } from "../components/ExternalLink.js";
import type { Messages } from "./messages.js";

/** English UI catalog. The reference locale; other catalogs mirror its shape. */
export const en = {
  nav: { stats: "Stats", about: "About" },
  footer: {
    credit: "Texts from the Universal Declaration of Human Rights (UN/OHCHR) — credits",
  },
  stageSelect: {
    intro: "A short text appears — name the language it is written in. Pick a stage to begin.",
    difficultyLabel: (value, max) => `Difficulty ${value} of ${max}`,
    languageCount: (count) => `${count} languages`,
  },
  game: {
    progress: (current, total) => `${current} / ${total}`,
    mistakesLabel: (mistakes, max) => `${mistakes} of ${max} mistakes`,
    quit: "Quit",
    correct: "Correct",
    notQuite: "Not quite",
    youGuessed: (name) => `You guessed ${name}`,
    continue: "Continue",
    sourceLabel: (base, script) => `${base} · ${script}`,
  },
  picker: {
    placeholder: "Which language is this?",
    noMatch: "No matching language",
  },
  result: {
    won: "Completed",
    lost: "Game over",
    correctCount: (correct) => `${correct} correct`,
    subtitle: (stageName, answered) => `${stageName} · ${answered} answered`,
    playAgain: "Play again",
    stages: "Stages",
    yourGuess: (name) => `you: ${name}`,
  },
  stats: {
    heading: "Your stats",
    empty: "Play a game and your progress will appear here.",
    summary: (played, won) => `${played} games · ${won} completed`,
    strongest: "Strongest",
    needsWork: "Needs work",
    seenCount: (count) => `${count} seen`,
    bestByStage: "Best by stage",
    bestScore: (correct, total) => `best ${correct}/${total}`,
    playedCount: (count) => `${count} played`,
    recentGames: "Recent games",
    won: "completed",
    lost: "lost",
    backToStages: "Back to stages",
  },
  about: {
    heading: "About PolyGlossr",
    lead: "A game about recognizing the world's written languages. You are shown a short passage and name the language it is written in.",
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
    backToStages: "Back to stages",
  },
} satisfies Messages;
