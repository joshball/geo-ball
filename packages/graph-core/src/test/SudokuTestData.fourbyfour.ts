import { ITestBoard, IEmptyBoard } from './SudokuTestData';

export const emptyBoard: IEmptyBoard = {
    empty: {
        string: '................',
        pretty: `
            0 0 | 0 0
            0 0 | 0 0
            ----+----
            0 0 | 0 0
            0 0 | 0 0
        `
    },
    emptyValues: `
        1234 1234 | 1234 1234
        1234 1234 | 1234 1234
        ----------+----------
        1234 1234 | 1234 1234
        1234 1234 | 1234 1234
    `
};

export const testBoard: ITestBoard = {
    beg: {
        string: '1234............',
        pretty: `
            1 2 | 3 4
            0 0 | 0 0
            ----+----
            0 0 | 0 0
            0 0 | 0 0
        `
    },
    end: {
        string: '1234341221434321',
        pretty: `
            1 2 | 3 4
            3 4 | 1 2
            ----+----
            2 1 | 4 3
            4 3 | 2 1
        `
    }
};

