"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SudokuNineCore_1 = require("./SudokuNineCore");
const SudokuFourCore_1 = require("./SudokuFourCore");
const SudokuBoardStrings_1 = require("./SudokuBoardStrings");
class SquareValue {
    constructor(square, value) {
        this.square = square;
        this.value = value;
    }
}
exports.SquareValue = SquareValue;
class SudokuBoard {
    constructor(boardArray, core) {
        this.core = core;
        this.core.isValidBoardArray(boardArray);
        this._boardArray = boardArray;
    }
    static CreateFromString(boardString) {
        const boardArray = SudokuBoardStrings_1.SudokuBoardStrings.StringToArray(boardString);
        if (boardArray.length === 16) {
            return new SudokuBoard(boardArray, new SudokuFourCore_1.SudokuFourCore());
        }
        if (boardArray.length === 81) {
            return new SudokuBoard(boardArray, new SudokuNineCore_1.SudokuNineCore());
        }
        throw new Error('Unknown board size');
    }
    toArray() {
        return this._boardArray;
    }
    toArrayOfSquareValues() {
        return this.core.Squares.map((square, index) => {
            const digit = this._boardArray[index];
            return new SquareValue(square, digit);
        });
    }
    toObjectOfSquareValues() {
        const obj = {};
        this.core.Squares.forEach((square, index) => {
            obj[square] = this._boardArray[index];
        });
        return obj;
    }
    toString(emptyChar = '0') {
        return SudokuBoardStrings_1.SudokuBoardStrings.ArrayToString(this._boardArray, emptyChar);
    }
    toPrettyString(emptyChar = '0') {
        return SudokuBoardStrings_1.SudokuBoardStrings.ArrayToPrettyString(this._boardArray, emptyChar);
    }
}
exports.SudokuBoard = SudokuBoard;
//# sourceMappingURL=SudokuBoard.js.map