import { flattenOneLevel, flatten, cross } from "../utils/array";

export type SudokuSquare =
    "A1" | "A2" | "A3" | "A4" |
    "B1" | "B2" | "B3" | "B4" |
    "C1" | "C2" | "C3" | "C4" |
    "D1" | "D2" | "D3" | "D4"

export type SudokuUnit = Array<SudokuSquare>

export type SudokuDigit = 1 | 2 | 3 | 4;
export type SudokuCellValue = 0 | 1 | 2 | 3 | 4;

export type BoardSquareValuesMap = Map<SudokuSquare, Array<SudokuDigit>>;

export interface SquareValues {
    sqr: SudokuSquare;
    vals: Array<SudokuCellValue>
};


/**
 * A "unit" is a collection of four squares
 *  a column (e.g. the 2nd column: A2,B2,C2,D2)
 *  a row (e.g. the 3rd row: C1,C2,C3,C4)
 *  a box (e.g the top left box: A1,A2,B1,B2)
 * So there will be a total of 12 units:
 *  (4 cols, 4 rows, and 4 boxes)
 */
export const createTheTwelveUnits = (rows: string, cols: string): Array<SudokuUnit> => {
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
    const unitCols: Array<string> = ['AB', 'CD'];
    const unitRow: Array<string> = ['12', '34'];
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
            // COL 2: ["A2","B2","C2","D2"],
            // ROW C: ["C1","C2","C3","C4"],
            // BOX 1: ["A1","A2","B1","B2"],
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
    if (dig >= 1 && dig <= 4) {
        return dig as SudokuDigit;
    }
    throw new Error('Not a sudoku digit!');
}

/**
 * A Sudoku puzzle is a grid of 16 squares; the majority of enthusiasts label
 *  the columns 1-4,
 *  the rows A-D,
 *  and call a collection of nine squares (column, row, or box) a unit
 *  and the squares that share a unit the peers.
 *  Every square has exactly 3 units (9 squares each) and 7 peers
 */
export const Digits: Array<SudokuDigit> = Array.from('1234').map(c => parseSudokuDigit(c));
export const Rows: string = 'ABCD';
export const Cols: string = '1234';
export const Squares: Array<SudokuSquare> = cross<SudokuSquare>(Rows, Cols);

export const AllUnits: Array<SudokuUnit> = createTheTwelveUnits(Rows, Cols);
export const SquareUnits: SudokuSquareUnits = new SudokuSquareUnits(Squares);
export const SquarePeers: SudokuSquarePeers = new SudokuSquarePeers(Squares, SquareUnits);
