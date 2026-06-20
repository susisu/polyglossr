import type { Locale } from "../shared/locale.js";
import { dataset } from "./dataset.js";
import type { Language } from "./language.js";
import { localizedLanguageName, localizedScriptLabel } from "./localizedNames.js";
import type { SourceEntry } from "./source.js";
import type { Stage } from "./stage.js";

/** The distinct logical languages a stage can ask about, sorted by localized name. */
export function stageLanguages(stage: Stage, locale: Locale): Language[] {
  const seen = new Set<string>();
  const languages: Language[] = [];
  for (const code of stage.sourceCodes) {
    const source = dataset.sources.get(code);
    if (source === undefined || seen.has(source.langId)) continue;
    seen.add(source.langId);
    const language = dataset.languages.get(source.langId);
    if (language !== undefined) languages.push(language);
  }
  return languages.sort((a, b) =>
    languageName(a.id, locale).localeCompare(languageName(b.id, locale), locale),
  );
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
