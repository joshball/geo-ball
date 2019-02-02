import ipc from './better-ipc';
import { lstat, access, mkdir, CONSTANTS } from './utils-fs';
import { join, resolve as pathResolve } from 'path';
import { remote } from 'electron';
import { IChannelCallback } from './index.new';


const appPath = remote.app.getAppPath()


export const lstatCallback = async (appRelPath: any, _window: any) => {
    console.log('');
    console.log('');
    console.log('======================================== lstatCallback ========================================');
    // console.log('### BGW.NEW ipc.answerRenderer(%s, %s)',
    //     backgroundWindow.id, FS_CHANNELS.lstat);
    // console.log('appPath: ', appPath);
    console.log('appRelPath: ', appRelPath);
    const filePath = pathResolve(join(appPath, appRelPath))
    console.log('BGW.NEW.LSTAT|filePath:', filePath)
    const stat = await lstat(filePath);
    console.log('BGW.NEW.LSTAT|stat:', stat)
    return stat;
}

export const ensureExistsCallback = async (dirPath: any, _window: any): Promise<string> => {
    console.log('dirPath: ', dirPath);
    const resolvedPath = pathResolve(dirPath)
    console.log('BGW.NEW.LSTAT|filePath:', resolvedPath)
    try {
        await access(resolvedPath, CONSTANTS.F_OK);
    }
    catch (error) {
        console.log('access error', error);
        await mkdir(resolvedPath, { recursive: true });
    }
    return resolvedPath;
}


export const FS_CHANNELS: Array<IChannelCallback> = [
    {
        name: 'lstat',
        namespace: 'FS',
        channel: 'BGW.lstat',
        callback: lstatCallback
    },
    {
        name: 'ensureExists',
        namespace: 'FS',
        channel: 'BGW.ensureExists',
        callback: ensureExistsCallback
    },
];
