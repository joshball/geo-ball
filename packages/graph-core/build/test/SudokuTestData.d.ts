import { INorvigTestBoards } from './SudokuTestData.norvig';
export declare const dumpBoards: (lhs: any[], rhs: any[]) => void;
export declare const dumpBoard: (board: any[]) => void;
export declare const dumpValues: (bsv: any) => void;
export interface ITestBoardStrings {
    string: string;
    pretty: string;
}
export interface ITestBoard {
    beg: ITestBoardStrings;
    end: ITestBoardStrings;
}
export interface IEmptyBoard {
    empty: ITestBoardStrings;
    emptyValues: string;
}
export declare const cleanLeadingSpaces: (str: string) => string;
export declare const stringifyCleaner: (_key: string, value: any) => string;
export declare const getBoards: () => {
    fourByFour: {
        board: ITestBoard;
        empty: IEmptyBoard;
    };
    aOneMissing: ITestBoard;
    boardOne: any;
    norvig: INorvigTestBoards;
};
export declare const getExpectedData: () => {
    boxes: any;
    squares: any;
    unitLists: any;
    units: any;
    peers: any;
    peersSorted: any;
};
