import { expect } from 'chai';
import { spy } from 'sinon';
import transformExclusiveReplace from '../../src/transform-factories/transform-exclusive-replace';

describe('transform-exclusive-replace', () => {
  it('Applies one correct transformation', () => {
    const replacementSpy = spy(String.prototype, 'replace');
    // simple pluralization, we expect only one rule to apply
    const trf = transformExclusiveReplace(
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
    const ccBefore = replacementSpy.callCount; // spying on prototype method easily polluted
    Object.keys(expectationMap).forEach((key: string, index: number) => {
      expect(trf(key)).to.equal(expectationMap[key]);
      expect(replacementSpy.callCount).to.equal(ccBefore + index + 1);
    });
    replacementSpy.restore();
  });
  it('Returns untransformed if none match', () => {
    expect(transformExclusiveReplace(['unmatched'])('untransformed')).to.equal('untransformed');
  });
  it('Replaces with empty string if no replacement provided', () => {
    expect(transformExclusiveReplace([/foo/gi])('foobarfoo')).to.equal('bar');
  });
});
