import { expect } from 'chai';
import { default as Generator } from '../src/generator';
import defaultStrings from '../src/default-strings';

describe('Jabber Generator', () => {
  let generator;

  beforeEach(() => {
    generator = new Generator();
  });

  describe('constructor', () => {
    it('Takes an array of strings to generate with', () => {
      expect(generator.strings).to.deep.equal(defaultStrings);
      expect(new Generator(['foo', 'bar']).strings).to.deep.equal(['foo', 'bar']);
    });
  });

  describe('randomString', () => {
    it('Returns a string from the set of strings', () => {
      expect(generator.randomString()).to.be.a('string');
      expect(generator.strings).to.include(generator.randomString());
    });
  });

  describe('randomWord', () => {
    it('Returns a word created by combining from the set of strings', () => {
      expect(generator.randomWord()).to.be.a('string').with.length.above(1);
      expect(new Generator(['foo', 'bar']).randomWord())
        .to.be.a('string')
        .with.lengthOf(6)
        .and.match(/^(foo|bar){2}$/);
    });
    it('Takes a number of substrings', () => {
      expect(generator.randomWord(3)).to.be.a('string').with.length.above(2);
      expect(new Generator(['foo', 'bar']).randomWord(3))
        .to.be.a('string')
        .with.lengthOf(9)
        .and.match(/^(foo|bar){3}$/);
      expect(new Generator(['foo', 'bar']).randomWord(5))
        .to.be.a('string')
        .with.lengthOf(15)
        .and.match(/^(foo|bar){5}$/);
    });
  });
});
