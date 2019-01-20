import test from 'ava';
import { getBoards } from '../test/SudokuTestData';
import { SudokuBoard } from './SudokuBoard';
import { SudokuSolver } from './SudokuSolver';
import { SudokuBoardStrings } from './SudokuBoardStrings';
import { INorvigTestBoards } from '../test/SudokuTestData.norvig';


const TH_createUnSolvedSolver = (debug: boolean = false) => {
    const BOARD = getBoards().fourByFour.board;
    const sb = SudokuBoard.CreateFromString(BOARD.beg.pretty);

    const solver = new SudokuSolver(sb.core, debug);
    return { solver, sb };
}
const TH_createSolvedSolver = (debug: boolean = false) => {
    const BOARD = getBoards().fourByFour.board;
    const sb = SudokuBoard.CreateFromString(BOARD.end.pretty);

    const solver = new SudokuSolver(sb.core, debug);
    solver.propConstraints(sb)
    // Board is now solved:
    // 1 2 | 3 4
    // 3 4 | 1 2
    // ----+----
    // 2 1 | 4 3
    // 4 3 | 2 1
    return { solver, sb };
}

const TH_createSolverWithUnsolvedSquares = (squares: Array<any>, t: any) => {
    const { solver, sb } = TH_createSolvedSolver();
    squares.forEach(square => {
        t.deepEqual(solver._ssv.get(square)!.length, 1);
        solver._ssv.set(square, solver._core.Digits);
    });
    return { solver, sb };
}


test('Sudoku Solver 4x4 board should show UNSOLVED array and FULL values array', t => {
    const BOARD = getBoards().fourByFour.board;
    const EMPTY = getBoards().fourByFour.empty;
    const sb = SudokuBoard.CreateFromString(BOARD.end.pretty);

    const solver = new SudokuSolver(sb.core);

    t.deepEqual(SudokuBoardStrings.ArrayToPrettyString(solver.getBoardArray()), EMPTY.empty.pretty);
    t.deepEqual(SudokuBoardStrings.ArrayOfValuesToPrettyString(solver.getBoardValuesArray()), EMPTY.emptyValues);
});


test('Sudoku Solver 4x4 board should show SOLVED array and SINGLE values array', t => {
    const BOARD = getBoards().fourByFour.board;
    const sb = SudokuBoard.CreateFromString(BOARD.end.pretty);

    const solver = new SudokuSolver(sb.core);
    solver.propConstraints(sb);

    t.deepEqual(SudokuBoardStrings.ArrayToPrettyString(solver.getBoardArray()), BOARD.end.pretty);
    t.deepEqual(SudokuBoardStrings.ArrayOfValuesToPrettyString(solver.getBoardValuesArray()), BOARD.end.pretty);
});


test('SudokuSolver.propConstraints() solves the easy norvig board', t => {
    const norvig: INorvigTestBoards = getBoards().norvig;
    const sb = SudokuBoard.CreateFromString(norvig.easy.beg.pretty);
    const expected = SudokuBoardStrings.StringToArray(norvig.easy.end.pretty);
    const solver = new SudokuSolver(sb.core);
    solver.propConstraints(sb);
    const actualFinishedBoard = solver.getBoardArray();
    t.deepEqual(actualFinishedBoard, expected);
});

test('SudokuSolver.propConstraints() does NOT solve the hard norvig board', t => {
    const norvig: INorvigTestBoards = getBoards().norvig;
    const sb = SudokuBoard.CreateFromString(norvig.hard.beg.pretty);
    const expectedBoardStr = '4.....8.5.3..........7......2.....6.....8.4...4..1.......6.3.7.5.32.1...1.4......';
    // const expected = SudokuBoardStrings.StringToArray(norvig.hard.end.pretty);
    const expected = SudokuBoardStrings.StringToArray(expectedBoardStr);
    const solver = new SudokuSolver(sb.core);
    solver.propConstraints(sb);
    const actualFinishedBoard = solver.getBoardArray();
    // dumpBoard(actualFinishedBoard);
    // dumpBoards(actualFinishedBoard, expected);
    t.deepEqual(actualFinishedBoard, expected);
});


test('Sudoku Solver 4x4 getSquaresWithDigitInThem returns all cells', t => {
    const BOARD = getBoards().fourByFour.board;
    const sb = SudokuBoard.CreateFromString(BOARD.end.pretty);
    const solver = new SudokuSolver(sb.core);
    const aOneUnitSquares = sb.core.SquareUnits.A1;
    t.deepEqual(aOneUnitSquares[0], ['A1', 'B1', 'C1', 'D1']);
    t.deepEqual(aOneUnitSquares[1], ['A1', 'A2', 'A3', 'A4']);
    t.deepEqual(aOneUnitSquares[2], ['A1', 'A2', 'B1', 'B2']);
    t.deepEqual(solver._ssv.get('A1'), [1, 2, 3, 4]);
    t.deepEqual(solver._ssv.get('B1'), [1, 2, 3, 4]);

    solver._getSquaresWithDigitInThem(aOneUnitSquares[0], 1);
    t.deepEqual(solver._getSquaresWithDigitInThem(aOneUnitSquares[0], 1), ['A1', 'B1', 'C1', 'D1']);
});



