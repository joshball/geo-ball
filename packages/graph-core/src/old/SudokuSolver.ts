import { SudokuSquare, Digits, Squares, SquarePeers, SquareUnits, BoardSquareValuesMap, SudokuDigit } from './SudokuCore';
import { assign, nullLogger, consoleLogger, Logger } from './ConstraintPropagation';
import { SlimeBoard, SudokuCellValue } from './SlimeBoard';
import { arraysAreEqual } from '../utils/array';


export class SudokuSolver {
    values: BoardSquareValuesMap
    debug: boolean

    constructor(debug: boolean = false) {
        this.debug = debug;
        this.values = new Map<SudokuSquare, Array<SudokuDigit>>();
        Squares.forEach((square) => {
            this.values.set(square, Array.from(Digits));
        });
    }


    propConstraints(board: Array<SudokuCellValue>) {
        Squares.forEach((square, index) => {
            const digit = board[index];
            if (digit >= 1 && digit <= 9) {
                const logger = this.debug ? consoleLogger : nullLogger;
                assign(this.values, square, digit as SudokuDigit, logger);
            }
        });
    }

    // getBoardArray = (): Array<SudokuCellValue> => {
    getBoardArray = (): Array<number> => {
        // console.log('this.values', this.values)
        return Array.from(this.values, ([_square, values]) => values.length === 1 ? values[0] : 0);
    }

    // getSquareValues(): Array<SquareValues> {
    getSquareValues(): Array<any> {
        return Array.from(this.values, ([square, values]) => {
            return {
                sqr: square as SudokuSquare,
                vals: values
            };
        });
    }

}
export class SlimeSolver {
    values: Map<string, Array<number>>
    debug: boolean
    sb: SlimeBoard;

    constructor(sb: SlimeBoard, debug: boolean = false) {
        this.sb = sb;
        this.debug = debug;
        this.values = new Map<string, Array<number>>();
        sb._core.Squares.forEach((square) => {
            this.values.set(square, Array.from(sb._core.Digits));
        });
    }


    propConstraints() {
        this.sb._core.Squares.forEach((square, index) => {
            const digit = this.sb._boardArray[index];
            // if (digit >= 1 && digit <= 9) {
            if (this.sb._core.isValidCellGuess(digit)) {
                const logger = this.debug ? consoleLogger : nullLogger;
                this.assign(this.values, square, digit, logger);
            }
        });
    }


