"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var flatten = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return args.reduce(function (acc, arg) { return acc.concat(Array.isArray(arg) ? flatten.apply(void 0, arg) : arg); }, []);
};
var prefix = function (pres, posts) {
    var flatPres = flatten(pres);
    var flatPosts = flatten(posts);
    return flatPres.reduce(function (res, pre) { return res.concat(flatPosts.map(function (post) { return "" + pre + post; })); }, []);
};
var commonEndings = ('abcdefghijklmnoprstuvwxyz')
    .split('')
    .concat('ch', 'ck', 'ng', 'sh', 'sk');
var a = prefix('a', commonEndings).concat('a');
var e = prefix('e', commonEndings).concat('e');
var i = prefix('i', commonEndings).concat('i');
var o = prefix('o', commonEndings).concat('o');
var u = prefix('u', commonEndings).concat('u');
var commonVowels = a.concat(e, i, o, u);
var commonPlusY = commonVowels.concat(['y']);
var l = prefix('l', commonPlusY);
var r = prefix('r', commonPlusY);
var h = prefix('h', commonPlusY);
var n = prefix('n', commonPlusY);
var elements = a.concat(e, h, i, l, n, o, r, u, prefix(['j', 'y'], commonVowels), prefix(['dw', 'gw', 'kw', 'm', 'sc', 'tw', 'v', 'x', 'z', 'zw'], commonPlusY), prefix(['ch', 'd', 'st', 't', 'th', 'w'], [commonPlusY, r]), prefix(['b', 'c', 'f', 'sch'], [commonPlusY, l, r]), prefix(['g', 'k', 'sk'], [commonPlusY, l, n, r]), prefix('p', [commonPlusY, h, l, n, r]), prefix('qu', [a, e, i, o]), prefix('s', [commonPlusY, h, l]), prefix('sp', [commonPlusY, h, l])).sort();
exports.default = elements;
//# sourceMappingURL=default-elements.js.map