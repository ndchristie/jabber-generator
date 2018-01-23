declare class Generator {
    seed: string;
    elements: string[];
    filters: Function[];
    transformations: Function[];
    constructor({elements, filters, transformations}?: {
        elements?: string[];
        filters?: Function[];
        transformations?: Function[];
    });
    addFilter(filter: Function): void;
    addTransformation(transformation: Function): void;
    randomElement({filters, prefix, isInitial, isTerminal}?: {
        filters?: Function[];
        prefix?: string;
        isInitial?: boolean;
        isTerminal?: boolean;
    }): string;
    randomWord(elementCount?: number, {filters}?: {
        filters?: Function[];
    }): string;
    transform(untransformed?: string): any;
}
export default Generator;
