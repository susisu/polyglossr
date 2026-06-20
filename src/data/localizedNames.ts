import type { Locale, Localized } from "../shared/locale.js";

/**
 * Non-default display names for the languages the stages use, keyed by ISO
 * 639-3. Only the names we actually need are listed — anything missing falls
 * back to the English name carried in the dataset. English itself is never
 * listed here (it is the fallback).
 */
const LANGUAGE_NAMES: Record<string, Partial<Localized<string>>> = {
  amh: { ja: "アムハラ語" },
  arb: { ja: "アラビア語" },
  ces: { ja: "チェコ語" },
  cmn: { ja: "中国語" },
  cym: { ja: "ウェールズ語" },
  deu: { ja: "ドイツ語" },
  ell: { ja: "ギリシャ語" },
  eng: { ja: "英語" },
  fin: { ja: "フィンランド語" },
  fra: { ja: "フランス語" },
  heb: { ja: "ヘブライ語" },
  hin: { ja: "ヒンディー語" },
  hrv: { ja: "クロアチア語" },
  hun: { ja: "ハンガリー語" },
  hye: { ja: "アルメニア語" },
  ind: { ja: "インドネシア語" },
  ita: { ja: "イタリア語" },
  jpn: { ja: "日本語" },
  kat: { ja: "ジョージア語" },
  khm: { ja: "クメール語" },
  kor: { ja: "韓国語" },
  lao: { ja: "ラオ語" },
  lit: { ja: "リトアニア語" },
  mya: { ja: "ビルマ語" },
  nld: { ja: "オランダ語" },
  pol: { ja: "ポーランド語" },
  por: { ja: "ポルトガル語" },
  ron: { ja: "ルーマニア語" },
  rus: { ja: "ロシア語" },
  slv: { ja: "スロベニア語" },
  spa: { ja: "スペイン語" },
  srp: { ja: "セルビア語" },
  swe: { ja: "スウェーデン語" },
  tha: { ja: "タイ語" },
  tur: { ja: "トルコ語" },
  vie: { ja: "ベトナム語" },
};

/**
 * Non-default script/variant labels, keyed by the English label the dataset
 * carries. Only true scripts are translated; orthography/region variants
 * (e.g. "1996", "2006", "Portugal", "monotonic") fall back to English.
 */
const SCRIPT_LABELS: Record<string, Partial<Localized<string>>> = {
  Cyrillic: { ja: "キリル文字" },
  Latin: { ja: "ラテン文字" },
  Simplified: { ja: "簡体字" },
};

/** Localized language name, falling back to the dataset's English name. */
export function localizedLanguageName(langId: string, englishName: string, locale: Locale): string {
  return LANGUAGE_NAMES[langId]?.[locale] ?? englishName;
}

/** Localized script/variant label, falling back to the English label. */
export function localizedScriptLabel(englishLabel: string, locale: Locale): string {
  return SCRIPT_LABELS[englishLabel]?.[locale] ?? englishLabel;
}
