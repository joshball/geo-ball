import { DataDirectory } from '../models/DataDirectory';
export interface IDataState {
    dataDirectory: IDataDirectoryState;
}
export interface IDataDirectoryState {
    path: string;
}


export class DataState implements IDataState {
    dataDirectory: IDataDirectoryState;

    constructor(dataDirectory?: IDataDirectoryState | undefined) {
        this.dataDirectory = new DataDirectoryState(dataDirectory ? dataDirectory.path : undefined);
    }
}

export class DataDirectoryState implements IDataDirectoryState {
    path: string;
    constructor(path?: string | undefined) {
        this.path = path ? path : DataDirectory.GetDefaultDataDirPath();
    }
}
