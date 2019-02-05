"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SudokuBoardStrings_1 = require("./SudokuBoardStrings");
const ava_1 = __importDefault(require("ava"));
ava_1.default('SudokuBoardStrings.StringToArray() parses board string with zero and returns correct array', t => {
    const boardString = `000408029000000004850020007008374200020000000003261700000093612200000403130642070`;
    const expectedBoardArray = [
        0, 0, 0, 4, 0, 8, 0, 2, 9,
        0, 0, 0, 0, 0, 0, 0, 0, 4,
        8, 5, 0, 0, 2, 0, 0, 0, 7,
        0, 0, 8, 3, 7, 4, 2, 0, 0,
        0, 2, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 3, 2, 6, 1, 7, 0, 0,
        0, 0, 0, 0, 9, 3, 6, 1, 2,
        2, 0, 0, 0, 0, 0, 4, 0, 3,
        1, 3, 0, 6, 4, 2, 0, 7, 0,
    ];
    const sudokuBoardArray = SudokuBoardStrings_1.SudokuBoardStrings.StringToArray(boardString);
    t.deepEqual(sudokuBoardArray, expectedBoardArray);
});
ava_1.default('SudokuBoardStrings.StringToArray() parses board string with period (.) and returns correct array', t => {
    const boardString = `...4.8.29........485..2...7..83742...2.........32617......936122.....4.313.642.7.`;
    const expectedBoardArray = [
        0, 0, 0, 4, 0, 8, 0, 2, 9,
        0, 0, 0, 0, 0, 0, 0, 0, 4,
        8, 5, 0, 0, 2, 0, 0, 0, 7,
        0, 0, 8, 3, 7, 4, 2, 0, 0,
        0, 2, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 3, 2, 6, 1, 7, 0, 0,
        0, 0, 0, 0, 9, 3, 6, 1, 2,
        2, 0, 0, 0, 0, 0, 4, 0, 3,
        1, 3, 0, 6, 4, 2, 0, 7, 0,
    ];
    const sudokuBoardArray = SudokuBoardStrings_1.SudokuBoardStrings.StringToArray(boardString);
    t.deepEqual(sudokuBoardArray, expectedBoardArray);
});
// test('SudokuBoardStrings.StringToArray() throws error on unknown char', t => {
//     const boardString = `00040802900000000485002000700837420002000000000326170000009361220000040313064207A`;
//     const error = t.throws(() => SudokuBoardStrings.StringToArray(boardString), Error);
//     // console.log('error', error)
//     t.is(error.message, 'Board String should be 81 characters (was 80)');
// });
ava_1.default('SudokuBoardStrings.GetSimpleString() defaults to using period', t => {
    const boardString = `000408029000000004850020007008374200020000000003261700000093612200000403130642070`;
    const boardArray = SudokuBoardStrings_1.SudokuBoardStrings.StringToArray(boardString);
    const boardArrayString = SudokuBoardStrings_1.SudokuBoardStrings.ArrayToString(boardArray, '.');
    const expectedBoardString = `...4.8.29........485..2...7..83742...2.........32617......936122.....4.313.642.7.`;
    t.deepEqual(boardArrayString, expectedBoardString);
});
ava_1.default('SudokuBoardStrings.GetSimpleString() can set empty to 0', t => {
    const boardString = `000408029000000004850020007008374200020000000003261700000093612200000403130642070`;
    const boardArray = SudokuBoardStrings_1.SudokuBoardStrings.StringToArray(boardString);
    const boardArrayString = SudokuBoardStrings_1.SudokuBoardStrings.ArrayToString(boardArray);
    const expectedBoardString = `000408029000000004850020007008374200020000000003261700000093612200000403130642070`;
    t.deepEqual(boardArrayString, expectedBoardString);
});
ava_1.default('SudokuBoardStrings.GetPrettyString() prints correctly', t => {
    const boardString = `000408029000000004850020007008374200020000000003261700000093612200000403130642070`;
    const boardArray = SudokuBoardStrings_1.SudokuBoardStrings.StringToArray(boardString);
    const boardArrayString = SudokuBoardStrings_1.SudokuBoardStrings.ArrayToPrettyString(boardArray);
    const expected = `
0 0 0 | 4 0 8 | 0 2 9
0 0 0 | 0 0 0 | 0 0 4
8 5 0 | 0 2 0 | 0 0 7
------+-------+------
0 0 8 | 3 7 4 | 2 0 0
0 2 0 | 0 0 0 | 0 0 0
0 0 3 | 2 6 1 | 7 0 0
------+-------+------
0 0 0 | 0 9 3 | 6 1 2
2 0 0 | 0 0 0 | 4 0 3
1 3 0 | 6 4 2 | 0 7 0`;
    t.deepEqual(boardArrayString.trim(), expected.trim());
    t.snapshot(boardArrayString);
});
ava_1.default('SudokuBoardStrings.ParseLiberal() parses E,0,. and random stuff correctly', t => {
    const boardString = `E E E | 4 . 8 | 0 2 9
                        0 0 0 | 0 0 0 | 0 0 4
                        8 5 0 | 0 2 . | 0 0 7 xxxywerjdoasjfasdfjlksadjf
                        ------+-------+------
                        0 0 8 | 3 7 4 | 2 0 0
                        0 2 0 | 0 0 0 | 0 0 0
                        0 0 3 | 2 6 1 | 7 0 0
                        ------+-------+------
                        0 0 0 | 0 9 3 | 6 1 2
                        2 0 0 | 0 0 0 | 4 0 3
                        1 3 0 | 6 4 2 | 0 7 0`;
    const boardArray = SudokuBoardStrings_1.SudokuBoardStrings.StringToArray(boardString);
    const boardArrayString = SudokuBoardStrings_1.SudokuBoardStrings.ArrayToString(boardArray);
    // console.log(boardArrayString)
    const expectedBoardString = `000408029000000004850020007008374200020000000003261700000093612200000403130642070`;
    t.deepEqual(boardArrayString, expectedBoardString);
});
//# sourceMappingURL=SudokuBoardStrings.spec.js.map