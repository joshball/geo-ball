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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvYXJyYXkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFYSxRQUFBLE9BQU8sR0FBRyxDQUFDLEtBQWlCLEVBQWMsRUFBRTtJQUNyRCxPQUFPLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLGVBQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDckcsQ0FBQyxDQUFBO0FBRVksUUFBQSxlQUFlLEdBQUcsQ0FBQyxLQUFpQixFQUFjLEVBQUU7SUFDN0QsT0FBTyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUMvRCxDQUFDLENBQUE7QUFFWSxRQUFBLEtBQUssR0FBRyxDQUFJLENBQXNCLEVBQUUsQ0FBc0IsRUFBWSxFQUFFO0lBQ2pGLE1BQU0sR0FBRyxHQUFhLEVBQUUsQ0FBQTtJQUN4Qiw2QkFBNkI7SUFDN0Isb0NBQW9DO0lBQ3BDLG9DQUFvQztJQUNwQyxLQUFLLElBQUksRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFLEVBQUUsRUFBRTtRQUNsQyxLQUFLLElBQUksRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFLEVBQUUsRUFBRTtZQUNsQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUMzQixpREFBaUQ7WUFDakQsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7U0FDekM7S0FDSjtJQUNELE9BQU8sR0FBRyxDQUFDO0FBQ2YsQ0FBQyxDQUFBO0FBQ1ksUUFBQSxVQUFVLEdBQUcsQ0FBQyxLQUFpQixFQUFFLFVBQWUsRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxVQUFVLENBQUMsQ0FBQztBQUN6RixRQUFBLFdBQVcsR0FBRyxDQUFDLEtBQWlCLEVBQUUsV0FBdUIsRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFHNUcsUUFBQSxjQUFjLEdBQUcsQ0FBQyxHQUFlLEVBQUUsR0FBZSxFQUFFLEVBQUU7SUFFL0QsSUFBSSxHQUFHLENBQUMsTUFBTSxLQUFLLEdBQUcsQ0FBQyxNQUFNLEVBQUU7UUFDM0IsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDakMsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUNuQixPQUFPLEtBQUssQ0FBQzthQUNoQjtTQUNKO1FBQ0QsT0FBTyxJQUFJLENBQUM7S0FDZjtJQUNELE9BQU8sS0FBSyxDQUFDO0FBQ2pCLENBQUMsQ0FBQTtBQUVZLFFBQUEsa0JBQWtCLEdBQUcsQ0FBQyxLQUFpQixFQUFVLEVBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsUUFBUSxFQUFFLFVBQVUsRUFBRSxFQUFFO0lBQ25HLE1BQU0sUUFBUSxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUM7SUFDbkMsT0FBTyxRQUFRLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQztBQUNyRCxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMifQ==