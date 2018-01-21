declare class Generator {
    seed: string;
    elements: string[];
    filters: Function[];
    constructor({elements, filters}?: {
        elements?: string[];
        filters?: Function[];
    });
    addFilter(filter: Function): void;
    randomElement({filters, prefix, isInitial, isTerminal}?: {
        filters?: Function[];
        prefix?: string;
        isInitial?: boolean;
        isTerminal?: boolean;
    }): string;
    randomWord(elementCount?: number, {filters}?: {
        filters?: Function[];
    }): string;
}
export default Generator;
