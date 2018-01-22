import noConsonantPileup from './filters/no-consonant-pileup';
import consistentGlyphs from './filters/consistent-glyphs';
import rejectMatches from './filters/reject-matches';

export default [
  noConsonantPileup(2),
  consistentGlyphs(
    ['kw', 'qu'],
    ['f', 'ph'],
    ['v', 'bh'],
  ),
  rejectMatches(
    /[dgkts]j/i,
    /[^aeiou][zj][^aeiou]/,
  ),
];
