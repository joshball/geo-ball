// type VertexLabel = Map<Integer,String>

export class VertexLabelMaps {
    verticeLabels!: Map<number, string>;
    labelVertices!: Map<string, number>;

    constructor() {
        this.verticeLabels = new Map<number, string>();
        this.labelVertices = new Map<string, number>();
    }

    /**
     * Add label to an unlabeled vertex in the graph.
     * @param The index of the vertex to be labeled.
     * @param The label to be assigned to this vertex.
     */
    addLabel(vertex: number, label: string): void {
        if (this.labelVertices.has(label) || this.verticeLabels.has(vertex)) {
            return;
        }
        this.verticeLabels.set(vertex, label);
        this.labelVertices.set(label, vertex);
    }

    /**
     * Test whether some vertex in the graph is labeled
     * with a given String label
     * @param The String label being checked
     * @return True if there's a vertex in the graph with this label; false otherwise.
     */
    hasVertex(label: string): boolean {
        return this.labelVertices.has(label);
    }

    /**
     * Report label of vertex with given index
     * @param The integer index of the vertex
     * @return The String label of this vertex
     */
    getLabel(vertex: number): string | undefined {
        return this.verticeLabels.get(vertex);
    }

    /**
     * Report index of vertex with given label.
     * (Assume distinct labels for vertices.)
     * @param The String label of the vertex
     * @return The integer index of this vertex
     */
    getIndex(s: string): number {
        const v = this.labelVertices.get(s);
        return v ? v : -1;
        // System.out.println("ERROR: No vertex with this label");
    }
}
