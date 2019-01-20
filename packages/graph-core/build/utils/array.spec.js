"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const array_1 = require("../utils/array");
ava_1.default('cross of two arrays ([A,B],[1,2]) returns correct array [A1,A2,B1,B2]', t => {
    const actualCross = array_1.cross(['A', 'B'], ['1', '2']);
    t.deepEqual(actualCross, ['A1', 'A2', 'B1', 'B2']);
});
ava_1.default('cross of two strings ("ABC","123") returns correct array [A1,A2,A3,B1,B2,...,C3]', t => {
    const actualCross = array_1.cross('ABC', '123');
    t.deepEqual(actualCross, ['A1', 'A2', 'A3', 'B1', 'B2', 'B3', 'C1', 'C2', 'C3']);
});
ava_1.default('flatten of deep array should producing flattened array', t => {
    const startingArray = [1, [2, [3, [4], 5, [[[6]]]], 7], 8];
    const flattenedArray = [1, 2, 3, 4, 5, 6, 7, 8];
    const actualArray = array_1.flatten(startingArray);
    t.deepEqual(actualArray, flattenedArray);
});
ava_1.default('flattenOneLevel of deep array should only flatten top level array', t => {
    const startingArray = [1, [2, [3, [4], 5, [[[6]]]], 7], 8];
    const flattenedArray = [1, 2, [3, [4], 5, [[[6]]]], 7, 8];
    const actualArray = array_1.flattenOneLevel(startingArray);
    t.deepEqual(actualArray, flattenedArray);
});
//# sourceMappingURL=array.spec.js.map