import { action, decorate } from 'mobx';
import { IState } from '../state/State';
import { resolve } from 'path';
import { FileStorageService } from '../services/FileStorageService';
import { DataDirectory } from '../models/DataDirectory';


export class DataStore {
    state!: IState
    // FSS: FileStorageService;
    dataDirectory: DataDirectory;

    constructor(state: IState) {
        this.state = state
        this.dataDirectory = new DataDirectory(state.data.dataDirectory.path);
        // this.FSS = new FileStorageService(state.data.dataDirectory.path);
    }

    getDataDirectoryPath(): string {
        return this.state.data.dataDirectory.path;
    }

    getDataDirectory(): DataDirectory {
        return this.dataDirectory;
    }

    async setDataDirectoryPath(dataDirPath: string) {
        const resolvedDataDirPath = resolve(dataDirPath)
        // this.FSS = await FileStorageService.CreateFileStorageService(resolvedDataDirPath);
        this.state.data.dataDirectory.path = resolvedDataDirPath;
    }
}

decorate(DataStore, {
    getDataDirectoryPath: action,
    setDataDirectoryPath: action,
});

// export class DataStore {
//     state!: IState
//     FSS: FileStorageService;

//     constructor(state: IState) {
//         this.state = state
//         this.FSS = new FileStorageService(state.data.dataDirectory.path);
//     }

//     getManagedDirectoryEx(): string {
//         return this.state.data.dataDirectory.path;
//     }

//     @action
//     getManagedDirectory(): string {
//         return this.state.data.dataDirectory.path;
//     }

//     @action
//     async setManagedDirectory(managedDirPath: string) {
//         const resolvedManagedDirPath = resolve(managedDirPath)
//         this.FSS = await FileStorageService.CreateFileStorageService(resolvedManagedDirPath);
//         this.state.data.dataDirectory.path = resolvedManagedDirPath;
//     }
// }


// const ucsdDataFiles = new UcsdDataFiles(managed);



