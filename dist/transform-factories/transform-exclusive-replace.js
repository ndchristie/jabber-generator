"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function () {
    var pairs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        pairs[_i] = arguments[_i];
    }
    return function (untransformed) {
        for (var i = 0; i < pairs.length; i += 1) {
            var match = untransformed.match(pairs[i][0]);
            if (match !== null && match.length > 0) {
                return untransformed.replace(pairs[i][0], pairs[i].length < 2 ? '' : pairs[i][1]);
            }
        }
        return untransformed;
    };
};
//# sourceMappingURL=transform-exclusive-replace.js.map