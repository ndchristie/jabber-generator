import defaultStrings from './default-strings';

class Generator {
  seed: string;
  strings: string[];
  constructor(strings: string[] = defaultStrings) {
    this.strings = strings;
  }
  randomString(): string {
    return this.strings[Math.floor(Math.random() * this.strings.length)];
  }
  randomWord(substrings: number = 2): string {
    const rec = (togo): string => (togo > 0) ? rec(togo - 1) + this.randomString() : '';
    return rec(substrings);
  }
}

export default Generator;
