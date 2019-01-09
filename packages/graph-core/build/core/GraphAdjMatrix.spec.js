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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR3JhcGhBZGpNYXRyaXguc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb3JlL0dyYXBoQWRqTWF0cml4LnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSx5Q0FBeUM7QUFDekMsOENBQXVCO0FBQ3ZCLHFEQUFrRDtBQUVsRCxhQUFJLENBQUMscUNBQXFDLEVBQUUsQ0FBQyxDQUFDLEVBQUU7SUFDNUMsTUFBTSxDQUFDLEdBQUcsSUFBSSwrQkFBYyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2hDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3pCLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLGNBQWMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzVCLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDaEMsQ0FBQyxDQUFDLENBQUM7QUFFSCxhQUFJLENBQUMsZ0NBQWdDLEVBQUUsQ0FBQyxDQUFDLEVBQUU7SUFDdkMsTUFBTSxDQUFDLEdBQUcsSUFBSSwrQkFBYyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2hDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3pCLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLGNBQWMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzVCLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFFNUIsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ2QsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDekIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsY0FBYyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFFNUIsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ2QsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDekIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsY0FBYyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFFNUIsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBRWQsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDekIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsY0FBYyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDNUIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztBQUNoQyxDQUFDLENBQUMsQ0FBQyJ9