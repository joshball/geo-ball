import * as SudokuCore from './SudokuCore';
import test from 'ava';
import { flattenOneLevel, cross } from '../utils/array';
import { getExpectedData } from '../test/SudokuTestData';
import { SudokuFourCore } from './SudokuFourCore';
import { SudokuNineCore, SudokuNineCellValue } from './SudokuNineCore';
// import { dumpBothArrays } from '../test/TestUtils';


test('[internal] test to create boxes from Two arrays of strings', t => {
    const expectedBoxes = getExpectedData().boxes;
    const cols: Array<string> = ['ABC', 'DEF', 'GHI'];
    const rows: Array<string> = ['123', '456', '789'];
    const rowsOfCols = flattenOneLevel(cols.map(c => rows.map(r => cross(c, r))));
    t.deepEqual(rowsOfCols, expectedBoxes);
});


test('[internal] cross of all rows and columns is produces 81 squares [A1...I9]', t => {
    const core = new SudokuNineCore();
    const actualCross = cross(core.Rows, core.Cols);
    const expectedSquares = getExpectedData().squares;
    t.deepEqual(actualCross, expectedSquares);
});


test('SudokuCore.Squares is the 81 squares [A1...I9]', t => {
    const core = new SudokuNineCore();
    const expectedSquares = getExpectedData().squares;
    t.deepEqual(core.Squares, expectedSquares);
});

test('Sudoku CreateUnitLists returns list of all units', t => {
    const core = new SudokuNineCore();
    const expectedUnitLists = getExpectedData().unitLists;
    t.deepEqual(core.AllUnits, expectedUnitLists);
});



test('SudokuCore.SquareUnits returns correct unit squares', t => {
    const core = new SudokuNineCore();
    // const unitLists = SudokuCore.CreateUnits();
    const actualUntis = JSON.parse(JSON.stringify(core.SquareUnits))
    const expectedUnits = getExpectedData().units;
    t.deepEqual(actualUntis, expectedUnits);
});


test('SudokuCore.Peers.C2 is as expected', t => {
    const core = new SudokuNineCore();
    const expectedC2 = getExpectedData().peers.C2.sort();
    const actualC2 = core.SquarePeers.C2.sort();
    t.deepEqual(actualC2, expectedC2);
});

test('SudokuCore.Peers is as expected', t => {
    const core = new SudokuNineCore();
    const expectedPeersSorted = getExpectedData().peersSorted;
    const actualPeers = JSON.parse(JSON.stringify(core.SquarePeers))
    t.deepEqual(actualPeers, expectedPeersSorted);
});

test('SudokuBoard.IsValidBoardArray throws on empty', t => {
    const core = new SudokuNineCore();
    const undefinedBoardArray = undefined;
    t.throws(() => core.isValidBoardArray(undefinedBoardArray as unknown as Array<SudokuNineCellValue>), "Undefined boardArray");
});

test('SudokuBoard.IsValidBoardArray throws on short array', t => {
    const core = new SudokuNineCore();
    const shortBoardArray = [1, 2, 3, 4];
    t.throws(() => core.isValidBoardArray(shortBoardArray as unknown as Array<SudokuNineCellValue>), "boardArray length must be 81");
});

test('SudokuBoard.IsValidBoardArray throws on long array', t => {
    const core = new SudokuNineCore();
    const longBoardArray: Array<SudokuNineCellValue> = [
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

test('SudokuBoard.IsValidBoardArray throws on number greater than 9', t => {
    const core = new SudokuNineCore();
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
    t.throws(() => core.isValidBoardArray(longBoardArray as unknown as Array<SudokuNineCellValue>), "Invalid digit [10] at pos 80 sould be 0-9");
});

test('SudokuBoard.IsValidBoardArray throws on invalid char "."', t => {
    const core = new SudokuNineCore();
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
    t.throws(() => core.isValidBoardArray(longBoardArray as unknown as Array<SudokuNineCellValue>), 'Invalid char [.] at pos 8 should be a number');
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
