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
//# sourceMappingURL=SudokuSolver.js.map