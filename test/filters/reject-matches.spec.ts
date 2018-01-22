import { expect } from 'chai';
import rejectMatches from '../../src/filters/reject-matches';

describe('filters', () => {
  describe('consistent glyphs', () => {
    it('Returns false if any test matches', () => {
      const filter = rejectMatches(
        /[dgkts]j/i,
        /[^aeiou][zj][^aeiou]/,
      );
      // fail
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
      // typical tests
      expect(filter('foo', { prefix: 'bar' })).to.be.true;
      expect(filter('foo', { prefix: 'foo' })).to.be.true;
      expect(filter('bar', { prefix: 'bar' })).to.be.true;
      expect(filter('bar', { prefix: 'foo' })).to.be.true;
    });
  });
});
