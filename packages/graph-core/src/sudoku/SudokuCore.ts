import { flattenOneLevel, flatten, cross } from "../utils/array";

export type SudokuSquare =
    "A1" | "A2" | "A3" | "A4" | "A5" | "A6" | "A7" | "A8" | "A9" |
    "B1" | "B2" | "B3" | "B4" | "B5" | "B6" | "B7" | "B8" | "B9" |
    "C1" | "C2" | "C3" | "C4" | "C5" | "C6" | "C7" | "C8" | "C9" |
    "D1" | "D2" | "D3" | "D4" | "D5" | "D6" | "D7" | "D8" | "D9" |
    "E1" | "E2" | "E3" | "E4" | "E5" | "E6" | "E7" | "E8" | "E9" |
    "F1" | "F2" | "F3" | "F4" | "F5" | "F6" | "F7" | "F8" | "F9" |
    "G1" | "G2" | "G3" | "G4" | "G5" | "G6" | "G7" | "G8" | "G9" |
    "H1" | "H2" | "H3" | "H4" | "H5" | "H6" | "H7" | "H8" | "H9" |
    "I1" | "I2" | "I3" | "I4" | "I5" | "I6" | "I7" | "I8" | "I9"

export type SudokuUnit = Array<SudokuSquare>;

export type SudokuDigit = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type SudokuCellValue = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

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

// export type BoardSquareValuesMap = Map<SudokuSquare, Array<SudokuDigit>>;
export type BoardSquareValuesMap = Map<string, Array<number>>;

export interface SquareValues {
    sqr: SudokuSquare;
    vals: Array<SudokuCellValue>
};


/**
 * A "unit" is a collection of nine squares
 *  a column (e.g. the 2nd column: A2,B2,C2,...,I2)
 *  a row (e.g. the 3rd row: C1,C2,C3,...,C9)
 *  a box (e.g the top left box: A1-A3,...,C1-C3)
 * So there will be a total of 27 units:
 *  (9 cols, 9 rows, and 9 boxes)
 */
export const createTheTwentySevenUnits = (rows: string, cols: string): Array<SudokuUnit> => {
    const listOfUnits: Array<SudokuUnit> = [];
    // Get 9 Columns (A1, A2,...,A9)
    for (const c of Array.from(cols)) {
        listOfUnits.push(cross<SudokuSquare>(rows, [c]));
    }
    // Get 9 Rows (A1, B1,...,I1)
    for (const r of rows) {
        listOfUnits.push(cross<SudokuSquare>([r], cols));
    }
    // Get the 9 Boxes
    const unitCols: Array<string> = ['ABC', 'DEF', 'GHI'];
    const unitRow: Array<string> = ['123', '456', '789'];
    const boxUnits = flattenOneLevel(unitCols.map(c =>
        unitRow.map(r => cross<SudokuSquare>(c, r))));
    return listOfUnits.concat(boxUnits);
}


// Array<SudokuSqure>
// Array<Array<SudokuSqure>>
// Object[SudokuSqure] = Array<SudokuSqure>
export class SudokuSquareUnits {
    [square: string]: Array<Array<SudokuSquare>>;

    constructor(squares: Array<SudokuSquare>) {
        squares.forEach(square => {
            const units = AllUnits.filter(ul => ul.indexOf(square) >= 0).map(ul => ul);
            this[square] = units;
        });
    }

    // So read this assignment statement as "units is a dictionary
    // where each square maps to the list of units that contain the square".
}
// Similarly, read the next assignment statement as
// "peers is a dictionary where each square s maps to the set of squares
// formed by the union of the squares in the units of s, but not s itself".
// So read this assignment statement as "units is a dictionary
// where each square maps to the list of units that contain the square".

/**
 * The SquarePeers is a proper set (no dups) of all squares that form
 * the squares unit, minus itself.
 */
export class SudokuSquarePeers {
    [square: string]: Array<SudokuSquare>;

    constructor(squares: Array<SudokuSquare>, squareUnits: SudokuSquareUnits) {
        squares.forEach(square => {
            // Grab all the squares in the squares unit.
            // For instance, given square C2:
            // COL 2: ["A2","B2","C2","D2","E2","F2","G2","H2","I2"],
            // ROW C: ["C1","C2","C3","C4","C5","C6","C7","C8","C9"],
            // BOX 1: ["A1","A2","A3","B1","B2","B3","C1","C2","C3"],
            const allSquaresInUnit = flatten(squareUnits[square]);

            // Now we need to remove redundant squares. For instance,
            // first get rid of duplicates using the set:
            // (A1, A2, B2, C1, C2, C3)
            const setOfallSquaresInUnit = new Set(allSquaresInUnit);

            // Then finally convert it to array, slice out the reference
            // to its own square, and sort it (for consistency)
            const arrayOfSetofSquaresInUnit = Array.from(setOfallSquaresInUnit);
            const sqIx = arrayOfSetofSquaresInUnit.indexOf(square);
            arrayOfSetofSquaresInUnit.splice(sqIx, 1);

            this[square] = arrayOfSetofSquaresInUnit.sort();
        });
    }

}

const parseSudokuDigit = (char: string): SudokuDigit => {
    const dig = parseInt(char, 10);
    if (dig >= 1 && dig <= 9) {
        return dig as SudokuDigit;
    }
    throw new Error('Not a sudoku digit!');
}

/**
 * A Sudoku puzzle is a grid of 81 squares; the majority of enthusiasts label
 *  the columns 1-9,
 *  the rows A-I,
 *  and call a collection of nine squares (column, row, or box) a unit
 *  and the squares that share a unit the peers.
 *  Every square has exactly 3 units and 20 peers
 */
// export const Digits: Array<SudokuDigit> = Array.from('123456789').map(c => parseInt(c, 10));
export const Digits: Array<SudokuDigit> = Array.from('123456789').map(c => parseSudokuDigit(c));
export const Rows: string = 'ABCDEFGHI';
export const Cols: string = '123456789';
export const Squares: Array<SudokuSquare> = cross<SudokuSquare>(Rows, Cols);

export const AllUnits: Array<SudokuUnit> = createTheTwentySevenUnits(Rows, Cols);
export const SquareUnits: SudokuSquareUnits = new SudokuSquareUnits(Squares);
export const SquarePeers: SudokuSquarePeers = new SudokuSquarePeers(Squares, SquareUnits);
