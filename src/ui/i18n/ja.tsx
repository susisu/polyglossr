import { ExternalLink } from "../components/ExternalLink.js";
import type { Messages } from "./messages.js";

/** Japanese UI catalog. Mirrors the shape of `en`. */
export const ja = {
  nav: { stats: "統計", about: "概要" },
  footer: {
    credit: "本文は世界人権宣言（国連／OHCHR）より — クレジット",
  },
  stageSelect: {
    intro:
      "短い文章が表示されます。それが何語で書かれているかを答えてください。全30問、ミスは3回まで。セットを選んで始めましょう。",
    difficultyLabel: (value, max) => `難易度 ${value}/${max}`,
    languageCount: (count) => `${count}言語`,
  },
  game: {
    progress: (current, total) => `${current} / ${total}`,
    mistakesLabel: (mistakes, max) => `ミス ${mistakes}/${max}`,
    quit: "やめる",
    correct: "正解",
    notQuite: "不正解",
    youGuessed: (name) => `あなたの回答: ${name}`,
    continue: "次へ",
    sourceLabel: (base, script) => `${base}・${script}`,
  },
  picker: {
    placeholder: "これは何語？",
    noMatch: "該当する言語がありません",
  },
  result: {
    won: "クリア",
    lost: "ゲームオーバー",
    correctCount: (correct) => `${correct}問正解`,
    subtitle: (stageName, answered) => `${stageName}・${answered}問回答`,
    playAgain: "もう一度",
    stages: "ステージ一覧",
    yourGuess: (name) => `あなた: ${name}`,
  },
  stats: {
    heading: "あなたの成績",
    empty: "プレイすると、ここに成績が表示されます。",
    summary: (played, won) => `${played}ゲーム・${won}クリア`,
    strongest: "得意な言語",
    needsWork: "苦手な言語",
    seenCount: (count) => `${count}回出題`,
    bestByStage: "ステージ別ベスト",
    bestScore: (correct, total) => `ベスト ${correct}/${total}`,
    playedCount: (count) => `${count}回プレイ`,
    recentGames: "最近のゲーム",
    won: "クリア",
    lost: "失敗",
    backToStages: "ステージ一覧へ",
  },
  about: {
    heading: "PolyGlossr について",
    lead: "世界の文字・言語を見分ける、静かなゲームです。短い文章が表示されるので、それが何語で書かれているかを答えます。",
    textLicensingTitle: "テキストとライセンス",
    textLicensingBody: (
      <>
        すべての文章は<strong>世界人権宣言</strong>からの抜粋です —
        どの言語でも同じ文書です。プレイ中は、各文章の言語や出典は意図的に表示されません。
      </>
    ),
    udhrCredit: (
      <>
        世界人権宣言の本文 ©
        国際連合。この宣言は世界で最も多くの言語に翻訳された著作権フリーの文書であり、ここでは
        <ExternalLink href="https://www.ohchr.org/en/universal-declaration-of-human-rights">
          国連人権高等弁務官事務所（OHCHR）
        </ExternalLink>
        を通じて掲載しています。
      </>
    ),
    packageCredit: (
      <>
        言語データは npm パッケージ{" "}
        <ExternalLink href="https://github.com/wooorm/udhr">
          <code>udhr</code>
        </ExternalLink>{" "}
        （© Titus Wormer、
        <ExternalLink href="https://github.com/wooorm/udhr/blob/main/license">
          MIT ライセンス
        </ExternalLink>
        ）を利用しています。
      </>
    ),
    backToStages: "ステージ一覧へ",
  },
} satisfies Messages;
