"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SudokuBoardStrings_1 = require("./SudokuBoardStrings");
class SudokuSquareValues extends Map {
    constructor(core, debug = false) {
        super();
        this._core = core;
        this._debug = debug;
        core.Squares.forEach((square) => {
            this.set(square, Array.from(core.Digits));
        });
    }
    toString() {
        const boardSquareValues = Array.from(this.values());
        return SudokuBoardStrings_1.SudokuBoardStrings.ArrayOfValuesToPrettyString(boardSquareValues);
    }
}
exports.SudokuSquareValues = SudokuSquareValues;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3Vkb2t1U3F1YXJlVmFsdWVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3N1ZG9rdS9TdWRva3VTcXVhcmVWYWx1ZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSw2REFBMEQ7QUFHMUQsTUFBYSxrQkFBa0UsU0FBUSxHQUF1QztJQUkxSCxZQUFZLElBQStELEVBQUUsUUFBaUIsS0FBSztRQUMvRixLQUFLLEVBQUUsQ0FBQztRQUNSLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBcUIsRUFBRSxFQUFFO1lBQzNDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDOUMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsUUFBUTtRQUNKLE1BQU0saUJBQWlCLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQW9DLENBQUM7UUFDdkYsT0FBTyx1Q0FBa0IsQ0FBQywyQkFBMkIsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBQzdFLENBQUM7Q0FJSjtBQXBCRCxnREFvQkMifQ==