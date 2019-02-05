"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SudokuBoard_1 = require("./SudokuBoard");
const SudokuSquareValues_1 = require("./SudokuSquareValues");
const ava_1 = __importDefault(require("ava"));
const SudokuTestData_1 = require("../test/SudokuTestData");
ava_1.default('SudokuSquareValues prints 4x4 board with array correctly', t => {
    const BOARD = SudokuTestData_1.getBoards().fourByFour.board;
    const sb = SudokuBoard_1.SudokuBoard.CreateFromString(BOARD.beg.pretty);
    // t.log('sb.toPrettyString()');
    // t.log(sb.toPrettyString());
    const ssv = new SudokuSquareValues_1.SudokuSquareValues(sb.core);
    const ssvString = ssv.toString().trim();
    const expectedString = SudokuTestData_1.cleanLeadingSpaces(`
        1234 1234 | 1234 1234
        1234 1234 | 1234 1234
        ----------+----------
        1234 1234 | 1234 1234
        1234 1234 | 1234 1234`.trim());
    // t.log('ssvString:');
    // t.log(ssvString);
    // t.log('expectedString:');
    // t.log(expectedString);
    t.deepEqual(ssvString, expectedString);
});
ava_1.default('SudokuSquareValues prints 9x9 board with array correctly', t => {
    const BOARDS = SudokuTestData_1.getBoards().norvig;
    const sb = SudokuBoard_1.SudokuBoard.CreateFromString(BOARDS.easy.beg.pretty);
    const ssv = new SudokuSquareValues_1.SudokuSquareValues(sb.core);
    const ssvString = ssv.toString().trim();
    const expectedString = SudokuTestData_1.cleanLeadingSpaces(`
    123456789 123456789 123456789 | 123456789 123456789 123456789 | 123456789 123456789 123456789
    123456789 123456789 123456789 | 123456789 123456789 123456789 | 123456789 123456789 123456789
    123456789 123456789 123456789 | 123456789 123456789 123456789 | 123456789 123456789 123456789
    ------------------------------+-------------------------------+------------------------------
    123456789 123456789 123456789 | 123456789 123456789 123456789 | 123456789 123456789 123456789
    123456789 123456789 123456789 | 123456789 123456789 123456789 | 123456789 123456789 123456789
    123456789 123456789 123456789 | 123456789 123456789 123456789 | 123456789 123456789 123456789
    ------------------------------+-------------------------------+------------------------------
    123456789 123456789 123456789 | 123456789 123456789 123456789 | 123456789 123456789 123456789
    123456789 123456789 123456789 | 123456789 123456789 123456789 | 123456789 123456789 123456789
    123456789 123456789 123456789 | 123456789 123456789 123456789 | 123456789 123456789 123456789`.trim());
    t.deepEqual(ssvString, expectedString);
});
//# sourceMappingURL=SudokuSquareValues.spec.js.map