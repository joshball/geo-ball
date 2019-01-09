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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3Vkb2t1Qm9hcmRTdHJpbmdzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3N1ZG9rdS9TdWRva3VCb2FyZFN0cmluZ3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxxREFBa0Q7QUFDbEQscURBQWtEO0FBRWxELCtDQUE0QztBQUM1QywwQ0FBb0Q7QUFJcEQsbUZBQW1GO0FBQ25GLE1BQWEsa0JBQWtCO0lBRTNCLE1BQU0sQ0FBQyxhQUFhLENBQUMsV0FBbUI7UUFDcEMsTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUMsQ0FBQzthQUN4RCxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO2FBQ3pCLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDNUIsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDekMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssUUFBUSxFQUFFO1lBQ2xELE1BQU0sSUFBSSxLQUFLLENBQUMseUNBQXlDLEtBQUssQ0FBQyxNQUFNLGNBQWMsUUFBUSxrREFBa0QsQ0FBQyxDQUFDO1NBQ2xKO1FBQ0QsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRTtZQUMxQixJQUFJLElBQUksR0FBRyxDQUFDLElBQUksSUFBSSxHQUFHLFFBQVEsRUFBRTtnQkFDN0IsTUFBTSxJQUFJLEtBQUssQ0FBQyw2QkFBNkIsSUFBSSxzQkFBc0IsUUFBUSxXQUFXLEtBQUssRUFBRSxDQUFDLENBQUM7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