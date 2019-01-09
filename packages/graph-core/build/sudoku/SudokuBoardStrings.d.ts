import { SudokuBoard } from './SudokuBoard';
export declare class SudokuBoardStrings {
    static StringToArray(boardString: string): Array<number>;
    static ArrayToString(boardArray: Array<number>, emptyChar?: string): string;
    static CreateBoardFromString(boardString: string): SudokuBoard<import("./SudokuNineCore").SudokuNineSquare, number, import("./SudokuNineCore").SudokuNineDigit>;
    static PrettySquares(squares: Array<string>): string;
    static ArrayToPrettyString(boardArray: Array<number>, emptyChar?: string): string;
    static ArrayOfValuesToPrettyString(boardCellValues: Array<Array<number>>, emptyChar?: string, labels?: boolean): string;
    static GetBufferedString(vals: Array<number>, max: number, emptyChar: string): string;
    static GetDiff(boardOne: Array<any>, boardTwo: Array<any>): string;
}
