"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var exclusive_replacement_1 = require("./transformations/exclusive-replacement");
exports.default = [
    // unexpected double vowels in English
    function (untransformed) { return untransformed.replace(/aa+/gi, 'ah'); },
    function (untransformed) { return untransformed.replace(/ii+/gi, 'ie'); },
    function (untransformed) { return untransformed.replace(/uu+/gi, 'ou'); },
    // unexpected h sandwich in English
    function (untransformed) { return untransformed.replace(/([^cpst])h([^aeiou])/gi, '$1$2'); },
    // unexpected double consonants in English
    function (untransformed) { return untransformed.replace(/([hjkqvwxy])\1+/gi, '$1'); },
    // unexpected uw combination
    function (untranstormed) { return untranstormed.replace('uw', 'ue'); },
    // common word endings in English
    exclusive_replacement_1.default([/sc$/i, 'sk'], [/c$/i, 'ck'], [/iy$/i, 'ie'], [/iw$/i, 'iu'], [/([^aeio])u$/i, '$1ue'], [/j$/i, 'dge'], [/j$/i, 'dge'], [/v$/i, 've']),
];
//# sourceMappingURL=default-transformations.js.map