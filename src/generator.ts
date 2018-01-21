import defaultStrings from './default-strings';

class Generator {
  seed: string;
  strings: string[];
  constructor(strings: string[] = defaultStrings) {
    this.strings = strings;
  }
  randomString({ filters = [] }: { filters?: { (str: string): boolean; }[] } = {}): string {
    const candidates = this.strings.slice();
    let candidate: string;
    do {
      if (candidates.length === 0) {
        throw new RangeError('No string could be found that passed every filter');
      }
      candidate = candidates.splice(Math.floor(Math.random() * candidates.length), 1)[0];
    } while (!filters.every(rule => rule(candidate)));
    return candidate;
  }
  // make a rule reducer-link (acc, value, index) => {}
  randomWord(substrings: number = 2): string {
    const rec = (togo): string => (togo > 0) ? rec(togo - 1) + this.randomString() : '';
    return rec(substrings);
  }
}

export default Generator;
