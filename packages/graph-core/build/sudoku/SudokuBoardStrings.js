"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SudokuNineCore_1 = require("./SudokuNineCore");
const SudokuFourCore_1 = require("./SudokuFourCore");
const SudokuBoard_1 = require("./SudokuBoard");
const array_1 = require("../utils/array");
// export class SudokuBoardStrings<TSudokuSquare, TSudokuCellValue, TSudokuDigit> {
class SudokuBoardStrings {
    static StringToArray(boardString) {
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
    static ArrayToString(boardArray, emptyChar = '0') {
        return boardArray.map(s => s === 0 ? emptyChar : s).join('');
    }
    static CreateBoardFromString(boardString) {
        const boardArray = SudokuBoardStrings.StringToArray(boardString);
        if (boardArray.length === 16) {
            return new SudokuBoard_1.SudokuBoard(boardArray, new SudokuFourCore_1.SudokuFourCore());
        }
        if (boardArray.length === 81) {
            return new SudokuBoard_1.SudokuBoard(boardArray, new SudokuNineCore_1.SudokuNineCore());
        }
        throw new Error(`CreateBoardFromString() Unknown board length ${boardArray.length} (16 or 81 or create a new SudokuCore)`);
    }
    static PrettySquares(squares) {
        return SudokuBoardStrings.ArrayOfValuesToPrettyString(squares.map(s => Array.from(s)));
    }
    static ArrayToPrettyString(boardArray, emptyChar = '0') {
        return SudokuBoardStrings.ArrayOfValuesToPrettyString(boardArray.map(v => [v]), emptyChar);
    }
    static ArrayOfValuesToPrettyString(boardCellValues, emptyChar = '.', labels = false) {
        const lines = [];
        let cellStrings = [];
        const LINE_SIZE = Math.sqrt(boardCellValues.length);
        if (LINE_SIZE !== Math.floor(LINE_SIZE)) {
            throw new Error('Size is not a square!');
        }
        const BOX_SIZE = Math.sqrt(LINE_SIZE);
        if (BOX_SIZE !== Math.floor(BOX_SIZE)) {
            throw new Error('BoxSize is not a square!');
        }
        const maxCellSize = array_1.getMaxLenOfSubItem(boardCellValues);
        const rowBreakPoint = (index) => index % LINE_SIZE === 0 && index !== 0;
        const boxRowBreakPoint = (index) => index % (LINE_SIZE * BOX_SIZE) === 0 && index !== 0;
        const colBreakPoint = (index) => index % (BOX_SIZE) === 0 && index !== 0;
        const pushLine = (lineStr) => {
            // const prepend = '';
            const prepend = labels ? String.fromCharCode(('A'.charCodeAt(0) + lines.length - 2)) + ' | ' : '';
            lines.push(prepend + lineStr);
        };
        const getColumnHeader = () => {
            const headerArray = [];
            for (let i = 0; i < LINE_SIZE; i++) {
                if (colBreakPoint(i)) {
                    headerArray.push(' ');
                }
                // const bs = SudokuBoardStrings.GetBufferedString([i+1], maxCellSize, emptyChar);
                // console.log('BS: [%s]', bs, bs.length)
                headerArray.push(SudokuBoardStrings.GetBufferedString([i + 1], maxCellSize, emptyChar));
            }
            return headerArray.join(' ');
        };
        const getHorizontalDashLine = () => {
            const dashArray = [];
            for (let i = 0; i < LINE_SIZE; i++) {
                if (colBreakPoint(i)) {
                    dashArray.push('+');
                }
                dashArray.push('-'.repeat(maxCellSize));
            }
            return dashArray.join('-');
        };
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
        });
        pushLine(cellStrings.join(' ')); // We need to join and push the final line
        return lines.join('\n');
    }
    static GetBufferedString(vals, max, emptyChar) {
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
    static GetDiff(boardOne, boardTwo) {
        const diffArray = boardOne.map((bOneDig, i) => {
            const bTwoDig = boardTwo[i];
            if (bOneDig !== bTwoDig) {
                return 'x';
            }
            return ' ';
        });
        return boardOne.join('') + '\n' + boardTwo.join('') + '\n' + diffArray.join('') + '\n';
    }
}
exports.SudokuBoardStrings = SudokuBoardStrings;
//# sourceMappingURL=SudokuBoardStrings.js.map