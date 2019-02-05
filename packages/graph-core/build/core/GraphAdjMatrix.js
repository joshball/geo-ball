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
//# sourceMappingURL=GraphAdjMatrix.js.map