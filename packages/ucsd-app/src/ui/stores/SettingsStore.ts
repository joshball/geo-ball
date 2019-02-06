import { action, decorate, observable } from 'mobx';
import { IState } from '../state/State';
import { resolve } from 'path';
import { FileStorageService } from '../services/FileStorageService';
import { UcsdAppDataDirMgr } from '../models/UcsdAppDataDirMgr';


export class SettingsStore {
    ucsdAppDataDirMgr: UcsdAppDataDirMgr;

    constructor(state: IState) {
        const resolvedDataDirPath = resolve(state.data.ucsdAppDataDir.path)
        this.ucsdAppDataDirMgr = new UcsdAppDataDirMgr(resolvedDataDirPath);
    }

    getUcsdAppDataDirMgr(): UcsdAppDataDirMgr {
        return this.ucsdAppDataDirMgr;
    }

    async setUcsdAppDataDirMgrPath(ucsdAppDataDirMgrPath: string) {
        const resolvedUcsdAppDataDirMgrPath = resolve(ucsdAppDataDirMgrPath)
        this.ucsdAppDataDirMgr.fullPath = resolvedUcsdAppDataDirMgrPath;
    }
}

decorate(SettingsStore, {
    getUcsdAppDataDirMgr: action,
    setUcsdAppDataDirMgrPath: action,
});


