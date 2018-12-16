// tslint:disable:no-expression-statement
import test from 'ava';
import { GraphAdjMatrix } from './GraphAdjMatrix';

test('GraphAdjMatrix creates correct size', t => {
    const g = new GraphAdjMatrix(2);
    t.is(g.getNumEdges(), 0);
    t.is(g.getNumVertices(), 0);
    t.is(g.adjMatrix.length, 2);
});

test('GraphAdjMatrix grows correctly', t => {
    const g = new GraphAdjMatrix(2);
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

