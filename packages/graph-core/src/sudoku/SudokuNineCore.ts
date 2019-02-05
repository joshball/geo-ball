import { SudokuCore } from "./SudokuCore";

export type SudokuNineSquare =
    "A1" | "A2" | "A3" | "A4" | "A5" | "A6" | "A7" | "A8" | "A9" |
    "B1" | "B2" | "B3" | "B4" | "B5" | "B6" | "B7" | "B8" | "B9" |
    "C1" | "C2" | "C3" | "C4" | "C5" | "C6" | "C7" | "C8" | "C9" |
    "D1" | "D2" | "D3" | "D4" | "D5" | "D6" | "D7" | "D8" | "D9" |
    "E1" | "E2" | "E3" | "E4" | "E5" | "E6" | "E7" | "E8" | "E9" |
    "F1" | "F2" | "F3" | "F4" | "F5" | "F6" | "F7" | "F8" | "F9" |
    "G1" | "G2" | "G3" | "G4" | "G5" | "G6" | "G7" | "G8" | "G9" |
    "H1" | "H2" | "H3" | "H4" | "H5" | "H6" | "H7" | "H8" | "H9" |
    "I1" | "I2" | "I3" | "I4" | "I5" | "I6" | "I7" | "I8" | "I9"

export type SudokuNineDigit = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type SudokuNineCellValue = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export class SudokuNineCore extends SudokuCore<SudokuNineSquare, SudokuNineCellValue, SudokuNineDigit>{
    constructor() {
        super(9);
    }
}
