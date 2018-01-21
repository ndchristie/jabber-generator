import defaultStrings from './default-strings';

class Generator {
  seed: string;
  strings: string[];
  constructor(strings: string[] = defaultStrings) {
    this.strings = strings;
  }
  filterStrings(...filters: { (str: string): boolean; }[]): string[] {
    return this.strings.filter(str => filters.every(rule => rule(str)));
  }
  randomString({ filters = [] }: { filters?: { (str: string): boolean; }[] } = {}): string {
    const filteredStrings = this.filterStrings(...filters);
    return filteredStrings[Math.floor(Math.random() * filteredStrings.length)];
  }
  randomWord(substrings: number = 2): string {
    const rec = (togo): string => (togo > 0) ? rec(togo - 1) + this.randomString() : '';
    return rec(substrings);
  }
}

export default Generator;
