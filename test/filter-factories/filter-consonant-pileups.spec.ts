import { expect } from 'chai';
import filterConsonantPileups from '../../src/filter-factories/filter-consonant-pileups';

describe('filter-consonant-pileups', () => {
  it('Returns filter function for prefixes ending and candiates starting with consonants', () => {
    const filter = filterConsonantPileups(2, 1);
    expect(filter).to.be.a('function');

    expect(filter('kwi')).to.be.true;
    expect(filter('kwi', { prefix: 'Avv' })).to.be.false;
    expect(filter('egg', { prefix: 'sch' })).to.be.true;
    expect(filter('YAY', { prefix: 'off' })).to.be.false;
    expect(filter('gha', { prefix: 'OAK' })).to.be.true;
    expect(filter('OFF', { prefix: 'ebi' })).to.be.true;
    expect(filter('hua', { prefix: 'ape' })).to.be.true;

    // other arguments
    expect(filterConsonantPileups(1, 2)('bar', { prefix: 'ash' })).to.be.true;
    expect(filterConsonantPileups(1, 2)('bar', { prefix: 'bar' })).to.be.true;
    expect(filterConsonantPileups(1, 1)('bar', { prefix: 'bar' })).to.be.false;
    expect(filterConsonantPileups(3, 1)('bbb', { prefix: 'ccc' })).to.be.false;
    expect(filterConsonantPileups(1, 3)('bbb', { prefix: 'ccc' })).to.be.false;
    expect(filterConsonantPileups(1, 4)('bbb', { prefix: 'ccc' })).to.be.true;
    expect(filterConsonantPileups(0, 4)('ash')).to.be.true;
    expect(filterConsonantPileups(0, 4)('schwa')).to.be.false;
    expect(filterConsonantPileups(0)('literally anything')).to.be.false;
  });
});
