import { CHANNELS } from '../../background/index.new';
import ipc from "../../background/better-ipc";
import { IDownloadOsmParams, IDownloadOsmResult } from '../../background/bg-ucsd';
import { remote, BrowserWindow } from 'electron';

const backgroundWindow = remote.getGlobal('backgroundWindow') as BrowserWindow;
console.log('backgroundWindow:', backgroundWindow);
if (!backgroundWindow) {
    throw new Error('backgroundWindow global not set!');
}



export const downloadOsmFile = async (osmParams: IDownloadOsmParams): Promise<IDownloadOsmResult> =>
    ipc.callRender(backgroundWindow, CHANNELS.UCSD.download, osmParams);
