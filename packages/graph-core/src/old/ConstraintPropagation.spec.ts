// import { eliminate, eliminateDigitFromPeer, eliminatePeersForAbsoluteValues } from './SquareValues';
import test from 'ava';
import { getBoards, ITestBoard, INorvigTestBoards } from '../test/SudokuTestData';
import { SudokuBoard } from './SudokuBoard';
import { assign } from './ConstraintPropagation';
import { SudokuCellValue, SudokuSquare } from './SudokuCore';
// import { SudokuSquare } from './SudokuCore';
import { SudokuSolver, SlimeSolver } from './SudokuSolver';
import { version } from 'punycode';
import { SlimeBoard } from './SlimeBoard';
const TEST_BOARDS = getBoards();
const norvig: INorvigTestBoards = TEST_BOARDS.norvig;
const aOneMissing = TEST_BOARDS.aOneMissing;


const dumpBoards = (lhs: Array<any>, rhs: Array<any>) => {
    console.log('--------------------------------------------------------------------------------');
    console.log('A:');
    console.log(SudokuBoard.ArrayToPrettyString(lhs));
    console.log('--------------------------------------------------------------------------------');
    console.log('B:');
    console.log(SudokuBoard.ArrayToPrettyString(rhs));
    console.log('--------------------------------------------------------------------------------');
    // console.log('expectedFinishedBoardArray:');
    // console.log(SudokuBoard.ArrayToPrettyString(expectedFinishedBoardArray));
    // console.log('--------------------------------------------------------------------------------');
    console.log('A:', SudokuBoard.ArrayToString(lhs));
    console.log('B:', SudokuBoard.ArrayToString(rhs));
    // console.log('expec:', SudokuBoard.ArrayToString(expectedFinishedBoardArray));
    // console.log('badSq:', badSquares);
    console.log('--------------------------------------------------------------------------------');
}

const dumpBoard = (board: Array<any>) => {
    console.log('--------------------------------------------------------------------------------');
    console.log(SudokuBoard.ArrayToPrettyString(board));
    console.log('--------------------------------------------------------------------------------');
    console.log(SudokuBoard.ArrayToString(board));
    console.log('--------------------------------------------------------------------------------');
}


// test.only('Dump board arrays tests', t => {
//     const begBoardStr = `..392165796.34582125.876493548132976729564138136798245372689514814253769695417382`;
//     const expBoardArr = `003921657960345821250876493548132976729564138136798245372689514814253769695417382`;
//     const endBoardStr = `483921657967345821251876493548132976729564138136798245372689514814253769695417382`;
//     const begBoardArray = SudokuBoard.StringToArray(begBoardStr);
//     t.deepEqual(begBoardArray.join(''), expBoardArr);

//     console.log();
//     const expectedFinishedBoardArray = SudokuBoard.StringToArray(endBoardStr);
//     // const bsv = new BoardSquaresValues(boardArray);
//     const bsv = new BoardSquaresValues();

//     solve(bsv, begBoardArray);

//     dumpStuff(begBoardArray, expBoardArr)

//     console.log('--------------------------------------------------------------------------------');
//     console.log('boardArray:');
//     console.log(SudokuBoard.ArrayToPrettyString(begBoardArray));
//     console.log('--------------------------------------------------------------------------------');
//     console.log('finalBoard:');
//     console.log(SudokuBoard.ArrayToPrettyString(finalBoard));
//     console.log('--------------------------------------------------------------------------------');
//     console.log('expectedFinishedBoardArray:');
//     console.log(SudokuBoard.ArrayToPrettyString(expectedFinishedBoardArray));
//     console.log('--------------------------------------------------------------------------------');
//     console.log('start:', SudokuBoard.ArrayToString(begBoardArray));
//     console.log('actua:', SudokuBoard.ArrayToString(finalBoard));
//     console.log('expec:', SudokuBoard.ArrayToString(expectedFinishedBoardArray));
//     console.log('badSq:', badSquares);
//     console.log('--------------------------------------------------------------------------------');
//     t.deepEqual(finalBoard, expectedFinishedBoardArray);
// });

const dumpValues = (solver: SudokuSolver) => {
    console.log('--------------------------------------------------------------------------------');
    console.log('Dumping Solver Values:')
    console.log('--------------------------------------------------------------------------------');
    const bsv = solver.getSquareValues();
    console.log('Raw Square Values');
    console.log(bsv);
    const aa = bsv.map(v => v.vals);
    console.log('--------------------------------------------------------------------------------');
    console.log('Array of Array of Square Values');
    console.log(aa);

    const ps = SudokuBoard.ArrayOfValuesToPrettyString(aa);
    console.log('--------------------------------------------------------------------------------');
    console.log('Pretty Square Values:');
    console.log(ps);
    console.log('--------------------------------------------------------------------------------');
}

