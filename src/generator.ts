import defaultElements from './default-elements';
import defaultFilters from './default-filters';

class Generator {
  seed: string;
  elements: string[];
  filters: Function[];

  constructor({
    elements = defaultElements,
    filters = defaultFilters,
  }: {
    elements?: string[],
    filters?: Function[],
  } = {}) {
    this.elements = elements;
    this.filters = [];
    filters.forEach(filter => this.addFilter(filter));
  }

  addFilter(filter: Function) {
    this.filters.push(filter);
    try {
      this.randomElement();
    } catch (e) {
      console.warn(e);
    }
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
      if (candidates.length === 0) {
        throw new RangeError('No element passed every filter');
      }
      candidate = candidates.splice(Math.floor(Math.random() * candidates.length), 1)[0];
    } while (!allFilters.every(filter => filter(candidate, { prefix, isInitial, isTerminal })));
    return candidate;
  }

  randomWord(elementCount: number = 2, { filters = [] }: { filters?: Function[] } = {}): string {
    const rec = (togo): string => {
      const prefix = togo > 1 ? rec(togo - 1) : '';
      const isInitial = togo === 1;
      const isTerminal = togo === elementCount;
      return prefix + this.randomElement({ filters, prefix, isInitial, isTerminal });
    };
    return rec(elementCount);
  }
}

export default Generator;
