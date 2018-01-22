"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var no_consonant_pileup_1 = require("./filters/no-consonant-pileup");
var consistent_glyphs_1 = require("./filters/consistent-glyphs");
var reject_matches_1 = require("./filters/reject-matches");
exports.default = [
    function (candidate, _a) {
        var _b = _a.prefix, prefix = _b === void 0 ? '' : _b;
        return (prefix + candidate).match(/[^aeiou]{4,}/) === null;
    },
    no_consonant_pileup_1.default(2),
    consistent_glyphs_1.default(['kw', 'qu'], ['f', 'ph'], ['v', 'bh']),
    reject_matches_1.default(/[cdgktqz]j/i, // fewer difficult j sounds
    /j[cdflrsyz]/i, // fewer difficult j sounds
    /v[^aeiouy]/i, // fewer difficult v sounds
    /[^aeiouy][zj][^aeiouy]/i, // fewer very difficult j/z sounds
    /[gjktqx][cgjkqx]/i, // fewer difficult ckqg sounds
    /[^aeiouy](gl|gn|gh)/i, // fewer difficult g sounds
    /[^aeiouy]pn/i, // fewer difficult pn sounds
    /([^aeiouy])[^aeiouy]\1/),
];
//# sourceMappingURL=default-filters.js.map