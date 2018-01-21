import { expect } from 'chai';
import Generator from'../src/generator';

describe('Jabber Generator', () => {
  let jabber;

  beforeEach(() => {
    jabber = new Generator(['foo', 'bar']);
  });

  describe('constructor', () => {
    it('Takes an array of strings to generate with', () => {
      expect(jabber.strings).to.deep.equal(['foo', 'bar']);
    });
  });

  describe('randomString', () => {
    it('Returns a string from the set of strings', () => {
      expect(jabber.randomString()).to.be.a('string');
      expect(jabber.strings).to.include(jabber.randomString());
    });
  });
});
