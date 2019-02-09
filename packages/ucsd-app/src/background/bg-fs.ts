import { lstat, access, mkdir, readdir, CONSTANTS } from './utils-fs';
import { join, resolve as pathResolve } from 'path';
import { remote } from 'electron';
import { IChannelCallback } from './index.new';
import { PathLike } from 'fs';


const appPath = remote.app.getAppPath()



type BetterBufferEncoding = BufferEncoding | "buffer";

export const isBufferType = (encoding: BetterBufferEncoding) => encoding === 'buffer' || encoding === 'binary';

export interface IReaddirOptions {
    encoding: BetterBufferEncoding | null;
    withFileTypes?: false
}

export interface IReaddirParams {
    path: PathLike
    options?: IReaddirOptions
}

export const readdirCallback = async (readdirParams: IReaddirParams, _window: any) => {
    console.log('');
    console.log('');
    console.log('======================================== readdirCallback ========================================');
    console.log('======================================== readdirCallback ========================================');
    console.log('======================================== readdirCallback ========================================');
    console.log('#### readdirParams.path: ', readdirParams.path);
    console.log('======================================== readdirCallback ========================================');
    console.log('======================================== readdirCallback ========================================');
    console.log('======================================== readdirCallback ========================================');
    // console.log('### BGW.NEW ipc.answerRenderer(%s, %s)',
    //     backgroundWindow.id, FS_CHANNELS.lstat);
    console.log('BGW.NEW.readdir|readdirParams:', readdirParams)
    const contents = await readdir(readdirParams.path, readdirParams.options);
    console.log('BGW.NEW.readdir|contents:', contents)
    return contents;
}

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
        name: 'readdir',
        namespace: 'FS',
        channel: 'BGW.readdir',
        callback: readdirCallback
    },
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
