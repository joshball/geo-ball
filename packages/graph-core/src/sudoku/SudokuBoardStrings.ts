import { SudokuNineCore } from './SudokuNineCore';
import { SudokuFourCore } from './SudokuFourCore';
import { SudokuCore } from "./SudokuCore";
import { SudokuBoard } from './SudokuBoard';
import { getMaxLenOfSubItem } from '../utils/array';



// export class SudokuBoardStrings<TSudokuSquare, TSudokuCellValue, TSudokuDigit> {
export class SudokuBoardStrings {

    static StringToArray(boardString: string): Array<number> {
        const array = Array.from(boardString.replace(/\.|_|E/g, '0'))
            .map(c => parseInt(c, 10))
            .filter(c => !isNaN(c));
        const maxDigit = Math.sqrt(array.length);
        if (Math.floor(Math.sqrt(array.length)) !== maxDigit) {
            throw new Error(`The string converted to array of size ${array.length} with N of ${maxDigit}. It must be NxN size (has sqrt that is integer)`);
        }
        array.forEach((cell, index) => {
            if (cell < 0 || cell > maxDigit) {
                throw new Error(`String to Array has digit ${cell} which is < 0 or > ${maxDigit} at pos ${index}`);
            }
        });
        return array;
    }

    static ArrayToString(boardArray: Array<number>, emptyChar: string = '0'): string {
        return boardArray.map(s => s === 0 ? emptyChar : s).join('');
    }

    static CreateBoardFromString(boardString: string) {
        const boardArray = SudokuBoardStrings.StringToArray(boardString);
        if (boardArray.length === 16) {
            return new SudokuBoard(boardArray, new SudokuFourCore());
        }
        if (boardArray.length === 81) {
            return new SudokuBoard(boardArray, new SudokuNineCore());
        }
        throw new Error(`CreateBoardFromString() Unknown board length ${boardArray.length} (16 or 81 or create a new SudokuCore)`);
    }


    static PrettySquares(squares: Array<string>): string {
        return SudokuBoardStrings.ArrayOfValuesToPrettyString(squares.map(s => Array.from(s)) as unknown as number[][]);
    }

    static ArrayToPrettyString(boardArray: Array<number>, emptyChar: string = '0'): string {
        return SudokuBoardStrings.ArrayOfValuesToPrettyString(boardArray.map(v => [v]), emptyChar);
    }

    static ArrayOfValuesToPrettyString(boardCellValues: Array<Array<number>>, emptyChar: string = '.', labels: boolean = false): string {
        const lines: Array<string> = [];
        let cellStrings: Array<string> = [];
        const LINE_SIZE = Math.sqrt(boardCellValues.length);
        if (LINE_SIZE !== Math.floor(LINE_SIZE)) {
            throw new Error('Size is not a square!')
        }
        const BOX_SIZE = Math.sqrt(LINE_SIZE);
        if (BOX_SIZE !== Math.floor(BOX_SIZE)) {
            throw new Error('BoxSize is not a square!')
        }


        const maxCellSize = getMaxLenOfSubItem(boardCellValues);
        const rowBreakPoint = (index: number) => index % LINE_SIZE === 0 && index !== 0;
        const boxRowBreakPoint = (index: number) => index % (LINE_SIZE * BOX_SIZE) === 0 && index !== 0;
        const colBreakPoint = (index: number) => index % (BOX_SIZE) === 0 && index !== 0;

        const pushLine = (lineStr: string) => {
            // const prepend = '';
            const prepend = labels ? String.fromCharCode(('A'.charCodeAt(0) + lines.length - 2)) + ' | ' : '';
            lines.push(prepend + lineStr);
        }

        const getColumnHeader = () => {
            const headerArray = [];
            for (let i = 0; i < LINE_SIZE; i++) {
                if (colBreakPoint(i)) {
                    headerArray.push(' ');
                }
                // const bs = SudokuBoardStrings.GetBufferedString([i+1], maxCellSize, emptyChar);
                // console.log('BS: [%s]', bs, bs.length)
                headerArray.push(SudokuBoardStrings.GetBufferedString([i+1], maxCellSize, emptyChar));
            }
            return headerArray.join(' ');
        }

        const getHorizontalDashLine = () => {
            const dashArray = [];
            for (let i = 0; i < LINE_SIZE; i++) {
                if (colBreakPoint(i)) {
                    dashArray.push('+');
                }
                dashArray.push('-'.repeat(maxCellSize));
            }
            return dashArray.join('-');
        }

        if (labels) {
            lines.push('    ' + getColumnHeader());
            lines.push('    ' + getHorizontalDashLine());
        }
        boardCellValues.forEach((square, index) => {
            if (rowBreakPoint(index)) {
                // row of cells is done. join cells with spaces in between, and push it to lines
                pushLine(cellStrings.join(' '));

                if (boxRowBreakPoint(index)) {
                    // e.g. if it is the 3rd or 6th row, push a dashedline
                    pushLine(getHorizontalDashLine()); // '------+-------+------'
                }

                cellStrings = []; // empty the line
            }
            else if (colBreakPoint(index)) {
                // we hit a column, lets push a pretty |
                cellStrings.push('|');
            }

            cellStrings.push(SudokuBoardStrings.GetBufferedString(square, maxCellSize, emptyChar));
        })

        pushLine(cellStrings.join(' ')); // We need to join and push the final line
        return lines.join('\n');
    }


