import { remote, BrowserWindow } from "electron";
import { resolve, join } from "path";
import ipc from "../../background/better-ipc";
import { CHANNELS } from '../../background/index.new';
import { IReaddirParams, IReaddirOptions, isBufferType } from '../../background/bg-fs';
import { Dirent } from 'fs';

const backgroundWindow = remote.getGlobal('backgroundWindow') as BrowserWindow;
console.log('backgroundWindow:', backgroundWindow);
if (!backgroundWindow) {
    throw new Error('backgroundWindow global not set!');
}


// export interface IFileStorageService {
//     // getMapDataFileSets: () => Promise<Array<IMapDataFileSet>>
// }

export class FileStorageService {


    static async EnsureDirectoryStructure(dirToEnsure: string): Promise<void> {
        await ipc.callRender(backgroundWindow, CHANNELS.FS.ensureExists, dirToEnsure);
    }

    static async ReadDir(directoryPath: string, options?: IReaddirOptions | undefined): Promise<Array<string | Dirent | Buffer[]>> {
        console.log('FSS>ReadDir #######################################################################');
        console.log('FSS.ReadDir directoryPath: ', directoryPath);
        const params: IReaddirParams = { path: directoryPath, options };
        if (options && options.withFileTypes) {
            return ipc.callRender(backgroundWindow, CHANNELS.FS.readdir, params) as Promise<Array<Dirent>>;
        }
        if (options && options.encoding && isBufferType(options.encoding)) {
            return ipc.callRender(backgroundWindow, CHANNELS.FS.readdir, params) as Promise<Array<Buffer[]>>;
        }
        return ipc.callRender(backgroundWindow, CHANNELS.FS.readdir, params) as Promise<Array<string>>;
    }

    static async ReadDirWithFullPaths(directoryPath: string, options?: IReaddirOptions | undefined): Promise<Array<string | Dirent | Buffer[]>> {
        console.log('ReadDirWithFullPaths.$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$')
        console.log('ReadDirWithFullPaths.$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$')
        console.log('ReadDirWithFullPaths.$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$')
        console.log('ReadDirWithFullPaths.directoryPath:', directoryPath)
        if (options && options.withFileTypes) {
            return FileStorageService.ReadDir(directoryPath) as Promise<Array<Dirent>>;
        }
        if (options && options.encoding && isBufferType(options.encoding)) {
            return FileStorageService.ReadDir(directoryPath) as Promise<Array<Buffer[]>>;
        }
        return (FileStorageService.ReadDir(directoryPath) as Promise<Array<string>>)
            // .then(directoryFiles => directoryFiles.map((singleFile: string) => resolve(join(directoryPath, singleFile))));
            .then(directoryFiles => {
                console.log('ReadDirWithFullPaths.$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$')
                console.log('ReadDirWithFullPaths.$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$')
                console.log('ReadDirWithFullPaths.$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$')
                console.log('ReadDir RESPONSE: directoryFiles', directoryFiles)
                console.log('ReadDirWithFullPaths.directoryPath:', directoryPath)
                console.log('ReadDirWithFullPaths.directoryFiles:', directoryFiles)
                return directoryFiles.map((singleFile: string) => resolve(join(directoryPath, singleFile)))
            });
    }
}


// import { homedir, userInfo, type } from 'os';
//  os.homedir()               C:\Users\joshua
// app.getPath('home')         C:\Users\joshua
// app.getPath('appData')      C:\Users\joshua\AppData\Roaming
// app.getPath('userData')     C:\Users\joshua\AppData\Roaming\UCSD Map App
// app.getPath('temp')         C:\Users\joshua\AppData\Local\Temp
// app.getPath('exe')          C:\Users\joshua\Google Drive\_src\geo-ball\packages\ucsd-app\node_modules\electron\dist\electron.exe
// app.getPath('logs')         C:\Users\joshua\AppData\Roaming\Electron\logs
// app.getPath('module')       C:\Users\joshua\Google Drive\_src\geo-ball\packages\ucsd-app\node_modules\electron\dist\electron.exe
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
