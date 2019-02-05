"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SudokuBoardStrings_1 = require("./SudokuBoardStrings");
class SudokuSquareValues extends Map {
    constructor(core, debug = false) {
        super();
        this._core = core;
        this._debug = debug;
        core.Squares.forEach((square) => {
            this.set(square, Array.from(core.Digits));
        });
    }
    toString() {
        const boardSquareValues = Array.from(this.values());
        return SudokuBoardStrings_1.SudokuBoardStrings.ArrayOfValuesToPrettyString(boardSquareValues);
    }
}
exports.SudokuSquareValues = SudokuSquareValues;
//# sourceMappingURL=SudokuSquareValues.js.map