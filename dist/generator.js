"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Generator = /** @class */ (function () {
    function Generator(module) {
        this.elements = [];
        this.filters = [];
        this.transforms = [];
        this.addModule(module);
    }
    Generator.prototype.addModule = function (_a) {
        var _b = _a.modules, modules = _b === void 0 ? [] : _b, _c = _a.elements, elements = _c === void 0 ? [] : _c, _d = _a.filters, filters = _d === void 0 ? [] : _d, _e = _a.transforms, transforms = _e === void 0 ? [] : _e;
        this.addModules(modules);
        this.addElements(elements);
        this.addFilters(filters);
        this.addTransforms(transforms);
    };
    Generator.prototype.addModules = function (modules) {
        var _this = this;
        modules.forEach(function (module) { return _this.addModule(module); });
    };
    Generator.prototype.addElement = function (element) {
        this.addElements([element]);
    };
    Generator.prototype.addElements = function (elements) {
        (_a = this.elements).push.apply(_a, elements);
        var _a;
    };
    Generator.prototype.addFilter = function (filter) {
        this.addFilters([filter]);
    };
    Generator.prototype.addFilters = function (filters) {
        (_a = this.filters).push.apply(_a, filters);
        try {
            this.getElement();
        }
        catch (e) {
            console.warn(e);
        }
        var _a;
    };
    Generator.prototype.addTransform = function (transform) {
        this.addTransforms([transform]);
    };
    Generator.prototype.addTransforms = function (transforms) {
        (_a = this.transforms).push.apply(_a, transforms);
        var _a;
    };
    Generator.prototype.getElement = function (_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.filters, filters = _c === void 0 ? [] : _c, _d = _b.prefix, prefix = _d === void 0 ? '' : _d, _e = _b.isInitial, isInitial = _e === void 0 ? true : _e, _f = _b.isTerminal, isTerminal = _f === void 0 ? true : _f;
        var allFilters = this.filters.concat(filters);
        var candidates = this.elements.slice();
        var candidate;
        do {
            if (!candidates.length)
                throw new RangeError('No candidates remain to test');
            candidate = candidates.splice(Math.floor(Math.random() * candidates.length), 1)[0];
        } while (allFilters.some(// try again if any filters fail
        function (// try again if any filters fail
            filter) { return !filter(candidate, { prefix: prefix, isInitial: isInitial, isTerminal: isTerminal }); }));
        return candidate;
    };
    Generator.prototype.getWord = function (elementCount, _a) {
        var _this = this;
        if (elementCount === void 0) { elementCount = 2; }
        var _b = _a === void 0 ? {} : _a, _c = _b.filters, filters = _c === void 0 ? [] : _c, _d = _b.transforms, transforms = _d === void 0 ? [] : _d;
        var rec = function (togo) {
            var prefix = togo > 1 ? rec(togo - 1) : '';
            var isInitial = togo === 1;
            var isTerminal = togo === elementCount;
            return prefix + _this.getElement({ filters: filters, prefix: prefix, isInitial: isInitial, isTerminal: isTerminal });
        };
        var untransformed = rec(elementCount);
        var allTransforms = this.transforms.concat(transforms);
        return allTransforms.reduce(function (str, transform) { return transform(str); }, untransformed);
    };
    return Generator;
}());
exports.default = Generator;
//# sourceMappingURL=generator.js.map