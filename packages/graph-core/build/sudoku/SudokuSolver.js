"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SudokuSquareValues_1 = require("./SudokuSquareValues");
const SudokuBoardStrings_1 = require("./SudokuBoardStrings");
exports.nullLogger = (_level, _s) => undefined;
exports.consoleLogger = (level, s) => {
    let space = '';
    for (let i = 0; i < level; i++) {
        space += ' ';
    }
    console.log(`${space}${s}`);
};
class SudokuSolver {
    constructor(core, debug = false) {
        this.getBoardArray = () => {
            // console.log('this.values', this.values)
            return this.getBoardValuesArray().map(values => values.length === 1 ? values[0] : 0);
        };
        this.getBoardValuesArray = () => {
            // console.log('this.values', this.values)
            return Array.from(this._ssv, ([_square, values]) => values);
        };
        this._core = core;
        this._ssv = new SudokuSquareValues_1.SudokuSquareValues(core, debug);
        this._debug = debug;
        this.log = debug ? exports.consoleLogger : exports.nullLogger;
    }
    propConstraints(sb) {
        const boardArray = sb.toArray();
        this._core.Squares.forEach((square, index) => {
            const digit = boardArray[index];
            if (this._core.isValidCellGuess(digit)) {
                this.assign(square, digit);
            }
        });
    }
    _logBoard(heading, level, levelToLog) {
        if (level <= levelToLog) {
            this.log(0, heading);
            this.log(0, SudokuBoardStrings_1.SudokuBoardStrings.ArrayOfValuesToPrettyString(this.getBoardValuesArray()));
        }
    }
    search() {
        const minSquare = this._getSquareWithLeastValuesGreaterThanOne();
        if (minSquare.values.length === 1) {
            return;
        }
        minSquare.values.forEach((digit) => {
            this.assign(minSquare.square, digit);
        });
    }
    _getSquareWithLeastValuesGreaterThanOne() {
        let currMinLen = this._core.Size;
        const currMin = {};
        for (const square of this._core.Squares) {
            const values = this._ssv.get(square);
            if (values.length === 2) {
                return { square, sv: values };
            }
            if (values.length < currMinLen) {
                currMinLen = values.length;
                currMin.square = square;
                currMin.values = values;
            }
        }
        return currMin;
    }
    /**
     * Assign takes a square and a digit.
     * It grabs all the possible values for that square (from the SSV), and removes each one
     * from its peers of the square. IF there is a contradiction, it will throw.
     * @param square
     * @param digit
     * @param level
     */
    assign(square, digit, level = 1) {
        const possibleValuesForSquare = this._ssv.get(square);
        const possibleValuesOtherThanDigitTrying = possibleValuesForSquare.filter(v => v !== digit);
        this._logBoard('ASSIGN LEVEL 1 BOARD VALUES', level, 1);
        this.log(level, `ASSIGN(${digit} => ${square}) PV: [${possibleValuesForSquare}]`);
        if (possibleValuesOtherThanDigitTrying.length !== possibleValuesForSquare.length - 1) {
            throw new Error('Digit was never in the possible values!');
        }
        this.log(level, `ASSIGN.eliminating other digits (since assigned above) from peers of square: [${possibleValuesOtherThanDigitTrying}]`);
        // square = 'A1', digit = 1, allValues = [1,2,3,4], otherValues = [2,3,4]
        possibleValuesOtherThanDigitTrying.forEach(otherDigit => {
            this.log(level, `ASSIGN.eliminating other digit ${otherDigit} from peers of square ${square}`);
            // square = 'A1', otherDigit = 2 (then 3, then 4)
            this._eliminateDigitFromPeersOfSquare(square, otherDigit, level + 1);
        });
    }
    /**
     * The fundamental operation of constrain propogation is eliminateDigitFromPeersOfSquare
     * It is the fun part of sudoku that requires no guessing. Once you assign a square a digit
     * you go through and 'cleanup' the peers, removing the possibility of the other digits
     * Lets say you have square A1 with values [1,2,3,4]
     * And you want to assign 1 to A1. You would want to eliminate [2,3,4] from Peers of A1
     * The idea here is if you assign a digit to a square, you want to eliminate the other values that could have been
     * in that square
     * @param bsv
     * @param square
     * @param digit
     * @param log
     * @param level
     */
    _eliminateDigitFromPeersOfSquare(square, digit, level) {
        const squareStr = square;
        // bsv.A1 = [1,2,3,4]
        // square = 'A1'
        // digit = 2 (then 3,4)
        const squareValues = this._findAndRemoveDigitFromSquareValues(square, digit, level);
        if (!squareValues) {
            return;
        }
        this._ifSquareValuesHasOnlyOneValueRemoveItFromPeers(square, digit, squareValues, level);
        // if a unit is reduced to only one place for a valude, then put it in there
        const SUS = this._core.SquareUnits[squareStr];
        // const SUS = [
        //     ["A1", "B1", "C1", "D1"],
        //     ["A1", "A2", "A3", "A4"],
        //     ["A1", "A2", "B1", "B2"]
        // ];
        this.log(level, `  elim(${digit} from ${square}) Square[${square}] UNITS: [${SUS.length}]`);
        // log(level, `  elim(${digit} from ${square}) ${JSON.stringify(SUS)}`);
        this.log(level, `  elim(${digit} from ${square}) [${SUS}]`);
        SUS.forEach(unitSquares => {
            this.log(level, `   elim.SUS(${digit} from ${square}) [${unitSquares}]`);
            this._assignDigitToUnitSquareIfOnlySquareInUnitWithDigitInIt(square, unitSquares, digit, level);
        });
    }
    _findAndRemoveDigitFromSquareValues(square, digit, level) {
        const squareValues = this._ssv.get(square);
        const digPos = squareValues.indexOf(digit);
        // digPos(2) = 1;
        this.log(level, `  elim(${digit} from ${square}) pv: [${squareValues}] (at index ${digPos})`);
        if (digPos < 0) {
            // log(level, `   NOTHING_TO_DO: digit ${digit} is not in values: ${squareValues}`)
            return;
        }
        squareValues.splice(digPos, 1);
        // squareValues = [1,3,4]
        this.log(level, `$$ elim(${digit} from ${square}) removed digit ${digit} from sqaure ${square} posVal: [${squareValues}]`);
        //
        // If a square is reduced to one value d2, then eliminate d2 from the peers.
        //
        if (squareValues.length === 0) {
            console.log(SudokuBoardStrings_1.SudokuBoardStrings.ArrayOfValuesToPrettyString(this.getBoardValuesArray()));
            throw new Error(`square[${square}] has zero len possibleValues`);
        }
        return squareValues;
    }
    _ifSquareValuesHasOnlyOneValueRemoveItFromPeers(square, origDigit, squareValues, level) {
        const squareStr = square;
        if (squareValues.length === 1) {
            this.log(level, `  elim(${origDigit} from ${square}) has single value, so removing from peers`);
            const newDigToElim = squareValues[0];
            this.log(level, `  YES PROPOGATING removal of single value (${newDigToElim}) from peers of square(${square}))`);
            this.log(level, `    SquarePeers:${JSON.stringify(this._core.SquarePeers[squareStr])}`);
            this._core.SquarePeers[squareStr].forEach(peerSquare => this._eliminateDigitFromPeersOfSquare(peerSquare, newDigToElim, level + 1));
        }
        else {
            this.log(level, `  elim(${origDigit} from ${square}) square ${square} has more than one value left, skipping removal from peers`);
        }
    }
    _assignDigitToUnitSquareIfOnlySquareInUnitWithDigitInIt(square, unitSquares, digit, level) {
        this.log(level, `   elim.SUS(${digit} from ${square}) [${unitSquares}]`);
        // const unitSquares = ["A1", "B1", "C1", "D1"];
        const unitSquaresWithDigitInThem = this._getSquaresWithDigitInThem(unitSquares, digit);
        // const unitSquaresWithDigit (digiti:2) InThem = ["B1", "C1", "D1"] (note, we removed it from A1 above)
        this.log(level, `   elim.SUS(${digit} from ${square}) unitSquares with digit in them [${unitSquaresWithDigitInThem}]`);
        if (unitSquaresWithDigitInThem.length === 0) {
            throw new Error(`square[${square}] has zero len possibleValues`);
        }
        if (unitSquaresWithDigitInThem.length === 1) {
            this.log(level, `   elim.SUS(${digit} from ${square}) ASSIGNING(${unitSquaresWithDigitInThem[0]}, ${digit}) as ONLY ONE unitSquare with digit in it [${unitSquaresWithDigitInThem[0]}]`);
            this.assign(unitSquaresWithDigitInThem[0], digit, level + 1);
        }
    }
    _getSquaresWithDigitInThem(unitSquares, digit) {
        return unitSquares.filter(unitSquare => this._ssv.get(unitSquare).indexOf(digit) >= 0);
    }
    getSquareValues() {
        return Array.from(this._ssv, ([square, values]) => {
            return {
                sqr: square,
                vals: values
            };
        });
    }
}
exports.SudokuSolver = SudokuSolver;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3Vkb2t1U29sdmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3N1ZG9rdS9TdWRva3VTb2x2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSw2REFBMEQ7QUFDMUQsNkRBQTBEO0FBTTdDLFFBQUEsVUFBVSxHQUFXLENBQUMsTUFBYyxFQUFFLEVBQVUsRUFBRSxFQUFFLENBQUMsU0FBUyxDQUFDO0FBRS9ELFFBQUEsYUFBYSxHQUFXLENBQUMsS0FBYSxFQUFFLENBQVMsRUFBRSxFQUFFO0lBQzlELElBQUksS0FBSyxHQUFHLEVBQUUsQ0FBQTtJQUNkLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDNUIsS0FBSyxJQUFJLEdBQUcsQ0FBQztLQUNoQjtJQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQTtBQUMvQixDQUFDLENBQUE7QUFLRCxNQUFhLFlBQVk7SUFNckIsWUFBWSxJQUErRCxFQUFFLFFBQWlCLEtBQUs7UUErTG5HLGtCQUFhLEdBQUcsR0FBa0IsRUFBRTtZQUNoQywwQ0FBMEM7WUFDMUMsT0FBTyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN6RixDQUFDLENBQUE7UUFDRCx3QkFBbUIsR0FBRyxHQUF5QixFQUFFO1lBQzdDLDBDQUEwQztZQUMxQyxPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxFQUFFLEVBQUUsQ0FBQyxNQUFrQyxDQUFDLENBQUM7UUFDNUYs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