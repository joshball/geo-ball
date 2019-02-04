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
        return `${join(this.rootPath, this.dirName)}`;
    }

    set fullPath(path: string) {
        const { rootPath, dirName } = DataDirectory.GetDataDirectoryFromPath(path);
        this.rootPath = rootPath;
        this.dirName = dirName;
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

    static GetDefaultDataRootPath = () => resolve(remote.app.getPath('home'))
    static GetDefaultDataDirName = () => '.ucsd';
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
