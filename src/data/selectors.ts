import type { Locale } from "../shared/locale.js";
import { dataset } from "./dataset.js";
import type { Language } from "./language.js";
import { localizedLanguageName, localizedScriptLabel } from "./localizedNames.js";
import type { SourceEntry } from "./source.js";
import type { Stage, StageOption } from "./stage.js";

/** A stage option prepared for display: its id, shown name, and match aliases. */
export interface StageOptionView {
  /** The option's answer key. */
  id: string;
  /** Localized name shown to the player. */
  name: string;
  /** Lowercased strings the free-text input is matched against. */
  search: readonly string[];
}

/** The single logical language an option represents, or null if it spans several. */
function singleLangId(option: StageOption): string | null {
  let langId: string | null = null;
  for (const code of option.sourceCodes) {
    const source = dataset.sources.get(code);
    if (source === undefined) continue;
    if (langId === null) langId = source.langId;
    else if (langId !== source.langId) return null;
  }
  return langId;
}

/** Resolve one option's display name + search aliases for a locale. */
function optionView(option: StageOption, locale: Locale): StageOptionView {
  if (option.label !== undefined) {
    return {
      id: option.id,
      name: option.label[locale],
      search: [option.label.en, option.label.ja].map((s) => s.toLowerCase()),
    };
  }
  // No label: name the option by its single logical language. Match on both the
  // localized and English names, so a player on the Japanese UI can still type
  // "russian" instead of "ロシア語".
  const langId = singleLangId(option);
  if (langId !== null) {
    const localized = languageName(langId, locale);
    const english = dataset.languages.get(langId)?.name ?? langId;
    return {
      id: option.id,
      name: localized,
      search: [localized, english].map((s) => s.toLowerCase()),
    };
  }
  return { id: option.id, name: option.id, search: [option.id.toLowerCase()] };
}

/** A stage's answer candidates (its options), sorted by localized name. */
export function stageOptions(stage: Stage, locale: Locale): StageOptionView[] {
  return stage.options
    .map((option) => optionView(option, locale))
    .sort((a, b) => a.name.localeCompare(b.name, locale));
}

/** Display name for one option id within a stage (falls back to the id). */
export function stageOptionName(stage: Stage, optionId: string, locale: Locale): string {
  const option = stage.options.find((o) => o.id === optionId);
  return option === undefined ? optionId : optionView(option, locale).name;
}

/** The source entry for a code, if present. */
export function sourceFor(code: string): SourceEntry | undefined {
  return dataset.sources.get(code);
}

/** The logical language for an id, if present. */
export function languageFor(langId: string): Language | undefined {
  return dataset.languages.get(langId);
}

/** Localized display name for a logical language id (falls back to the id). */
export function languageName(langId: string, locale: Locale): string {
  const language = dataset.languages.get(langId);
  if (language === undefined) return langId;
  return localizedLanguageName(langId, language.name, locale);
}

/** Localized script/variant label for a source code, or null if it has none. */
export function scriptLabel(code: string, locale: Locale): string | null {
  const label = dataset.sources.get(code)?.scriptLabel;
  if (label === undefined || label === null) return null;
  return localizedScriptLabel(label, locale);
}
