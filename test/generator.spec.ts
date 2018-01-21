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
});
