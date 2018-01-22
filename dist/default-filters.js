"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var no_consonant_pileup_1 = require("./filters/no-consonant-pileup");
var consistent_glyphs_1 = require("./filters/consistent-glyphs");
var reject_matches_1 = require("./filters/reject-matches");
exports.default = [
    no_consonant_pileup_1.default(2),
    consistent_glyphs_1.default(['kw', 'qu'], ['f', 'ph'], ['v', 'bh']),
    reject_matches_1.default(/[dgkts]j/i, /[^aeiou][zj][^aeiou]/),
];
//# sourceMappingURL=default-filters.js.map