import defaultElements from './default-elements';
import defaultFilters from './default-filters';
import defaultTransformations from './transformations/default-transformations';

class Generator {
  seed: string;
  elements: string[];
  filters: Function[];
  transformations: Function[];

  constructor({
    elements = defaultElements,
    filters = defaultFilters,
    transformations = defaultTransformations,
  }: {
    elements?: string[],
    filters?: Function[],
    transformations?: Function[],
  } = {}) {
    this.elements = elements;
    this.filters = [];
    filters.forEach(filter => this.addFilter(filter));
    this.transformations = [];
    transformations.forEach(
      transformation => this.addTransformation(transformation),
    );
  }

  addFilter(filter: Function) {
    this.filters.push(filter);
    try {
      this.randomElement();
    } catch (e) {
      console.warn(e);
    }
  }

  addTransformation(transformation: Function) {
    this.transformations.push(transformation);
  }

  randomElement({
    filters = [],
    prefix = '',
    isInitial = true,
    isTerminal = true,
  }: {
    filters?: Function[],
    prefix?: string,
    isInitial?: boolean,
    isTerminal?: boolean,
  } = {}): string {
    const allFilters = this.filters.concat(filters);
    const candidates = this.elements.slice();
    let candidate: string;
    do {
      if (!candidates.length) throw new RangeError('No candidates remain to test');
      candidate = candidates.splice(Math.floor(Math.random() * candidates.length), 1)[0];
    } while (allFilters.some( // try again if any filters fail
      filter => !filter(candidate, { prefix, isInitial, isTerminal }),
    ));
    return candidate;
  }

  randomWord(elementCount: number = 2, { filters = [] }: { filters?: Function[] } = {}): string {
    const rec = (togo): string => {
      const prefix = togo > 1 ? rec(togo - 1) : '';
      const isInitial = togo === 1;
      const isTerminal = togo === elementCount;
      return prefix + this.randomElement({ filters, prefix, isInitial, isTerminal });
    };
    const untransformed = rec(elementCount);
    return this.transform(untransformed);
  }

  transform(untransformed: string = '') {
    return this.transformations.reduce(
      (acc, func: Function) => func(acc),
      untransformed,
    );
  }
}

export default Generator;
