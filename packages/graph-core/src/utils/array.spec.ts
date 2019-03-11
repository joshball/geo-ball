import test from 'ava';
import { flattenOneLevel, flatten } from '../utils/array';

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
