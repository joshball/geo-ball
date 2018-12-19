import { isArray } from "util";
import { SudokuCellValue } from './SudokuCore';
import { cross, flatten, flattenOneLevel } from "../utils/array";

export type SudokuSquare = string

export type SudokuUnit = Array<SudokuSquare>

export type SudokuDigit = number
export type SudokuCellValue = number;

export type BoardSquareValuesMap = Map<SudokuSquare, Array<SudokuDigit>>;

export interface SquareValues {
    sqr: SudokuSquare;
    vals: Array<SudokuCellValue>
};


// Array<SudokuSqure>
// Array<Array<SudokuSqure>>
// Object[SudokuSqure] = Array<SudokuSqure>
export class SudokuSquareUnits {
    [square: string]: Array<Array<SudokuSquare>>;

    constructor(squares: Array<SudokuSquare>, AllUnits: Array<SudokuUnit>) {
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

class SlimeBoardCore {
    Digits: Array<number>;
    Rows: Array<string>;
    Cols: Array<number>;
    Squares: Array<SudokuSquare>;
    AllUnits: Array<SudokuUnit>;
    SquareUnits: SudokuSquareUnits;
    SquarePeers: SudokuSquarePeers;
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
            this.Digits.push(i + 1);
            this.Rows.push(String.fromCharCode((A + i)));
            this.Cols.push(i + 1);
        }
        this.Squares = cross(this.Rows, this.Cols);
        this.AllUnits = this.createAllUnits(this.Rows, this.Cols);
        this.SquareUnits = new SudokuSquareUnits(this.Squares, this.AllUnits);
        this.SquarePeers = new SudokuSquarePeers(this.Squares, this.SquareUnits);
    }

    createAllUnits = (rows: Array<string>, cols: Array<number>): Array<SudokuUnit> => {
        const listOfUnits: Array<SudokuUnit> = [];
        // Get 9 Columns (A1, A2,...,A9)
        for (const c of Array.from(cols)) {
            listOfUnits.push(cross<SudokuSquare>(rows, [c]));
        }
        // Get 9 Rows (A1, B1,...,I1)
        for (const r of rows) {
            listOfUnits.push(cross<SudokuSquare>([r], cols));
        }
        const getBox = (boxNum: number): SudokuUnit => {
            const rowStart = (Math.floor(boxNum / this.BoxSize) * this.BoxSize);
            const colStart = (boxNum * this.BoxSize) % this.Size;

            const r = this.Rows.slice(rowStart, rowStart + this.BoxSize);
            const c = this.Cols.slice(colStart, colStart + this.BoxSize);
            return cross(r, c);
        }
        for (let i = 0; i < this.Size; i++) {
            listOfUnits.push(getBox(i));
        }
        console.log('====================================================================================================');
        console.log('listOfUnits:\n', JSON.stringify(listOfUnits, undefined, 4));
        console.log('====================================================================================================');
        return listOfUnits;
    }

    isValidCellGuess(num: number): boolean {
        return isNaN(num) ? false : num >= 1 && num <= this.Size;
    }
    isValidCellNum(num: number): boolean {
        return isNaN(num) ? false : num >= 0 && num <= this.Size;
    }
    isValidCellNumChar(numChar: string): boolean {
        const num = parseInt(numChar, 10);
        return this.isValidCellNum(num);
    }

    isValidBoardArray(boardArray: Array<number>) {

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
            if (!this.isValidCellNum(cellNum)) {
                throw new Error(`Invalid digit [${c}] at pos ${i} sould be 0-${this.Size}`);
            }
        })
    }
}

export class SlimeBoard {

    _boardArray: Array<SudokuCellValue>;
    _core: SlimeBoardCore;

    constructor(boardArray: Array<number>, core?: SlimeBoardCore) {
        const size = Math.sqrt(boardArray.length);
        this._core = core || new SlimeBoardCore(size);
        this._core.isValidBoardArray(boardArray)
        this._boardArray = boardArray.map(c => c as SudokuCellValue);
    }

    toArray(): Array<SudokuCellValue> {
        return this._boardArray;
    }

    toString(): string {
        return SlimeBoard.ArrayToString(this._boardArray, '0');
    }

    static CreateFromString(boardString: string, core?: SlimeBoardCore): SlimeBoard {
        return new SlimeBoard(SlimeBoard.StringToArray(boardString), core);
    }

