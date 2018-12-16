import test from 'ava';
import { flattenOneLevel, flatten, cross } from '../utils/array';



test('cross of two arrays ([A,B],[1,2]) returns correct array [A1,A2,B1,B2]', t => {
    const actualCross = cross(['A', 'B'], ['1', '2']);
    t.deepEqual(actualCross, ['A1', 'A2', 'B1', 'B2']);
});

test('cross of two strings ("ABC","123") returns correct array [A1,A2,A3,B1,B2,...,C3]', t => {
    const actualCross = cross('ABC', '123');
    t.deepEqual(actualCross, ['A1', 'A2', 'A3', 'B1', 'B2', 'B3', 'C1', 'C2', 'C3']);
});


test('flatten of deep array should producing flattened array', t => {
    const startingArray = [1, [2, [3, [4], 5, [[[6]]]], 7], 8];
    const flattenedArray = [1, 2, 3, 4, 5, 6, 7, 8];
    const actualArray = flatten(startingArray);
    t.deepEqual(actualArray, flattenedArray);
});

test('flattenOneLevel of deep array should only flatten top level array', t => {
    const startingArray = [1, [2, [3, [4], 5, [[[6]]]], 7], 8];
    const flattenedArray = [1, 2, [3, [4], 5, [[[6]]]], 7, 8];
    const actualArray = flattenOneLevel(startingArray);
    t.deepEqual(actualArray, flattenedArray);
});
