import ipc from './better-ipc';
import { lstat } from './utils';
import { join, resolve as pathResolve } from 'path';
import { remote, BrowserWindow } from 'electron';

export const CHANNELS = {
    NEW: {
        lstat: 'BGW.NEW.LSTAT'
    }
}

const appPath = remote.app.getAppPath()
const backgroundWindow = remote.getGlobal('backgroundWindow') as BrowserWindow;

console.log('!!! BGW.ipc.answerRenderer(%s, %s)', backgroundWindow.id, CHANNELS.NEW.lstat);
ipc.answerRenderer(backgroundWindow, CHANNELS.NEW.lstat,
    async (appRelPath: any, window: any) => {
        console.log('');
        console.log('');
        console.log('======================================== ipc.answerRenderer CALLBACK ========================================');
        console.log('### BGW.NEW ipc.answerRenderer(%s, %s)',
            backgroundWindow.id, CHANNELS.NEW.lstat);
        // console.log('appPath: ', appPath);
        console.log('appRelPath: ', appRelPath);
        const filePath = pathResolve(join(appPath, appRelPath))
        console.log('BGW.NEW.LSTAT|filePath:', filePath)
        const stat = await lstat(filePath);
        console.log('BGW.NEW.LSTAT|stat:', stat)
        return stat;
    });
