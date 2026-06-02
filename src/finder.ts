/**
 * Core word-finding logic for the Letterpress cheat.
 *
 * The dictionary is a plain list of lowercase words (one per line). Given a
 * pool of available letters we return every word that can be spelled from that
 * pool, where each available letter may be used at most as many times as it
 * appears.
 */

/** Split the raw dictionary text into a list of words. */
export function parseDictionary(text: string): string[] {
  return text.match(/[^\r\n]+/g) ?? [];
}

/**
 * Can `word` be spelled using the letters in `pool`?
 * Each letter in the pool is consumed once as it is used.
 */
export function canSpell(word: string, pool: string): boolean {
  let remaining = pool;
  for (const letter of word) {
    const index = remaining.indexOf(letter);
    if (index < 0) return false;
    remaining = remaining.slice(0, index) + remaining.slice(index + 1);
  }
  return true;
}

/**
 * Every word from `dictionary` that can be spelled from `letters`, sorted with
 * the longest (most valuable in Letterpress) words first, then alphabetically.
 */
export function findWords(dictionary: string[], letters: string): string[] {
  const pool = normalize(letters);
  if (pool === "") return [];

  const matches = dictionary.filter((word) => canSpell(word, pool));
  matches.sort((a, b) => b.length - a.length || (a < b ? -1 : a > b ? 1 : 0));
  return matches;
}

/**
 * Keep only the words that contain every one of the `required` letters.
 * Letters are matched by presence, not by count.
 */
export function filterByRequired(words: string[], required: string): string[] {
  const needed = [...new Set(normalize(required))];
  if (needed.length === 0) return words;
  return words.filter((word) => needed.every((letter) => word.includes(letter)));
}

/** Lowercase and strip anything that is not an a–z letter. */
export function normalize(input: string): string {
  return input.toLowerCase().replace(/[^a-z]/g, "");
}
