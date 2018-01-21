"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Generator = /** @class */ (function () {
    function Generator(strings) {
        this.strings = strings;
    }
    Generator.prototype.randomString = function () {
        return this.strings[Math.floor(Math.random() * this.strings.length)];
    };
    return Generator;
}());
exports.default = Generator;
//# sourceMappingURL=generator.js.map