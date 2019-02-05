import { SudokuBoard } from './SudokuBoard';
import test from 'ava';
import { getBoards } from '../test/SudokuTestData';
import { cross } from '../utils/array';
const norvig = getBoards().norvig;


test('internal test for getting sudoku squares dynamically', t => {
    const DIGITS: Array<number> = [];
    const COLS: Array<number> = [];
    const ROWS: Array<string> = [];
    const SIZE = 9;
    const BOX_COLS = Math.sqrt(SIZE);
    const A = 'A'.charCodeAt(0);
    for (let i = 0; i < SIZE; i++) {
        DIGITS.push(i + 1);
        COLS.push(i + 1);
        ROWS.push(String.fromCharCode((A + i)));
    }

    const getBox = (boxNum: number): Array<string> => {
        const rowStart = (Math.floor(boxNum / BOX_COLS) * BOX_COLS);
        const colStart = (boxNum * BOX_COLS) % SIZE;
        const r = ROWS.slice(rowStart, rowStart + BOX_COLS);
        const c = COLS.slice(colStart, colStart + BOX_COLS);
        return cross(r,c);
    }

    const listOfUnits: Array<Array<string>> = [];

    for (let i = 0; i < SIZE; i++) {
        listOfUnits.push(getBox(i))
    }
    const expectedUnits = [
        ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3"],
        ["A4", "A5", "A6", "B4", "B5", "B6", "C4", "C5", "C6"],
        ["A7", "A8", "A9", "B7", "B8", "B9", "C7", "C8", "C9"],
        ["D1", "D2", "D3", "E1", "E2", "E3", "F1", "F2", "F3"],
        ["D4", "D5", "D6", "E4", "E5", "E6", "F4", "F5", "F6"],
        ["D7", "D8", "D9", "E7", "E8", "E9", "F7", "F8", "F9"],
        ["G1", "G2", "G3", "H1", "H2", "H3", "I1", "I2", "I3"],
        ["G4", "G5", "G6", "H4", "H5", "H6", "I4", "I5", "I6"],
        ["G7", "G8", "G9", "H7", "H8", "H9", "I7", "I8", "I9"]
    ];
    // const expectedUnits = [
    //     ["A1", "A2", "B1", "B2"],
    //     ["A3", "A4", "B3", "B4"],
    //     ["C1", "C2", "D1", "D2"],
    //     ["C3", "C4", "D3", "D4"],
    // ];
    // console.log('expectedUnits:\n', JSON.stringify(expectedUnits, undefined, 4));
    // console.log('listOfUnits:\n', JSON.stringify(listOfUnits, undefined, 4));
    t.deepEqual(listOfUnits, expectedUnits);
});

// test.only('SudokuBoard', t => {
//     const BOARDS = getBoards().fourByFour;

//     const sb = SudokuBoard.CreateFromString(BOARDS.beg.pretty);
//     t.log('sb.toPrettyString()');
//     t.log(sb.toPrettyString());

//     t.log('BOARDS.beg.pretty');
//     t.log(BOARDS.beg.pretty);

//     // t.deepEqual(sb, expected, 'message');
// });



// test('SudokuBoard returns same board array as created with', t => {
//     const easyInitial = norvig.easyOne.beg;
//     const easySolution = norvig.easyOne.end;
//     const p = new SudokuBoard(SudokuBoard.StringToArray(easyInitial));
//     const a = p.toArray();
//     console.log(p.toString());
//     t.deepEqual(a, easySolution);
// });

