import type { NodeStructure } from "./types";

export default abstract class DOMTreeBuilder {

    /**
     * @param structure - The structure of the node to be created
     * @returns A DOM node created from the given structure
     * @example
     * const structure = {
     *     tag: 'div',
     *     attrs: {
     *         class: 'container',
     *         id: 'main'
     *     },
     *     content: 'Hello, World!',
     *     children: [
     *         {
     *             tag: 'span',
     *             attrs: {
     *                 class: 'text'
     *             },
     *             content: 'This is a span',
     *             children: []
     *         }
     *     ]
     * };
     * const node = DOMTreeBuilder.makeOne(structure);
     */

    private static build(structure: NodeStructure): Node {
        if (structure.tag === 'TEXTNODE') {
            const textNode = new Node();
            textNode.nodeValue = structure.content || '';
            return textNode;
        }

        const newElement = document.createElement(structure.tag);

        for (const attribute in structure.attributes) {
            newElement.setAttribute(attribute, structure.attributes[attribute]);
        }
        newElement.textContent = structure.content || '';

        structure.children?.forEach((child) => {
            newElement.append(this.build(child));
        });

        return newElement;
    }

    public static make(structure: NodeStructure): Node {
        try {
            return this.build(structure);
        }
        catch (error) {
            console.error("Error building DOM tree:", error);
            throw error;
        }
    }
}