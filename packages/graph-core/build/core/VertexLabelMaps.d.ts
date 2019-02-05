export declare class VertexLabelMaps {
    verticeLabels: Map<number, string>;
    labelVertices: Map<string, number>;
    constructor();
    /**
     * Add label to an unlabeled vertex in the graph.
     * @param The index of the vertex to be labeled.
     * @param The label to be assigned to this vertex.
     */
    addLabel(vertex: number, label: string): void;
    /**
     * Test whether some vertex in the graph is labeled
     * with a given String label
     * @param The String label being checked
     * @return True if there's a vertex in the graph with this label; false otherwise.
     */
    hasVertex(label: string): boolean;
    /**
     * Report label of vertex with given index
     * @param The integer index of the vertex
     * @return The String label of this vertex
     */
    getLabel(vertex: number): string | undefined;
    /**
     * Report index of vertex with given label.
     * (Assume distinct labels for vertices.)
     * @param The String label of the vertex
     * @return The integer index of this vertex
     */
    getIndex(s: string): number;
}
//# sourceMappingURL=VertexLabelMaps.d.ts.map