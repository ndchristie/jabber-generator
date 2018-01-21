import defaultElements from './default-elements';

class Generator {
  seed: string;
  elements: string[];
  constructor(elements: string[] = defaultElements) {
    this.elements = elements;
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
    const candidates = this.elements.slice();
    let candidate: string;
    do {
      if (candidates.length === 0) {
        throw new RangeError('No string could be found that passed every filter');
      }
      candidate = candidates.splice(Math.floor(Math.random() * candidates.length), 1)[0];
    } while (!filters.every(filter => filter(candidate, { prefix, isInitial, isTerminal })));
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
