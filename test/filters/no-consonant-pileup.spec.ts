import { expect } from 'chai';
import noConsonantPileup from '../../src/filters/no-consonant-pileup';

describe('filters', () => {
  describe('no-consonant-pileup', () => {
    it('Returns false if prefix ends in x consonants AND candidate begins with one', () => {
      const filter = noConsonantPileup(2);
      expect(filter('kwi', { prefix: 'Avv' })).to.be.false;
      expect(filter('egg', { prefix: 'sch' })).to.be.true;
      expect(filter('YAY', { prefix: 'off' })).to.be.false;
      expect(filter('gha', { prefix: 'OAK' })).to.be.true;
      expect(filter('OFF', { prefix: 'ebi' })).to.be.true;
      expect(filter('hua', { prefix: 'ape' })).to.be.true;
      // typical tests
      expect(filter('foo', { prefix: 'bar' })).to.be.true;
      expect(filter('foo', { prefix: 'foo' })).to.be.true;
      expect(filter('bar', { prefix: 'bar' })).to.be.true;
      expect(filter('bar', { prefix: 'foo' })).to.be.true;
    });
  });
});
