import exclusiveReplacements from './exclusive-replacements';

export const englishDoubleVowels = (untransformed: string) => untransformed
  .replace(/aa+h?/gi, 'ah')
  .replace(/ii+e?/gi, 'ie')
  .replace(/o?uu+/gi, 'ou');

export const englishTripleVowels = (untransformed: string) => untransformed
  .replace(/o[iw]?ee([^y]+)/gi, 'oi$1')
  .replace(/o[iw]?eey?$/i, 'oy');

export const englishDoubleConsonants = (untransformed: string) => untransformed
  .replace(/([hjkqvwxy])\1+/gi, '$1');

export const englishHSandwich = (untransformed: string) => untransformed
  .replace(/([^cpst])h([^aeiou])/gi, '$1$2');

export const englishTripleU = (untransformed: string) => untransformed
  .replace(/(uw|uu|wu)+e?/gi, 'ue');

export const englishEndings = exclusiveReplacements(
  [/sc$/i, 'sk'],
  [/c$/i, 'ck'],
  [/iy$/i, 'ie'],
  [/iw$/i, 'iu'],
  [/([^aeio])u$/i, '$1ue'],
  [/j$/i, 'dge'],
  [/v$/i, 've'],
);

export default [
  englishDoubleVowels,
  englishTripleVowels,
  englishDoubleConsonants,
  englishHSandwich,
  englishTripleU,
  englishEndings,
];
