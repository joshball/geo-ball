// // import { BoardSquaresValues, SquareValues } from "./ConstraintPropagation";

// export class SudokuBoardConversions {
//     static ConvertBoardSquareValuesToArray(bsv: BoardSquaresValues): { boardArray: Array<number>, badSquares: Array<SquareValues> } {
//         const badSquares: SquareValues[] = [];
//         const boardArray = Object.keys(bsv).map((square) => {
//             const sv = bsv[square];
//             if (sv.possibleValues.length !== 1) {
//                 badSquares.push(sv);
//                 return 0;
//             }
//             return sv.possibleValues[0];
//         })
//         return { boardArray, badSquares };
//     }
// }