test('SudokuSolve._assignDigitToUnitSquareIfOnlySquareInUnitWithDigitInIt() does nothing with multiple values', t => {
    const level = 0;
    const BOARD = getBoards().fourByFour.board;
    const EMPTY = getBoards().fourByFour.empty;
    const sb = SudokuBoard.CreateFromString(BOARD.end.pretty);

    const solver = new SudokuSolver(sb.core);

    const aOneUnitSquares = sb.core.SquareUnits.A1;

    solver._assignDigitToUnitSquareIfOnlySquareInUnitWithDigitInIt('A1', aOneUnitSquares[0], 2, level);

    const actualValuesString = SudokuBoardStrings.ArrayOfValuesToPrettyString(solver.getBoardValuesArray());
    // t.log(actualValuesString);
    t.deepEqual(actualValuesString, EMPTY.emptyValues);
});


/**
 * This test is a bit tricky. Our test is for the method:
 * assignDigitToUnitSquaresWithDigitAsOnlyValue()
 * Which when the state of the SquareValues is setup correctly, it will eliminate superflous values from a square.
 * First, we need to create the correct state, which is essentially a solved board (all SquareValues are
 * singular and correct) and then change one square (A2) to have all possible values (we have a puzzle now with
 * only one square that needs solving).
 *
 */
test('SudokuSolve._assignDigitToUnitSquareIfOnlySquareInUnitWithDigitInIt() removes single values', t => {
    // Arrange

    const SQUARE_B2 = 'B2';
    const SQUARE_B2_INDEX = 5;
    const DIGIT_TO_REMOVE = 4;

    const IGNORE_SQUARE = 'A1';
    const IGNORE_LEVEL = 0;
    const BOARD = getBoards().fourByFour.board;


    // Create a board that is solved except for A2
    const { solver, sb } = TH_createSolverWithUnsolvedSquares([SQUARE_B2], t);

    // Find a unit that includes SQUARE_B2 (We happen to know that A1[2] includes it in the box)
    const aOneFirstUnitSquares = sb.core.SquareUnits.A1[2];
    // t.true(aOneFirstUnitSquares.includes(SQUARE_B2));

    // ACT
    // calling the method with the array of squares and digit of DIGIT_TO_REMOVE
    solver._assignDigitToUnitSquareIfOnlySquareInUnitWithDigitInIt(IGNORE_SQUARE, aOneFirstUnitSquares, DIGIT_TO_REMOVE, IGNORE_LEVEL);

    // ASSERT

    const bvFinal = solver.getBoardValuesArray();

    // check to make sure that SQUARE_A2 has only a single value (2) in its array
    t.deepEqual(bvFinal[SQUARE_B2_INDEX], [DIGIT_TO_REMOVE]);


    // check to make sure the resulting board string is correct
    const actualValuesString = SudokuBoardStrings.ArrayOfValuesToPrettyString(bvFinal);
    t.deepEqual(actualValuesString, BOARD.end.pretty);
});


test('SudokuSolve._findAndRemoveDigitFromSquareValues() removes single value from square values', t => {
    // Arrange
    const EMPTY = getBoards().fourByFour.empty;

    const SQUARE = 'B2';
    const SQUARE_INDEX = 5;
    const DIGIT_TO_REMOVE = 4;

    const IGNORE_LEVEL = 0;
    const BOARD = getBoards().fourByFour.board;


    // Create a board that is solved except for A2
    const { solver, sb } = TH_createUnSolvedSolver();


    // ACT
    // calling the method with the array of squares and digit of DIGIT_TO_REMOVE
    solver._findAndRemoveDigitFromSquareValues(SQUARE, DIGIT_TO_REMOVE, IGNORE_LEVEL);

    // ASSERT

    const bvFinal = solver.getBoardValuesArray();

    // check to make sure that SQUARE_A2 has only a single value (2) in its array
    t.deepEqual(bvFinal[SQUARE_INDEX], [1, 2, 3]);


    // check to make sure the resulting board string is correct
    bvFinal[SQUARE_INDEX].push(DIGIT_TO_REMOVE);
    const actualValuesString = SudokuBoardStrings.ArrayOfValuesToPrettyString(bvFinal);
    t.deepEqual(actualValuesString, EMPTY.emptyValues);
});



