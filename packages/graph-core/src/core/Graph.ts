import { VertexLabelMaps } from "./VertexLabelMaps";
import { IGraph } from "./IGraph";

// type VertexLabel = Map<Integer,String>

export abstract class Graph implements IGraph {

    protected numVertices!: number;
    protected numEdges!: number;
    // optional association of String labels to vertices 
    protected VLM: VertexLabelMaps;

    constructor() {
        this.numVertices = 0;
        this.numEdges = 0;
        this.VLM = new VertexLabelMaps();
    }
    /**
     * Report size of vertex set
     * @return The number of vertices in the graph.
     */
    getNumVertices(): number {
        return this.numVertices;
    }


    /**
     * Report size of edge set
     * @return The number of edges in the graph.
     */
    getNumEdges(): number {
        return this.numEdges;
    }

    /**
     * Add new vertex to the graph.  This vertex will
     * have as its index the next available integer.
     * Precondition: contiguous integers are used to 
     * index vertices.
     * @return index of newly added vertex
     */
    addVertex(): number {
        this._implementAddVertex();
        this.numVertices++;
        return (this.numVertices - 1);
    }

    /**
     * Abstract method implementing adding a new
     * vertex to the representation of the graph.
     */
    // implementAddVertex() { throw new Error('Not Implemented: implementAddVertex'); }
    abstract _implementAddVertex(): void

    /**
     * Add new edge to the graph between given vertices,
     * @param v Index of the start point of the edge to be added. 
     * @param w Index of the end point of the edge to be added. 
     */
    addEdge(v: number, w: number): void {
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
     * Abstract method implementing adding a new
     * edge to the representation of the graph.
     */
    abstract _implementAddEdge(v: number, w: number): void

    /**
     * Get all (out-)neighbors of a given vertex.
     * @param v Index of vertex in question.
     * @return List of indices of all vertices that are adjacent to v
     * 	via outgoing edges from v. 
     */
    abstract getNeighbors(v: number): Array<number>

    /**
     * Get all in-neighbors of a given vertex.
     * @param v Index of vertex in question.
     * @return List of indices of all vertices that are adjacent to v
     * 	via incoming edges to v. 
     */
    abstract getInNeighbors(v: number): Array<number>


    /** 
     * The degree sequence of a graph is a sorted (organized in numerical order 
     * from largest to smallest, possibly with repetitions) list of the degrees 
     * of the vertices in the graph.
     * 
     * @return The degree sequence of this graph.
     */
    degreeSequence(): Array<number> {
        const deg = [];
        for (let v = 0; v < this.getNumVertices(); v++) {
            const oN = this.getNeighbors(v).length;
            const iN = this.getInNeighbors(v).length;
            deg.push(oN + iN);
        }
        return deg.sort((a, b) => b - a);
    }

    /**
     * Get all the vertices that are 2 away from the vertex in question.
     * @param v The starting vertex
     * @return A list of the vertices that can be reached in exactly two hops (by 
     * following two edges) from vertex v.
     * XXX: Implement in part 2 of week 2 for each subclass of Graph
     */
    abstract getDistance2(_v: number): Array<number>

    /** 
     * Return a String representation of the graph
     * @return A string representation of the graph
     */
    toString(): string {
        let s = "\nGraph with " + this.numVertices + " vertices and " + this.numEdges + " edges.\n";
        s += "Degree sequence: " + this.degreeSequence() + ".\n";
        if (this.numVertices <= 20) {
            s += this.adjacencyString();
        }
        return s;
    }

    /**
     * Generate string representation of adjacency list
     * @return the String
     */
    abstract adjacencyString(): string


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
    hasVertex(v: number): boolean {
        return v < this.getNumVertices();
    }

    /**
     * Test whether some vertex in the graph is labeled 
     * with a given String label
     * @param The String label being checked
     * @return True if there's a vertex in the graph with this label; false otherwise.
     */
    hasVertexLabel(s: string): boolean {
        return this.VLM.hasVertex(s);
    }

    /**
     * Add label to an unlabeled vertex in the graph.
     * @param The index of the vertex to be labeled.
     * @param The label to be assigned to this vertex.
     */
    addLabel(v: number, s: string): void {
        // ERROR: tried to label a vertex that is out of range or already labeled        
        return this.VLM.addLabel(v, s);
    }

    /**
     * Report label of vertex with given index
     * @param The integer index of the vertex
     * @return The String label of this vertex 
     */
    getLabel(v: number): string | undefined {
        return this.VLM.getLabel(v);
    }

    /**
     * Report index of vertex with given label.
     * (Assume distinct labels for vertices.)
     * @param The String label of the vertex
     * @return The integer index of this vertex 
     */
    getIndex(s: string): number {
        return this.VLM.getIndex(s);
    }

    abstract dump(): void
}