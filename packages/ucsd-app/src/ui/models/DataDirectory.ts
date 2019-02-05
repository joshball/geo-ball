import { remote } from "electron";
import { dirname, join, resolve, basename } from "path";
import { decorate, action, observable } from "mobx";

export interface IDataDirectory {
    rootPath: string;
    dirName: string;
    fullPath: string;
}

export class DataDirectory {
    rootPath: string;
    dirName: string;

    get fullPath(): string {
        return `${resolve(join(this.rootPath, this.dirName))}`;
    }

    set fullPath(path: string) {
        const { rootPath, dirName } = DataDirectory.GetDataDirectoryFromPath(path);
        this.rootPath = rootPath;
        this.dirName = dirName;
    }

    get ucsdPath(): string {
        return `${join(this.fullPath, DataDirectory.UCSD_DIRNAME)}`;
    }

    get ucsdOsmPath(): string {
        return `${join(this.ucsdPath, DataDirectory.UCSD_OSM_DIRNAME)}`;
    }


    constructor(...pathArgs: Array<string>) {
        const { rootPath, dirName } = DataDirectory.GetDataDirectoryFromPath(...pathArgs);
        this.rootPath = rootPath;
        this.dirName = dirName;
    }

    getComponents(): IDataDirectory {
        return {
            rootPath: this.rootPath,
            dirName: this.dirName,
            fullPath: this.fullPath,
        }
    }

    async isValid(): Promise<boolean> {
        return Promise.resolve(true);
    }



    static BALLMAPS_DIRNAME = '.ballmaps';
    static UCSD_DIRNAME = 'ucsd';
    static UCSD_OSM_DIRNAME = 'osm';

    static GetDefaultDataDirName = () => DataDirectory.BALLMAPS_DIRNAME;
    static GetDefaultDataRootPath = () => resolve(remote.app.getPath('home'))
    static GetDefaultDataDirPath = () => join(DataDirectory.GetDefaultDataRootPath(), DataDirectory.GetDefaultDataDirName());

    static GetDataDirectoryFromPath(...pathArgs: Array<string>): IDataDirectory {
        if (!pathArgs || pathArgs.length === 0) {
            const rootPath = DataDirectory.GetDefaultDataRootPath();
            const dirName = DataDirectory.GetDefaultDataDirName();
            return {
                rootPath,
                dirName,
                fullPath: join(rootPath, dirName),
            }
        }
        const fullPath = resolve(join(...pathArgs));
        return {
            rootPath: dirname(fullPath),
            dirName: basename(fullPath),
            fullPath
        }
    }
}

decorate(DataDirectory, {
    rootPath: observable,
    dirName: observable,
});
