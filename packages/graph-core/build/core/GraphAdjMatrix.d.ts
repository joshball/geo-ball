import { Graph } from "./Graph";
export declare class GraphAdjMatrix extends Graph {
    adjMatrix: Array<Array<number>>;
    private matrixGrowthFactor;
    constructor(startingMatrixDim?: number, matrixGrowthFactor?: number);
    createMatrix(newSize: number, oldMatrix?: Array<Array<number>>): Array<Array<number>>;
    /**
     * Implement the abstract method for adding a vertex.
     * If need to increase dimensions of matrix, double them
     * to amortize cost.
     */
    _implementAddVertex(): void;
    /**
     * Implement the abstract method for adding an edge.
     * Allows for multiple edges between two points:
     * the entry at row v, column w stores the number of such edges.
     * @param v the index of the start point for the edge.
     * @param w the index of the end point for the edge.
     */
    _implementAddEdge(v: number, w: number): void;
    dumpAndCheck(method: string, v: number, w?: number): void;
    throwErrorWithDump(error: string, method: string): void;
    /**
     * Implement the abstract method for finding all
     * out-neighbors of a vertex.
     * If there are multiple edges between the vertex
     * and one of its out-neighbors, this neighbor
     * appears once in the list for each of these edges.
     *
     * @param v the index of vertex.
     * @return List<Integer> a list of indices of vertices.
     */
    getNeighbors(v: number): Array<number>;
    /**
     * Implement the abstract method for finding all
     * in-neighbors of a vertex.
     * If there are multiple edges from another vertex
     * to this one, the neighbor
     * appears once in the list for each of these edges.
     *
     * @param v the index of vertex.
     * @return List<Integer> a list of indices of vertices.
     */
    getInNeighbors(v: number): Array<number>;
    /**
     * Implement the abstract method for finding all
     * vertices reachable by two hops from v.
     * Use matrix multiplication to record length 2 paths.
     *
     * @param v the index of vertex.
     * @return List<Integer> a list of indices of vertices.
     */
    getDistance2(v: number): Array<number>;
    /**
     * Return a String representation of the graph
     * @return A string representation of the graph
     */
    /**
     * Generate string representation of adjacency list
     * @return the String
     */
    adjacencyString(): string;
    dump(): void;
}
