import { SudokuSquare, Digits, Squares, SudokuSquarePeers, SquarePeers, SquareUnits, BoardSquareValuesMap, SudokuDigit } from './SudokuCore';
import { flatten, removeElem } from "../utils/array";

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

// export const solve = (bsv: BoardSquareValuesMap, board: Array<SudokuDigit>): void => {
//     const level = 1;
//     Squares.forEach((square, index) => {
//         const digit = board[index];
//         if (digit >= 1 && digit <= 9) {
//             assign(bsv, square, digit, level);
//         }
//     });
// }


export type Logger = (level: number, s: string) => void;

export const nullLogger: Logger = (_level: number, _s: string) => undefined;

export const consoleLogger: Logger = (level: number, s: string) => {
    // return;
    let space = ''
    for (let i = 0; i < level; i++) {
        space += ' ';
    }
    console.log(`${space}${s}`);
}


// export const eliminatePeers = (bsv: BoardSquareValuesMap, square: SudokuSquare, digit: SudokuDigit, log: Logger, level: number) => {
export const eliminatePeers = (bsv: BoardSquareValuesMap, square: string, digit: number, log: Logger, level: number) => {

    // log(level, `  eliminatePeers(${digit} => ${square})`);
    const squareValues = bsv.get(square)!;

    const digPos = squareValues.indexOf(digit);
    if (digPos < 0) {
        // log(level, `   NOTHING_TO_DO: digit ${digit} is not in values: ${squareValues}`)
        return;
    }

    squareValues.splice(digPos, 1);
    if (squareValues.length === 0) {
        throw new Error(`square[${square}] has zero len possibleValues`);
    }

    // If a square is reduced to a single value, remove it from its peers.
    if (squareValues.length === 1) {
        const newDigToElim = squareValues[0];
        log(level, `  PROPOGATING removal of single elem from peers(${newDigToElim})`);
        SquarePeers[square].forEach(peerSquare => eliminatePeers(bsv, peerSquare, newDigToElim, log, level + 1));
    }

    // if a unit is reduced to only one place for a valude, then put it in there
    SquareUnits[square].forEach(unitSquares => {
        const unitSquaresWithDigitInThem = unitSquares.filter(unitSquare => bsv.get(unitSquare)!.indexOf(digit) >= 0);
        if (unitSquaresWithDigitInThem.length === 0) {
            throw new Error(`square[${square}] has zero len possibleValues`);
        }
        if (unitSquaresWithDigitInThem.length === 1) {
            log(level, `  SQUARE[${square}] has only a single value: [${unitSquaresWithDigitInThem[0]}] - assign it`);
            assign(bsv, unitSquaresWithDigitInThem[0], digit, log, level + 1);
        }
    })
}

// export const assign = (bsv: BoardSquareValuesMap, square: SudokuSquare, digit: SudokuDigit, log: Logger = nullLogger, level: number = 1) => {
export const assign = (bsv: BoardSquareValuesMap, square: string, digit: number, log: Logger = nullLogger, level: number = 1) => {
    const possibleValuesForSquare = bsv.get(square)!;
    log(level, `ASSIGN(${digit} => ${square}) PV: ${possibleValuesForSquare}`);

    const possibleValuesOtherThanDigitTrying = possibleValuesForSquare.filter(v => v !== digit);
    // log(level, `possibleValuesOtherThanDigitTrying: ${possibleValuesOtherThanDigitTrying}`);

    possibleValuesOtherThanDigitTrying.forEach(otherDigit => eliminatePeers(bsv, square, otherDigit, log, level + 1));
}