test.only('Sudoku Solver 4x4 ensure solved board meets constraints', t => {
    // 1 2 | 3 4
    // 3 4 | 1 2
    // ----+----
    // 2 1 | 4 3
    // 4 3 | 2 1

    // Lets assume square values as so:
    // 1234 1234 | 1234 1234
    // 1234 1234 | 1234 1234
    // ----------+----------
    // 1234 1234 | 1234 1234
    // 1234 1234 | 1234 1234
    // const SUS = [
    //     ["A1", "B1", "C1", "D1"],
    //     ["A1", "A2", "A3", "A4"],
    //     ["A1", "A2", "B1", "B2"]
    // ];



    const BOARD = getBoards().norvig.hard;
    const sb = SudokuBoard.CreateFromString(BOARD.beg.pretty);

    t.log('sb.toPrettyString()');
    t.log(sb.toPrettyString());

    const solver = new SudokuSolver(sb.core);
    t.log(SudokuBoardStrings.ArrayToPrettyString(solver.getBoardArray()));
    t.log(SudokuBoardStrings.ArrayOfValuesToPrettyString(solver.getBoardValuesArray()));
    solver.propConstraints(sb);
    const solvedBoardArray = solver.getBoardArray();
    const solvedBoardValuesArray = solver.getBoardValuesArray();
    t.log(SudokuBoardStrings.ArrayToPrettyString(solvedBoardArray));
    t.log(SudokuBoardStrings.ArrayOfValuesToPrettyString(solvedBoardValuesArray));
    // solver.assign('H7', 9);
    // t.log(SudokuBoardStrings.ArrayToPrettyString(solver.getBoardArray()));
    // t.log(SudokuBoardStrings.ArrayOfValuesToPrettyString(solver.getBoardValuesArray()));
    // solver.assign('H8', 9);
    // const actualFinishedBoard = solver.getBoardArray();
    // t.log('sb.toPrettyString().FIN');
    // t.log(sb.toPrettyString());

    // t.log('actualFB:', actualFinishedBoard.join(''));
    // t.log('expected:', expected.join(''));
    // t.log('sb.board:', sb.toArray().join(''));
    // dumpBoard(actualFinishedBoard);
    // dumpBoard(expected);
    // dumpBoards(actualFinishedBoard, expected);
    // t.deepEqual(actualFinishedBoard, expected);

    // const sudoku = [
    //     [1, 0, 3, 0, 0, 0, 0, 8, 4],
    //     [0, 0, 6, 0, 4, 8, 0, 0, 0],
    //     [0, 4, 0, 0, 0, 0, 0, 0, 0],
    //     [2, 0, 0, 0, 9, 6, 1, 0, 0],
    //     [0, 9, 0, 8, 0, 1, 0, 4, 0],
    //     [0, 0, 4, 3, 2, 0, 0, 0, 8],
    //     [0, 0, 0, 0, 0, 0, 0, 7, 0],
    //     [0, 0, 0, 1, 5, 0, 4, 0, 0],
    //     [0, 6, 0, 0, 0, 0, 2, 0, 3]
    // ];
    // const flatten = (b: Array<any>): Array<any> => b.reduce((p, c) => p.concat(Array.isArray(c) ? flatten(c) : c), []);

    // const dump = (b: Array<any>) => console.log(flatten(b).join(''));
    // // 'board' is a 2D array (a sudoku board) and 'c' is the cell [0,81) at which we start solving
    // const solve = (board: Array<any>, c: number = 0): any => {
    //     console.log('solve', c);
    //     let x = 0;
    //     let y = 0;
    //     // tslint:disable-next-line:no-bitwise
    //     const val = (c === 81) ? board : ((board[x = c / 9 | 0][y = c % 9] !== 0)
    //         ? solve(board, c + 1)
    //         : undefined); // Base case, where we're at a filled cell or all 81 cells filled

    //     if (val) { return val; }
    //     const box = (j: number) => {
    //         return board[x - (x % 3) + (j - (j % 3)) / 3][y - (y % 3) + (j % 3)];      // jth cell in sub 3x3 box containing x,y
    //     };
    //     const good = (g: number) => {
    //         return [0, 1, 2, 3, 4, 5, 6, 7, 8].every(i => {
    //             return g !== board[x][i] && g !== board[i][y] && g !== box(i); // returns true if and only if board[x][y] when set to g breaks sudoku rules due to collision
    //         });
    //     };
    //     const guesses = [1, 2, 3, 4, 5, 6, 7, 8, 9].filter(good); // choose non-conflicting guesses for position (x, y)

    //     const prod_sol = (prodGuess: number): any => {  // returns true if and only if a guess actually produces a solution at (x, y)
    //         console.log('prod_sol', x, y, prodGuess);
    //         board[x][y] = prodGuess;
    //         return solve(board, c + 1);
    //     };

    //     // tslint:disable-next-line:no-conditional-assignment
    //     if ((guesses.some(prod_sol)) || (board[x][y] = 0)) {
    //         dump(board);
    //         return board;
    //     }; // return the solved board if a solution can be produced!
    // };

    // console.log(solve(sudoku));
});



