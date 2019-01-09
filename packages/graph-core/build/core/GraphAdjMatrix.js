"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Graph_1 = require("./Graph");
const array_1 = require("../utils/array");
// type VertexLabel = Map<Integer,String>
// Given a list of edges (v,w):
//  - 0,1 (0 has out 1) 0:[1] and [IN: 1:[0]]
//  - 0,3 (0 has out 3) 0:[1,3] and [IN: 1:[0], 3:[0]]
//  - 1,2 (1 has out 2) 0:[1,3], 1:[2] and [IN: 1:[0], 2:[1], 3:[0]]
//  - 3,3 (3 has out 3) 0:[1,3], 1:[2], 3:[3] and [IN: 1:[0], 2:[1], 3:[0,3]]
//  - 2,1 (2 has out 1) 0:[1,3], 1:[2], 2:[1], 3:[3] and [IN: 1:[0,2], 2:[1], 3:[0,3]]
//  - 2,0 (2 has out 0) 0:[1,3], 1:[2], 2:[0,1], 3:[3] and [IN: 0:[2], 1:[0,2], 2:[1], 3:[0,3]]
//  0 1 0 1
//  0 1 0 0
//  0 1 0 0
//  0 0 1 0
//  i = 0..3
//      getInNeighbors(v:1) [0,2]
//      val = M[i:0][v:1] => 1
//          for i = 0, j = 0..<1
//              neighbor.add(0)
//      val = M[i:0][v:1] => 1
//          for i = 0, j = 0..<1
//              neighbor.add(0)
class GraphAdjMatrix extends Graph_1.Graph {
    constructor(startingMatrixDim = 10, matrixGrowthFactor = 2) {
        super();
        this.matrixGrowthFactor = matrixGrowthFactor;
        this.adjMatrix = this.createMatrix(startingMatrixDim);
    }
    createMatrix(newSize, oldMatrix) {
        const newAdjMatrix = new Array();
        const getNewValue = (i, j) => {
            if (oldMatrix && oldMatrix[i] && oldMatrix[i][j] >= 0) {
                return oldMatrix[i][j];
            }
            return 0;
        };
        for (let i = 0; i < newSize; i++) {
            newAdjMatrix[i] = new Array();
            for (let j = 0; j < newSize; j++) {
                newAdjMatrix[i][j] = getNewValue(i, j);
            }
        }
        return newAdjMatrix;
    }
    /**
     * Implement the abstract method for adding a vertex.
     * If need to increase dimensions of matrix, double them
     * to amortize cost.
     */
    _implementAddVertex() {
        const numVerticies = this.getNumVertices();
        const currentSize = this.adjMatrix.length;
        if (currentSize <= numVerticies + 1) {
            this.adjMatrix = this.createMatrix(currentSize * this.matrixGrowthFactor, this.adjMatrix);
        }
    }
    // setVertextToZero(v: number) {
    //     for (let i = 0; i < v; i++) {
    //         this.adjMatrix[v][i] = 0;
    //         this.adjMatrix[i][v] = 0;
    //     }
    // }
    // setRowToZero(row:number) {
    //     for(let i = 0; i < row; i++){
    //         this.adjMatrix[row][i] = 0;
    //     }
    // }
    // setColToZero(col:number) {
    //     for(let i = 0; i < col; i++){
    //         this.adjMatrix[i][col] = 0;
    //     }
    // }
    /**
     * Implement the abstract method for adding an edge.
     * Allows for multiple edges between two points:
     * the entry at row v, column w stores the number of such edges.
     * @param v the index of the start point for the edge.
     * @param w the index of the end point for the edge.
     */
    _implementAddEdge(v, w) {
        this.dumpAndCheck('_implementAddEdge', v, w);
        this.adjMatrix[v][w] += 1;
    }
    dumpAndCheck(method, v, w) {
        const numVerticies = this.getNumVertices();
        const currentSize = this.adjMatrix.length;
        if (numVerticies > currentSize) {
            this.throwErrorWithDump(method, 'numVerticies > currentSize');
        }
        if (v > this.numVertices) {
            this.throwErrorWithDump(method, 'v > numVerticies');
        }
        if (w && w > this.numVertices) {
            this.throwErrorWithDump(method, 'w > numVerticies');
        }
    }
    throwErrorWithDump(error, method) {
        console.log('\n');
        console.log('====================================================================================');
        console.log(`error: ${error}  ${method ? `method ${method}()` : ''}`);
        console.log('====================================================================================');
        console.log(`GraphMatrix: numVertices: ${this.getNumVertices()}  currentSize: ${this.adjMatrix.length}`);
        console.log('====================================================================================');
        this.dump();
        console.log('====================================================================================');
        throw new Error(error);
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
        const numVertices = this.getNumVertices();
        const neigbors = new Array();
        for (let i = 0; i < numVertices; i++) {
            const numOut = this.adjMatrix[v][i];
            for (let j = 0; j < numOut; j++) {
                neigbors.push(i);
            }
        }
        return neigbors;
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
        const numVertices = this.getNumVertices();
        const neigbors = new Array();
        for (let i = 0; i < numVertices; i++) {
            const numOut = this.adjMatrix[i][v];
            for (let j = 0; j < numOut; j++) {
                neigbors.push(i);
            }
        }
        return neigbors;
    }
    /**
     * Implement the abstract method for finding all
     * vertices reachable by two hops from v.
     * Use matrix multiplication to record length 2 paths.
     *
     * @param v the index of vertex.
     * @return List<Integer> a list of indices of vertices.
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
        const dim = this.getNumVertices();
        let s = "Adjacency matrix";
        s += " (size " + dim + "x" + dim + " = " + dim * dim + " integers):";
        for (let i = 0; i < dim; i++) {
            s += "\n\t" + i + ": ";
            for (let j = 0; j < dim; j++) {
                s += this.adjMatrix[i][j] + ", ";
            }
        }
        return s;
    }
    dump() {
        console.log('Graph Dump:');
        const v = this.getNumVertices();
        console.log(' - Vert:', v);
        console.log(' - Edges:', this.getNumEdges());
        for (let i = 0; i < v; i++) {
            console.log(`    [${this.adjMatrix[i].join(',')}]`);
        }
    }
}
exports.GraphAdjMatrix = GraphAdjMatrix;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR3JhcGhBZGpNYXRyaXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29yZS9HcmFwaEFkak1hdHJpeC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1DQUFnQztBQUNoQywwQ0FBeUM7QUFFekMseUNBQXlDO0FBRXpDLCtCQUErQjtBQUMvQiw2Q0FBNkM7QUFDN0Msc0RBQXNEO0FBQ3RELG9FQUFvRTtBQUNwRSw2RUFBNkU7QUFDN0Usc0ZBQXNGO0FBQ3RGLCtGQUErRjtBQUMvRixXQUFXO0FBQ1gsV0FBVztBQUNYLFdBQVc7QUFDWCxXQUFXO0FBQ1gsWUFBWTtBQUNaLGlDQUFpQztBQUNqQyw4QkFBOEI7QUFDOUIsZ0NBQWdDO0FBQ2hDLCtCQUErQjtBQUMvQiw4QkFBOEI7QUFDOUIsZ0NBQWdDO0FBQ2hDLCtCQUErQjtBQUMvQixNQUFhLGNBQWUsU0FBUSxhQUFLO0lBS3JDLFlBQVksb0JBQTRCLEVBQUUsRUFBRSxxQkFBNkIsQ0FBQztRQUN0RSxLQUFLLEVBQUUsQ0FBQztRQUNSLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxrQkFBa0IsQ0FBQztRQUM3QyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUMxRCxDQUFDO0lBRUQsWUFBWSxDQUFDLE9BQWUsRUFBRSxTQUFnQztRQUMxRCxNQUFNLFlBQVksR0FBRyxJQUFJLEtBQUssRUFBaUIsQ0FBQztRQUNoRCxNQUFNLFdBQVcsR0FBRyxDQUFDLENBQVMsRUFBRSxDQUFTLEVBQVUsRUFBRTtZQUNqRCxJQUFJLFNBQVMsSUFBSSxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDbkQsT0FBTyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDMUI7WUFDRCxPQUFPLENBQUMsQ0FBQztRQUNi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