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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3Vkb2t1Q29yZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zdWRva3UvU3Vkb2t1Q29yZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtCQUErQjtBQUMvQiwwQ0FBZ0Q7QUFNaEQsTUFBYSxpQkFBaUI7SUFHMUIsWUFBWSxPQUE2QixFQUFFLFFBQTBDO1FBQ2pGLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDckIsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDM0UsTUFBTSxTQUFTLEdBQUcsTUFBMkIsQ0FBQztZQUM5QyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsS0FBSyxDQUFDO1FBQzVCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztDQUdKO0FBWkQsOENBWUM7QUFFRCxtREFBbUQ7QUFDbkQsd0VBQXdFO0FBQ3hFLDJFQUEyRTtBQUMzRSw4REFBOEQ7QUFDOUQsd0VBQXdFO0FBRXhFOzs7R0FHRztBQUNILE1BQWEsaUJBQWlCO0lBRzFCLFlBQVksT0FBNkIsRUFBRSxXQUE2QztRQUNwRixPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ3JCLE1BQU0sU0FBUyxHQUFHLE1BQTJCLENBQUM7WUFDOUMsNENBQTRDO1lBQzVDLGlDQUFpQztZQUNqQyxnQ0FBZ0M7WUFDaEMsZ0NBQWdDO1lBQ2hDLGdDQUFnQztZQUNoQyxNQUFNLGdCQUFnQixHQUFHLGVBQU8sQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUV6RCx5REFBeUQ7WUFDekQsNkNBQTZDO1lBQzdDLDJCQUEyQjtZQUMzQixNQUFNLHFCQUFxQixHQUFHLElBQUks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