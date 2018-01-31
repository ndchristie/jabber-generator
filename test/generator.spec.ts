import { expect } from 'chai';
import { createSandbox } from 'sinon';
import { default as Generator } from '../src/generator';

describe('Jabber Generator', () => {
  let defaultGenerator;
  let sandbox: sinon.SinonSandbox;

  beforeEach(() => {
    defaultGenerator = new Generator({
      elements: ['foo', 'bizz', 'buzz'],
      filters: [],
    });
    sandbox = createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('addModule(s)', () => {
    it('Unpacks a module of elements, filters and/or transforms into the generator', () => {
      const modules = [
        { elements: ['foo'], filters: [() => true], transforms: [str => str] },
        { elements: ['foo'], filters: [() => true], transforms: [str => str] },
      ];
      defaultGenerator.addModules(modules);
      expect(defaultGenerator.elements).to.deep.equal(['foo', 'bizz', 'buzz', 'foo', 'foo']);
      expect(defaultGenerator.filters).to.have.lengthOf(2);
      expect(defaultGenerator.transforms).to.have.lengthOf(2);
    });
    it('Unpacks nested modules in order', () => {
      const moduleA = { elements: ['foo'], filters: [() => true], transforms: [str => str] };
      const moduleB = { modules: [moduleA], elements: ['bar'] };
      defaultGenerator.addModule(moduleB);
      expect(defaultGenerator.elements).to.deep.equal(['foo', 'bizz', 'buzz', 'foo', 'bar']);
      expect(defaultGenerator.filters).to.have.lengthOf(1);
      expect(defaultGenerator.transforms).to.have.lengthOf(1);
    });
  });

  describe('addElement(s)', () => {
    it('Pushes a word element onto elements', () => {
      const element = 'element';
      defaultGenerator.addElement(element);
      expect(defaultGenerator.elements[defaultGenerator.elements.length - 1])
        .to.equal(element);
    });
  });

  describe('addFilter(s)', () => {
    it('Pushes filter function(s) onto filters', () => {
      const filter = () => true;
      defaultGenerator.addFilter(filter);
      expect(defaultGenerator.filters[defaultGenerator.filters.length - 1])
        .to.equal(filter);
    });

    it('Warns if no element can pass filters', () => {
      const warningStub = sandbox.stub(console, 'warn');
      defaultGenerator.addFilter(() => false);
      expect(warningStub.called).to.be.true;
    });
  });

  describe('addTransforms(s)', () => {
    it('Pushes a transform function(s) onto transforms', () => {
      const transform = (str: string): string => str + str;
      defaultGenerator.addTransform(transform);
      expect(defaultGenerator.transforms[defaultGenerator.transforms.length - 1])
        .to.equal(transform);
    });
  });

  describe('getElement', () => {
    it('Returns a string from the set of elements', () => {
      expect(defaultGenerator.getElement()).to.be.a('string');
      expect(defaultGenerator.elements).to.include(defaultGenerator.getElement());
    });

    it('Uses supplied filters to eliminate candidates', () => {
      let i = 0;
      const filterSpy = sandbox.spy(str => !!str.match(/^b/));
      expect(defaultGenerator.getElement({
        filters: [filterSpy],
      }))
        .to.be.a('string')
        .with.lengthOf(4)
        .and.match(/^b/);
      i += 1;
      expect(filterSpy.called).to.be.true;
    });

    it('Throws a range error if candidates are reduced to zero', () => {
      expect(() => defaultGenerator.getElement({
        filters: [() => false],
      })).to.throw(RangeError);
    });

    it('Calls a filter no more than once per candidate', () => {
      const filterSpy = sandbox.spy(() => false);
      expect(() => defaultGenerator.getElement({
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
      expect(defaultGenerator.getElement({
        filters: [noZZifTerminal],
      })).to.equal('foo');
      // initial rule excludes foo
      expect(defaultGenerator.getElement({
        filters: [noFifInitial],
      })).to.match(/b[iu]zz/);
      // together they eliminate all candidates
      expect(() => defaultGenerator.getElement({
        filters: [noZZifTerminal, noFifInitial],
      })).to.throw(RangeError);
      // disabling isTerminal allows bizz/buzz
      expect(defaultGenerator.getElement({
        filters: [noZZifTerminal, noFifInitial],
        isTerminal: false,
      })).to.match(/b[iu]zz/);
      // disabling isInitial allows foo
      expect(defaultGenerator.getElement({
        filters: [noZZifTerminal, noFifInitial],
        isInitial: false,
      })).to.equal('foo');
    });

    it('Provides filters with a prefix', () => {
      const noStartWithLastChar = (
        str:string,
        { prefix }: { prefix: string },
      ) => str[0] !== prefix[prefix.length - 1];
      expect(defaultGenerator.getElement({
        filters: [noStartWithLastChar],
        prefix: 'of',
      })).to.match(/b[iu]zz/);

      const noEvenLength = (
        str:string,
        { prefix }: { prefix: string },
      ) => (prefix.length + str.length) % 2;
      expect(defaultGenerator.getElement({
        filters: [noEvenLength],
        prefix: 'of',
      })).to.equal('foo');
    });
  });

  describe('constructor', () => {
    it('Takes a module definition and creates a new Generator with it', () => {
      const moduleSpy = sandbox.spy(Generator.prototype, 'addModules');
      const gen = new Generator({
        elements: ['we need at least one to not get a warning'],
      });
      expect(moduleSpy.callCount).to.equal(1);
    });

    it('Warns if no elements are passed', () => {
      const warningStub = sandbox.stub(console, 'warn');
      const gen = new Generator({});
      expect(warningStub.called).to.be.true;
    });
  });

  describe('getWord', () => {
    it('Returns a word created by combining from the set of elements', () => {
      expect(defaultGenerator.getWord()).to.be.a('string').with.length.above(1);
      expect(new Generator({
        elements: ['foo', 'bar'],
        filters: [],
      }).getWord())
        .to.be.a('string')
        .with.lengthOf(6)
        .and.match(/^(foo|bar){2}$/);
    });

    it('Takes a number of elements to get', () => {
      expect(defaultGenerator.getWord(3)).to.be.a('string').with.length.above(2);
      const foobarGen = new Generator({
        elements: ['foo', 'bar'],
        filters: [],
      });
      expect(foobarGen.getWord(3))
        .to.be.a('string')
        .with.lengthOf(9)
        .and.match(/^(foo|bar){3}$/);
      expect(foobarGen.getWord(5))
        .to.be.a('string')
        .with.lengthOf(15)
        .and.match(/^(foo|bar){5}$/);
    });

    it('Passes filters with correct options', () => {
      expect(new Generator({
        elements: ['fu', 'na', 'ga', 'ri'],
      }).getWord(
        4,
        {
          filters: [
            (str, { isInitial }) => !isInitial || str.match(/g/), // initial element must have g
            (str, { prefix }) => !prefix.match(/a$/) || str.match(/^r/), // follow '..a' with 'r..'
            (str, { prefix }) => prefix.length !== 4 || str.match(/f/), // 4 char prefix must have f
            (str, { isTerminal }) => !isTerminal || str.match(/n/), // terminal element must have n
          ],
        },
      )).to.equal('garifuna');
    });

    it('Applies any transformations to the result', () => {
      expect(new Generator({
        elements: ['foo', 'bar'],
      }).getWord(
        2,
        { transforms: [(str: string) => str + str] },
      ))
        .to.be.a('string')
        .with.lengthOf(12)
        .and.match(/^((foo|bar){2})\1$/);
    });
  });
});
