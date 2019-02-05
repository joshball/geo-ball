export interface IGraph {

    /**
     * Report size of vertex set
     * @return The number of vertices in the graph.
     */
    getNumVertices(): number


    /**
     * Report size of edge set
     * @return The number of edges in the graph.
     */
    getNumEdges(): number

    /**
     * Add new vertex to the graph.  This vertex will
     * have as its index the next available integer.
     * Precondition: contiguous integers are used to 
     * index vertices.
     * @return index of newly added vertex
     */
    addVertex(): number

    /**
     * Abstract method implementing adding a new
     * vertex to the representation of the graph.
     */
    _implementAddVertex(): void

    /**
     * Add new edge to the graph between given vertices,
     * @param v Index of the start point of the edge to be added. 
     * @param w Index of the end point of the edge to be added. 
     */
    addEdge(v: number, w: number): void

    /**
     * Abstract method implementing adding a new
     * edge to the representation of the graph.
     */
    _implementAddEdge(v: number, w: number): void

    /**
     * Get all (out-)neighbors of a given vertex.
     * @param v Index of vertex in question.
     * @return List of indices of all vertices that are adjacent to v
     * 	via outgoing edges from v. 
     */
    getNeighbors(v: number): Array<number>

    /**
     * Get all in-neighbors of a given vertex.
     * @param v Index of vertex in question.
     * @return List of indices of all vertices that are adjacent to v
     * 	via incoming edges to v. 
     */
    getInNeighbors(v: number): Array<number>



    /** 
     * The degree sequence of a graph is a sorted (organized in numerical order 
     * from largest to smallest, possibly with repetitions) list of the degrees 
     * of the vertices in the graph.
     * 
     * @return The degree sequence of this graph.
     */
    degreeSequence(): Array<number>
    /**
     * Get all the vertices that are 2 away from the vertex in question.
     * @param v The starting vertex
     * @return A list of the vertices that can be reached in exactly two hops (by 
     * following two edges) from vertex v.
     * XXX: Implement in part 2 of week 2 for each subclass of Graph
     */
    getDistance2(v: number): Array<number>

    /** 
     * Return a String representation of the graph
     * @return A string representation of the graph
     */
    toString(): string

    /**
     * Generate string representation of adjacency list
     * @return the String
     */
    adjacencyString(): string


    // The next methods implement labeled vertices.
    // Basic graphs may or may not have labeled vertices.

    // /**
    //  * Create a new map of vertex indices to string labels
    //  * (Optional: only if using labeled vertices.)
    //  */
    // initializeLabels(): undefined

    /**
     * Test whether some vertex in the graph is labeled 
     * with a given index.
     * @param The index being checked
     * @return True if there's a vertex in the graph with this index; false otherwise.
     */
    hasVertex(v: number): boolean

    /**
     * Test whether some vertex in the graph is labeled 
     * with a given String label
     * @param The String label being checked
     * @return True if there's a vertex in the graph with this label; false otherwise.
     */
    hasVertexLabel(s: string): boolean

    /**
     * Add label to an unlabeled vertex in the graph.
     * @param The index of the vertex to be labeled.
     * @param The label to be assigned to this vertex.
     */
    addLabel(v: number, s: string): void

    /**
     * Report label of vertex with given index
     * @param The integer index of the vertex
     * @return The String label of this vertex 
     */
    getLabel(v: number): string | undefined

    /**
     * Report index of vertex with given label.
     * (Assume distinct labels for vertices.)
     * @param The String label of the vertex
     * @return The integer index of this vertex 
     */
    getIndex(s: string): number

    dump(): void
}
