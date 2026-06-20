import { dataset } from "./dataset.js";
import type { Language } from "./language.js";
import type { SourceEntry } from "./source.js";
import type { Stage } from "./stage.js";

/** The distinct logical languages a stage can ask about, sorted by name. */
export function stageLanguages(stage: Stage): Language[] {
  const seen = new Set<string>();
  const languages: Language[] = [];
  for (const code of stage.sourceCodes) {
    const source = dataset.sources.get(code);
    if (source === undefined || seen.has(source.langId)) continue;
    seen.add(source.langId);
    const language = dataset.languages.get(source.langId);
    if (language !== undefined) languages.push(language);
  }
  return languages.sort((a, b) => a.name.localeCompare(b.name, "en"));
}

/** The source entry for a code, if present. */
export function sourceFor(code: string): SourceEntry | undefined {
  return dataset.sources.get(code);
}

/** The logical language for an id, if present. */
export function languageFor(langId: string): Language | undefined {
  return dataset.languages.get(langId);
}

/** Display name for a logical language id (falls back to the id). */
export function languageName(langId: string): string {
  return dataset.languages.get(langId)?.name ?? langId;
}
