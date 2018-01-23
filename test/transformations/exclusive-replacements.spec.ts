import { expect } from 'chai';
import { spy } from 'sinon';
import exclusiveReplacements from '../../src/transformations/exclusive-replacements';

describe('transformations', () => {
  describe('exclusive replacements', () => {
    it('Applies one correct transformation', () => {
      // simple pluralization, we expect only one rule to apply
      const trf = exclusiveReplacements(
        [/([cs]h|s|x|z)$/i, '$1es'],
        [/([^aieou])y$/i, '$1ies'],
        [/([^aieou])o$/i, '$1oes'],
        [/([^f])fe?$/i, '$1ves'],
        [/$/i, 's'],
      );
      const expectationMap = {
        mix: 'mixes',
        que: 'ques',
        tomato: 'tomatoes',
        zoo: 'zoos',
        fez: 'fezes', // actually incorrect, but we can't easily account for stress
        wes: 'weses',
        hatch: 'hatches',
        hash: 'hashes',
        play: 'plays',
        try: 'tries',
        calf: 'calves',
      };
      const replacementSpy = spy(String.prototype, 'replace');
      const ccBefore = replacementSpy.callCount; // spying on prototype method easily polluted
      Object.keys(expectationMap).forEach((key: string, index: number) => {
        expect(trf(key)).to.equal(expectationMap[key]);
        expect(replacementSpy.callCount).to.equal(ccBefore + index + 1);
      });
      replacementSpy.restore();
      // typical tests
      expect(trf('foo')).to.equal('foos');
      expect(trf('bar')).to.equal('bars');
    });
  });
});
