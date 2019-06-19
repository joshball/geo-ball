import { CHANNELS } from '../../background/index.new';
import ipc from '../../background/better-ipc';
import {
    IDownloadOsmParams,
    IDownloadOsmResult,
} from '../../background/bg-ucsd';
import { remote, BrowserWindow } from 'electron';
import { IOsmFetchDir } from './fetch/OsmFetchDir';
import { IOsmFetchManager, OsmFetchManager } from './fetch/OsmFetchManager';

const backgroundWindow = remote.getGlobal('backgroundWindow') as BrowserWindow;
// console.log('backgroundWindow:', backgroundWindow);
if (!backgroundWindow) {
    throw new Error('backgroundWindow global not set!');
}

export interface OsmFetches {
    osmFetchDirs: Array<IOsmFetchDir>;
}

// export const getOsmFetchData = async (
//     _path: string
// ): Promise<IOsmFetchManager> => Promise.resolve(new OsmFetchManager("."));
// ): Promise<IOsmFetchManager> => Promise.resolve(OsmFetchData);

export const loadOsmFetchManager = async (
    path: string
): Promise<OsmFetchManager> =>
    ipc.callRender(backgroundWindow, CHANNELS.UCSD.loadOsmFetchManager, path);

export const downloadOsmFile = async (
    osmParams: IDownloadOsmParams
): Promise<IDownloadOsmResult> =>
    ipc.callRender(backgroundWindow, CHANNELS.UCSD.downloadOsm, osmParams);
