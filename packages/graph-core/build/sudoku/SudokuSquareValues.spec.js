"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SudokuBoard_1 = require("./SudokuBoard");
const SudokuSquareValues_1 = require("./SudokuSquareValues");
const ava_1 = __importDefault(require("ava"));
const SudokuTestData_1 = require("../test/SudokuTestData");
ava_1.default('SudokuSquareValues prints 4x4 board with array correctly', t => {
    const BOARD = SudokuTestData_1.getBoards().fourByFour.board;
    const sb = SudokuBoard_1.SudokuBoard.CreateFromString(BOARD.beg.pretty);
    // t.log('sb.toPrettyString()');
    // t.log(sb.toPrettyString());
    const ssv = new SudokuSquareValues_1.SudokuSquareValues(sb.core);
    const ssvString = ssv.toString().trim();
    const expectedString = SudokuTestData_1.cleanLeadingSpaces(`
        1234 1234 | 1234 1234
        1234 1234 | 1234 1234
        ----------+----------
        1234 1234 | 1234 1234
        1234 1234 | 1234 1234`.trim());
    // t.log('ssvString:');
    // t.log(ssvString);
    // t.log('expectedString:');
    // t.log(expectedString);
    t.deepEqual(ssvString, expectedString);
});
ava_1.default('SudokuSquareValues prints 9x9 board with array correctly', t => {
    const BOARDS = SudokuTestData_1.getBoards().norvig;
    const sb = SudokuBoard_1.SudokuBoard.CreateFromString(BOARDS.easy.beg.pretty);
    const ssv = new SudokuSquareValues_1.SudokuSquareValues(sb.core);
    const ssvString = ssv.toString().trim();
    const expectedString = SudokuTestData_1.cleanLeadingSpaces(`
    123456789 123456789 123456789 | 123456789 123456789 123456789 | 123456789 123456789 123456789
    123456789 123456789 123456789 | 123456789 123456789 123456789 | 123456789 123456789 123456789
    123456789 123456789 123456789 | 123456789 123456789 123456789 | 123456789 123456789 123456789
    ------------------------------+-------------------------------+------------------------------
    123456789 123456789 123456789 | 123456789 123456789 123456789 | 123456789 123456789 123456789
    123456789 123456789 123456789 | 123456789 123456789 123456789 | 123456789 123456789 123456789
    123456789 123456789 123456789 | 123456789 123456789 123456789 | 123456789 123456789 123456789
    ------------------------------+-------------------------------+------------------------------
    123456789 123456789 123456789 | 123456789 123456789 123456789 | 123456789 123456789 123456789
    123456789 123456789 123456789 | 123456789 123456789 123456789 | 123456789 123456789 123456789
    123456789 123456789 123456789 | 123456789 123456789 123456789 | 123456789 123456789 123456789`.trim());
    t.deepEqual(ssvString, expectedString);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3Vkb2t1U3F1YXJlVmFsdWVzLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc3Vkb2t1L1N1ZG9rdVNxdWFyZVZhbHVlcy5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsK0NBQTRDO0FBQzVDLDZEQUEwRDtBQUMxRCw4Q0FBdUI7QUFDdkIsMkRBQXVFO0FBSXZFLGFBQUksQ0FBQywwREFBMEQsRUFBRSxDQUFDLENBQUMsRUFBRTtJQUNqRSxNQUFNLEtBQUssR0FBRywwQkFBUyxFQUFFLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQztJQUUzQyxNQUFNLEVBQUUsR0FBRyx5QkFBVyxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDMUQsZ0NBQWdDO0lBQ2hDLDhCQUE4QjtJQUc5QixNQUFNLEdBQUcsR0FBRyxJQUFJLHVDQUFrQixDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM1QyxNQUFNLFNBQVMsR0FBRyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDeEMsTUFBTSxjQUFjLEdBQUcsbUNBQWtCLENBQUM7Ozs7OzhCQUtoQixDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7SUFFbkMsdUJBQXVCO0lBQ3ZCLG9CQUFvQjtJQUNwQiw0QkFBNEI7SUFDNUIseUJBQXlCO0lBRXpCLENBQUMsQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLGNBQWMsQ0FBQyxDQUFDO0FBQzNDLENBQUMsQ0FBQyxDQUFDO0FBRUgsYUFBSSxDQUFDLDBEQUEwRCxFQUFFLENBQUMsQ0FBQyxFQUFFO0lBQ2pFLE1BQU0sTUFBTSxHQUFHLDBCQUFTLEVBQUUsQ0FBQyxNQUFNLENBQUM7SUFFbEMsTUFBTSxFQUFFLEdBQUcseUJBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUVoRSxNQUFNLEdBQUcsR0FBRyxJQUFJLHVDQUFrQixDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM1QyxNQUFNLFNBQVMsR0FBRyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDeEMsTUFBTSxjQUFjLEdBQUcsbUNBQWtCLENBQUM7Ozs7Ozs7Ozs7O2tHQVdvRCxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7SUFFdkcsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsY0FBYyxDQUFDLENBQUM7QUFDM0MsQ0FBQyxDQUFDLENBQUMifQ==