import { isArray } from "util";
import { SudokuCellValue } from './SudokuCore';

export class SudokuBoard {

    _boardArray: Array<SudokuCellValue>;

    constructor(boardArray: Array<SudokuCellValue>) {
        SudokuBoard.IsValidBoardArray(boardArray)
        this._boardArray = boardArray;
    }

    toArray(): Array<SudokuCellValue> {
        return this._boardArray;
    }

    toString(): string {
        return SudokuBoard.ArrayToString(this._boardArray, '0');
    }

    static CreateFromString(boardString: string): SudokuBoard {
        return new SudokuBoard(SudokuBoard.StringToArray(boardString));
    }

    static GetDiff(boardOne: Array<SudokuCellValue>, boardTwo: Array<SudokuCellValue>): string {
        const diffArray = boardOne.map((bOneDig, i) => {
            const bTwoDig = boardTwo[i];
            if (bOneDig !== bTwoDig) {
                return 'x';
            }
            return ' ';
        })
        return boardOne.join('') + '\n' + boardTwo.join('') + '\n' + diffArray.join('') + '\n';
    }

    static IsValidBoardArray(boardArray: Array<number>) {

        if (!boardArray) {
            throw new Error('Undefined boardArray');
        }
        if (!isArray(boardArray)) {
            throw new Error('boardArray is not array');
        }
        if (boardArray.length !== 81) {
            throw new Error('boardArray length must be 81');
        }
        boardArray.forEach((c, i) => {
            if (isNaN(parseInt(c.toString(), 10))) {
                throw new Error(`Invalid char [${c}] at pos ${i} should be a number`)
            }
            if (c < 0 || c > 9) {
                throw new Error(`Invalid digit [${c}] at pos ${i} sould be 0-9`)
            }
        })
    }

    /**
     * Parses a string of characters that should represent the state of a sudoku board.
     * The constraints are simple. Ensure there are 81 characters that represent the state
     * of the board: 1-9 for known numbers, and [0|.|E] for unknown spaces. All else is
     * ignored.
     * This will throw if there are not exactly 81 state representations.
     * @param boardString string of characters (space|.|E|0-9) representing board state
     * @returns An array of 81 numbers (0-9) or throws an Error.
     */
    static StringToArray(boardString: string, debug: boolean = false): Array<SudokuCellValue> {
        const boardStringArray = Array.from(boardString.replace(/\.|E/g, '0'))
            .filter(c => (c >= '0' && c <= '9'));

        if (boardStringArray.length !== 81) {
            if (debug) {
                console.error('Parse error: boardString:', boardString);
                console.error('Parse error: boardStringArray:', boardStringArray);
                console.error('Parse error: boardStringArray.length:', boardStringArray.length);
            }
            throw new Error(`Board String should be 81 characters (was ${boardStringArray.length})`);
        }

        const boardArray = boardStringArray.map((square, index) => {
            const squareNum = parseInt(square, 10);
            if (isNaN(squareNum)) {
                if (debug) {
                    console.error('Parse error: boardString:', boardString);
                    console.error('Parse error: boardStringArray:', boardStringArray);
                    console.error('Parse error: boardStringArray.length:', boardStringArray.length);
                }
                throw new Error(`Unkown character [${square}] at square ${index + 1}`);
            }
            return squareNum as SudokuCellValue;
        });
        // console.log('parse boardArray', boardArray)
        return boardArray;
    }


    static ArrayToString(boardArray: Array<SudokuCellValue>, emptyChar: string = '.'): string {
        return boardArray.map(s => s === 0 ? emptyChar : s).join('');
    }

    static ArrayOfValuesToPrettyString(boardArray: Array<Array<SudokuCellValue>>, emptyChar: string = '.'): string {
        const maxLen = boardArray.reduce((prev, curr) => curr.length > prev ? curr.length : prev, 0);
        return SudokuBoard.ArrayOfValuesToPrettyStringMax(boardArray, emptyChar, maxLen);
    }

    static GetBufferedString(vals: Array<any>, max: number): string {
        if (vals.length > max) {
            throw new Error('vals.len too long');
        }
        let alt = true;
        let valStr = vals.join('');
        let spaceRemain = max - valStr.length;
        while (spaceRemain > 0) {
            valStr = alt ? ' ' + valStr.toString() : valStr.toString() + ' ';
            alt = !alt;
            --spaceRemain;
        }
        return valStr;
    }

    static ArrayOfValuesToPrettyStringMax(boardArray: SudokuCellValue[][], _emptyChar: string, maxLen: number): string {
        const lines: Array<string> = [];
        let line: Array<string> = [];
        console.log('ArrayOfValuesToPrettyStringMax:', boardArray);
        console.log('ArrayOfValuesToPrettyStringMax:', maxLen);
        const getDashCol = (max: number) => {
            const dashArray = [];
            for (let i = 0; i < max; i++) {
                dashArray.push('-');
            }
            return dashArray.join('');
        }
        const getHorizLine = (max: number) => {
            const dashArray = [];
            for (let i = 0; i < 9; i++) {
                if (i !== 0 && i % 3 === 0) {
                    dashArray.push('+');
                }
                dashArray.push(getDashCol(max));
            }
            return dashArray.join('-');
        }
        boardArray.forEach((square, index) => {
            console.log('HERE:', index, square);
            // if at the end of a row, the line is done.
            if (index % 9 === 0 && index !== 0) {
                // join it with spaces in between, and push it to lines
                lines.push(line.join(' '));
                // if it is the 3rd or 6th row, push a dashedline
                if (index % 27 === 0 && index !== 0) {
                    lines.push(getHorizLine(maxLen));
                    // lines.push('------+-------+------');
                }
                // empty the line
                line = [];
            }
            // if we are on the 3rd or 6th column, push a |
            else if ((index % 3 === 0 || index % 6 === 0) && index !== 0) {
                line.push('|');
            }
            // otherwise we are just a normal square

            const squareChar = SudokuBoard.GetBufferedString(square, maxLen);
            // const squareChar = square === 0 ? emptyChar : square.toString();
            line.push(squareChar);
        })
        // We need to join and push the final line
        lines.push(line.join(' '));
        return lines.join('\n');
    }

    static ArrayToPrettyString(boardArray: Array<SudokuCellValue>, emptyChar: string = '.'): string {
        const lines: Array<string> = [];
        let line: Array<string> = [];
        boardArray.forEach((square, index) => {
            // if at the end of a row, the line is done.
            if (index % 9 === 0 && index !== 0) {
                // join it with spaces in between, and push it to lines
                lines.push(line.join(' '));
                // if it is the 3rd or 6th row, push a dashedline
                if (index % 27 === 0 && index !== 0) {
                    lines.push('------+-------+------');
                }
                // empty the line
                line = [];
            }
            // if we are on the 3rd or 6th column, push a |
            else if ((index % 3 === 0 || index % 6 === 0) && index !== 0) {
                line.push('|');
            }
            // otherwise we are just a normal square
            const squareChar = square === 0 ? emptyChar : square.toString();
            line.push(squareChar);
        })
        // We need to join and push the final line
        lines.push(line.join(' '));
        return lines.join('\n');
    }

}
