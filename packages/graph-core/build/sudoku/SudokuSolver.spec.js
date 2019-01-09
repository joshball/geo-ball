"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const SudokuTestData_1 = require("../test/SudokuTestData");
const SudokuBoard_1 = require("./SudokuBoard");
const SudokuSolver_1 = require("./SudokuSolver");
const SudokuBoardStrings_1 = require("./SudokuBoardStrings");
const TH_createUnSolvedSolver = (debug = false) => {
    const BOARD = SudokuTestData_1.getBoards().fourByFour.board;
    const sb = SudokuBoard_1.SudokuBoard.CreateFromString(BOARD.beg.pretty);
    const solver = new SudokuSolver_1.SudokuSolver(sb.core, debug);
    return { solver, sb };
};
const TH_createSolvedSolver = (debug = false) => {
    const BOARD = SudokuTestData_1.getBoards().fourByFour.board;
    const sb = SudokuBoard_1.SudokuBoard.CreateFromString(BOARD.end.pretty);
    const solver = new SudokuSolver_1.SudokuSolver(sb.core, debug);
    solver.propConstraints(sb);
    // Board is now solved:
    // 1 2 | 3 4
    // 3 4 | 1 2
    // ----+----
    // 2 1 | 4 3
    // 4 3 | 2 1
    return { solver, sb };
};
const TH_createSolverWithUnsolvedSquares = (squares, t) => {
    const { solver, sb } = TH_createSolvedSolver();
    squares.forEach(square => {
        t.deepEqual(solver._ssv.get(square).length, 1);
        solver._ssv.set(square, solver._core.Digits);
    });
    return { solver, sb };
};
ava_1.default('Sudoku Solver 4x4 board should show UNSOLVED array and FULL values array', t => {
    const BOARD = SudokuTestData_1.getBoards().fourByFour.board;
    const EMPTY = SudokuTestData_1.getBoards().fourByFour.empty;
    const sb = SudokuBoard_1.SudokuBoard.CreateFromString(BOARD.end.pretty);
    const solver = new SudokuSolver_1.SudokuSolver(sb.core);
    t.deepEqual(SudokuBoardStrings_1.SudokuBoardStrings.ArrayToPrettyString(solver.getBoardArray()), EMPTY.empty.pretty);
    t.deepEqual(SudokuBoardStrings_1.SudokuBoardStrings.ArrayOfValuesToPrettyString(solver.getBoardValuesArray()), EMPTY.emptyValues);
});
ava_1.default('Sudoku Solver 4x4 board should show SOLVED array and SINGLE values array', t => {
    const BOARD = SudokuTestData_1.getBoards().fourByFour.board;
    const sb = SudokuBoard_1.SudokuBoard.CreateFromString(BOARD.end.pretty);
    const solver = new SudokuSolver_1.SudokuSolver(sb.core);
    solver.propConstraints(sb);
    t.deepEqual(SudokuBoardStrings_1.SudokuBoardStrings.ArrayToPrettyString(solver.getBoardArray()), BOARD.end.pretty);
    t.deepEqual(SudokuBoardStrings_1.SudokuBoardStrings.ArrayOfValuesToPrettyString(solver.getBoardValuesArray()), BOARD.end.pretty);
});
ava_1.default('SudokuSolver.propConstraints() solves the easy norvig board', t => {
    const norvig = SudokuTestData_1.getBoards().norvig;
    const sb = SudokuBoard_1.SudokuBoard.CreateFromString(norvig.easy.beg.pretty);
    const expected = SudokuBoardStrings_1.SudokuBoardStrings.StringToArray(norvig.easy.end.pretty);
    const solver = new SudokuSolver_1.SudokuSolver(sb.core);
    solver.propConstraints(sb);
    const actualFinishedBoard = solver.getBoardArray();
    t.deepEqual(actualFinishedBoard, expected);
});
ava_1.default('SudokuSolver.propConstraints() does NOT solve the hard norvig board', t => {
    const norvig = SudokuTestData_1.getBoards().norvig;
    const sb = SudokuBoard_1.SudokuBoard.CreateFromString(norvig.hard.beg.pretty);
    const expectedBoardStr = '4.....8.5.3..........7......2.....6.....8.4...4..1.......6.3.7.5.32.1...1.4......';
    // const expected = SudokuBoardStrings.StringToArray(norvig.hard.end.pretty);
    const expected = SudokuBoardStrings_1.SudokuBoardStrings.StringToArray(expectedBoardStr);
    const solver = new SudokuSolver_1.SudokuSolver(sb.core);
    solver.propConstraints(sb);
    const actualFinishedBoard = solver.getBoardArray();
    // dumpBoard(actualFinishedBoard);
    // dumpBoards(actualFinishedBoard, expected);
    t.deepEqual(actualFinishedBoard, expected);
});
ava_1.default('Sudoku Solver 4x4 getSquaresWithDigitInThem returns all cells', t => {
    const BOARD = SudokuTestData_1.getBoards().fourByFour.board;
    const sb = SudokuBoard_1.SudokuBoard.CreateFromString(BOARD.end.pretty);
    const solver = new SudokuSolver_1.SudokuSolver(sb.core);
    const aOneUnitSquares = sb.core.SquareUnits.A1;
    t.deepEqual(aOneUnitSquares[0], ['A1', 'B1', 'C1', 'D1']);
    t.deepEqual(aOneUnitSquares[1], ['A1', 'A2', 'A3', 'A4']);
    t.deepEqual(aOneUnitSquares[2], ['A1', 'A2', 'B1', 'B2']);
    t.deepEqual(solver._ssv.get('A1'), [1, 2, 3, 4]);
    t.deepEqual(solver._ssv.get('B1'), [1, 2, 3, 4]);
    solver._getSquaresWithDigitInThem(aOneUnitSquares[0], 1);
    t.deepEqual(solver._getSquaresWithDigitInThem(aOneUnitSquares[0], 1), ['A1', 'B1', 'C1', 'D1']);
});
ava_1.default('SudokuSolve._assignDigitToUnitSquareIfOnlySquareInUnitWithDigitInIt() does nothing with multiple values', t => {
    const level = 0;
    const BOARD = SudokuTestData_1.getBoards().fourByFour.board;
    const EMPTY = SudokuTestData_1.getBoards().fourByFour.empty;
    const sb = SudokuBoard_1.SudokuBoard.CreateFromString(BOARD.end.pretty);
    const solver = new SudokuSolver_1.SudokuSolver(sb.core);
    const aOneUnitSquares = sb.core.SquareUnits.A1;
    solver._assignDigitToUnitSquareIfOnlySquareInUnitWithDigitInIt('A1', aOneUnitSquares[0], 2, level);
    const actualValuesString = SudokuBoardStrings_1.SudokuBoardStrings.ArrayOfValuesToPrettyString(solver.getBoardValuesArray());
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
ava_1.default('SudokuSolve._assignDigitToUnitSquareIfOnlySquareInUnitWithDigitInIt() removes single values', t => {
    // Arrange
    const SQUARE_B2 = 'B2';
    const SQUARE_B2_INDEX = 5;
    const DIGIT_TO_REMOVE = 4;
    const IGNORE_SQUARE = 'A1';
    const IGNORE_LEVEL = 0;
    const BOARD = SudokuTestData_1.getBoards().fourByFour.board;
    // Create a board that is solved except for A2
    const { solver, sb } = TH_createSolverWithUnsolvedSquares([SQUARE_B2], t);
    // Find a unit that includes SQUARE_B2 (We happen to know that A1[2] includes it in the box)
    const aOneFirstUnitSquares = sb.core.SquareUnits.A1[2];
    t.true(aOneFirstUnitSquares.includes(SQUARE_B2));
    // ACT
    // calling the method with the array of squares and digit of DIGIT_TO_REMOVE
    solver._assignDigitToUnitSquareIfOnlySquareInUnitWithDigitInIt(IGNORE_SQUARE, aOneFirstUnitSquares, DIGIT_TO_REMOVE, IGNORE_LEVEL);
    // ASSERT
    const bvFinal = solver.getBoardValuesArray();
    // check to make sure that SQUARE_A2 has only a single value (2) in its array
    t.deepEqual(bvFinal[SQUARE_B2_INDEX], [DIGIT_TO_REMOVE]);
    // check to make sure the resulting board string is correct
    const actualValuesString = SudokuBoardStrings_1.SudokuBoardStrings.ArrayOfValuesToPrettyString(bvFinal);
    t.deepEqual(actualValuesString, BOARD.end.pretty);
});
ava_1.default('SudokuSolve._findAndRemoveDigitFromSquareValues() removes single value from square values', t => {
    // Arrange
    const EMPTY = SudokuTestData_1.getBoards().fourByFour.empty;
    const SQUARE = 'B2';
    const SQUARE_INDEX = 5;
    const DIGIT_TO_REMOVE = 4;
    const IGNORE_LEVEL = 0;
    const BOARD = SudokuTestData_1.getBoards().fourByFour.board;
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
    const actualValuesString = SudokuBoardStrings_1.SudokuBoardStrings.ArrayOfValuesToPrettyString(bvFinal);
    t.deepEqual(actualValuesString, EMPTY.emptyValues);
});
ava_1.default.only('Sudoku Solver 4x4 ensure solved board meets constraints', t => {
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
    const BOARD = SudokuTestData_1.getBoards().norvig.hard;
    const sb = SudokuBoard_1.SudokuBoard.CreateFromString(BOARD.beg.pretty);
    t.log('sb.toPrettyString()');
    t.log(sb.toPrettyString());
    const solver = new SudokuSolver_1.SudokuSolver(sb.core);
    t.log(SudokuBoardStrings_1.SudokuBoardStrings.ArrayToPrettyString(solver.getBoardArray()));
    t.log(SudokuBoardStrings_1.SudokuBoardStrings.ArrayOfValuesToPrettyString(solver.getBoardValuesArray()));
    solver.propConstraints(sb);
    const solvedBoardArray = solver.getBoardArray();
    const solvedBoardValuesArray = solver.getBoardValuesArray();
    t.log(SudokuBoardStrings_1.SudokuBoardStrings.ArrayToPrettyString(solvedBoardArray));
    t.log(SudokuBoardStrings_1.SudokuBoardStrings.ArrayOfValuesToPrettyString(solvedBoardValuesArray));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3Vkb2t1U29sdmVyLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc3Vkb2t1L1N1ZG9rdVNvbHZlci5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsOENBQXVCO0FBQ3ZCLDJEQUFtRDtBQUNuRCwrQ0FBNEM7QUFDNUMsaURBQThDO0FBQzlDLDZEQUEwRDtBQUkxRCxNQUFNLHVCQUF1QixHQUFHLENBQUMsUUFBaUIsS0FBSyxFQUFFLEVBQUU7SUFDdkQsTUFBTSxLQUFLLEdBQUcsMEJBQVMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUM7SUFDM0MsTUFBTSxFQUFFLEdBQUcseUJBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBRTFELE1BQU0sTUFBTSxHQUFHLElBQUksMkJBQVksQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ2hELE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLENBQUM7QUFDMUIsQ0FBQyxDQUFBO0FBQ0QsTUFBTSxxQkFBcUIsR0FBRyxDQUFDLFFBQWlCLEtBQUssRUFBRSxFQUFFO0lBQ3JELE1BQU0sS0FBSyxHQUFHLDBCQUFTLEVBQUUsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDO0lBQzNDLE1BQU0sRUFBRSxHQUFHLHlCQUFXLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUUxRCxNQUFNLE1BQU0sR0FBRyxJQUFJLDJCQUFZLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNoRCxNQUFNLENBQUMsZUFBZSxDQUFDLEVBQUUsQ0FBQyxDQUFBO0lBQzFCLHVCQUF1QjtJQUN2QixZQUFZO0lBQ1osWUFBWTtJQUNaLFlBQVk7SUFDWixZQUFZO0lBQ1osWUFBWTtJQUNaLE9BQU8sRUFBRSxNQUFNLEVB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RyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzFELE1BQU0sTUFBTSxHQUFHLElBQUksMkJBQVksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDekMsTUFBTSxlQUFlLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDO0lBQy9DLENBQUMsQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUMxRCxDQUFDLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDMUQsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQzFELENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2pELENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRWpELE1BQU0sQ0FBQywwQkFBMEIsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDekQsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsMEJBQTBCLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJ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