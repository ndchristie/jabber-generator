"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function () {
    var pairs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        pairs[_i] = arguments[_i];
    }
    return function (untransformed) {
        for (var i = 0; i < pairs.length; i += 1) {
            var transformed = untransformed.replace(pairs[i][0], pairs[i][1]);
            if (transformed !== untransformed)
                return transformed;
        }
        return untransformed;
    };
};
//# sourceMappingURL=exclusive-replacement.js.map