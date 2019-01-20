"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const VertexLabelMaps_1 = require("./VertexLabelMaps");
// type VertexLabel = Map<Integer,String>
class Graph {
    constructor() {
        this.numVertices = 0;
        this.numEdges = 0;
        this.VLM = new VertexLabelMaps_1.VertexLabelMaps();
    }
    /**
     * Report size of vertex set
     * @return The number of vertices in the graph.
     */
    getNumVertices() {
        return this.numVertices;
    }
    /**
     * Report size of edge set
     * @return The number of edges in the graph.
     */
    getNumEdges() {
        return this.numEdges;
    }
    /**
     * Add new vertex to the graph.  This vertex will
     * have as its index the next available integer.
     * Precondition: contiguous integers are used to
     * index vertices.
     * @return index of newly added vertex
     */
    addVertex() {
        this._implementAddVertex();
        this.numVertices++;
        return (this.numVertices - 1);
    }
    /**
     * Add new edge to the graph between given vertices,
     * @param v Index of the start point of the edge to be added.
     * @param w Index of the end point of the edge to be added.
     */
    addEdge(v, w) {
        this.numEdges++;
        if (v < this.numVertices && w < this.numVertices) {
            this._implementAddEdge(v, w);
        }
        else {
            console.error('addEdge (v, w)', v, w);
            console.error('this.numEdges', this.getNumEdges());
            console.error('this.numVertices', this.getNumVertices());
            console.error('addEdge throwing IndexOutOfBoundsException');
            throw new Error(`IndexOutOfBoundsException`);
        }
    }
    /**
     * The degree sequence of a graph is a sorted (organized in numerical order
     * from largest to smallest, possibly with repetitions) list of the degrees
     * of the vertices in the graph.
     *
     * @return The degree sequence of this graph.
     */
    degreeSequence() {
        const deg = [];
        for (let v = 0; v < this.getNumVertices(); v++) {
            const oN = this.getNeighbors(v).length;
            const iN = this.getInNeighbors(v).length;
            deg.push(oN + iN);
        }
        return deg.sort((a, b) => b - a);
    }
    /**
     * Return a String representation of the graph
     * @return A string representation of the graph
     */
    toString() {
        let s = "\nGraph with " + this.numVertices + " vertices and " + this.numEdges + " edges.\n";
        s += "Degree sequence: " + this.degreeSequence() + ".\n";
        if (this.numVertices <= 20) {
            s += this.adjacencyString();
        }
        return s;
    }
    // The next methods implement labeled vertices.
    // Basic graphs may or may not have labeled vertices.
    // /**
    //  * Create a new map of vertex indices to string labels
    //  * (Optional: only if using labeled vertices.)
    //  */
    // initializeLabels(): undefined { throw new Error('Not Implemented: adjacencyString'); }
    /**
     * Test whether some vertex in the graph is labeled
     * with a given index.
     * @param The index being checked
     * @return True if there's a vertex in the graph with this index; false otherwise.
     */
    hasVertex(v) {
        return v < this.getNumVertices();
    }
    /**
     * Test whether some vertex in the graph is labeled
     * with a given String label
     * @param The String label being checked
     * @return True if there's a vertex in the graph with this label; false otherwise.
     */
    hasVertexLabel(s) {
        return this.VLM.hasVertex(s);
    }
    /**
     * Add label to an unlabeled vertex in the graph.
     * @param The index of the vertex to be labeled.
     * @param The label to be assigned to this vertex.
     */
    addLabel(v, s) {
        // ERROR: tried to label a vertex that is out of range or already labeled        
        return this.VLM.addLabel(v, s);
    }
    /**
     * Report label of vertex with given index
     * @param The integer index of the vertex
     * @return The String label of this vertex
     */
    getLabel(v) {
        return this.VLM.getLabel(v);
    }
    /**
     * Report index of vertex with given label.
     * (Assume distinct labels for vertices.)
     * @param The String label of the vertex
     * @return The integer index of this vertex
     */
    getIndex(s) {
        return this.VLM.getIndex(s);
    }
}
exports.Graph = Graph;
//# sourceMappingURL=Graph.js.map