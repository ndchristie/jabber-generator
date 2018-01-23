import exclusiveReplacements from './transformations/exclusive-replacements';

export default [
  // unexpected double vowels in English
  untransformed => untransformed.replace(/aa+/gi, 'ah'),
  untransformed => untransformed.replace(/ii+/gi, 'ie'),
  untransformed => untransformed.replace(/uu+/gi, 'ou'),
  // unexpected h sandwich in English
  untransformed => untransformed.replace(/([^cpst])h([^aeiou])/gi, '$1$2'),
  // unexpected double consonants in English
  untransformed => untransformed.replace(/([hjkqvwxy])\1+/gi, '$1'),
  // unexpected uw combination
  untranstormed => untranstormed.replace('uw', 'ue'),
  // common word endings in English
  exclusiveReplacements(
    [/sc$/i, 'sk'],
    [/c$/i, 'ck'],
    [/iy$/i, 'ie'],
    [/iw$/i, 'iu'],
    [/([^aeio])u$/i, '$1ue'],
    [/j$/i, 'dge'],
    [/j$/i, 'dge'],
    [/v$/i, 've'],
  ),
];
