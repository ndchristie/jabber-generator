class Generator {
  seed: string;
  strings: string[];
  constructor(strings: string[]) {
    this.strings = strings;
  }
  randomString() {
    return this.strings[Math.floor(Math.random() * this.strings.length)];
  }
}

export default Generator;
