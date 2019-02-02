import { remote, BrowserWindow } from "electron";
import { resolve, join } from "path";
import ipc from "../../background/better-ipc";
import { CHANNELS } from '../../background/index.new';
import { ensureExistsCallback } from '../../background/bg-fs';

const backgroundWindow = remote.getGlobal('backgroundWindow') as BrowserWindow;
console.log('backgroundWindow:', backgroundWindow);
if (!backgroundWindow) {
    throw new Error('backgroundWindow global not set!');
}

export class FileStorageService {
    managedDir: string;

    constructor(managedDir?: string | undefined) {
        this.managedDir = managedDir || FileStorageService.GetDefaultManagedDir();
    }


    static async CreateFileStorageService(rootDir?: string | undefined): Promise<FileStorageService> {
        const managedDir = FileStorageService.GetDefaultManagedDir(rootDir);
        // FileStorageService.EnsureDirectoryStructure(managedDir);
        return new FileStorageService(managedDir);
    }

    static GetDefaultManagedDir(rootDir?: string | undefined): string {
        const newRootDir = resolve(rootDir || remote.app.getPath('home') || remote.app.getPath('userData'));
        const managedDir = resolve(join(newRootDir, '.ucsd'));
        return managedDir;
    }

    static async EnsureDirectoryStructure(dirToEnsure: string): Promise<void> {
        await ipc.callRender(backgroundWindow, CHANNELS.ensureExists, dirToEnsure);
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
