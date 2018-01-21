import { expect } from 'chai';
import { createSandbox } from 'sinon';
import { default as Generator } from '../src/generator';
import defaultElements from '../src/default-elements';

describe('Jabber Generator', () => {
  let generator;
  let sandbox: sinon.SinonSandbox;

  beforeEach(() => {
    generator = new Generator();
    sandbox = createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('constructor', () => {
    it('Takes an array of string elements to generate with', () => {
      expect(generator.elements).to.deep.equal(defaultElements);
      expect(new Generator(['foo', 'bar']).elements).to.deep.equal(['foo', 'bar']);
    });
  });

  describe('randomElement', () => {
    it('Returns a string from the set of elements', () => {
      expect(generator.randomElement()).to.be.a('string');
      expect(generator.elements).to.include(generator.randomElement());
    });

    describe('filters', () => {
      it('Uses supplied filters to eliminate candidates', () => {
        let i = 0;
        const filterSpy = sandbox.spy(str => !!str.match(/^b/));
        expect(new Generator(['foo', 'bizz', 'buzz']).randomElement({
          filters: [filterSpy],
        }))
          .to.be.a('string')
          .with.lengthOf(4)
          .and.match(/^b/);
        i += 1;
        expect(filterSpy.called).to.be.true;
      });

      it('Throws a range error if candidates are reduced to zero', () => {
        expect(() => new Generator(['foo', 'bizz', 'buzz']).randomElement({
          filters: [() => false],
        })).to.throw(RangeError);
      });

      it('Calls a filter no more than once per candidate', () => {
        const filterSpy = sandbox.spy(() => false);
        expect(() => new Generator(['foo', 'bizz', 'buzz']).randomElement({
          filters: [filterSpy],
        })).to.throw(RangeError);
        expect(filterSpy.callCount).to.equal(3);
      });

      it('Provides filters with isInitial and isTerminal options', () => {
        const noZZifTerminal = (
          str: string,
          { isTerminal }: { isTerminal: boolean},
        ) => isTerminal === !str.match(/zz/);
        const noFifInitial = (
          str: string,
          { isInitial }: { isInitial: boolean},
        ) => isInitial === !str.match(/f/);
        // terminal rule excludes bizz/buzz
        expect(new Generator(['foo', 'bizz', 'buzz']).randomElement({
          filters: [noZZifTerminal],
        })).to.equal('foo');
        // initial rule excludes foo
        expect(new Generator(['foo', 'bizz', 'buzz']).randomElement({
          filters: [noFifInitial],
        })).to.match(/b[iu]zz/);
        // together they eliminate all candidates
        expect(() => new Generator(['foo', 'bizz', 'buzz']).randomElement({
          filters: [noZZifTerminal, noFifInitial],
        })).to.throw(RangeError);
        // disabling isTerminal allows bizz/buzz
        expect(new Generator(['foo', 'bizz', 'buzz']).randomElement({
          filters: [noZZifTerminal, noFifInitial],
          isTerminal: false,
        })).to.match(/b[iu]zz/);
        // disabling isInitial allows foo
        expect(new Generator(['foo', 'bizz', 'buzz']).randomElement({
          filters: [noZZifTerminal, noFifInitial],
          isInitial: false,
        })).to.equal('foo');
      });

      it('Provides filters with a prefix', () => {
        const noStartWithLastChar = (
          str:string,
          { prefix }: { prefix: string },
        ) => str[0] !== prefix[prefix.length - 1];
        expect(new Generator(['foo', 'bizz', 'buzz']).randomElement({
          filters: [noStartWithLastChar],
          prefix: 'of',
        })).to.match(/b[iu]zz/);

        const noEvenLength = (
          str:string,
          { prefix }: { prefix: string },
        ) => (prefix.length + str.length) % 2;
        expect(new Generator(['foo', 'bizz', 'buzz']).randomElement({
          filters: [noEvenLength],
          prefix: 'of',
        })).to.equal('foo');
      });
    });
  });

  describe('randomWord', () => {
    it('Returns a word created by combining from the set of elements', () => {
      expect(generator.randomWord()).to.be.a('string').with.length.above(1);
      expect(new Generator(['foo', 'bar']).randomWord())
        .to.be.a('string')
        .with.lengthOf(6)
        .and.match(/^(foo|bar){2}$/);
    });

    it('Takes a number of elements to generate', () => {
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

    it('Passes filters with correct options', () => {
      expect(new Generator(['fu', 'na', 'ga', 'ri']).randomWord(4, {
        filters: [
          (str, { isInitial }) => !isInitial || str.match(/g/), // initial element must have g
          (str, { prefix }) => !prefix.match(/a$/) || str.match(/^r/), // follow '..a' with 'r..'
          (str, { prefix }) => prefix.length !== 4 || str.match(/f/), // 4 char prefix must have f
          (str, { isTerminal }) => !isTerminal || str.match(/n/), // terminal element must have n
        ],
      })).to.equal('garifuna');
    });
  });
});
