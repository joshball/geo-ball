// import { SudokuSquare, Digits, Squares, SudokuSquarePeers, SquarePeers, SquareUnits } from './SudokuCore';
// import { flatten } from "../utils/array";

// export class SquareValues {
//     square: SudokuSquare;
//     initialValue: number;
//     possibleValues: Array<number>;
//     constructor(square: SudokuSquare, initialValue: number = 0) {
//         this.square = square;
//         this.initialValue = initialValue;
//         this.possibleValues = initialValue === 0 ? Array.from(Digits) : [initialValue];
//     }
// }

// // const squareValues = {
// //     square: 'A1',
// //     initialValues: '0',
// //     possibleValues: [1, 2, 3, 4, 5, 6, 7, 8, 9]
// // }

// export class BoardSquaresValues {
//     [square: string]: SquareValues;
//     constructor() {
//         Squares.forEach((square) => {
//             this[square] = new SquareValues(square as SudokuSquare);
//         });
//     }
// }

// export const solve = (bsv: BoardSquaresValues, board: Array<number>): void => {
//     const level = 1;
//     Squares.forEach((square, index) => {
//         const digit = board[index];
//         if (digit >= 1 && digit <= 9) {
//             assign(bsv, square, digit, level);
//         }
//     });
// }


// const removeElem = (array: Array<any>, elemToElim: any) => array.filter(i => i !== elemToElim);
// const removeElems = (array: Array<any>, elemsToElim: Array<any>) => array.filter(i => elemsToElim.indexOf(i) < 0);

// // export const getPeerSingleValues = (bsv: BoardSquaresValues, square: SudokuSquare) => {
// //     const squarePeers = SquarePeers[square];
// //     // console.log('squarePeers:\n', JSON.stringify(squarePeers, undefined, 4));
// //     const peerSingleValues = flatten(squarePeers.map(s => bsv[s]).filter(s => s.possibleValues.length === 1).map(s => s.possibleValues));
// //     // console.log('peerSingleValues:\n', JSON.stringify(peerSingleValues, undefined, 4));
// //     return peerSingleValues;
// // }

// // export const eliminate = (bsv: BoardSquaresValues, square: SudokuSquare) => {
// //     const sv = bsv[square];
// //     if (sv.possibleValues.length === 1) {
// //         return;
// //     }
// //     const squaresToElim = getPeerSingleValues(bsv, square);
// //     sv.possibleValues = removeElems(sv.possibleValues, squaresToElim);
// //     // console.log('possibleValues:\n', JSON.stringify(sv.possibleValues, undefined, 4));

// // }

// const CL = (level: number, s: string) => {
//     // return;
//     let space = ''
//     for (let i = 0; i < level; i++){
//         space += ' ';
//     }
//     console.log(`${space}${s}`);
// }
// export const eliminatePeers = (bsv: BoardSquaresValues, square: SudokuSquare, digit: number, level: number) => {

//     CL(level, `  eliminatePeers(${digit} => ${square})`);
//     const sv = bsv[square];
//     const squareValues = sv.possibleValues;
//     const digPos = squareValues.indexOf(digit);
//     if (digPos < 0) {
//         CL(level, `   DONE: digit ${digit} is not in values: ${squareValues}`)
//         return;
//     }
//     // CL(level, `   pre SplicePV: ${sv.possibleValues}`)
//     sv.possibleValues.splice(digPos, 1);
//     // CL(level, `  POST SplicePV: ${sv.possibleValues}`)
//     if (sv.possibleValues.length === 0) {
//         throw new Error(`square[${sv.square}] has zero len possibleValues`);
//     }
//     // If a square is reduced to a single value, remove it from its peers.
//     if (sv.possibleValues.length === 1) {
//         const newDigToElim = sv.possibleValues[0];
//         CL(level, `  NEW.ELIM possibleValues.len===1(${newDigToElim})`);
//         SquarePeers[square].forEach(peerSquare => eliminatePeers(bsv, peerSquare, newDigToElim, level+1));
//     }
//     // if a unit is reduced to only one place for a valude, then put it in there
//     SquareUnits[square].forEach(unit => {
//         const unitSquaresWithDigitInThem = unit.filter(unitSquare => bsv[unitSquare].possibleValues.indexOf(digit) >= 0);
//         if (unitSquaresWithDigitInThem.length === 0) {
//             throw new Error(`square[${sv.square}] has zero len possibleValues`);
//         }
//         if (unitSquaresWithDigitInThem.length === 1) {
//             CL(level, `  NEW.ASSIGN unitSquaresWithDigitInThem.len===1(${unitSquaresWithDigitInThem[0]})`);
//             assign(bsv, unitSquaresWithDigitInThem[0], digit, level+1);
//         }
//     })
// }

