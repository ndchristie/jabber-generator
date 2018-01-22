"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function () {
    var groups = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        groups[_i] = arguments[_i];
    }
    return function (candidate, _a) {
        var _b = (_a === void 0 ? {} : _a).prefix, prefix = _b === void 0 ? '' : _b;
        var potentialResult = prefix + candidate;
        return !groups.some(// return false if any group of tests
        function (// return false if any group of tests
            tests) { return tests.reduce(function (acc, test) { return potentialResult.match(test) === null ? acc : acc + 1; }, 0) > 1; });
    };
};
//# sourceMappingURL=consistent-glyphs.js.map