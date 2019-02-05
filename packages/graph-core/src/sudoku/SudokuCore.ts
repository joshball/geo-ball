import { isArray } from "util";
import { cross, flatten } from "../utils/array";

export type SudokuUnit<TSudokuSquare> = Array<TSudokuSquare>;

export type SudokuCellValue<TSudokuDigit> = 0 | TSudokuDigit;

export class SudokuSquareUnits<TSudokuSquare> {
    [square: string]: Array<Array<TSudokuSquare>>;

    constructor(squares: Array<TSudokuSquare>, AllUnits: Array<SudokuUnit<TSudokuSquare>>) {
        squares.forEach(square => {
            const units = AllUnits.filter(ul => ul.indexOf(square) >= 0).map(ul => ul);
            const squareStr = square as unknown as string;
            this[squareStr] = units;
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
export class SudokuSquarePeers<TSudokuSquare> {
    [square: string]: Array<TSudokuSquare>;

    constructor(squares: Array<TSudokuSquare>, squareUnits: SudokuSquareUnits<TSudokuSquare>) {
        squares.forEach(square => {
            const squareStr = square as unknown as string;
            // Grab all the squares in the squares unit.
            // For instance, given square C2:
            // COL 2: ["A2","B2","C2","D2"],
            // ROW C: ["C1","C2","C3","C4"],
            // BOX 1: ["A1","A2","B1","B2"],
            const allSquaresInUnit = flatten(squareUnits[squareStr]);

            // Now we need to remove redundant squares. For instance,
            // first get rid of duplicates using the set:
            // (A1, A2, B2, C1, C2, C3)
            const setOfallSquaresInUnit = new Set(allSquaresInUnit);

            // Then finally convert it to array, slice out the reference
            // to its own square, and sort it (for consistency)
            const arrayOfSetofSquaresInUnit = Array.from(setOfallSquaresInUnit);
            const sqIx = arrayOfSetofSquaresInUnit.indexOf(square);
            arrayOfSetofSquaresInUnit.splice(sqIx, 1);

            this[squareStr] = arrayOfSetofSquaresInUnit.sort();
        });
    }

}

export class SudokuCore<TSudokuSquare, TSudokuCellValue, TSudokuDigit>{
    Digits: Array<TSudokuDigit>;
    Rows: Array<string>;
    Cols: Array<number>;
    Squares: Array<TSudokuSquare>;
    AllUnits: Array<SudokuUnit<TSudokuSquare>>;
    SquareUnits: SudokuSquareUnits<TSudokuSquare>;
    SquarePeers: SudokuSquarePeers<TSudokuSquare>;
    Size: number;
    NumCells: number;
    BoxSize: number;
    constructor(size: number) {
        if (!(size === 4 || size === 9)) {
            throw new Error('Invalid size (only 4 or 9)');
        }
        this.Size = size;
        this.NumCells = size * size;
        this.BoxSize = Math.sqrt(size);
        this.Digits = [];
        this.Rows = [];
        this.Cols = [];
        const A = 'A'.charCodeAt(0);
        for (let i = 0; i < size; i++) {
            this.Digits.push(i + 1 as unknown as TSudokuDigit);
            this.Rows.push(String.fromCharCode((A + i)));
            this.Cols.push(i + 1);
        }
        this.Squares = cross(this.Rows, this.Cols);
        this.AllUnits = this.createAllUnits(this.Rows, this.Cols);
        this.SquareUnits = new SudokuSquareUnits(this.Squares, this.AllUnits);
        this.SquarePeers = new SudokuSquarePeers(this.Squares, this.SquareUnits);
    }

    createAllUnits = (rows: Array<string>, cols: Array<number>): Array<SudokuUnit<TSudokuSquare>> => {
        const listOfUnits: Array<SudokuUnit<TSudokuSquare>> = [];
        // Get 9 Columns (A1, A2,...,A9)
        for (const c of Array.from(cols)) {
            listOfUnits.push(cross<TSudokuSquare>(rows, [c]));
        }
        // Get 9 Rows (A1, B1,...,I1)
        for (const r of rows) {
            listOfUnits.push(cross<TSudokuSquare>([r], cols));
        }
        const getBox = (boxNum: number): SudokuUnit<TSudokuSquare> => {
            const rowStart = (Math.floor(boxNum / this.BoxSize) * this.BoxSize);
            const colStart = (boxNum * this.BoxSize) % this.Size;

            const r = this.Rows.slice(rowStart, rowStart + this.BoxSize);
            const c = this.Cols.slice(colStart, colStart + this.BoxSize);
            return cross(r, c);
        }
        for (let i = 0; i < this.Size; i++) {
            listOfUnits.push(getBox(i));
        }
        // console.log('====================================================================================================');
        // console.log('listOfUnits:\n', JSON.stringify(listOfUnits, undefined, 4));
        // console.log('====================================================================================================');
        return listOfUnits;
    }

    isValidCellGuess(num: number | TSudokuDigit | TSudokuCellValue): boolean {
        return isNaN(num as number) ? false : num >= 1 && num <= this.Size;
    }

    isValidCellValue(num: number | TSudokuDigit | TSudokuCellValue): boolean {
        return isNaN(num as number) ? false : num >= 0 && num <= this.Size;
    }

    isValidCellNumChar(numChar: string): boolean {
        const num = parseInt(numChar, 10);
        return this.isValidCellValue(num);
    }

    /**
     * The board array should be only digits from 0 to size, and can be typed
     * that way with the TSudokuCellValue, but we check with parsing anyway.
     * @param boardArray
     */
    isValidBoardArray(boardArray: Array<TSudokuCellValue>) {

        if (!boardArray) {
            throw new Error('Undefined boardArray');
        }
        if (!isArray(boardArray)) {
            throw new Error('boardArray is not array');
        }
        if (boardArray.length !== this.NumCells) {
            throw new Error(`boardArray length must be ${this.NumCells}`);
        }
        boardArray.forEach((c, i) => {
            const cellNum = parseInt(c.toString(), 10);
            if (isNaN(cellNum)) {
                throw new Error(`Invalid char [${c}] at pos ${i} should be a number`);
            }
            if (!this.isValidCellValue(cellNum)) {
                throw new Error(`Invalid digit [${c}] at pos ${i} sould be 0-${this.Size}`);
            }
        })
    }
}