    static GetDiff(boardOne: Array<SudokuCellValue>, boardTwo: Array<SudokuCellValue>): string {
        const diffArray = boardOne.map((bOneDig, i) => {
            const bTwoDig = boardTwo[i];
            if (bOneDig !== bTwoDig) {
                return 'x';
            }
            return ' ';
        })
        return boardOne.join('') + '\n' + boardTwo.join('') + '\n' + diffArray.join('') + '\n';
    }



    /**
     * Parses a string of characters that should represent the state of a sudoku board.
     * The constraints are simple. Ensure there are 81 characters that represent the state
     * of the board: 1-9 for known numbers, and [0|.|E] for unknown spaces. All else is
     * ignored.
     * This will throw if there are not exactly 81 state representations.
     * @param boardString string of characters (space|.|E|0-9) representing board state
     * @returns An array of 81 numbers (0-9) or throws an Error.
     */
    stringToArray(boardString: string, debug: boolean = false): Array<SudokuCellValue> {
        const boardStringArray = SlimeBoard.StringToArray(boardString)
            .filter(c => this._core.isValidCellNum(c))
            .map(c => c as SudokuCellValue);

        if (boardStringArray.length !== this._core.NumCells) {
            if (debug) {
                console.error('Parse error: boardString:', boardString);
                console.error('Parse error: boardStringArray:', boardStringArray);
                console.error('Parse error: boardStringArray.length:', boardStringArray.length);
            }
            throw new Error(`Board String should be ${this._core.NumCells} characters (was ${boardStringArray.length})`);
        }
        return boardStringArray;
    }

    static StringToArray(boardString: string): Array<number> {
        return Array.from(boardString.replace(/\.|E/g, '0'))
            .map(c => parseInt(c, 10))
            .filter(c => !isNaN(c));
    }

    static ArrayToString(boardArray: Array<SudokuCellValue>, emptyChar: string = '.'): string {
        return boardArray.map(s => s === 0 ? emptyChar : s).join('');
    }

    static ArrayOfValuesToPrettyString(boardArray: Array<Array<SudokuCellValue>>, emptyChar: string = '.'): string {
        const maxLen = boardArray.reduce((prev, curr) => curr.length > prev ? curr.length : prev, 0);
        return SlimeBoard.ArrayOfValuesToPrettyStringMax(boardArray, emptyChar, maxLen);
    }

    static GetBufferedString(vals: Array<any>, max: number): string {
        if (vals.length > max) {
            throw new Error('vals.len too long');
        }
        let alt = true;
        let valStr = vals.join('');
        let spaceRemain = max - valStr.length;
        while (spaceRemain > 0) {
            valStr = alt ? ' ' + valStr.toString() : valStr.toString() + ' ';
            alt = !alt;
            --spaceRemain;
        }
        return valStr;
    }

    static ArrayOfValuesToPrettyStringMax(boardArray: SudokuCellValue[][], _emptyChar: string, maxLen: number): string {
        const lines: Array<string> = [];
        let line: Array<string> = [];
        console.log('ArrayOfValuesToPrettyStringMax:', boardArray);
        console.log('ArrayOfValuesToPrettyStringMax:', maxLen);
        const getDashCol = (max: number) => {
            const dashArray = [];
            for (let i = 0; i < max; i++) {
                dashArray.push('-');
            }
            return dashArray.join('');
        }
        const getHorizLine = (max: number) => {
            const dashArray = [];
            for (let i = 0; i < 9; i++) {
                if (i !== 0 && i % 3 === 0) {
                    dashArray.push('+');
                }
                dashArray.push(getDashCol(max));
            }
            return dashArray.join('-');
        }
        boardArray.forEach((square, index) => {
            console.log('HERE:', index, square);
            // if at the end of a row, the line is done.
            if (index % 9 === 0 && index !== 0) {
                // join it with spaces in between, and push it to lines
                lines.push(line.join(' '));
                // if it is the 3rd or 6th row, push a dashedline
                if (index % 27 === 0 && index !== 0) {
                    lines.push(getHorizLine(maxLen));
                    // lines.push('------+-------+------');
                }
                // empty the line
                line = [];
            }
            // if we are on the 3rd or 6th column, push a |
            else if ((index % 3 === 0 || index % 6 === 0) && index !== 0) {
                line.push('|');
            }
            // otherwise we are just a normal square

            const squareChar = SlimeBoard.GetBufferedString(square, maxLen);
            // const squareChar = square === 0 ? emptyChar : square.toString();
            line.push(squareChar);
        })
        // We need to join and push the final line
        lines.push(line.join(' '));
        return lines.join('\n');
    }

