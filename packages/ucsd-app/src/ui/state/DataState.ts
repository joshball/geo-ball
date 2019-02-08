import { UcsdAppDataDirMgr } from '../models/UcsdAppDataDirMgr';
export interface IDataState {
    ucsdAppDataDir: IUcsdAppDataDirState;
}
export interface IUcsdAppDataDirState {
    path: string;
}


export class DataState implements IDataState {
    ucsdAppDataDir: IUcsdAppDataDirState;

    constructor(ucsdAppDataDir?: IUcsdAppDataDirState | undefined) {
        this.ucsdAppDataDir = new UcsdAppDataDirState(ucsdAppDataDir
            ? ucsdAppDataDir.path
            : UcsdAppDataDirMgr.GetDefaultUcsdAppDataDirPath());
            console.log('DataState() this.ucsdAppDataDir', this.ucsdAppDataDir)
    }
}

export class UcsdAppDataDirState implements IUcsdAppDataDirState {
    path: string;
    constructor(path: string) {
        this.path = path;
    }
}
