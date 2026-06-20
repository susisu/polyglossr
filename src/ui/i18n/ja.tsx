import { ExternalLink } from "../components/ExternalLink.js";
import type { Messages } from "./messages.js";

/** Japanese UI catalog. Mirrors the shape of `en`. */
export const ja = {
  nav: { about: "概要" },
  footer: {
    credit: "テキストは世界人権宣言（国連／OHCHR）より。クレジット",
  },
  stageSelect: {
    intro: "世界の言語、いくつ見分けられる？",
    best: (correct, total) => `ベスト ${correct}/${total}`,
    unplayed: "未プレイ",
  },
  stageDetail: {
    play: "プレイする",
    back: "戻る",
    best: (correct, total) => `ベスト ${correct}/${total}`,
    played: (count) => `${count}回プレイ`,
    strong: "得意",
    needsWork: "苦手",
    seenCount: (count) => `${count}回出題`,
  },
  game: {
    progress: (current, total) => `${current} / ${total}`,
    mistakesLabel: (mistakes, max) => `ミス ${mistakes}/${max}`,
    quit: "やめる",
    correct: "正解",
    notQuite: "不正解",
    youGuessed: (name) => `あなたの回答: ${name}`,
    sourceLabel: (base, script) => `${base}・${script}`,
  },
  picker: {
    placeholder: "これは何？",
    noMatch: "該当する選択肢がありません",
  },
  result: {
    won: "クリア",
    lost: "ゲームオーバー",
    correctCount: (correct) => `${correct}問正解`,
    subtitle: (stageName, answered) => `${stageName}・${answered}問回答`,
    playAgain: "もう一度",
    backToStages: "ステージ一覧へ",
    yourGuess: (name) => `あなた: ${name}`,
  },
  about: {
    heading: "PolyGlossr について",
    lead: "世界の言語を見分けるゲームです。短い文章が表示されるので、それが何かを答えてください。",
    textLicensingTitle: "テキストとライセンス",
    textLicensingBody: "すべての文章は世界人権宣言からの抜粋です。",
    udhrCredit: (
      <>
        世界人権宣言の本文 ©
        国際連合。この宣言は世界で最も多くの言語に翻訳された著作権フリーの文書であり、本文は
        <ExternalLink href="https://www.ohchr.org/en/universal-declaration-of-human-rights">
          国連人権高等弁務官事務所（OHCHR）
        </ExternalLink>
        が公開しているものを使用しています。
      </>
    ),
    packageCredit: (
      <>
        言語データの取得には npm パッケージ{" "}
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
    appTitle: "このアプリについて",
    copyright: "© 2026 Susisu",
    sourceCode: (
      <>
        ソースコードは{" "}
        <ExternalLink href="https://github.com/susisu/polyglossr">GitHub</ExternalLink>{" "}
        で公開しています。
      </>
    ),
    backToStages: "ステージ一覧へ",
  },
} satisfies Messages;
