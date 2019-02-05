import { SudokuBoard } from './SudokuBoard';
import { SudokuSquareValues } from './SudokuSquareValues';
import test from 'ava';
import { getBoards, cleanLeadingSpaces } from '../test/SudokuTestData';



test('SudokuSquareValues prints 4x4 board with array correctly', t => {
    const BOARD = getBoards().fourByFour.board;

    const sb = SudokuBoard.CreateFromString(BOARD.beg.pretty);
    // t.log('sb.toPrettyString()');
    // t.log(sb.toPrettyString());


    const ssv = new SudokuSquareValues(sb.core);
    const ssvString = ssv.toString().trim();
    const expectedString = cleanLeadingSpaces(`
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

test('SudokuSquareValues prints 9x9 board with array correctly', t => {
    const BOARDS = getBoards().norvig;

    const sb = SudokuBoard.CreateFromString(BOARDS.easy.beg.pretty);

    const ssv = new SudokuSquareValues(sb.core);
    const ssvString = ssv.toString().trim();
    const expectedString = cleanLeadingSpaces(`
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

