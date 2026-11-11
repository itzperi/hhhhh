/**
 * Length rules for search snippets. Titles render in search results at roughly
 * 50-60 characters, and descriptions are cut off after roughly 160, so every
 * indexable page is held to these ranges.
 */
export const TITLE_MIN = 50;
export const TITLE_MAX = 60;
export const DESCRIPTION_MIN = 150;
export const DESCRIPTION_MAX = 160;

/**
 * Returns the first candidate whose length falls in the title range. Throws when
 * none fits, so a build fails rather than shipping a title outside the rule.
 */
export function fitTitle(candidates: readonly string[]): string {
  const hit = candidates.find((c) => c.length >= TITLE_MIN && c.length <= TITLE_MAX);
  if (!hit) {
    throw new Error(`No title candidate is ${TITLE_MIN}-${TITLE_MAX} characters: ${candidates.join(' || ')}`);
  }
  return hit;
}

/** Same rule for meta descriptions. */
export function fitDescription(candidates: readonly string[]): string {
  const hit = candidates.find((c) => c.length >= DESCRIPTION_MIN && c.length <= DESCRIPTION_MAX);
  if (!hit) {
    throw new Error(
      `No description candidate is ${DESCRIPTION_MIN}-${DESCRIPTION_MAX} characters: ${candidates.join(' || ')}`,
    );
  }
  return hit;
}
