"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (prefixMaxConsonants, candidateMaxConsonants) {
    if (candidateMaxConsonants === void 0) { candidateMaxConsonants = 1; }
    return function (candidate, _a) {
        var _b = (_a === void 0 ? {} : _a).prefix, prefix = _b === void 0 ? '' : _b;
        var prefixTerminalConsonantCount = prefix.match(/[^aeiou]*$/i)[0].length;
        var candidateInitialConsonantCount = candidate.match(/^[^aeiou]*/i)[0].length;
        return (prefixTerminalConsonantCount < prefixMaxConsonants
            || candidateInitialConsonantCount < candidateMaxConsonants);
    };
});
//# sourceMappingURL=filter-consonant-pileups.js.map