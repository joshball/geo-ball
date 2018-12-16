import { SudokuBoard } from './SudokuBoard';
import test from 'ava';
import { getBoards } from '../test/SudokuTestData';
import { cross } from '../utils/array';
import { SlimeBoard } from './SlimeBoard';
const norvig = getBoards().norvig;


test.only('STUFF', t => {
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

    console.log('COLS/ROWS:', COLS, ROWS)
    const getBox = (boxNum: number): Array<string> => {
        console.log('getBox', boxNum)
        const rowStart = (Math.floor(boxNum / BOX_COLS) * BOX_COLS);
        const colStart = (boxNum * BOX_COLS) % SIZE;
        console.log(' r/c:', rowStart, colStart)
        const r = ROWS.slice(rowStart, rowStart + BOX_COLS);
        const c = COLS.slice(colStart, colStart + BOX_COLS);
        console.log(' r/c:', r, c)
        console.log(' cross(r,c):', cross(r, c))
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
    console.log('expectedUnits:\n', JSON.stringify(expectedUnits, undefined, 4));
    // console.log('listOfUnits:\n', JSON.stringify(listOfUnits, undefined, 4));
    t.deepEqual(listOfUnits, expectedUnits);
});

test.only('SlimeBoard', t => {
    const BOARDS = getBoards().fourByFour;

    const sb = SlimeBoard.CreateFromString(BOARDS.beg.pretty);
    t.log('sb.toPrettyString()');
    t.log(sb.toPrettyString());

    t.log('BOARDS.beg.pretty');
    t.log(BOARDS.beg.pretty);

    // t.deepEqual(sb, expected, 'message');
});

test('SudokuBoard.IsValidBoardArray throws on empty', t => {
    const undefinedBoardArray = undefined;
    t.throws(() => SudokuBoard.IsValidBoardArray(undefinedBoardArray as unknown as Array<number>), "Undefined boardArray");
});

test('SudokuBoard.IsValidBoardArray throws on short array', t => {
    const shortBoardArray = [1, 2, 3, 4];
    t.throws(() => SudokuBoard.IsValidBoardArray(shortBoardArray as unknown as Array<number>), "boardArray length must be 81");
});

test('SudokuBoard.IsValidBoardArray throws on long array', t => {
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
    t.throws(() => SudokuBoard.IsValidBoardArray(longBoardArray), "boardArray length must be 81");
});

test('SudokuBoard.IsValidBoardArray throws on number greater than 9', t => {
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
    t.throws(() => SudokuBoard.IsValidBoardArray(longBoardArray), "Invalid digit [10] at pos 80 sould be 0-9");
});

test('SudokuBoard.IsValidBoardArray throws on invalid char "."', t => {
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
    t.throws(() => SudokuBoard.IsValidBoardArray(longBoardArray as unknown as Array<number>), 'Invalid char [.] at pos 8 should be a number');
});


// test('SudokuBoard returns same board array as created with', t => {
//     const easyInitial = norvig.easyOne.beg;
//     const easySolution = norvig.easyOne.end;
//     const p = new SudokuBoard(SudokuBoard.StringToArray(easyInitial));
//     const a = p.toArray();
//     console.log(p.toString());
//     t.deepEqual(a, easySolution);
// });



test('SudokuBoard.StringToArray() parses board string with zero and returns correct array', t => {
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
    const sudokuBoardArray = SudokuBoard.StringToArray(boardString);
    // const sudokuBoardPrettyString = SudokuBoardParser.GetPrettyString(sudokuBoardArray);
    // console.log(sudokuBoardPrettyString);
    t.deepEqual(sudokuBoardArray, expectedBoardArray);
});

test('SudokuBoard.StringToArray() parses board string with period (.) and returns correct array', t => {
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
    const sudokuBoardArray = SudokuBoard.StringToArray(boardString);
    // const sudokuBoardPrettyString = SudokuBoardParser.GetPrettyString(sudokuBoardArray);
    // console.log(sudokuBoardPrettyString);
    t.deepEqual(sudokuBoardArray, expectedBoardArray);
});

test('SudokuBoard.StringToArray() throws error on unknown char', t => {
    const boardString = `00040802900000000485002000700837420002000000000326170000009361220000040313064207A`;
    const error = t.throws(() => SudokuBoard.StringToArray(boardString), Error);
    // console.log('error', error)
    t.is(error.message, 'Board String should be 81 characters (was 80)');
});

test('SudokuBoard.GetSimpleString() defaults to using period', t => {
    const boardString = `000408029000000004850020007008374200020000000003261700000093612200000403130642070`;
    const boardArray = SudokuBoard.StringToArray(boardString);
    const boardArrayString = SudokuBoard.ArrayToString(boardArray);
    const expectedBoardString = `...4.8.29........485..2...7..83742...2.........32617......936122.....4.313.642.7.`;
    t.deepEqual(boardArrayString, expectedBoardString);
});

test('SudokuBoard.GetSimpleString() can set empty to 0', t => {
    const boardString = `000408029000000004850020007008374200020000000003261700000093612200000403130642070`;
    const boardArray = SudokuBoard.StringToArray(boardString);
    const boardArrayString = SudokuBoard.ArrayToString(boardArray, '0');
    const expectedBoardString = `000408029000000004850020007008374200020000000003261700000093612200000403130642070`;
    t.deepEqual(boardArrayString, expectedBoardString);
});


test('SudokuBoard.GetPrettyString() prints correctly', t => {
    const boardString = `000408029000000004850020007008374200020000000003261700000093612200000403130642070`;
    const boardArray = SudokuBoard.StringToArray(boardString);
    const boardArrayString = SudokuBoard.ArrayToPrettyString(boardArray, '0');
    const expected = `0 0 0 | 4 0 8 | 0 2 9
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
    // console.log(boardArrayString)
    t.deepEqual(boardArrayString, expected);
    t.snapshot(boardArrayString);
});



test('SudokuBoard.ParseLiberal() parses E,0,. and random stuff correctly', t => {
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
    const boardArray = SudokuBoard.StringToArray(boardString);
    const boardArrayString = SudokuBoard.ArrayToString(boardArray, '0');
    // console.log(boardArrayString)
    const expectedBoardString = `000408029000000004850020007008374200020000000003261700000093612200000403130642070`;
    t.deepEqual(boardArrayString, expectedBoardString);
});
