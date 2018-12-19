import { SudokuNineCore } from './SudokuNineCore';
import { SudokuFourCore } from './SudokuFourCore';
import { SudokuCore } from "./SudokuCore";
import { SudokuBoardStrings } from "./SudokuBoardStrings";


export class SquareValue<TSudokuSquare, TSudokuCellValue> {
    square: TSudokuSquare
    value: TSudokuCellValue
    constructor(square: TSudokuSquare, value: TSudokuCellValue) {
        this.square = square;
        this.value = value;
    }
}

export class SudokuBoard<TSudokuSquare, TSudokuCellValue, TSudokuDigit> {

    static CreateFromString(boardString: string) {
        const boardArray = SudokuBoardStrings.StringToArray(boardString);
        if (boardArray.length === 16) {
            return new SudokuBoard(boardArray, new SudokuFourCore());
        }
        if (boardArray.length === 81) {
            return new SudokuBoard(boardArray, new SudokuNineCore());
        }
        throw new Error('Unknown board size');
    }

    public core: SudokuCore<TSudokuSquare, TSudokuCellValue, TSudokuDigit>;

    private _boardArray: Array<TSudokuCellValue>;

    constructor(boardArray: Array<TSudokuCellValue>, core: SudokuCore<TSudokuSquare, TSudokuCellValue, TSudokuDigit>) {
        this.core = core;
        this.core.isValidBoardArray(boardArray)
        this._boardArray = boardArray;
    }

    toArray(): Array<TSudokuCellValue> {
        return this._boardArray;
    }

    toArrayOfSquareValues(): Array<SquareValue<TSudokuSquare, TSudokuCellValue>> {
        return this.core.Squares.map((square, index) => {
            const digit = this._boardArray[index];
            return new SquareValue(square, digit);
        });
    }

    toObjectOfSquareValues(): any {
        const obj:any = {};
        this.core.Squares.forEach((square, index) => {
            obj[square] = this._boardArray[index];
        });
        return obj;
    }

    toString(emptyChar: string = '0'): string {
        return SudokuBoardStrings.ArrayToString(this._boardArray as unknown as Array<number>, emptyChar);
    }

    toPrettyString(emptyChar: string = '0'): string {
        return SudokuBoardStrings.ArrayToPrettyString(this._boardArray as unknown as Array<number>, emptyChar);
    }

}
