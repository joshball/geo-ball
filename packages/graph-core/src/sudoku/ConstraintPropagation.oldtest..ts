// // import { eliminate, eliminateDigitFromPeer, eliminatePeersForAbsoluteValues } from './SquareValues';
// import test from 'ava';
// import { getBoards } from '../test/SudokuTestData';
// import { SudokuBoard } from './SudokuBoard';
// import { BoardSquaresValues, SquareValues, solve, assign } from './ConstraintPropagation';
// // import { SudokuSquare } from './SudokuCore';
// const norvig = getBoards().norvig;


// // test('ConstraintPropagation given a squares and its peers', t => {


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
// //         0 1 4 |2 5 3 |7 6 9
// //         6 9 5 |4 1 7 |3 8 2`;

// //     // const eliminated = `
// //     //    48   48  3   |  9   2   1  |  6  5  7
// //     //     9   6   71  |  3   4   5  |  8  2  1
// //     //     2   5   71  |  8   7   6  |  4  9  3
// //     //     ------------+-------------+---------
// //     //     5   4   8   |  1   3   2  |  9  7  6
// //     //     7   2   9   |  5   6   4  |  1  3  8
// //     //     1   3   6   |  7   9   8  |  2  4  5
// //     //     ------------+-------------+---------
// //     //     3   7   2   |  6   8   9  |  5  1  4
// //     //     0   1   4   |  2   5   3  |  7  6  9
// //     //     6   9   5   |  4   1   7  |  3  8  2`;


// //     const boardArray = SudokuBoard.ParseLiberal(board);
// //     // const bsv = new BoardSquaresValues(boardArray);
// //     const bsv = new BoardSquaresValues();
// //     // console.log('bsv:\n', JSON.stringify(bsv, undefined, 4));
// //     const a1pv = bsv.A1.possibleValues;
// //     console.log('a1pv:\n', JSON.stringify(a1pv, undefined, 4));

// //     t.deepEqual(a1pv, [1, 2, 3, 4, 5, 6, 7, 8, 9]);
// //     eliminate(bsv, 'A1');

// //     const newPv = bsv.A1.possibleValues;
// //     console.log('newPv:\n', JSON.stringify(newPv, undefined, 4));
// //     t.deepEqual(newPv, [4, 8]);



// // });



// test.only('Dump board arrays tests', t => {
//     const begBoardStr = `..392165796.34582125.876493548132976729564138136798245372689514814253769695417382`;
//     const expBoardArr = `003921657960345821250876493548132976729564138136798245372689514814253769695417382`;
//     const endBoardStr = `483921657967345821251876493548132976729564138136798245372689514814253769695417382`;
//     const begBoardArray = SudokuBoard.StringToArray(begBoardStr);
//     t.deepEqual(begBoardArray.join(''), expBoardArr);

//     console.log();
//     process.exit()
//     const expectedFinishedBoardArray = SudokuBoard.StringToArray(endBoardStr);
//     // const bsv = new BoardSquaresValues(boardArray);
//     const bsv = new BoardSquaresValues();

//     solve(bsv, begBoardArray);



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

// test('SquareValues returns same board array as created with', t => {
//     const board = `
//         0 0 3 |9 2 1 |6 5 7
//         9 6 0 |3 4 5 |8 2 1
//         2 5 0 |8 7 6 |4 9 3
//         ------+------+------
//         5 4 8 |1 3 2 |9 7 6
//         7 2 9 |5 6 4 |1 3 8
//         1 3 6 |7 9 8 |2 4 5
//         ------+------+------
//         3 7 2 |6 8 9 |5 1 4
//         8 1 4 |2 5 3 |7 6 9
//         6 9 5 |4 1 7 |3 8 2`;

//     const eliminated = `
//        48   48  3   |  9   2   1  |  6  5  7
//         9   6   71  |  3   4   5  |  8  2  1
//         2   5   71  |  8   7   6  |  4  9  3
//         ------------+-------------+---------
//         5   4   8   |  1   3   2  |  9  7  6
//         7   2   9   |  5   6   4  |  1  3  8
//         1   3   6   |  7   9   8  |  2  4  5
//         ------------+-------------+---------
//         3   7   2   |  6   8   9  |  5  1  4
//         8   1   4   |  2   5   3  |  7  6  9
//         6   9   5   |  4   1   7  |  3  8  2`;

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

//     // console.log('--------------------------------------------------------------------------------');
//     // console.log('boardArray:');
//     // console.log(SudokuBoard.GetPrettyString(boardArray));
//     // console.log('--------------------------------------------------------------------------------');
//     // console.log('finalBoard:');
//     // console.log(SudokuBoard.GetPrettyString(finalBoard));
//     // console.log('--------------------------------------------------------------------------------');
//     // console.log('expectedFinishedBoardArray:');
//     // console.log(SudokuBoard.GetPrettyString(expectedFinishedBoardArray));
//     // console.log('--------------------------------------------------------------------------------');
//     // console.log('start:', SudokuBoard.GetSimpleString(boardArray));
//     // console.log('actua:', SudokuBoard.GetSimpleString(finalBoard));
//     // console.log('expec:', SudokuBoard.GetSimpleString(expectedFinishedBoardArray));
//     // console.log('badSq:', badSquares);
//     // console.log('--------------------------------------------------------------------------------');
//     // const a = bsv.toArray();
//     // console.log(p.toString());
//     t.deepEqual(finalBoard, expectedFinishedBoardArray);
// });

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


