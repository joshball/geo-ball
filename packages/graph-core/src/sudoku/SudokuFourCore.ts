import { SudokuCore } from "./SudokuCore";

export type SudokuFourSquare =
    "A1" | "A2" | "A3" | "A4" |
    "B1" | "B2" | "B3" | "B4" |
    "C1" | "C2" | "C3" | "C4" |
    "D1" | "D2" | "D3" | "D4";


export type SudokuFourDigit = 1 | 2 | 3 | 4;
export type SudokuFourCellValue = 0 | SudokuFourDigit;


export class SudokuFourCore extends SudokuCore<SudokuFourSquare, SudokuFourCellValue, SudokuFourDigit>{
    constructor() {
        super(4);
    }
}
