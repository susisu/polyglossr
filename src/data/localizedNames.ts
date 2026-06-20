import type { Locale, Localized } from "../shared/locale.js";

/**
 * Non-default display names for the languages the stages use, keyed by ISO
 * 639-3. Only the names we actually need are listed — anything missing falls
 * back to the English name carried in the dataset. English itself is never
 * listed here (it is the fallback).
 */
const LANGUAGE_NAMES: Record<string, Partial<Localized<string>>> = {
  als: { ja: "アルバニア語" },
  arb: { ja: "アラビア語" },
  azj: { ja: "アゼルバイジャン語" },
  bel: { ja: "ベラルーシ語" },
  ben: { ja: "ベンガル語" },
  bos: { ja: "ボスニア語" },
  bre: { ja: "ブルトン語" },
  bul: { ja: "ブルガリア語" },
  cat: { ja: "カタルーニャ語" },
  ces: { ja: "チェコ語" },
  cmn: { ja: "中国語" },
  cym: { ja: "ウェールズ語" },
  dan: { ja: "デンマーク語" },
  deu: { ja: "ドイツ語" },
  dzo: { ja: "ゾンカ語" },
  ekk: { ja: "エストニア語" },
  ell: { ja: "ギリシャ語" },
  eng: { ja: "英語" },
  eus: { ja: "バスク語" },
  fao: { ja: "フェロー語" },
  fin: { ja: "フィンランド語" },
  fra: { ja: "フランス語" },
  gla: { ja: "スコットランド・ゲール語" },
  gle: { ja: "アイルランド語" },
  glg: { ja: "ガリシア語" },
  guj: { ja: "グジャラート語" },
  heb: { ja: "ヘブライ語" },
  hin: { ja: "ヒンディー語" },
  hrv: { ja: "クロアチア語" },
  hsb: { ja: "上ソルブ語" },
  hun: { ja: "ハンガリー語" },
  hye: { ja: "アルメニア語" },
  ike: { ja: "イヌクティトゥット語" },
  ind: { ja: "インドネシア語" },
  isl: { ja: "アイスランド語" },
  ita: { ja: "イタリア語" },
  jpn: { ja: "日本語" },
  kan: { ja: "カンナダ語" },
  kat: { ja: "ジョージア語" },
  kaz: { ja: "カザフ語" },
  khk: { ja: "モンゴル語" },
  khm: { ja: "クメール語" },
  kir: { ja: "キルギス語" },
  kor: { ja: "韓国語" },
  lao: { ja: "ラオ語" },
  lit: { ja: "リトアニア語" },
  ltz: { ja: "ルクセンブルク語" },
  lvs: { ja: "ラトビア語" },
  mal: { ja: "マラヤーラム語" },
  mkd: { ja: "マケドニア語" },
  mlt: { ja: "マルタ語" },
  mya: { ja: "ビルマ語" },
  nld: { ja: "オランダ語" },
  nno: { ja: "ノルウェー語（ニーノシュク）" },
  nob: { ja: "ノルウェー語（ブークモール）" },
  npi: { ja: "ネパール語" },
  oci: { ja: "オック語" },
  pol: { ja: "ポーランド語" },
  por: { ja: "ポルトガル語" },
  roh: { ja: "ロマンシュ語" },
  ron: { ja: "ルーマニア語" },
  rus: { ja: "ロシア語" },
  sin: { ja: "シンハラ語" },
  slk: { ja: "スロバキア語" },
  slv: { ja: "スロベニア語" },
  sme: { ja: "北サーミ語" },
  spa: { ja: "スペイン語" },
  srp: { ja: "セルビア語" },
  swe: { ja: "スウェーデン語" },
  tam: { ja: "タミル語" },
  tel: { ja: "テルグ語" },
  tgl: { ja: "タガログ語" },
  tha: { ja: "タイ語" },
  tur: { ja: "トルコ語" },
  ukr: { ja: "ウクライナ語" },
  urd: { ja: "ウルドゥー語" },
  vie: { ja: "ベトナム語" },
  zlm: { ja: "マレー語" },
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
  Traditional: { ja: "繁体字" },
};

/** Localized language name, falling back to the dataset's English name. */
export function localizedLanguageName(langId: string, englishName: string, locale: Locale): string {
  return LANGUAGE_NAMES[langId]?.[locale] ?? englishName;
}

/** Localized script/variant label, falling back to the English label. */
export function localizedScriptLabel(englishLabel: string, locale: Locale): string {
  return SCRIPT_LABELS[englishLabel]?.[locale] ?? englishLabel;
}
