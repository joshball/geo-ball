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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR3JhcGguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29yZS9HcmFwaC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHVEQUFvRDtBQUdwRCx5Q0FBeUM7QUFFekMsTUFBc0IsS0FBSztJQU92QjtRQUNJLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO1FBQ2xCLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxpQ0FBZSxFQUFFLENBQUM7SUFDckMsQ0FBQztJQUNEOzs7T0FHRztJQUNILGNBQWM7UUFDVixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDNUIsQ0FBQztJQUdEOzs7T0FHRztJQUNILFdBQVc7UUFDUCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDekIsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNILFNBQVM7UUFDTCxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUMzQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbkIsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQVNEOzs7O09BSUc7SUFDSCxPQUFPLENBQUMsQ0FBUyxFQUFFLENBQVM7UUFDeEIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDOUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUNoQzthQUNJO1lBQ0QsT0FBTyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDdEMsT0FBTyxDQUFDLEtBQUssQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7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