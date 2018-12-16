import { realpathSync } from "fs";

export const flatten = (array: Array<any>): Array<any> => {
    return array.reduce((prev, curr) => prev.concat(Array.isArray(curr) ? flatten(curr) : curr), []);
}

export const flattenOneLevel = (array: Array<any>): Array<any> => {
    return array.reduce((prev, curr) => prev.concat(curr), []);
}

export const cross = <T>(A: Array<any> | string, B: Array<any> | string): Array<T> => {
    const ret: Array<T> = []
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
}
export const removeElem = (array: Array<any>, elemToElim: any) => array.filter(i => i !== elemToElim);
export const removeElems = (array: Array<any>, elemsToElim: Array<any>) => array.filter(i => elemsToElim.indexOf(i) < 0);


export const arraysAreEqual = (lhs: Array<any>, rhs: Array<any>) => {

    if (lhs.length === rhs.length) {
        for (let i = 0; i < lhs.length; i++) {
            if (lhs[i] !== rhs[i]) {
                return false;
            }
        }
        return true;
    }
    return false;
}
