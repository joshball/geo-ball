"use strict";
// type VertexLabel = Map<Integer,String>
Object.defineProperty(exports, "__esModule", { value: true });
class VertexLabelMaps {
    constructor() {
        this.verticeLabels = new Map();
        this.labelVertices = new Map();
    }
    /**
     * Add label to an unlabeled vertex in the graph.
     * @param The index of the vertex to be labeled.
     * @param The label to be assigned to this vertex.
     */
    addLabel(vertex, label) {
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
    hasVertex(label) {
        return this.labelVertices.has(label);
    }
    /**
     * Report label of vertex with given index
     * @param The integer index of the vertex
     * @return The String label of this vertex
     */
    getLabel(vertex) {
        return this.verticeLabels.get(vertex);
    }
    /**
     * Report index of vertex with given label.
     * (Assume distinct labels for vertices.)
     * @param The String label of the vertex
     * @return The integer index of this vertex
     */
    getIndex(s) {
        const v = this.labelVertices.get(s);
        return v ? v : -1;
        // System.out.println("ERROR: No vertex with this label");
    }
}
exports.VertexLabelMaps = VertexLabelMaps;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVmVydGV4TGFiZWxNYXBzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvcmUvVmVydGV4TGFiZWxNYXBzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSx5Q0FBeUM7O0FBRXpDLE1BQWEsZUFBZTtJQUl4QjtRQUNJLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxHQUFHLEVBQWtCLENBQUM7UUFDL0MsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLEdBQUcsRUFBa0IsQ0FBQztJQUNuRCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILFFBQVEsQ0FBQyxNQUFjLEVBQUUsS0FBYTtRQUNsQyxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ2pFLE9BQU87U0FDVjtRQUNELElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztRQUN0QyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsU0FBUyxDQUFDLEtBQWE7UUFDbkIsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILFFBQVEsQ0FBQyxNQUFjO1FBQ25CLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsUUFBUSxDQUFDLENBQVM7UUFDZCxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsQiwwREFBMEQ7SUFDOUQsQ0FBQztDQUNKO0FBcERELDBDQW9EQyJ9