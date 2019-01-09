import { SudokuCore } from "./SudokuCore";
export declare class SquareValue<TSudokuSquare, TSudokuCellValue> {
    square: TSudokuSquare;
    value: TSudokuCellValue;
    constructor(square: TSudokuSquare, value: TSudokuCellValue);
}
export declare class SudokuBoard<TSudokuSquare, TSudokuCellValue, TSudokuDigit> {
    static CreateFromString(boardString: string): SudokuBoard<import("./SudokuNineCore").SudokuNineSquare, number, import("./SudokuNineCore").SudokuNineDigit>;
    core: SudokuCore<TSudokuSquare, TSudokuCellValue, TSudokuDigit>;
    private _boardArray;
    constructor(boardArray: Array<TSudokuCellValue>, core: SudokuCore<TSudokuSquare, TSudokuCellValue, TSudokuDigit>);
    toArray(): Array<TSudokuCellValue>;
    toArrayOfSquareValues(): Array<SquareValue<TSudokuSquare, TSudokuCellValue>>;
    toObjectOfSquareValues(): any;
    toString(emptyChar?: string): string;
    toPrettyString(emptyChar?: string): string;
}
