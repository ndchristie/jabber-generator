import { expect } from 'chai';
import filterMatches from '../../src/filter-factories/filter-matches';

 describe('filter-matches', () => {
  it('Returns filter function for any matches', () => {
    const filter = filterMatches(
      /[dgkts]j/i,
      /[^aeiou][zj][^aeiou]/,
    );
    expect(filter).to.be.a('function');
    // fail
    expect(filter('sj')).to.be.false;
    expect(filter('czc')).to.be.false;
    expect(filter('zwe', { prefix: 'har' })).to.be.false;
    expect(filter('ram', { prefix: 'pyj' })).to.be.false;
    expect(filter('jar', { prefix: 'cad' })).to.be.false;
    expect(filter('jom', { prefix: 'tat' })).to.be.false;
    expect(filter('bad', { prefix: 'ahz' })).to.be.false;
    // pass
    expect(filter('lar', { prefix: 'ziz' })).to.be.true;
    expect(filter('ama', { prefix: 'pyj' })).to.be.true;
    expect(filter('ume', { prefix: 'jej' })).to.be.true;
    expect(filter('put', { prefix: 'raj' })).to.be.true;
  });
});
