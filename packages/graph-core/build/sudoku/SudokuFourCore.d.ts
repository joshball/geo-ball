import { SudokuCore } from "./SudokuCore";
export declare type SudokuFourSquare = "A1" | "A2" | "A3" | "A4" | "B1" | "B2" | "B3" | "B4" | "C1" | "C2" | "C3" | "C4" | "D1" | "D2" | "D3" | "D4";
export declare type SudokuFourDigit = 1 | 2 | 3 | 4;
export declare type SudokuFourCellValue = 0 | SudokuFourDigit;
export declare class SudokuFourCore extends SudokuCore<SudokuFourSquare, SudokuFourCellValue, SudokuFourDigit> {
    constructor();
}
