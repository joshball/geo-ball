import { action, decorate } from 'mobx';
import { IState } from '../state/State';
import { resolve } from 'path';
import { UcsdDataFiles } from '@ball-maps/ucsd-core';
import { FileStorageService } from '../services/FileStorageService';


export class DataStore {
    state!: IState
    FSS: FileStorageService;

    constructor(state: IState) {
        this.state = state
        this.FSS = new FileStorageService(state.data.dir.managed);
    }

    getManagedDirectory(): string {
        return this.state.data.dir.managed;
    }

    async setManagedDirectory(managedDirPath: string) {
        const resolvedManagedDirPath = resolve(managedDirPath)
        this.FSS = await FileStorageService.CreateFileStorageService(resolvedManagedDirPath);
        this.state.data.dir.managed = resolvedManagedDirPath;
    }
}

decorate(DataStore, {
    getManagedDirectory: action,
    setManagedDirectory: action,
});

// export class DataStore {
//     state!: IState
//     FSS: FileStorageService;

//     constructor(state: IState) {
//         this.state = state
//         this.FSS = new FileStorageService(state.data.dir.managed);
//     }

//     getManagedDirectoryEx(): string {
//         return this.state.data.dir.managed;
//     }

//     @action
//     getManagedDirectory(): string {
//         return this.state.data.dir.managed;
//     }

//     @action
//     async setManagedDirectory(managedDirPath: string) {
//         const resolvedManagedDirPath = resolve(managedDirPath)
//         this.FSS = await FileStorageService.CreateFileStorageService(resolvedManagedDirPath);
//         this.state.data.dir.managed = resolvedManagedDirPath;
//     }
// }


// const ucsdDataFiles = new UcsdDataFiles(managed);



