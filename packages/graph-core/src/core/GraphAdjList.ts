import { Graph } from './Graph';
import { flatten } from '../utils/array';

// type VertexLabel = Map<Integer,String>

export class GraphAdjList extends Graph {
    private adjListMap: Map<number, Array<number>>;

    constructor() {
        super();
        this.adjListMap = new Map<number, Array<number>>();
    }

    /**
     * Implement the abstract method for adding a vertex.
     */
    _implementAddVertex() {
        const v = this.getNumVertices();
        const neighbors = new Array<number>();
        this.adjListMap.set(v, neighbors);
    }

    /**
     * Implement the abstract method for adding an edge.
     * @param v the index of the start point for the edge.
     * @param w the index of the end point for the edge.
     */
    _implementAddEdge(v: number, w: number): void {
        const neighbors = this.adjListMap.get(v);
        if (!neighbors) {
            throw new Error(`No neighbor for ${v}`);
        }
        neighbors.push(w);
    }

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
    getNeighbors(v: number): Array<number> {
        return this.adjListMap.get(v) || [];
    }

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
    getInNeighbors(v: number): Array<number> {
        const neighbors: Array<number> = [];
        // iterate through all edges in u's adjacency list and
        // add u to the inNeighbor list of v whenever an edge
        // with startpoint u has endpoint v.
        this.adjListMap.forEach((val: Array<number>, key: number) => {
            if (val.indexOf(v) >= 0) {
                neighbors.push(key);
            }
        });
        return neighbors;
    }

    // /**
    //  * The degree sequence of a graph is a sorted (organized in numerical order
    //  * from largest to smallest, possibly with repetitions) list of the degrees
    //  * of the vertices in the graph.
    //  *
    //  * @return The degree sequence of this graph.
    //  */
    // degreeSequence(): Array<number> {
    //     // XXX: Implement in part 1 of week 2
    //     // throw new Error('Not Implemented: degreeSequence');
    //     return [];
    // }

    /**
     * Get all the vertices that are 2 away from the vertex in question.
     * @param v The starting vertex
     * @return A list of the vertices that can be reached in exactly two hops (by
     * following two edges) from vertex v.
     * XXX: Implement in part 2 of week 2 for each subclass of Graph
     */
    getDistance2(v: number): Array<number> {
        const oneStepVertices = this.getNeighbors(v);
        const twoStepVertices = oneStepVertices.map(ov => this.getNeighbors(ov));
        return flatten(twoStepVertices);
    }

    /**
     * Return a String representation of the graph
     * @return A string representation of the graph
     */
    // toString(): string {
    //     let s = "\nGraph with " + this.getNumVertices() + " vertices and " + this.getNumEdges() + " edges.\n";
    //     s += "Degree sequence: " + this.degreeSequence() + ".\n";
    //     if (this.getNumVertices() <= 20) {
    //         s += this.adjacencyString();
    //     }
    //     return s;
    // }

    /**
     * Generate string representation of adjacency list
     * @return the String
     */
    adjacencyString(): string {
        console.log('adjacencyString');
        let s = 'Adjacency list';
        s += ' (size ' + this.getNumVertices() + '+' + this.getNumEdges() + ' integers):';

        for (const [key, value] of this.adjListMap) {
            s += `\n\t${key}: ${value},`;
        }
        return s;
    }

    dump() {
        console.log('Graph Dump:');
        console.log(' - Vert:', this.getNumVertices());
        console.log(' - Edges:', this.getNumEdges());
        this.adjListMap.forEach((vertexNeighbors, vertex) => {
            console.log(`   - Vertex[${vertex}] => ${vertexNeighbors.join(',')}`);
        });
    }
}
