"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function () {
    var tests = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        tests[_i] = arguments[_i];
    }
    return function (candidate, _a) {
        var _b = (_a === void 0 ? {} : _a).prefix, prefix = _b === void 0 ? '' : _b;
        var potentialResult = prefix + candidate;
        return !tests.some(function (t) { return potentialResult.match(t) !== null; }); // reject any match
    };
};
//# sourceMappingURL=reject-matches.js.map