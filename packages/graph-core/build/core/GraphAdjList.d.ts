import { Graph } from "./Graph";
export declare class GraphAdjList extends Graph {
    private adjListMap;
    constructor();
    /**
     * Implement the abstract method for adding a vertex.
     */
    _implementAddVertex(): void;
    /**
     * Implement the abstract method for adding an edge.
     * @param v the index of the start point for the edge.
     * @param w the index of the end point for the edge.
     */
    _implementAddEdge(v: number, w: number): void;
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
     * Get all the vertices that are 2 away from the vertex in question.
     * @param v The starting vertex
     * @return A list of the vertices that can be reached in exactly two hops (by
     * following two edges) from vertex v.
     * XXX: Implement in part 2 of week 2 for each subclass of Graph
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
