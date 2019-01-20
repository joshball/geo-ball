"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flatten = (array) => {
    return array.reduce((prev, curr) => prev.concat(Array.isArray(curr) ? exports.flatten(curr) : curr), []);
};
exports.flattenOneLevel = (array) => {
    return array.reduce((prev, curr) => prev.concat(curr), []);
};
exports.cross = (A, B) => {
    const ret = [];
    // console.log('Cross(A,B)');
    // console.log('  A:', A.length, A);
    // console.log('  B:', B.length, B);
    for (let ai = 0; ai < A.length; ai++) {
        for (let bi = 0; bi < B.length; bi++) {
            const a = A[ai], b = B[bi];
            // console.log(`  a[${a}] + b[${b}] => ${a + b}`)
            ret.push(a.toString() + b.toString());
        }
    }
    return ret;
};
exports.removeElem = (array, elemToElim) => array.filter(i => i !== elemToElim);
exports.removeElems = (array, elemsToElim) => array.filter(i => elemsToElim.indexOf(i) < 0);
exports.arraysAreEqual = (lhs, rhs) => {
    if (lhs.length === rhs.length) {
        for (let i = 0; i < lhs.length; i++) {
            if (lhs[i] !== rhs[i]) {
                return false;
            }
        }
        return true;
    }
    return false;
};
exports.getMaxLenOfSubItem = (items) => items.reduce((prevSize, currSquare) => {
    const currSize = currSquare.length;
    return prevSize < currSize ? currSize : prevSize;
}, 0);
//# sourceMappingURL=array.js.map