import ipc from './better-ipc';
import { FS_CHANNELS } from './bg-fs';
import { UCSD_CHANNELS } from './bg-ucsd';
import { remote, BrowserWindow } from 'electron';

export interface IChannelCallback {
    name: string;
    namespace: string;
    channel: string;
    callback: (data:any, window:any) => Promise<any>;
}
export interface IAllChannels<T> {
    [key: string]: IChannels<T>;
}
export interface IChannels<T> {
    [key: string]: T;
}

export const CHANNELS:IAllChannels<string> = {};


const backgroundWindow = remote.getGlobal('backgroundWindow') as BrowserWindow;

const registerAndExportAndBuildChannels = (channelsExport: any, newChannels: Array<IChannelCallback>) => {
    // console.log('registerAndExportAndBuildChannels', channelsExport, newChannels)
    newChannels.forEach(ccb => {
        // console.log('register ipc.answerRenderer ccb', ccb.channel, ccb.name, ccb.namespace, ccb)
        ipc.answerRenderer(backgroundWindow, ccb.channel, ccb.callback);
        channelsExport[ccb.namespace] = channelsExport[ccb.namespace] || {};
        if (channelsExport[ccb.namespace][ccb.name]) {
            throw new Error('Channel name already exists!')
        }
        channelsExport[ccb.namespace][ccb.name] = ccb.channel;
    })

}

registerAndExportAndBuildChannels(CHANNELS, FS_CHANNELS.concat(UCSD_CHANNELS));
// console.log('-----------------------------------------------------------------------')
// console.log('CHANNELS', CHANNELS)
// console.log('-----------------------------------------------------------------------')
