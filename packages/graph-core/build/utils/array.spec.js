"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const array_1 = require("../utils/array");
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