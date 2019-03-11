import { remote } from 'electron';
import { dirname, join, resolve, basename } from 'path';
import { decorate, action, observable } from 'mobx';

export interface IUcsdAppDataDirMgr {
    rootPath: string;
    dirName: string;
    fullPath: string;
}

export class UcsdAppDataDirMgr implements IUcsdAppDataDirMgr {
    rootPath: string;
    dirName: string;

    get fullPath(): string {
        return `${resolve(join(this.rootPath, this.dirName))}`;
    }

    set fullPath(path: string) {
        const { rootPath, dirName } = UcsdAppDataDirMgr.GetUcsdAppDataDirMgrFromPath(path);
        this.rootPath = rootPath;
        this.dirName = dirName;
    }

    get osmFetchDirPath(): string {
        return `${join(this.fullPath, UcsdAppDataDirMgr.DEFAULT_OSM_FETCHES_DIRNAME)}`;
    }

    constructor(...pathArgs: Array<string>) {
        const { rootPath, dirName } = UcsdAppDataDirMgr.GetUcsdAppDataDirMgrFromPath(...pathArgs);
        this.rootPath = rootPath;
        this.dirName = dirName;
    }

    getComponents(): IUcsdAppDataDirMgr {
        return {
            rootPath: this.rootPath,
            dirName: this.dirName,
            fullPath: this.fullPath,
        };
    }

    async isValid(): Promise<boolean> {
        return Promise.resolve(true);
    }

    static DEFAULT_UCSD_APP_DATA_DIRNAME = '.ucsd';
    static DEFAULT_OSM_FETCHES_DIRNAME = 'osm-fetches';

    /**
     * If zero, we get a default path
     * Otherwise we read the paths, and generate from that
     * @param pathArgs zero or more path args
     */
    static GetUcsdAppDataDirMgrFromPath(...pathArgs: Array<string>): IUcsdAppDataDirMgr {
        const fullPath =
            pathArgs && pathArgs.length
                ? resolve(join(...pathArgs))
                : UcsdAppDataDirMgr.GetDefaultUcsdAppDataDirPath();
        return {
            rootPath: dirname(fullPath),
            dirName: basename(fullPath),
            fullPath,
        };
    }

    static GetDefaultUcsdAppDataDirPath(): string {
        const rootPath = resolve(remote.app.getPath('home'));
        const dirName = UcsdAppDataDirMgr.DEFAULT_UCSD_APP_DATA_DIRNAME;
        return join(rootPath, dirName);
    }
}

decorate(UcsdAppDataDirMgr, {
    rootPath: observable,
    dirName: observable,
});
