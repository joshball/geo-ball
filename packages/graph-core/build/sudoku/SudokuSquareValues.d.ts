import { SudokuCore } from './SudokuCore';
export declare class SudokuSquareValues<TSudokuSquare, TSudokuCellValue, TSudokuDigit> extends Map<TSudokuSquare, Array<TSudokuDigit>> {
    private _core;
    private _debug;
    constructor(core: SudokuCore<TSudokuSquare, TSudokuCellValue, TSudokuDigit>, debug?: boolean);
    toString(): string;
}
//# sourceMappingURL=SudokuSquareValues.d.ts.map