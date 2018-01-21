import { expect } from 'chai';
import defaultStrings from'../src/default-strings';

describe('default strings', () => {
  it('Unpacks a flat array of unique, alphabetical strings', () => {
    expect(defaultStrings.every((str, index, array) => {
      return array.indexOf(str) === index && !!str.match(/^\w+$/);
    })).to.be.true;
  });
});
