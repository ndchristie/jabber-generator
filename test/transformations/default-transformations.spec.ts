import { expect } from 'chai';

import {
  englishDoubleVowels,
  englishTripleVowels,
  englishDoubleConsonants,
  englishHSandwich,
  englishEndings,
  englishTripleU,
} from '../../src/transformations/default-transformations';

describe('transformations', () => {
  describe('default transformations', () => {
    describe('englishDoubleVowels', () => {
      it('Replaces certain double vowels uncommon in English', () => {
        // simple case
        expect(englishDoubleVowels('Zoo')).to.equal('Zoo');
        expect(englishDoubleVowels('raa')).to.equal('rah');
        expect(englishDoubleVowels('Vii')).to.equal('Vie');
        expect(englishDoubleVowels('muu')).to.equal('mou');
        // more complex
        expect(englishDoubleVowels('raaaa')).to.equal('rah'); // not rahah
        expect(englishDoubleVowels('touu')).to.equal('tou'); // not toou
        expect(englishDoubleVowels('Zaah')).to.equal('Zah'); // not Zahh
        expect(englishDoubleVowels('Pliie')).to.equal('Plie'); // not Pliee
        // non-english origin
        expect(englishDoubleVowels('Hawaii')).to.equal('Hawaie');
        expect(englishDoubleVowels('Helvetii')).to.equal('Helvetie');
        expect(englishDoubleVowels('vacuum')).to.equal('vacoum');
      });
    });
    describe('englishTripleVowels', () => {
      it('Replaces certain double vowels uncommon in English', () => {
        // simple case
        expect(englishTripleVowels('Troweey')).to.equal('Troy');
        expect(englishTripleVowels('Wowie')).to.equal('Wowie');
        expect(englishTripleVowels('Boeed')).to.equal('Boid');
        expect(englishTripleVowels('Woieea')).to.equal('Woia');
      });
    });
    describe('englishDoubleConsonants', () => {
      it('Replaces certain double consonants uncommon in English', () => {
        // simple case
        expect(englishDoubleConsonants('ahht')).to.equal('aht');
        expect(englishDoubleConsonants('ejjs')).to.equal('ejs');
        expect(englishDoubleConsonants('ikky')).to.equal('iky');
        expect(englishDoubleConsonants('oqqu')).to.equal('oqu');
        expect(englishDoubleConsonants('uvvo')).to.equal('uvo');
        expect(englishDoubleConsonants('ywwi')).to.equal('ywi');
        expect(englishDoubleConsonants('sxxe')).to.equal('sxe');
        expect(englishDoubleConsonants('tyya')).to.equal('tya');
      });
    });
    describe('englishHSandwich', () => {
      it('Replaces consonant-h-constant "sandwich" uncommon in English', () => {
        // simple case
        expect(englishHSandwich('Abhba')).to.equal('Abba');
        expect(englishHSandwich('Ombhre')).to.equal('Ombre');
        expect(englishHSandwich('Halhyard')).to.equal('Halyard');
        // intentional exemption
        expect(englishHSandwich('Christie')).to.equal('Christie');
        expect(englishHSandwich('Kashmir')).to.equal('Kashmir');
        expect(englishHSandwich('Diphthong')).to.equal('Diphthong');
        expect(englishHSandwich('Heathcliff')).to.equal('Heathcliff');
      });
    });
    describe('englishEndings', () => {
      it('Replaces certain word endings uncommon in English', () => {
        expect(englishEndings('disc')).to.equal('disk');
        expect(englishEndings('vic')).to.equal('vick');
        expect(englishEndings('piy')).to.equal('pie');
        expect(englishEndings('liw')).to.equal('liu');
        expect(englishEndings('chu')).to.equal('chue');
        expect(englishEndings('baj')).to.equal('badge');
        expect(englishEndings('dov')).to.equal('dove');
      });
    });
    describe('englishTripleU', () => {
      it('Replaces combinations of u and w uncommon in English', () => {
        expect(englishTripleU('Duwell')).to.equal('Duell');
        expect(englishTripleU('Twue')).to.equal('Tue');
        // should be used in tandem with englishDoubleConsonants
        expect(englishTripleU('Owwie')).to.equal('Owwie');
      });
    });
  });
});
