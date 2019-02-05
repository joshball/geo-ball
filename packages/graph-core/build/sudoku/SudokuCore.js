"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("util");
const array_1 = require("../utils/array");
class SudokuSquareUnits {
    constructor(squares, AllUnits) {
        squares.forEach(square => {
            const units = AllUnits.filter(ul => ul.indexOf(square) >= 0).map(ul => ul);
            const squareStr = square;
            this[squareStr] = units;
        });
    }
}
exports.SudokuSquareUnits = SudokuSquareUnits;
// Similarly, read the next assignment statement as
// "peers is a dictionary where each square s maps to the set of squares
// formed by the union of the squares in the units of s, but not s itself".
// So read this assignment statement as "units is a dictionary
// where each square maps to the list of units that contain the square".
/**
 * The SquarePeers is a proper set (no dups) of all squares that form
 * the squares unit, minus itself.
 */
class SudokuSquarePeers {
    constructor(squares, squareUnits) {
        squares.forEach(square => {
            const squareStr = square;
            // Grab all the squares in the squares unit.
            // For instance, given square C2:
            // COL 2: ["A2","B2","C2","D2"],
            // ROW C: ["C1","C2","C3","C4"],
            // BOX 1: ["A1","A2","B1","B2"],
            const allSquaresInUnit = array_1.flatten(squareUnits[squareStr]);
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
exports.SudokuSquarePeers = SudokuSquarePeers;
class SudokuCore {
    constructor(size) {
        this.createAllUnits = (rows, cols) => {
            const listOfUnits = [];
            // Get 9 Columns (A1, A2,...,A9)
            for (const c of Array.from(cols)) {
                listOfUnits.push(array_1.cross(rows, [c]));
            }
            // Get 9 Rows (A1, B1,...,I1)
            for (const r of rows) {
                listOfUnits.push(array_1.cross([r], cols));
            }
            const getBox = (boxNum) => {
                const rowStart = (Math.floor(boxNum / this.BoxSize) * this.BoxSize);
                const colStart = (boxNum * this.BoxSize) % this.Size;
                const r = this.Rows.slice(rowStart, rowStart + this.BoxSize);
                const c = this.Cols.slice(colStart, colStart + this.BoxSize);
                return array_1.cross(r, c);
            };
            for (let i = 0; i < this.Size; i++) {
                listOfUnits.push(getBox(i));
            }
            // console.log('====================================================================================================');
            // console.log('listOfUnits:\n', JSON.stringify(listOfUnits, undefined, 4));
            // console.log('====================================================================================================');
            return listOfUnits;
        };
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
        this.Squares = array_1.cross(this.Rows, this.Cols);
        this.AllUnits = this.createAllUnits(this.Rows, this.Cols);
        this.SquareUnits = new SudokuSquareUnits(this.Squares, this.AllUnits);
        this.SquarePeers = new SudokuSquarePeers(this.Squares, this.SquareUnits);
    }
    isValidCellGuess(num) {
        return isNaN(num) ? false : num >= 1 && num <= this.Size;
    }
    isValidCellValue(num) {
        return isNaN(num) ? false : num >= 0 && num <= this.Size;
    }
    isValidCellNumChar(numChar) {
        const num = parseInt(numChar, 10);
        return this.isValidCellValue(num);
    }
    /**
     * The board array should be only digits from 0 to size, and can be typed
     * that way with the TSudokuCellValue, but we check with parsing anyway.
     * @param boardArray
     */
    isValidBoardArray(boardArray) {
        if (!boardArray) {
            throw new Error('Undefined boardArray');
        }
        if (!util_1.isArray(boardArray)) {
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
        });
    }
}
exports.SudokuCore = SudokuCore;
//# sourceMappingURL=SudokuCore.js.map