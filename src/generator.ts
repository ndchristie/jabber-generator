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
  randomWord(): string {
    return this.randomString() + this.randomString();
  }
}

export default Generator;
