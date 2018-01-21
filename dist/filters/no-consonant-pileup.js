"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function (candidate, _a) {
    var prefix = _a.prefix;
    return (prefix.match(/[^aeiou]$/i) === null // if prefix ends in a consonant...
        || candidate.match(/^[^aeiou]/i) === null // candidate can't begin with a consonant
    );
};
//# sourceMappingURL=no-consonant-pileup.js.map