test('SudokuSolver.propConstraints() solves the easy norvig board', t => {
    const sb = SudokuBoard.CreateFromString(norvig.easy.beg.pretty);
    const expected = SudokuBoard.StringToArray(norvig.easy.end.pretty);
    const solver = new SudokuSolver(true);
    solver.propConstraints(sb._boardArray);
    const actualFinishedBoard = solver.getBoardArray();
    t.deepEqual(actualFinishedBoard, expected);
});

test('SudokuSolver.propConstraints() does NOT solve the hard norvig board', t => {
    const sb = SudokuBoard.CreateFromString(norvig.hard.beg.pretty);
    const expectedBoardStr = '4.....8.5.3..........7......2.....6.....8.4...4..1.......6.3.7.5.32.1...1.4......';
    // const expected = SudokuBoard.StringToArray(norvig.hard.end.pretty);
    const expected = SudokuBoard.StringToArray(expectedBoardStr);
    const solver = new SudokuSolver();
    solver.propConstraints(sb._boardArray);
    const actualFinishedBoard = solver.getBoardArray();
    // dumpBoard(actualFinishedBoard);
    // dumpBoards(actualFinishedBoard, expected);
    t.deepEqual(actualFinishedBoard, expected);
});

test('SudokuSolver.propConstraints() check assigns', t => {
    const sb = SudokuBoard.CreateFromString(aOneMissing.beg.pretty);
    dumpBoard(sb._boardArray);

    // const expected = SudokuBoard.StringToArray(norvig.hard.end.pretty);
    // const expected = SudokuBoard.StringToArray(expectedBoardStr);
    const solver = new SudokuSolver();
    // solver.propConstraints(sb._boardArray);
    // const actualFinishedBoard = solver.getBoardArray();
    // // dumpBoard(actualFinishedBoard);
    // // dumpBoards(actualFinishedBoard, expected);
    t.deepEqual(true, true);
});

test.only('SlimeBoard', t => {
    const BOARDS = getBoards().fourByFour;

    const sb = SlimeBoard.CreateFromString(BOARDS.beg.pretty);
    t.log('sb.toPrettyString()');
    t.log(sb.toPrettyString());

    const expected = SlimeBoard.StringToArray(BOARDS.end.pretty);
    const solver = new SlimeSolver(sb, true);
    solver.propConstraints();
    const actualFinishedBoard = solver.getBoardArray();
    t.log('sb.toPrettyString().FIN');
    t.log(sb.toPrettyString());

    t.log('actualFB:', actualFinishedBoard.join(''));
    t.log('expected:', expected.join(''));
    t.log('sb.board:', sb._boardArray.join(''));
    // dumpBoard(actualFinishedBoard);
    // dumpBoard(expected);
    // dumpBoards(actualFinishedBoard, expected);
    t.deepEqual(actualFinishedBoard, expected);

    // t.deepEqual(sb, expected, 'message');
});

// test('SquareValues returns same board array as created with', t => {
//     const board = `4.....8.5.3..........7......2.....6.....8.4......1.......6.3.7.5..2.....1.4......`;
//     // const eliminated = `
//     //    48   48  3   |  9   2   1  |  6  5  7
//     //     9   6   71  |  3   4   5  |  8  2  1
//     //     2   5   71  |  8   7   6  |  4  9  3
//     //     ------------+-------------+---------
//     //     5   4   8   |  1   3   2  |  9  7  6
//     //     7   2   9   |  5   6   4  |  1  3  8
//     //     1   3   6   |  7   9   8  |  2  4  5
//     //     ------------+-------------+---------
//     //     3   7   2   |  6   8   9  |  5  1  4
//     //     8   1   4   |  2   5   3  |  7  6  9
//     //     6   9   5   |  4   1   7  |  3  8  2`;

//     const finishedBoard = `
//         4 8 3 |9 2 1 |6 5 7
//         9 6 7 |3 4 5 |8 2 1
//         2 5 1 |8 7 6 |4 9 3
//         ------+------+------
//         5 4 8 |1 3 2 |9 7 6
//         7 2 9 |5 6 4 |1 3 8
//         1 3 6 |7 9 8 |2 4 5
//         ------+------+------
//         3 7 2 |6 8 9 |5 1 4
//         8 1 4 |2 5 3 |7 6 9
//         6 9 5 |4 1 7 |3 8 2`;

//     const boardArray = SudokuBoard.StringToArray(board);
//     const expectedFinishedBoardArray = SudokuBoard.StringToArray(finishedBoard);
//     // const bsv = new BoardSquaresValues(boardArray);
//     const bsv = new BoardSquaresValues();

