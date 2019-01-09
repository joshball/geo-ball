"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Graph_1 = require("./Graph");
const array_1 = require("../utils/array");
// type VertexLabel = Map<Integer,String>
class GraphAdjList extends Graph_1.Graph {
    constructor() {
        super();
        this.adjListMap = new Map();
    }
    /**
     * Implement the abstract method for adding a vertex.
     */
    _implementAddVertex() {
        const v = this.getNumVertices();
        const neighbors = new Array();
        this.adjListMap.set(v, neighbors);
    }
    /**
     * Implement the abstract method for adding an edge.
     * @param v the index of the start point for the edge.
     * @param w the index of the end point for the edge.
     */
    _implementAddEdge(v, w) {
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
    getNeighbors(v) {
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
    getInNeighbors(v) {
        const neighbors = [];
        // iterate through all edges in u's adjacency list and 
        // add u to the inNeighbor list of v whenever an edge
        // with startpoint u has endpoint v.
        this.adjListMap.forEach((val, key) => {
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
    getDistance2(v) {
        const oneStepVertices = this.getNeighbors(v);
        const twoStepVertices = oneStepVertices.map(ov => this.getNeighbors(ov));
        return array_1.flatten(twoStepVertices);
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
    adjacencyString() {
        console.log('adjacencyString');
        let s = "Adjacency list";
        s += " (size " + this.getNumVertices() + "+" + this.getNumEdges() + " integers):";
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
exports.GraphAdjList = GraphAdjList;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR3JhcGhBZGpMaXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvcmUvR3JhcGhBZGpMaXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbUNBQWdDO0FBQ2hDLDBDQUF5QztBQUV6Qyx5Q0FBeUM7QUFFekMsTUFBYSxZQUFhLFNBQVEsYUFBSztJQUluQztRQUNJLEtBQUssRUFBRSxDQUFDO1FBQ1IsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLEdBQUcsRUFBeUIsQ0FBQztJQUN2RCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxtQkFBbUI7UUFDZixNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDaEMsTUFBTSxTQUFTLEdBQUcsSUFBSSxLQUFLLEVBQVUsQ0FBQztRQUN0QyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxpQkFBaUIsQ0FBQyxDQUFTLEVBQUUsQ0FBUztRQUNsQyxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN6QyxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ1osTUFBTSxJQUFJLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFLENBQUMsQ0FBQTtTQUMxQztRQUNELFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdEIsQ0FBQztJQUVEOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksQ0FBQyxDQUFTO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3hDLENBQUM7SUFFRDs7Ozs7Ozs7O09BU0c7SUFDSCxjQUFjLENBQUMsQ0FBUztRQUNwQixNQUFNLFNBQVMsR0FBa0IsRUFBRSxDQUFDO1FBQ3BDLHVEQUF1RDtRQUN2RCxxREFBcUQ7UUFDckQsb0NBQW9DO1FBQ3BDLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBa0IsRUFBRSxHQUFXLEVBQUUsRUFBRTtZQUN4RCxJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUNyQixTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ3ZCO1FBQ0wsQ0FBQyxDQUFDLENBQUE7UUFDRixPQUFPLFNBQVMsQ0FBQztJQUNyQixDQUFDO0lBSUQsT0FBTztJQUNQLCtFQUErRTtJQUMvRSwrRUFBK0U7SUFDL0UsbUNBQW1DO0lBQ25DLE1BQU07SUFDTixnREFBZ0Q7SUFDaEQsTUFBTTtJQUNOLG9DQUFvQztJQUNwQyw0Q0FBNEM7SUFDNUMsNkRBQTZEO0lBQzdELGlCQUFpQjtJQUNqQixJQUFJO0lBR0o7Ozs7OztPQU1HO0lBQ0gsWUFBWSxDQUFDLENBQVM7UUFDbEIsTUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM3QyxNQUFNLGVBQWUsR0FBRyxlQUFlLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3pFLE9BQU8sZUFBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFFRDs7O09BR0c7SUFDSCx1QkFBdUI7SUFDdkIsNkdBQTZHO0lBQzdHLGdFQUFnRTtJQUNoRSx5Q0FBeUM7SUFDekMsdUNBQXVDO0lBQ3ZDLFFBQVE7SUFDUixnQkFBZ0I7SUFDaEIsSUFBSTtJQUVKOzs7T0FHRztJQUNILGVBQWU7UUFDWCxPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUE7UUFDOUIsSUFBSSxDQUFDLEdBQUcsZ0JBQWdCLENBQUM7UUFDekIsQ0FBQyxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsY0FBYyxFQUFFLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsR0FBRyxhQUFhLENBQUM7UUFFbEYsS0FBSyxNQUFNLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDeEMsQ0FBQyxJQUFJLE9BQU8sR0FBRyxLQUFLLEtBQUssR0FBRyxDQUFDO1NBQ2hDO1FBQ0QsT0FBTyxDQUFDLENBQUM7SUFDYixDQUFDO0lBR0QsSUFBSTtRQUNBLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDM0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUM7UUFDL0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7UUFDN0MsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxlQUFlLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDaEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLE1BQU0sUUFBUSxlQUFlLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQTtRQUN6RSxDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7Q0FDSjtBQXRJRCxvQ0FzSUMifQ==