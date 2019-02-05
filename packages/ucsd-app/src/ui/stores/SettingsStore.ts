import { action, decorate, observable } from 'mobx';
import { IState } from '../state/State';
import { resolve } from 'path';
import { FileStorageService } from '../services/FileStorageService';
import { DataDirectory } from '../models/DataDirectory';


export class SettingsStore {
    dataDirectory: DataDirectory;

    constructor(state: IState) {
        const resolvedDataDirPath = resolve(state.data.dataDirectory.path)
        this.dataDirectory = new DataDirectory(resolvedDataDirPath);
    }

    getDataDirectory(): DataDirectory {
        return this.dataDirectory;
    }

    async setDataDirectoryPath(dataDirPath: string) {
        const resolvedDataDirPath = resolve(dataDirPath)
        this.dataDirectory.fullPath = resolvedDataDirPath;
    }
}

decorate(SettingsStore, {
    // dataDirectory: observable,
    getDataDirectory: action,
    setDataDirectoryPath: action,
});


