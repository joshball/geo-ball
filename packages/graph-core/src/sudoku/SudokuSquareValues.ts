import { SudokuCore } from './SudokuCore';
import { SudokuBoardStrings } from './SudokuBoardStrings';


export class SudokuSquareValues<TSudokuSquare, TSudokuCellValue, TSudokuDigit> extends Map<TSudokuSquare, Array<TSudokuDigit>> {
    private _core: SudokuCore<TSudokuSquare, TSudokuCellValue, TSudokuDigit>;
    private _debug: boolean;

    constructor(core: SudokuCore<TSudokuSquare, TSudokuCellValue, TSudokuDigit>, debug: boolean = false) {
        super();
        this._core = core;
        this._debug = debug;
        core.Squares.forEach((square: TSudokuSquare) => {
            this.set(square, Array.from(core.Digits));
        });
    }

    toString() {
        const boardSquareValues = Array.from(this.values()) as unknown as Array<Array<number>>;
        return SudokuBoardStrings.ArrayOfValuesToPrettyString(boardSquareValues);
    }



}
