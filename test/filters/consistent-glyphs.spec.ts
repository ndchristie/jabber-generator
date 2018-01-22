import { expect } from 'chai';
import consistentGlyphs from '../../src/filters/consistent-glyphs';

describe('filters', () => {
  describe('consistent glyphs', () => {
    it('Returns false if any group of tests matches more than a single test', () => {
      const filter = consistentGlyphs(
        ['kw', 'qu'],
        ['f', 'ph'],
        [/v/gi, 'bh'],
      );
      expect(filter('kwi', { prefix: 'que' })).to.be.false;
      expect(filter('que', { prefix: 'kwi' })).to.be.false;
      expect(filter('wee', { prefix: 'quk' })).to.be.false;
      expect(filter('oft', { prefix: 'phe' })).to.be.false;
      expect(filter('hat', { prefix: 'vab' })).to.be.false;
      expect(filter('bah', { prefix: 'vvv' })).to.be.true;
      // typical tests
      expect(filter('foo', { prefix: 'bar' })).to.be.true;
      expect(filter('foo', { prefix: 'foo' })).to.be.true;
      expect(filter('bar', { prefix: 'bar' })).to.be.true;
      expect(filter('bar', { prefix: 'foo' })).to.be.true;
    });
  });
});
