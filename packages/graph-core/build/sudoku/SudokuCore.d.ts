export declare type SudokuUnit<TSudokuSquare> = Array<TSudokuSquare>;
export declare type SudokuCellValue<TSudokuDigit> = 0 | TSudokuDigit;
export declare class SudokuSquareUnits<TSudokuSquare> {
    [square: string]: Array<Array<TSudokuSquare>>;
    constructor(squares: Array<TSudokuSquare>, AllUnits: Array<SudokuUnit<TSudokuSquare>>);
}
/**
 * The SquarePeers is a proper set (no dups) of all squares that form
 * the squares unit, minus itself.
 */
export declare class SudokuSquarePeers<TSudokuSquare> {
    [square: string]: Array<TSudokuSquare>;
    constructor(squares: Array<TSudokuSquare>, squareUnits: SudokuSquareUnits<TSudokuSquare>);
}
export declare class SudokuCore<TSudokuSquare, TSudokuCellValue, TSudokuDigit> {
    Digits: Array<TSudokuDigit>;
    Rows: Array<string>;
    Cols: Array<number>;
    Squares: Array<TSudokuSquare>;
    AllUnits: Array<SudokuUnit<TSudokuSquare>>;
    SquareUnits: SudokuSquareUnits<TSudokuSquare>;
    SquarePeers: SudokuSquarePeers<TSudokuSquare>;
    Size: number;
    NumCells: number;
    BoxSize: number;
    constructor(size: number);
    createAllUnits: (rows: string[], cols: number[]) => TSudokuSquare[][];
    isValidCellGuess(num: number | TSudokuDigit | TSudokuCellValue): boolean;
    isValidCellValue(num: number | TSudokuDigit | TSudokuCellValue): boolean;
    isValidCellNumChar(numChar: string): boolean;
    /**
     * The board array should be only digits from 0 to size, and can be typed
     * that way with the TSudokuCellValue, but we check with parsing anyway.
     * @param boardArray
     */
    isValidBoardArray(boardArray: Array<TSudokuCellValue>): void;
}
//# sourceMappingURL=SudokuCore.d.ts.map