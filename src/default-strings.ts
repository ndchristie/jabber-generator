const flatten = (...args): any[] => args.reduce(
  (acc, arg) => acc.concat(Array.isArray(arg) ? flatten(...arg) : arg),
  [],
);

const prefix = (pres, posts): string[] => {
  const flatPres = flatten(pres);
  const flatPosts = flatten(posts);
  return flatPres.reduce((res, pre) => res.concat(flatPosts.map(post => `${pre}${post}`)), []);
};

const commonEndings: string[] = ('abcdefghijklmnoprstuvwxyz')
  .split('')
  .concat('ch', 'ck', 'ng', 'sh', 'sk');
const a: string[] = prefix('a', commonEndings).concat('a');
const e: string[] = prefix('e', commonEndings).concat('e');
const i: string[] = prefix('i', commonEndings).concat('i');
const o: string[] = prefix('o', commonEndings).concat('o');
const u: string[] = prefix('u', commonEndings).concat('u');
const commonVowels: string[] = a.concat(e, i, o, u);
const commonPlusY: string[] = commonVowels.concat(['y']);
const l: string[] = prefix('l', commonPlusY);
const r: string[] = prefix('r', commonPlusY);
const h: string[] = prefix('h', commonPlusY);
const n: string[] = prefix('n', commonPlusY);

const strings: string[] = a.concat(
  e,
  h,
  i,
  l,
  n,
  o,
  r,
  u,
  prefix(['j', 'y'], commonVowels),
  prefix(['dw', 'gw', 'kw', 'm', 'sc', 'tw', 'v', 'x', 'z', 'zw'], commonPlusY),
  prefix(['ch', 'd', 'st', 't', 'th', 'w'], [commonPlusY, r]),
  prefix(['b', 'c', 'f', 'sch'], [commonPlusY, l, r]),
  prefix(['g', 'k', 'sk'], [commonPlusY, l, n, r]),
  prefix('p', [commonPlusY, h, l, n, r]),
  prefix('qu', [a, e, i, o]),
  prefix('s', [commonPlusY, h, l]),
  prefix('sp', [commonPlusY, h, l]),
).sort();

export default strings;
