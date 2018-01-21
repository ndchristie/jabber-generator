import defaultStrings from './default-strings';

class Generator {
  seed: string;
  strings: string[];
  constructor(strings: string[] = defaultStrings) {
    this.strings = strings;
  }
  randomString() {
    return this.strings[Math.floor(Math.random() * this.strings.length)];
  }
}

export default Generator;
