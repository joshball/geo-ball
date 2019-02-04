import { remote, BrowserWindow } from "electron";
import { resolve, join } from "path";
import ipc from "../../background/better-ipc";
import { CHANNELS } from '../../background/index.new';
import { ensureExistsCallback, IReaddirParams, IReaddirOptions, isBufferType } from '../../background/bg-fs';
import { PointMapsFile, RoadSegmentsFile, IntersectionsFile } from "@ball-maps/ucsd-core";
import { OpenStreetmapFile } from "@ball-maps/osm-data";
import { Dirent, writeFileSync } from 'fs';

const backgroundWindow = remote.getGlobal('backgroundWindow') as BrowserWindow;
console.log('backgroundWindow:', backgroundWindow);
if (!backgroundWindow) {
    throw new Error('backgroundWindow global not set!');
}

export interface IMapDataFileSet {
    osm: OpenStreetmapFile;
    rsf: RoadSegmentsFile;
    pmf: PointMapsFile;
    int: IntersectionsFile;
}

// export interface IFileStorageService {
//     // getMapDataFileSets: () => Promise<Array<IMapDataFileSet>>
// }

export class FileStorageService {


    static async EnsureDirectoryStructure(dirToEnsure: string): Promise<void> {
        await ipc.callRender(backgroundWindow, CHANNELS.ensureExists, dirToEnsure);
    }

    static async ReadDir(path: string, options?: IReaddirOptions | undefined): Promise<Array<string | Dirent | Buffer[]>> {
        const params: IReaddirParams = { path, options };
        if (options && options.withFileTypes) {
            return ipc.callRender(backgroundWindow, CHANNELS.readdir, params) as Promise<Array<Dirent>>;
        }
        if (options && options.encoding && isBufferType(options.encoding)) {
            return ipc.callRender(backgroundWindow, CHANNELS.readdir, params) as Promise<Array<Buffer[]>>;
        }
        return ipc.callRender(backgroundWindow, CHANNELS.readdir, params) as Promise<Array<string>>;
    }

    static async ReadDirWithFullPaths(path: string, options?: IReaddirOptions | undefined): Promise<Array<string | Dirent | Buffer[]>> {
        if (options && options.withFileTypes) {
            return FileStorageService.ReadDir(path) as Promise<Array<Dirent>>;
        }
        if (options && options.encoding && isBufferType(options.encoding)) {
            return FileStorageService.ReadDir(path) as Promise<Array<Buffer[]>>;
        }
        return (FileStorageService.ReadDir(path) as Promise<Array<string>>)
            .then(files => files.map((f: string) => resolve(join(path, f))));
    }
}


// import { homedir, userInfo, type } from 'os';
//  os.homedir()               C:\Users\joshua
// app.getPath('home')         C:\Users\joshua
// app.getPath('appData')      C:\Users\joshua\AppData\Roaming
// app.getPath('userData')     C:\Users\joshua\AppData\Roaming\UCSD Map App
// app.getPath('temp')         C:\Users\joshua\AppData\Local\Temp
// app.getPath('exe')          C:\Users\joshua\Google Drive\_src\ball-maps\packages\ucsd-app\node_modules\electron\dist\electron.exe
// app.getPath('logs')         C:\Users\joshua\AppData\Roaming\Electron\logs
// app.getPath('module')       C:\Users\joshua\Google Drive\_src\ball-maps\packages\ucsd-app\node_modules\electron\dist\electron.exe
// app.getPath('downloads')    W:\Users\joshua\Downloads
// console.log('os.homedir:', homedir())
// console.log('os.userInfo:', userInfo())
// console.log("app.getPath('home')", app.getPath('home'))
// console.log("app.getPath('appData')", app.getPath('appData'))
// console.log("app.getPath('userData')", app.getPath('userData'))
// console.log("app.getPath('temp')", app.getPath('temp'))
// console.log("app.getPath('exe')", app.getPath('exe'))
// console.log("app.getPath('logs')", app.getPath('logs'))
// console.log("app.getPath('module')", app.getPath('module'))
// console.log("app.getPath('downloads')", app.getPath('downloads'))