    static ArrayToPrettyString(boardArray: Array<SudokuCellValue>, emptyChar: string = '.'): string {
        const lines: Array<string> = [];
        let line: Array<string> = [];
        boardArray.forEach((square, index) => {
            // if at the end of a row, the line is done.
            if (index % 9 === 0 && index !== 0) {
                // join it with spaces in between, and push it to lines
                lines.push(line.join(' '));
                // if it is the 3rd or 6th row, push a dashedline
                if (index % 27 === 0 && index !== 0) {
                    lines.push('------+-------+------');
                }
                // empty the line
                line = [];
            }
            // if we are on the 3rd or 6th column, push a |
            else if ((index % 3 === 0 || index % 6 === 0) && index !== 0) {
                line.push('|');
            }
            // otherwise we are just a normal square
            const squareChar = square === 0 ? emptyChar : square.toString();
            line.push(squareChar);
        })
        // We need to join and push the final line
        lines.push(line.join(' '));
        return lines.join('\n');
    }

    toPrettyString(): string {
        return this.toPrettyValueString(this._boardArray.map(v => [v]));
        // return SlimeBoard.ArrayToPrettyString(this._boardArray);
    }
    toPrettyValueString(boardCellValues: Array<Array<number>>): string {
        const lines: Array<string> = [];
        let line: Array<string> = [];
        // console.log('toPrettyString():');
        // console.log('boardCellValues:', boardCellValues);
        // console.log('this._core.Size:', this._core.Size);
        const SIZE = this._core.Size;
        const BOXSIZE = this._core.BoxSize;

        const rowBreakPoint = (index: number) => index % SIZE === 0 && index !== 0;
        const boxRowBreakPoint = (index: number) => index % (SIZE * BOXSIZE) === 0 && index !== 0;
        const colBreakPoint = (index: number) => index % (BOXSIZE) === 0 && index !== 0;


        const getDashCol = (maxBoardCellArraySize: number) => {
            const dashArray = [];
            for (let i = 0; i < maxBoardCellArraySize; i++) {
                dashArray.push('-');
            }
            return dashArray.join('');
        }

        const getHorizLine = (maxBoardCellArraySize: number) => {
            const dashArray = [];
            for (let i = 0; i < SIZE; i++) {
                // if (i !== 0 && i % 3 === 0) {
                if (colBreakPoint(i)) {
                    dashArray.push('+');
                }
                dashArray.push(getDashCol(maxBoardCellArraySize));
            }
            return dashArray.join('-');
        }

        const maxCellSize = boardCellValues.reduce((prevSize, currSquare) => {
            const currSize = currSquare.length;
            return prevSize < currSize ? currSize : prevSize;
        }, 1);


        boardCellValues.forEach((square, index) => {
            // console.log('boardCellValues.forEach (square, index):', square, index);
            // if at the end of a row, the line is done.
            // if (index % 9 === 0 && index !== 0) {
            if (rowBreakPoint(index)) {
                // console.log('  rowBreakPoint:', index);
                // join it with spaces in between, and push it to lines
                lines.push(line.join(' '));
                // if it is the 3rd or 6th row, push a dashedline
                // if (index % 27 === 0 && index !== 0) {
                if (boxRowBreakPoint(index)) {
                    // console.log('  boxRowBreakPoint:', index);
                    // console.log('  maxCellSize:', maxCellSize);
                    // console.log('  getHorizLine(maxCellSize):', getHorizLine(maxCellSize));
                    lines.push(getHorizLine(maxCellSize));
                    // lines.push('------+-------+------');
                }
                // empty the line
                line = [];
            }
            // if we are on the 3rd or 6th column, push a |
            // else if ((index % 3 === 0 || index % 6 === 0) && index !== 0) {
            else if (colBreakPoint(index)) {
                // console.log('  colBreakPoint:', index);
                line.push('|');
            }
            // otherwise we are just a normal square

            const squareChar = SlimeBoard.GetBufferedString(square, maxCellSize);
            // const squareChar = square === 0 ? emptyChar : square.toString();
            // console.log('  squareChar:', squareChar);
            line.push(squareChar);
        })
        // We need to join and push the final line
        lines.push(line.join(' '));
        // console.log('================================================================================');
        // console.log(lines.join('\n'))
        // console.log('================================================================================');
        return lines.join('\n');
    }


}