//     solve(bsv, boardArray);
//     assign(bsv, 'H7', 9, 1);
//     // assign(bsv, 'H7', 6, 1);

//     // Object.keys(bsv).forEach((square) => {
//     //     const sv = bsv[square];
//     //     if (sv.initialValue > 0) {
//     //         assign(bsv, sv.square, sv.initialValue);
//     //     }
//     // })

//     const badSquares: SquareValues[] = [];
//     const finalBoard = Object.keys(bsv).map((square) => {
//         const sv = bsv[square];
//         if (sv.possibleValues.length !== 1) {
//             badSquares.push(sv);
//             return 0;
//         }
//         return sv.possibleValues[0];
//     })

//     // 4x10^38
//     // 2x10^77
//     // 10Ghz => 10,000,000,000 instructions/sec
//     // 1024 cores => 10,000,000,000,000
//     // 1 million => 10,000,000,000,000,000,000
//     // 10,000,000,000,000,000,000 => 10^18 instr/sec
//     // 4x10^20 seconds
//     // year => 60*60*24*365 => 31536000 sec/year
//     // millenia => 31536000000 => 3*10^9 sec/millenia
//     // 10^11 millenia ;-) 1,000,000,000,000 => 1 trillion years
//     // 10^9 years ;-)    13,000,000,000 => start of universe
//     // 13/1000

//     console.log('--------------------------------------------------------------------------------');
//     console.log('boardArray:');
//     console.log(SudokuBoard.ArrayToPrettyString(boardArray));
//     console.log('--------------------------------------------------------------------------------');
//     console.log('finalBoard:');
//     console.log(SudokuBoard.ArrayToPrettyString(finalBoard));
//     console.log('--------------------------------------------------------------------------------');
//     console.log('expectedFinishedBoardArray:');
//     console.log(SudokuBoard.ArrayToPrettyString(expectedFinishedBoardArray));
//     console.log('--------------------------------------------------------------------------------');
//     console.log('start:', SudokuBoard.ArrayToString(boardArray));
//     console.log('actua:', SudokuBoard.ArrayToString(finalBoard));
//     console.log('expec:', SudokuBoard.ArrayToString(expectedFinishedBoardArray));
//     console.log('badSq:', badSquares);
//     console.log('--------------------------------------------------------------------------------');
//     // const a = bsv.toArray();
//     // console.log(p.toString());
//     t.deepEqual(finalBoard[0], expectedFinishedBoardArray[0]);
// });


// // test('SquareValues returns same board array as created with', t => {
// //     const board = `
// //         0 0 3 |9 2 1 |6 5 7
// //         9 6 0 |3 4 5 |8 2 1
// //         2 5 0 |8 7 6 |4 9 3
// //         ------+------+------
// //         5 4 8 |1 3 2 |9 7 6
// //         7 2 9 |5 6 4 |1 3 8
// //         1 3 6 |7 9 8 |2 4 5
// //         ------+------+------
// //         3 7 2 |6 8 9 |5 1 4
// //         8 1 4 |2 5 3 |7 6 9
// //         6 9 5 |4 1 7 |3 8 2`;

// //     const eliminated = `
// //        48   48  3   |  9   2   1  |  6  5  7
// //         9   6   71  |  3   4   5  |  8  2  1
// //         2   5   71  |  8   7   6  |  4  9  3
// //         ------------+-------------+---------
// //         5   4   8   |  1   3   2  |  9  7  6
// //         7   2   9   |  5   6   4  |  1  3  8
// //         1   3   6   |  7   9   8  |  2  4  5
// //         ------------+-------------+---------
// //         3   7   2   |  6   8   9  |  5  1  4
// //         8   1   4   |  2   5   3  |  7  6  9
// //         6   9   5   |  4   1   7  |  3  8  2`;

// //     const finishedBoard = `
// //         4 8 3 |9 2 1 |6 5 7
// //         9 6 7 |3 4 5 |8 2 1
// //         2 5 1 |8 7 6 |4 9 3
// //         ------+------+------
// //         5 4 8 |1 3 2 |9 7 6
// //         7 2 9 |5 6 4 |1 3 8
// //         1 3 6 |7 9 8 |2 4 5
// //         ------+------+------
// //         3 7 2 |6 8 9 |5 1 4
// //         8 1 4 |2 5 3 |7 6 9
// //         6 9 5 |4 1 7 |3 8 2`;

// //     const easyInitial = norvig.easyOne.beg;
// //     const easySolution = norvig.easyOne.end;
// //     const boardArray = SudokuBoard.ParseLiberal(board);
// //     const sv = new SquareValues(boardArray);
// //     sv.
// //     const a = p.toArray();
// //     console.log(p.toString());
// //     t.deepEqual(a, easySolution);
// // });