    static GetBufferedString(vals: Array<number>, max: number, emptyChar: string): string {
        if (vals.length > max) {
            throw new Error('vals.len too long');
        }
        let alt = false;
        let valStr = vals.map(c => c === 0 ? emptyChar : c).join('');
        let spaceRemain = max - valStr.length;
        while (spaceRemain > 0) {
            valStr = alt ? ' ' + valStr.toString() : valStr.toString() + ' ';
            alt = !alt;
            --spaceRemain;
        }
        return valStr;
    }

    static GetDiff(boardOne: Array<any>, boardTwo: Array<any>): string {
        const diffArray = boardOne.map((bOneDig, i) => {
            const bTwoDig = boardTwo[i];
            if (bOneDig !== bTwoDig) {
                return 'x';
            }
            return ' ';
        })
        return boardOne.join('') + '\n' + boardTwo.join('') + '\n' + diffArray.join('') + '\n';
    }

    // static ArrayOfValuesToPrettyString<TSudokuCellValue>(boardArray: Array<Array<TSudokuCellValue>>, emptyChar: string = '.'): string {
    //     const maxLen = boardArray.reduce((prev, curr) => curr.length > prev ? curr.length : prev, 0);
    //     return SudokuBoardStrings.ArrayOfValuesToPrettyStringMax(boardArray, emptyChar, maxLen);
    // }

    /**
     * Parses a string of characters that should represent the state of a sudoku board.
     * The constraints are simple. Ensure there are 81 characters that represent the state
     * of the board: 1-9 for known numbers, and [0|.|E] for unknown spaces. All else is
     * ignored.
     * This will throw if there are not exactly 81 state representations.
     * @param boardString string of characters (space|.|E|0-9) representing board state
     * @returns An array of 81 numbers (0-9) or throws an Error.
     */
    // stringToArray(boardString: string, debug: boolean = false): Array<TSudokuCellValue> {
    //     const boardStringArray = SudokuBoardStrings.StringToArray(boardString)
    //         .filter(c => this._core.isValidCellNum(c))
    //         .map(c => c as TSudokuCellValue);

    //     if (boardStringArray.length !== this._core.NumCells) {
    //         if (debug) {
    //             console.error('Parse error: boardString:', boardString);
    //             console.error('Parse error: boardStringArray:', boardStringArray);
    //             console.error('Parse error: boardStringArray.length:', boardStringArray.length);
    //         }
    //         throw new Error(`Board String should be ${this._core.NumCells} characters (was ${boardStringArray.length})`);
    //     }
    //     return boardStringArray;
    // }


    // static ArrayOfValuesToPrettyStringMax<TSudokuCellValue>(boardArray: TSudokuCellValue[][], _emptyChar: string, maxLen: number): string {
    //     const lines: Array<string> = [];
    //     let line: Array<string> = [];
    //     console.log('ArrayOfValuesToPrettyStringMax:', boardArray);
    //     console.log('ArrayOfValuesToPrettyStringMax:', maxLen);
    //     const getDashCol = (max: number) => {
    //         const dashArray = [];
    //         for (let i = 0; i < max; i++) {
    //             dashArray.push('-');
    //         }
    //         return dashArray.join('');
    //     }
    //     const getHorizLine = (max: number) => {
    //         const dashArray = [];
    //         for (let i = 0; i < 9; i++) {
    //             if (i !== 0 && i % 3 === 0) {
    //                 dashArray.push('+');
    //             }
    //             dashArray.push(getDashCol(max));
    //         }
    //         return dashArray.join('-');
    //     }
    //     boardArray.forEach((square, index) => {
    //         console.log('HERE:', index, square);
    //         // if at the end of a row, the line is done.
    //         if (index % 9 === 0 && index !== 0) {
    //             // join it with spaces in between, and push it to lines
    //             lines.push(line.join(' '));
    //             // if it is the 3rd or 6th row, push a dashedline
    //             if (index % 27 === 0 && index !== 0) {
    //                 lines.push(getHorizLine(maxLen));
    //                 // lines.push('------+-------+------');
    //             }
    //             // empty the line
    //             line = [];
    //         }
    //         // if we are on the 3rd or 6th column, push a |
    //         else if ((index % 3 === 0 || index % 6 === 0) && index !== 0) {
    //             line.push('|');
    //         }
    //         // otherwise we are just a normal square

    //         const squareChar = SudokuBoardStrings.GetBufferedString(square, maxLen);
    //         // const squareChar = square === 0 ? emptyChar : square.toString();
    //         line.push(squareChar);
    //     })
    //     // We need to join and push the final line
    //     lines.push(line.join(' '));
    //     return lines.join('\n');
    // }

    // static ArrayToPrettyString<TSudokuCellValue>(boardArray: Array<TSudokuCellValue>, emptyChar: string = '.'): string {
    //     const lines: Array<string> = [];
    //     let line: Array<string> = [];
    //     boardArray.forEach((square, index) => {
    //         // if at the end of a row, the line is done.
    //         if (index % 9 === 0 && index !== 0) {
    //             // join it with spaces in between, and push it to lines
    //             lines.push(line.join(' '));
    //             // if it is the 3rd or 6th row, push a dashedline
    //             if (index % 27 === 0 && index !== 0) {
    //                 lines.push('------+-------+------');
    //             }
    //             // empty the line
    //             line = [];
    //         }
    //         // if we are on the 3rd or 6th column, push a |
    //         else if ((index % 3 === 0 || index % 6 === 0) && index !== 0) {
    //             line.push('|');
    //         }
    //         // otherwise we are just a normal square
    //         const squareChar = square === 0 ? emptyChar : square.toString();
    //         line.push(squareChar);
    //     })
    //     // We need to join and push the final line
    //     lines.push(line.join(' '));
    //     return lines.join('\n');
    // }
}
