export type NodeStructure = {
    tag: (keyof HTMLElementTagNameMap) | 'TEXTNODE',
    attributes?: {
        [key: string]: string;
    },
    content?: string,
    children?: NodeStructure[];
};