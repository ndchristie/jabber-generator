"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function (x) {
    if (x === void 0) { x = 2; }
    return function (candidate, _a) {
        var prefix = _a.prefix;
        var prefixTerminalConsonantCount = prefix.match(/[^aeiou]*$/i)[0].length;
        var candidateBeginsWithVowel = candidate.match(/^[aeiou]/i) !== null;
        return prefixTerminalConsonantCount < x || candidateBeginsWithVowel;
    };
};
//# sourceMappingURL=no-consonant-pileup.js.map