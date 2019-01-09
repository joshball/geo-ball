"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SudokuNineCore_1 = require("./SudokuNineCore");
const SudokuFourCore_1 = require("./SudokuFourCore");
const SudokuBoardStrings_1 = require("./SudokuBoardStrings");
class SquareValue {
    constructor(square, value) {
        this.square = square;
        this.value = value;
    }
}
exports.SquareValue = SquareValue;
class SudokuBoard {
    constructor(boardArray, core) {
        this.core = core;
        this.core.isValidBoardArray(boardArray);
        this._boardArray = boardArray;
    }
    static CreateFromString(boardString) {
        const boardArray = SudokuBoardStrings_1.SudokuBoardStrings.StringToArray(boardString);
        if (boardArray.length === 16) {
            return new SudokuBoard(boardArray, new SudokuFourCore_1.SudokuFourCore());
        }
        if (boardArray.length === 81) {
            return new SudokuBoard(boardArray, new SudokuNineCore_1.SudokuNineCore());
        }
        throw new Error('Unknown board size');
    }
    toArray() {
        return this._boardArray;
    }
    toArrayOfSquareValues() {
        return this.core.Squares.map((square, index) => {
            const digit = this._boardArray[index];
            return new SquareValue(square, digit);
        });
    }
    toObjectOfSquareValues() {
        const obj = {};
        this.core.Squares.forEach((square, index) => {
            obj[square] = this._boardArray[index];
        });
        return obj;
    }
    toString(emptyChar = '0') {
        return SudokuBoardStrings_1.SudokuBoardStrings.ArrayToString(this._boardArray, emptyChar);
    }
    toPrettyString(emptyChar = '0') {
        return SudokuBoardStrings_1.SudokuBoardStrings.ArrayToPrettyString(this._boardArray, emptyChar);
    }
}
exports.SudokuBoard = SudokuBoard;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3Vkb2t1Qm9hcmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc3Vkb2t1L1N1ZG9rdUJvYXJkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEscURBQWtEO0FBQ2xELHFEQUFrRDtBQUVsRCw2REFBMEQ7QUFHMUQsTUFBYSxXQUFXO0lBR3BCLFlBQVksTUFBcUIsRUFBRSxLQUF1QjtRQUN0RCxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztJQUN2QixDQUFDO0NBQ0o7QUFQRCxrQ0FPQztBQUVELE1BQWEsV0FBVztJQWlCcEIsWUFBWSxVQUFtQyxFQUFFLElBQStEO1FBQzVHLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsVUFBVSxDQUFDLENBQUE7UUFDdkMsSUFBSSxDQUFDLFdBQVcsR0FBRyxVQUFVLENBQUM7SUFDbEMsQ0FBQztJQW5CRCxNQUFNLENBQUMsZ0JBQWdCLENBQUMsV0FBbUI7UUFDdkMsTUFBTSxVQUFVLEdBQUcsdUNBQWtCLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ2pFLElBQUksVUFBVSxDQUFDLE1BQU0sS0FBSyxFQUFFLEVBQUU7WUFDMUIsT0FBTyxJQUFJLFdBQVcsQ0FBQyxVQUFVLEVBQUUsSUFBSSwrQkFBYyxFQUFFLENBQUMsQ0FBQztTQUM1RDtRQUNELElBQUksVUFBVSxDQUFDLE1BQU0sS0FBSyxFQUFFLEVBQUU7WUFDMUIsT0FBTyxJQUFJLFdBQVcsQ0FBQyxVQUFVLEVBQUUsSUFBSSwrQkFBYyxFQUFFLENBQUMsQ0FBQztTQUM1RDtRQUNELE1BQU0sSUFBSSxLQUFLLENBQUMsb0JBQW9CLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBWUQsT0FBTztRQUNILE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUM1QixDQUFDO0lBRUQscUJBQXFCO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxFQUFFO1lBQzNDLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDdEMsT0FBTyxJQUFJLFdBQVcsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDMUMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsc0JBQXNCO1FBQ2xCLE1BQU0sR0FBRyxHQUFPLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLEVBQUU7WUFDeEMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDMUMsQ0FBQyxDQUFDLENBQUM7UUFDSCxPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7SUFFRCxRQUFRLENBQUMsWUFBb0IsR0FBRztRQUM1QixPQUFPLHVDQUFrQixDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsV0FBdUMsRUFBRSxTQUFTLENBQUMsQ0FBQztJQUNyRyxDQUFDO0lBRUQsY0FBYyxDQUFDLFlBQW9CLEdBQUc7UUFDbEMsT0FBTyx1Q0FBa0IsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsV0FBdUMsRUFBRSxTQUFTLENBQUMsQ0FBQztJQUMzRyxDQUFDO0NBRUo7QUFsREQsa0NBa0RDIn0=