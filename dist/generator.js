"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var default_elements_1 = require("./default-elements");
var default_filters_1 = require("./default-filters");
var Generator = /** @class */ (function () {
    function Generator(_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.elements, elements = _c === void 0 ? default_elements_1.default : _c, _d = _b.filters, filters = _d === void 0 ? default_filters_1.default : _d;
        var _this = this;
        this.elements = elements;
        this.filters = [];
        filters.forEach(function (filter) { return _this.addFilter(filter); });
    }
    Generator.prototype.addFilter = function (filter) {
        this.filters.push(filter);
        try {
            this.randomElement();
        }
        catch (e) {
            console.warn(e);
        }
    };
    Generator.prototype.randomElement = function (_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.filters, filters = _c === void 0 ? [] : _c, _d = _b.prefix, prefix = _d === void 0 ? '' : _d, _e = _b.isInitial, isInitial = _e === void 0 ? true : _e, _f = _b.isTerminal, isTerminal = _f === void 0 ? true : _f;
        var allFilters = this.filters.concat(filters);
        var candidates = this.elements.slice();
        var candidate;
        do {
            if (candidates.length === 0) {
                throw new RangeError('No element passed every filter');
            }
            candidate = candidates.splice(Math.floor(Math.random() * candidates.length), 1)[0];
        } while (!allFilters.every(function (filter) { return filter(candidate, { prefix: prefix, isInitial: isInitial, isTerminal: isTerminal }); }));
        return candidate;
    };
    Generator.prototype.randomWord = function (elementCount, _a) {
        var _this = this;
        if (elementCount === void 0) { elementCount = 2; }
        var _b = (_a === void 0 ? {} : _a).filters, filters = _b === void 0 ? [] : _b;
        var rec = function (togo) {
            var prefix = togo > 1 ? rec(togo - 1) : '';
            var isInitial = togo === 1;
            var isTerminal = togo === elementCount;
            return prefix + _this.randomElement({ filters: filters, prefix: prefix, isInitial: isInitial, isTerminal: isTerminal });
        };
        return rec(elementCount);
    };
    return Generator;
}());
exports.default = Generator;
//# sourceMappingURL=generator.js.map