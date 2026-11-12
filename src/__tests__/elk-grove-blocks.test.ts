import { describe, expect, it } from 'vitest';
import { MEDI_CAL, MEDICARE, NIVANO, SELF_PAY } from '@/data/content';

/**
 * Each segment page carries one short "For Elk Grove patients" block. They must say something different
 * from each other (not a swapped town name, which would be a doorway page), use only the measured drive
 * facts, and never imply an office in Elk Grove.
 */
const SEGMENTS = [
  ['medicare', MEDICARE],
  ['mediCal', MEDI_CAL],
  ['nivano', NIVANO],
  ['selfPay', SELF_PAY],
] as const;

const blockOf = (page: (typeof SEGMENTS)[number][1]) => page.blocks.find((b) => b.id === 'elk-grove-patients');

describe('Elk Grove blocks on the segment pages', () => {
  it.each(SEGMENTS)('%s has an Elk Grove block that links to the Elk Grove page', (_key, page) => {
    const block = blockOf(page);
    expect(block, 'block exists').toBeDefined();
    expect(block!.heading).toContain('Elk Grove');
    expect(block!.links?.some((l) => l.href === '/family-physician-elk-grove')).toBe(true);
  });

  it('every block says something different (the plan steps differ)', () => {
    const texts = SEGMENTS.map(([, page]) => (blockOf(page)!.paragraphs ?? []).join(' '));
    expect(new Set(texts).size).toBe(texts.length);
    // Not the same sentence with only a plan name swapped: compare after removing the plan words.
    const normalised = texts.map((t) => t.replace(/Medicare|Medi-Cal|Nivano Physicians|self-pay/gi, 'X'));
    expect(new Set(normalised).size).toBe(texts.length);
  });

  it('uses only the measured drive facts and never implies an Elk Grove office', () => {
    for (const [, page] of SEGMENTS) {
      const text = (blockOf(page)!.paragraphs ?? []).join(' ');
      expect(text).toContain('about 12 minutes');
      expect(text).not.toContain('95757');
      expect(text).not.toMatch(/our (Elk Grove|second|new) (office|location)|Elk Grove (office|location|clinic)/i);
    }
  });
});
