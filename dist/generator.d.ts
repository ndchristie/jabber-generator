declare class Generator {
    seed: string;
    strings: string[];
    constructor(strings: string[]);
    randomString(): string;
}
export default Generator;
