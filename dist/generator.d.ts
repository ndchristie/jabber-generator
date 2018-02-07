declare class Generator {
    seed: string;
    elements: string[];
    filters: Function[];
    transforms: Function[];
    constructor(module: object);
    addModule({modules, elements, filters, transforms}: {
        modules?: object[];
        elements?: string[];
        filters?: Function[];
        transforms?: Function[];
    }): void;
    addModules(modules: object[]): void;
    addElement(element: string): void;
    addElements(elements: string[]): void;
    addFilter(filter: Function): void;
    addFilters(filters: Function[]): void;
    addTransform(transform: Function): void;
    addTransforms(transforms: Function[]): void;
    getElement({filters, prefix, isInitial, isTerminal}?: {
        filters?: Function[];
        prefix?: string;
        isInitial?: boolean;
        isTerminal?: boolean;
    }): string;
    getWord(elementCount?: number, {filters, transforms}?: {
        filters?: Function[];
        transforms?: Function[];
    }): string;
}
export default Generator;
