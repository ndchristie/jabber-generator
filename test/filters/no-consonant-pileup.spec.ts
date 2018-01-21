import { expect } from 'chai';
import noConsonantPileup from '../../src/filters/no-consonant-pileup';

describe('filters', () => {
  describe('no-consonant-pileup', () => {
    it('Returns false if the prefix ends AND the candidate begins with a consonant', () => {
      expect(noConsonantPileup('kwi', { prefix: 'Avv' })).to.be.false;
      expect(noConsonantPileup('gha', { prefix: 'OAK' })).to.be.false;
      expect(noConsonantPileup('OFF', { prefix: 'ebi' })).to.be.true;
      expect(noConsonantPileup('hua', { prefix: 'ape' })).to.be.true;
      // typical tests
      expect(noConsonantPileup('foo', { prefix: 'bar' })).to.be.false;
      expect(noConsonantPileup('foo', { prefix: 'foo' })).to.be.true;
      expect(noConsonantPileup('bar', { prefix: 'bar' })).to.be.false;
      expect(noConsonantPileup('bar', { prefix: 'foo' })).to.be.true;
    });
  });
});
