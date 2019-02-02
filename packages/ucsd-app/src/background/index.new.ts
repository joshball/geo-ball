import ipc from './better-ipc';
import { FS_CHANNELS } from './bg-fs';
import { remote, BrowserWindow } from 'electron';

export interface IChannelCallback {
    name: string;
    namespace: string;
    channel: string;
    callback: (data:any, window:any) => Promise<any>;
}
export interface IChannels<T> {
    [key: string]: T;
}

export const CHANNELS:IChannels<string> = {};


const backgroundWindow = remote.getGlobal('backgroundWindow') as BrowserWindow;

const registerAndExportAndBuildChannels = (channelsExport: any, newChannels: Array<IChannelCallback>) => {
    newChannels.forEach(ccb => {
        ipc.answerRenderer(backgroundWindow, ccb.channel, ccb.channel);
        channelsExport[ccb.namespace] = channelsExport[ccb.namespace] || {};
        if (channelsExport[ccb.namespace][ccb.name]) {
            throw new Error('Channel name already exists!')
        }
        channelsExport[ccb.namespace][ccb.name] = ccb.channel;
    })

}

registerAndExportAndBuildChannels(CHANNELS, FS_CHANNELS);
