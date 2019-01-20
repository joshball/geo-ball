"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable:no-expression-statement
const ava_1 = __importDefault(require("ava"));
const GraphAdjMatrix_1 = require("./GraphAdjMatrix");
ava_1.default('GraphAdjMatrix creates correct size', t => {
    const g = new GraphAdjMatrix_1.GraphAdjMatrix(2);
    t.is(g.getNumEdges(), 0);
    t.is(g.getNumVertices(), 0);
    t.is(g.adjMatrix.length, 2);
});
ava_1.default('GraphAdjMatrix grows correctly', t => {
    const g = new GraphAdjMatrix_1.GraphAdjMatrix(2);
    t.is(g.getNumEdges(), 0);
    t.is(g.getNumVertices(), 0);
    t.is(g.adjMatrix.length, 2);
    g.addVertex();
    t.is(g.getNumEdges(), 0);
    t.is(g.getNumVertices(), 1);
    g.addVertex();
    t.is(g.getNumEdges(), 0);
    t.is(g.getNumVertices(), 2);
    g.addVertex();
    t.is(g.getNumEdges(), 0);
    t.is(g.getNumVertices(), 3);
    t.is(g.adjMatrix.length, 4);
});
//# sourceMappingURL=GraphAdjMatrix.spec.js.map