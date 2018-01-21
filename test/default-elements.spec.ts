import { expect } from 'chai';
import defaultElements from'../src/default-elements';

describe('default elements', () => {
  it('Unpacks a flat array of unique, alphabetical string elements', () => {
    expect(defaultElements.every((str, index, array) => {
      return array.indexOf(str) === index && !!str.match(/^\w+$/);
    })).to.be.true;
  });
});
