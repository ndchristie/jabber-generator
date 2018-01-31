"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var exclusive_replacements_1 = require("./exclusive-replacements");
exports.englishDoubleVowels = function (untransformed) { return untransformed
    .replace(/aa+h?/gi, 'ah')
    .replace(/ii+e?/gi, 'ie')
    .replace(/o?uu+/gi, 'ou'); };
exports.englishTripleVowels = function (untransformed) { return untransformed
    .replace(/o[iw]?ee([^y]+)/gi, 'oi$1')
    .replace(/o[iw]?eey?$/i, 'oy'); };
exports.englishDoubleConsonants = function (untransformed) { return untransformed
    .replace(/([hjkqvwxy])\1+/gi, '$1'); };
exports.englishHSandwich = function (untransformed) { return untransformed
    .replace(/([^cpst])h([^aeiou])/gi, '$1$2'); };
exports.englishTripleU = function (untransformed) { return untransformed
    .replace(/(uw|uu|wu)+e?/gi, 'ue'); };
exports.englishEndings = exclusive_replacements_1.default([/sc$/i, 'sk'], [/c$/i, 'ck'], [/iy$/i, 'ie'], [/iw$/i, 'iu'], [/([^aeio])u$/i, '$1ue'], [/j$/i, 'dge'], [/v$/i, 've']);
exports.default = [
    exports.englishDoubleVowels,
    exports.englishTripleVowels,
    exports.englishDoubleConsonants,
    exports.englishHSandwich,
    exports.englishTripleU,
    exports.englishEndings,
];
//# sourceMappingURL=default-transformations.js.map