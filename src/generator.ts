class Generator {
  seed: string;
  elements: string[];
  filters: Function[];
  transforms: Function[];

  constructor(module: object) {
    this.elements = [];
    this.filters = [];
    this.transforms = [];
    this.addModule(module);
  }

  addModule({
    modules = [],
    elements = [],
    filters = [],
    transforms = [],
  }: {
    modules?: object[],
    elements?: string[],
    filters?: Function[],
    transforms?: Function[],
  }) {
    this.addModules(modules);
    this.addElements(elements);
    this.addFilters(filters);
    this.addTransforms(transforms);
  }

  addModules(modules: object[]) {
    modules.forEach(module => this.addModule(module));
  }

  addElement(element: string) {
    this.addElements([element]);
  }

  addElements(elements: string[]) {
    this.elements.push(...elements);
  }

  addFilter(filter: Function) {
    this.addFilters([filter]);
  }

  addFilters(filters: Function[]) {
    this.filters.push(...filters);
    try {
      this.getElement();
    } catch (e) {
      console.warn(e);
    }
  }

  addTransform(transform: Function) {
    this.addTransforms([transform]);
  }

  addTransforms(transforms: Function[]) {
    this.transforms.push(...transforms);
  }

  getElement({
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

  getWord(
    elementCount: number = 2,
    {
      filters = [],
      transforms = [],
    }: {
      filters?: Function[],
      transforms?: Function[],
    } = {}): string {
    const rec = (togo): string => {
      const prefix = togo > 1 ? rec(togo - 1) : '';
      const isInitial = togo === 1;
      const isTerminal = togo === elementCount;
      return prefix + this.getElement({ filters, prefix, isInitial, isTerminal });
    };
    const untransformed = rec(elementCount);
    const allTransforms = this.transforms.concat(transforms);
    return allTransforms.reduce(
      (str: string, transform: Function) => transform(str),
      untransformed,
    );
  }
}

export default Generator;
