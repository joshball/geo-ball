import { UcsdDataFiles } from '@ball-maps/ucsd-core';

export interface ICommonState {
    title: string
    dir: {
        home: string,
        userData: string,
        managed: string,
        ucsdDataFiles: UcsdDataFiles,
    }
}
