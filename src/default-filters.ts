import noConsonantPileup from './filters/no-consonant-pileup';
import consistentGlyphs from './filters/consistent-glyphs';

export default [
  noConsonantPileup(2),
  consistentGlyphs(
    ['kw', 'qu'],
    ['f', 'ph'],
    ['v', 'bh'],
  ),
];
