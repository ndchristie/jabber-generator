import { expect } from 'chai';
import filterInconsistentGraphemes from '../../src/filter-factories/filter-inconsistent-graphemes';

describe('filter-inconsistent-graphemes', () => {
  it('Returns filter function for groups matches more than a single test', () => {
    // two strings
    let filter = filterInconsistentGraphemes('f', 'ph');
    expect(filter).to.be.a('function');

    expect(filter('phaf')).to.be.false;
    expect(filter('oft', { prefix: 'peh' })).to.be.true;
    expect(filter('oft', { prefix: 'phe' })).to.be.false;
    expect(filter('off', { prefix: 'phe' })).to.be.false;
    expect(filter('hef', { prefix: 'oop' })).to.be.false;

    // two multi-character strings
    filter = filterInconsistentGraphemes('kw', 'qu');
    expect(filter('kiw', { prefix: 'que' })).to.be.true;
    expect(filter('kwi', { prefix: 'qeu' })).to.be.true;
    expect(filter('kwi', { prefix: 'que' })).to.be.false;
    expect(filter('que', { prefix: 'kwi' })).to.be.false;
    expect(filter('wee', { prefix: 'quk' })).to.be.false;

    // regex
    filter = filterInconsistentGraphemes(/v/gi, 'bh');
    expect(filter('bah', { prefix: 'vvv' })).to.be.true;
    expect(filter('hat', { prefix: 'vab' })).to.be.false;
  });
});
