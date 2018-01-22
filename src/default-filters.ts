import noConsonantPileup from './filters/no-consonant-pileup';
import consistentGlyphs from './filters/consistent-glyphs';
import rejectMatches from './filters/reject-matches';

export default [
  (
    candidate: string,
    { prefix = '' }: { prefix: string},
  ) => (prefix + candidate).match(/[^aeiou]{4,}/) === null,
  noConsonantPileup(2),
  consistentGlyphs(
    ['kw', 'qu'],
    ['f', 'ph'],
    ['v', 'bh'],
  ),
  rejectMatches(
    /[cdgktqz]j/i, // fewer difficult j sounds
    /j[cdflrsyz]/i, // fewer difficult j sounds
    /v[^aeiouy]/i, // fewer difficult v sounds
    /[^aeiouy][zj][^aeiouy]/i, // fewer very difficult j/z sounds
    /[gjktqx][cgjkqx]/i, // fewer difficult ckqg sounds
    /[^aeiouy](gl|gn|gh)/i, // fewer difficult g sounds
    /[^aeiouy]pn/i, // fewer difficult pn sounds
    /([^aeiouy])[^aeiouy]\1/, // fewer tripping sounds
  ),
];
