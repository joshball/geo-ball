import { SudokuCore } from './SudokuCore';
import { SudokuBoard } from './SudokuBoard';
import { SudokuSquareValues } from './SudokuSquareValues';
export declare type Logger = (level: number, s: string) => void;
export declare const nullLogger: Logger;
export declare const consoleLogger: Logger;
export declare class SudokuSolver<TSudokuSquare, TSudokuCellValue, TSudokuDigit> {
    _core: SudokuCore<TSudokuSquare, TSudokuCellValue, TSudokuDigit>;
    _ssv: SudokuSquareValues<TSudokuSquare, TSudokuCellValue, TSudokuDigit>;
    _debug: boolean;
    log: Logger;
    constructor(core: SudokuCore<TSudokuSquare, TSudokuCellValue, TSudokuDigit>, debug?: boolean);
    propConstraints(sb: SudokuBoard<TSudokuSquare, TSudokuCellValue, TSudokuDigit>): void;
    _logBoard(heading: string, level: number, levelToLog: number): void;
    search(): void;
    _getSquareWithLeastValuesGreaterThanOne(): any;
    /**
     * Assign takes a square and a digit.
     * It grabs all the possible values for that square (from the SSV), and removes each one
     * from its peers of the square. IF there is a contradiction, it will throw.
     * @param square
     * @param digit
     * @param level
     */
    assign(square: TSudokuSquare, digit: TSudokuDigit, level?: number): void;
    /**
     * The fundamental operation of constrain propogation is eliminateDigitFromPeersOfSquare
     * It is the fun part of sudoku that requires no guessing. Once you assign a square a digit
     * you go through and 'cleanup' the peers, removing the possibility of the other digits
     * Lets say you have square A1 with values [1,2,3,4]
     * And you want to assign 1 to A1. You would want to eliminate [2,3,4] from Peers of A1
     * The idea here is if you assign a digit to a square, you want to eliminate the other values that could have been
     * in that square
     * @param bsv
     * @param square
     * @param digit
     * @param log
     * @param level
     */
    _eliminateDigitFromPeersOfSquare(square: TSudokuSquare, digit: TSudokuDigit, level: number): void;
    _findAndRemoveDigitFromSquareValues(square: TSudokuSquare, digit: TSudokuDigit, level: number): TSudokuDigit[] | undefined;
    _ifSquareValuesHasOnlyOneValueRemoveItFromPeers(square: TSudokuSquare, origDigit: TSudokuDigit, squareValues: TSudokuDigit[], level: number): any;
    _assignDigitToUnitSquareIfOnlySquareInUnitWithDigitInIt(square: TSudokuSquare, unitSquares: TSudokuSquare[], digit: TSudokuDigit, level: number): void;
    _getSquaresWithDigitInThem(unitSquares: TSudokuSquare[], digit: TSudokuDigit): TSudokuSquare[];
    getBoardArray: () => number[];
    getBoardValuesArray: () => number[][];
    getSquareValues(): Array<any>;
}