// export const assign = (bsv: BoardSquaresValues, square: SudokuSquare, digit: number, level:number) => {
//     CL(level, `ASSIGN(${digit} => ${square}) PV: ${bsv[square].possibleValues}`);
//     const otherValues = removeElem(bsv[square].possibleValues, digit);
//     CL(level, `otherValues: ${otherValues}`);
//     otherValues.forEach(ov => eliminatePeers(bsv, square, ov, level+1));
// }

// // import { Sudoku } from './Sudoku';

// // export interface IValuesProp {
// //     initialValue: number;
// //     values: Array<number>;
// // }



// // export const SQUARE: any = {}
// // const squaresArray = cross(Sudoku.Rows, Sudoku.Cols);
// // squaresArray.forEach((s, index) => SQUARE[s] = index)

// // type SquareString = string;
// // type SquareValuesMap = Map<string, IValuesProp>;

// // export class SquareValues extends Map<string, IValuesProp> {

// //     constructor(board: Array<number>) {
// //         super();
// //         Object.keys(Sudoku.Squares).forEach((square, index) => {
// //             // tslint:disable-next-line:no-unused-expression
// //             const initialValue = board[index];
// //             this.set(square, {
// //                 initialValue,
// //                 values: initialValue > 0 && initialValue < 10 ? [initialValue] : Array.from(Sudoku.Digits),
// //             });
// //         });
// //     }
// // }


// // // Eliminate all the other values (except d) from values[s] and propagate.
// // // Return values, except return False if a contradiction is detected.
// // export const assign = (squares: SquareValuesMap, square: string, digit: number): any => {
// //     const otherVals = squares.get(square)!.values.filter(c => c !== digit);
// // }



// // // The PEERS for Square C2 are:
// // //   COL 2: A2-I2
// // //   ROW C: C1-C9
// // //   SQR 1: A1..A3, B1..B3, C1..C3
// // //
// // //      A2   |         |           #           |         |           #   A1 A2 A3|         |
// // //      B2   |         |           #           |         |           #   B1 B2 B3|         |
// // //      C2   |         |           #   C1 C2 C3| C4 C5 C6| C7 C8 C9  #   C1 C2 C3|         |
// // //  ---------+---------+---------  #  ---------+---------+---------  #  ---------+---------+---------
// // //      D2   |         |           #           |         |           #           |         |
// // //      E2   |         |           #           |         |           #           |         |
// // //      F2   |         |           #           |         |           #           |         |
// // //  ---------+---------+---------  #  ---------+---------+---------  #  ---------+---------+---------
// // //      G2   |         |           #           |         |           #           |         |
// // //      H2   |         |           #           |         |           #           |         |
// // //      I2   |         |           #           |         |           #           |         |
// // //
// // // Strategies
// // // (1) If a square has only one possible value, then eliminate that value from the square's peers.
// // //      if A1 is known to be 7 { A1: '7', A2: '123456789'}, then all peers have to eliminate 7
// // //       COL 1 (B1...I1 must all remove 7)
// // //       ROW A (A2...A9 must all remove 7)
// // //       SQR 1 (A2...A3, B1..B3, C1..3) must all remove 7)
// // // (2) If a unit has only one possible place for a value, then put the value there.
// // //

// // export const eliminate = (squares: SquareValues, square: SquareString, digit: number): void => {

// //     // If a square has only one possible value, then eliminate that value from the square's peers.
// //     const vp = squares.get(square)!;
// //     const loc = vp.values.indexOf(digit);
// //     if (loc < 0) {
// //         return;
// //     }
// //     vp.values.slice(loc, 1);
// //     if (vp.values.length < 1) {
// //         throw new Error('We should not have removed the last value');
// //     }
// //     if (vp.values.length === 1) {
// //         const d2 = Array.from(vp.values);
// //     }

// // }

// // // If a square has only one possible value, then eliminate that value from the square's peers.
// // export const eliminatePeersForAbsoluteValues = (squares: SquareValues, square: SquareString): void => {

// //     const values = squares.get(square)!.values;
// //     if (values.length !== 1) {
// //         console.error('Should not be eliminating squares with multiple values');
// //     }
// //     const digit = values[0];
// //     const peers = getPeers(square);
// //     eliminateDigitFromPeers(squares, square, digit, peers);)

// // }
// // export const eliminateDigitFromPeer = (squares: SquareValues, square: SquareString, digit: number, peers: Array<SquareValuesMap>): void => {

// //     peers.forEach(peer => {
// //         const loc = peer..indexOf(digit);
// //         if (loc < 0) {
// //             return;
// //         }
// //         values.slice(loc, 1);
// //         if (values.length < 1) {
// //             throw new Error('We should not have removed the last value');
// //         }

// //     })

// // }