    // export const eliminatePeers = (bsv: BoardSquareValuesMap, square: SudokuSquare, digit: SudokuDigit, log: Logger, level: number) => {
    /**
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
    eliminateDigitFromPeersOfSquare(bsv: BoardSquareValuesMap, square: string, digit: number, log: Logger, level: number) {

        // bsv.A1 = [1,2,3,4]
        // square = 'A1'
        // digit = 2 (then 3,4)


        const squareValues = bsv.get(square)!;
        // squareValues = [1,2,3,4];

        const digPos = squareValues.indexOf(digit);
        // digPos(1) = 0;
        log(level, `  elim(${digit} from ${square}) pv: [${squareValues}] (at index ${digPos})`);

        if (digPos < 0) {
            // log(level, `   NOTHING_TO_DO: digit ${digit} is not in values: ${squareValues}`)
            return;
        }

        squareValues.splice(digPos, 1);
        // squareValues = [2,3,4]
        log(level, `  elim(${digit} from ${square}) removed digit ${digit} from sqaure ${square} posVal: [${squareValues}]`);
        if (squareValues.length === 0) {
            console.log(this.sb.toPrettyValueString(this.getBoardValuesArray()));
            throw new Error(`square[${square}] has zero len possibleValues`);
        }


        // If a square is reduced to a single value, remove it from its peers.
        if (squareValues.length === 1) {
            log(level, `  elim(${digit} from ${square}) has single value, so removing from peers`);
            const newDigToElim = squareValues[0];
            log(level, `  YES PROPOGATING removal of single value (${newDigToElim}) from peers of square(${square}))`);
            log(level, `    SquarePeers:${JSON.stringify(this.sb._core.SquarePeers[square])}`);
            this.sb._core.SquarePeers[square].forEach(peerSquare => this.eliminateDigitFromPeersOfSquare(bsv, peerSquare, newDigToElim, log, level + 1));
        }
        else {
            log(level, `  elim(${digit} from ${square}) square ${square} has more than one value left, skipping removal from peers`);
        }

        // if (squareValues.length === 2) {
        //     log(level, `  elim(${digit} from ${square}) has two value, so search for naked twins from peers`);
        //     log(level, `  YES checking twin values [${squareValues}] from peers of square(${square}))`);
        //     log(level, `    SquarePeers:${JSON.stringify(this.sb._core.SquarePeers[square])}`);
        //     const sortedValues = squareValues.sort();
        //     const twins = this.sb._core.SquarePeers[square].filter(peerSquare => {
        //         const peerValues = bsv.get(peerSquare)!.sort();
        //         const areEqual = arraysAreEqual(sortedValues, peerValues);
        //         // tslint:disable-next-line:triple-equals
        //         log(level, `searching for twins of peer ${peerSquare} [${peerValues}] == ${sortedValues} == ${areEqual}`);
        //         // tslint:disable-next-line:triple-equals
        //         return areEqual;
        //     });
        //     log(level, `  Twins found [${twins}] `);
        //     if (twins.length > 1) {
        //         console.log(this.sb.toPrettyValueString(this.getBoardValuesArray()));
        //         throw new Error('Invalid twins state')
        //     }
        //     if (twins.length === 1) {
        //         log(level, `  elim(${digit} from ${square}) FOUND A TWIN ${twins[0]}`);
        //         const nonTwins = this.sb._core.SquarePeers[square].filter(peerSquare => {
        //             const peerValues = bsv.get(peerSquare)!.sort();
        //             const areEqual = arraysAreEqual(sortedValues, peerValues);
        //             if (areEqual) {
        //                 return false;
        //             }
        //             return true;
        //         });
        //         log(level, `  elim(${digit} from ${square}) NON-TWIN SQUARES ${nonTwins}`);
        //         nonTwins.forEach(nonTwinSquare => {
        //             const nonTwinValues = bsv.get(nonTwinSquare)!;
        //             log(level, `  elim(${digit} from ${square}) Elim ${sortedValues} from ${nonTwinSquare} values: [${nonTwinValues}]`);
        //             sortedValues.forEach(twinValue => {
        //                 const twinPos = nonTwinValues.indexOf(twinValue);
        //                 if (twinPos >= 0) {
        //                     nonTwinValues.splice(twinPos, 1);
        //                 }
        //             })
        //         });

        //         // process.exit();
        //     }
        // }
        // else {
        //     log(level, `  elim(${digit} from ${square}) square ${square} has more than two values left, skipping twins`);
        // }


        // if a unit is reduced to only one place for a valude, then put it in there
        const SUS = this.sb._core.SquareUnits[square];
        // const SUS = [
        //     ["A1", "B1", "C1", "D1"],
        //     ["A1", "A2", "A3", "A4"],
        //     ["A1", "A2", "B1", "B2"]
        // ];
        log(level, `  elim(${digit} from ${square}) Square[${square}] UNITS: [${SUS.length}]`);
        // log(level, `  elim(${digit} from ${square}) ${JSON.stringify(SUS)}`);
        log(level, `  elim(${digit} from ${square}) [${SUS}]`);

        SUS.forEach(unitSquares => {
            // log(level, `   elim.SUS(${digit} from ${square}) ${JSON.stringify(unitSquares)}`);
            log(level, `   elim.SUS(${digit} from ${square}) [${unitSquares}]`);
            // const unitSquares = ["A1", "B1", "C1", "D1"];
            const unitSquaresWithDigitInThem = unitSquares.filter(unitSquare => bsv.get(unitSquare)!.indexOf(digit) >= 0);
            // const unitSquaresWithDigitInThem = ["B1", "C1", "D1"]
            log(level, `   elim.SUS(${digit} from ${square}) unitSquares with digit in them [${unitSquaresWithDigitInThem}]`);
            if (unitSquaresWithDigitInThem.length === 0) {
                throw new Error(`square[${square}] has zero len possibleValues`);
            }
            if (unitSquaresWithDigitInThem.length === 1) {
                log(level, `   elim.SUS(${digit} from ${square}) ASSIGNING(${unitSquaresWithDigitInThem[0]}, ${digit}) as ONLY ONE unitSquare with digit in it [${unitSquaresWithDigitInThem[0]}]`);
                this.assign(bsv, unitSquaresWithDigitInThem[0], digit, log, level + 1);
            }
            // if (unitSquaresWithDigitInThem.length === 2) {
            //     log(level, `   elim.SUS(${digit} from ${square}) ASSIGNING(${unitSquaresWithDigitInThem[0]}, ${digit}) as ONLY ONE unitSquare with digit in it [${unitSquaresWithDigitInThem[0]}]`);
            //     this.assign(bsv, unitSquaresWithDigitInThem[0], digit, log, level + 1);
            // }
        })
        log(level, `level${level}`)
        // process.exit()
    }

    // export const assign = (bsv: BoardSquareValuesMap, square: SudokuSquare, digit: SudokuDigit, log: Logger = nullLogger, level: number = 1) => {
    assign(bsv: BoardSquareValuesMap, square: string, digit: number, log: Logger = nullLogger, level: number = 1) {
        const possibleValuesForSquare = bsv.get(square)!;
        if (level < 2) {
            console.log('ASSIGN LEVEL 1 BOARD VALUES');
            console.log(this.sb.toPrettyValueString(this.getBoardValuesArray()));
            // console.log(this.sb.toPrettyString());
            // console.log(this.getBoardArray());
            // console.log(this.getSquareValues());
        }
        log(level, `ASSIGN(${digit} => ${square}) PV: [${possibleValuesForSquare}]`);

        const possibleValuesOtherThanDigitTrying = possibleValuesForSquare.filter(v => v !== digit);
        if (possibleValuesOtherThanDigitTrying.length !== possibleValuesForSquare.length - 1) {
            throw new Error('Digit was never in the possible values!');
        }
        // log(level, `possibleValuesOtherThanDigitTrying: ${possibleValuesOtherThanDigitTrying}`);

        log(level, `ASSIGN.eliminating other digits (since assigned above) from peers of square: [${possibleValuesOtherThanDigitTrying}]`);
        possibleValuesOtherThanDigitTrying.forEach(otherDigit => {
            log(level, `ASSIGN.eliminating other digit ${otherDigit} from peers of square ${square}`);
            this.eliminateDigitFromPeersOfSquare(bsv, square, otherDigit, log, level + 1)
        });
    }

    getBoardArray = (): Array<number> => {
        // console.log('this.values', this.values)
        return Array.from(this.values, ([_square, values]) => values.length === 1 ? values[0] : 0);
    }
    getBoardValuesArray = (): Array<Array<number>> => {
        // console.log('this.values', this.values)
        return Array.from(this.values, ([_square, values]) => values as Array<number>);
    }

    getSquareValues(): Array<any> {
        return Array.from(this.values, ([square, values]) => {
            return {
                sqr: square as SudokuSquare,
                vals: values
            };
        });
    }

}
