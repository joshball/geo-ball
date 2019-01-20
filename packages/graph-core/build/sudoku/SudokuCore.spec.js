"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const array_1 = require("../utils/array");
const SudokuTestData_1 = require("../test/SudokuTestData");
const SudokuNineCore_1 = require("./SudokuNineCore");
// import { dumpBothArrays } from '../test/TestUtils';
ava_1.default('[internal] test to create boxes from Two arrays of strings', t => {
    const expectedBoxes = SudokuTestData_1.getExpectedData().boxes;
    const cols = ['ABC', 'DEF', 'GHI'];
    const rows = ['123', '456', '789'];
    const rowsOfCols = array_1.flattenOneLevel(cols.map(c => rows.map(r => array_1.cross(c, r))));
    t.deepEqual(rowsOfCols, expectedBoxes);
});
ava_1.default('[internal] cross of all rows and columns is produces 81 squares [A1...I9]', t => {
    const core = new SudokuNineCore_1.SudokuNineCore();
    const actualCross = array_1.cross(core.Rows, core.Cols);
    const expectedSquares = SudokuTestData_1.getExpectedData().squares;
    t.deepEqual(actualCross, expectedSquares);
});
ava_1.default('SudokuCore.Squares is the 81 squares [A1...I9]', t => {
    const core = new SudokuNineCore_1.SudokuNineCore();
    const expectedSquares = SudokuTestData_1.getExpectedData().squares;
    t.deepEqual(core.Squares, expectedSquares);
});
ava_1.default('Sudoku CreateUnitLists returns list of all units', t => {
    const core = new SudokuNineCore_1.SudokuNineCore();
    const expectedUnitLists = SudokuTestData_1.getExpectedData().unitLists;
    t.deepEqual(core.AllUnits, expectedUnitLists);
});
ava_1.default('SudokuCore.SquareUnits returns correct unit squares', t => {
    const core = new SudokuNineCore_1.SudokuNineCore();
    // const unitLists = SudokuCore.CreateUnits();
    const actualUntis = JSON.parse(JSON.stringify(core.SquareUnits));
    const expectedUnits = SudokuTestData_1.getExpectedData().units;
    t.deepEqual(actualUntis, expectedUnits);
});
ava_1.default('SudokuCore.Peers.C2 is as expected', t => {
    const core = new SudokuNineCore_1.SudokuNineCore();
    const expectedC2 = SudokuTestData_1.getExpectedData().peers.C2.sort();
    const actualC2 = core.SquarePeers.C2.sort();
    t.deepEqual(actualC2, expectedC2);
});
ava_1.default('SudokuCore.Peers is as expected', t => {
    const core = new SudokuNineCore_1.SudokuNineCore();
    const expectedPeersSorted = SudokuTestData_1.getExpectedData().peersSorted;
    const actualPeers = JSON.parse(JSON.stringify(core.SquarePeers));
    t.deepEqual(actualPeers, expectedPeersSorted);
});
ava_1.default('SudokuBoard.IsValidBoardArray throws on empty', t => {
    const core = new SudokuNineCore_1.SudokuNineCore();
    const undefinedBoardArray = undefined;
    t.throws(() => core.isValidBoardArray(undefinedBoardArray), "Undefined boardArray");
});
ava_1.default('SudokuBoard.IsValidBoardArray throws on short array', t => {
    const core = new SudokuNineCore_1.SudokuNineCore();
    const shortBoardArray = [1, 2, 3, 4];
    t.throws(() => core.isValidBoardArray(shortBoardArray), "boardArray length must be 81");
});
ava_1.default('SudokuBoard.IsValidBoardArray throws on long array', t => {
    const core = new SudokuNineCore_1.SudokuNineCore();
    const longBoardArray = [
        0, 0, 0, 4, 0, 8, 0, 2, 9,
        0, 0, 0, 0, 0, 0, 0, 0, 4,
        8, 5, 0, 0, 2, 0, 0, 0, 7,
        0, 0, 8, 3, 7, 4, 2, 0, 0,
        0, 2, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 3, 2, 6, 1, 7, 0, 0,
        0, 0, 0, 0, 9, 3, 6, 1, 2,
        2, 0, 0, 0, 0, 0, 4, 0, 3,
        1, 3, 0, 6, 4, 2, 0, 7, 0, 0
    ];
    t.throws(() => core.isValidBoardArray(longBoardArray), "boardArray length must be 81");
});
ava_1.default('SudokuBoard.IsValidBoardArray throws on number greater than 9', t => {
    const core = new SudokuNineCore_1.SudokuNineCore();
    const longBoardArray = [
        0, 0, 0, 4, 0, 8, 0, 2, 9,
        0, 0, 0, 0, 0, 0, 0, 0, 4,
        8, 5, 0, 0, 2, 0, 0, 0, 7,
        0, 0, 8, 3, 7, 4, 2, 0, 0,
        0, 2, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 3, 2, 6, 1, 7, 0, 0,
        0, 0, 0, 0, 9, 3, 6, 1, 2,
        2, 0, 0, 0, 0, 0, 4, 0, 3,
        1, 3, 0, 6, 4, 2, 0, 7, 10,
    ];
    t.throws(() => core.isValidBoardArray(longBoardArray), "Invalid digit [10] at pos 80 sould be 0-9");
});
ava_1.default('SudokuBoard.IsValidBoardArray throws on invalid char "."', t => {
    const core = new SudokuNineCore_1.SudokuNineCore();
    const longBoardArray = [
        0, 0, 0, 4, 0, 8, 0, 2, '.',
        0, 0, 0, 0, 0, 0, 0, 0, 4,
        8, 5, 0, 0, 2, 0, 0, 0, 7,
        0, 0, 8, 3, 7, 4, 2, 0, 0,
        0, 2, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 3, 2, 6, 1, 7, 0, 0,
        0, 0, 0, 0, 9, 3, 6, 1, 2,
        2, 0, 0, 0, 0, 0, 4, 0, 3,
        1, 3, 0, 6, 4, 2, 0, 7, 0,
    ];
    t.throws(() => core.isValidBoardArray(longBoardArray), 'Invalid char [.] at pos 8 should be a number');
});
// // const expected = [
// //     ["A1", "B1", "C1", "D1", "E1", "F1", "G1", "H1", "I1"],
// //     ["A2", "B2", "C2", "D2", "E2", "F2", "G2", "H2", "I2"],
// //     ["A3", "B3", "C3", "D3", "E3", "F3", "G3", "H3", "I3"],
// //     ["A4", "B4", "C4", "D4", "E4", "F4", "G4", "H4", "I4"],
// //     ["A5", "B5", "C5", "D5", "E5", "F5", "G5", "H5", "I5"],
// //     ["A6", "B6", "C6", "D6", "E6", "F6", "G6", "H6", "I6"],
// //     ["A7", "B7", "C7", "D7", "E7", "F7", "G7", "H7", "I7"],
// //     ["A8", "B8", "C8", "D8", "E8", "F8", "G8", "H8", "I8"],
// //     ["A9", "B9", "C9", "D9", "E9", "F9", "G9", "H9", "I9"]
// // ];
// // assert len(squares) == 81
// // assert len(unitlist) == 27
// // assert all(len(units[s]) == 3 for s in squares)
// // assert all(len(peers[s]) == 20 for s in squares)
// // test('Sudoku cross returns correct with mixed num+char', t => {
// //     t.is(SudokuCore.Squares.length, 81);
// //     // console.log(JSON.stringify(SudokuCore.UnitLists, undefined, 4));
// //     t.is(SudokuCore.UnitLists.length, 27);
// // });
//# sourceMappingURL=SudokuCore.spec.js.map