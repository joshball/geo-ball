// console.log('BACKGROUND!');
import { ipcRenderer, remote, BrowserWindow, Event } from 'electron';

import { join, resolve as pathResolve } from 'path';
import { lstat } from './utils';
const appPath = remote.app.getAppPath();

const bgWindow = remote.getGlobal('backgroundWindow') as BrowserWindow;
const uiWindow = remote.getGlobal('uiWindow') as BrowserWindow;

// console.log('BG.OLD | bgWindow:', bgWindow.id, bgWindow);
// console.log('BG.OLD | uiWindow:', uiWindow.id, uiWindow);

export const CHANNELS = {
    OLD: {
        getLstat: 'BGW.OLD.GET.LSTAT',
        retLstat: 'BGW.OLD.RET.LSTAT',
    },
};

ipcRenderer.on(CHANNELS.OLD.getLstat, async (event: any, callerId: number, appRelPath: string) => {
    console.log('%%% %s:', CHANNELS.OLD.getLstat, event);
    console.log('BG.OLD.stat event.senderId', event.senderId);
    console.log('BG.OLD | bgWindow:', bgWindow.id);
    console.log('BG.OLD | uiWindow:', uiWindow.id);
    console.log('BG.OLD | callerId:', callerId);

    // console.log('BG.OLD.stat: event.senderId', event.senderId)
    const filePath = pathResolve(join(appPath, appRelPath));
    console.log('BG.OLD.stat|appRelPath:', appRelPath);
    console.log('BG.OLD.stat|filePath:', filePath);
    const stat = await lstat(filePath);
    computeOld(callerId);
    const progress = 100;
    // WORKS:
    // console.log('BG.OLD.stat| uiWindow.webContents.send(progress, stat):', progress, stat)
    // uiWindow.webContents.send('UI.OLD.stat', progress, stat);

    // DOES NOT OWRK SINCE event.sender (is MAIN) event.senderId = 0;
    // console.log('BG.OLD.stat| events.sender.send(progress, stat):', progress, stat)
    // event.sender.send('UI.OLD.stat', progress, stat);

    // WORKS:
    console.log(
        'BG.OLD.stat| ipcRenderer.sendTo(callerId:%s, channel: %s, progress, stat):',
        callerId,
        progress,
        stat,
    );
    // ipcRenderer.sendTo(callerId, 'UI.OLD.stat', progress, stat);
    ipcRenderer.sendTo(callerId, CHANNELS.OLD.retLstat, progress, stat);

    // WORKS
    // console.log('BG.OLD.stat| ipcRenderer.sendTo(uiWindow.webContents.id, progress, stat):', uiWindow.webContents.id, progress, stat)
    // ipcRenderer.sendTo(uiWindow.webContents.id,'UI.OLD.stat', progress, stat);
});

const computeOld = (callerId: number) => {
    // return 'some compute result'
    console.log('BG.OLD.computeOld');
    let progress = 0;
    for (let i = 0; i < 100000000; i += 1) {
        if (i % 1000000 === 0) {
            progress += 1;
            // console.log('BG.OLD.stat, sending progress', progress);
            // ipcRenderer.send('command', 'progress', progress);
            // ipcRenderer.send('UI.OLD.stat', progress);
            // uiWindow.webContents.send('UI.OLD.stat', progress);
            // ipcRenderer.sendTo(callerId, 'UI.OLD.stat', progress);
        }
    }
    console.log('BG.OLD.computeOld.done');
    // ipcRenderer.send('command', 'progress', 100);
};
