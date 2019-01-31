// console.log('BACKGROUND!');
import { BrowserWindow, ipcRenderer, remote } from 'electron';
// tslint:disable-next-line:no-duplicate-imports
import * as electron from 'electron';
import * as ipc from 'electron-better-ipc';
import { getRendererResponseChannels } from './utils';


ipc.callRender = (window: BrowserWindow, channel: string, data: any) => new Promise((resolve: any, reject: any) => {
    console.log('IPC.callRender', window.id, channel, data);
    const rw = remote.getCurrentWindow();
    const { sendChannel, dataChannel, errorChannel } = getRendererResponseChannels(window.id, channel);
    // console.log('IPC.callRender channels:', sendChannel, dataChannel, errorChannel);
    const cleanup = () => {
        console.log('================> CLEANUP ')
        ipcRenderer.removeAllListeners(dataChannel);
        ipcRenderer.removeAllListeners(errorChannel);
    };

    console.log('!!! IPC.callRender LISTENER ipc.on(dataChannel', dataChannel);
    ipcRenderer.on(dataChannel, (_event: string, responseData: any) => {
        console.log('### IPC.callRender(dataChannel)', dataChannel);
        console.log('**** IPC.callRender._event', _event);
        console.log('**** IPC.callRender.responseData', responseData);
        cleanup();
        resolve(responseData);
    });

    console.log('!!! IPC.callRender LISTENER ipc.on(errorChannel', errorChannel);
    ipcRenderer.on(errorChannel, (_event: string, error: any) => {
        console.log('### IPC.callRender(errorChannel) called!');
        console.log('IPC.callRender._event', _event);
        console.log('IPC.callRender.error', error);
        cleanup();
        reject(error);
    });

    // ipc.send(sendChannel, data);
    if (window.webContents) {
        const callerId = window.webContents.id;
        console.log('### IPC.callRender() window.id, window.WC.id:', window.id, window.webContents.id);
        console.log('IPC.callRender() callerId:', callerId);
        console.log('IPC.callRender() channel:', channel);
        console.log('IPC.callRender() sendChannel:', sendChannel);
        // console.log('@@@ IPC.callRender() ipcRenderer.*sendTo*(%s, %s, data):', callerId, sendChannel, data);
        // ipcRenderer.sendTo(callerId, sendChannel, data);
        console.log('@@@ window.webContents.SEND(sc: %s, id: %s) data:', sendChannel, callerId, data);
        console.log('@@@ window.webContents.SEND.data:', data);
        const wrappedData = {
            renderWindowId: rw.id,
            renderData: data,
        }
        window.webContents.send(sendChannel, wrappedData);

        // console.log('window.webContents. SENDING.data', data);
        // window.webContents.send(sendChannel, data);
    }
});

export interface IWrappedData {
    renderWindowId: number;
    renderData: any;
}


ipc.answerRenderer = (windowToListenOn: BrowserWindow, channel: string, callback: any) => {
    const rw = remote.getCurrentWindow();
    const { sendChannel, dataChannel, errorChannel } = getRendererResponseChannels(windowToListenOn.id, channel);
    console.log('IPC.answerRenderer channels:', sendChannel, dataChannel, errorChannel);

    const listener = async (event: any, wrappedData: IWrappedData) => {
        console.log('### IPC.answerRenderer().listener() RECEIVED (event, data)', event.senderId, event, wrappedData);

        const send = (sc: any, sd: any) => {
            if (!(windowToListenOn && windowToListenOn.isDestroyed())) {
                // console.log('IPC.answerRenderer().listener. EVENT.sender.SEND (sc,sd):', sc, sd);
                console.log('@@@ IPC.ARG ipcRenderer.sendTo(%s, %s, sd):', windowToListenOn.id, sc, sd);
                ipcRenderer.sendTo(wrappedData.renderWindowId, sc, sd);
                // console.log('event.sender', event.senderId, event.sender);
                // event.sender.send(sc, sd);
                // console.log('@@@ IPC.answerRenderer().listener().send() SENDING window.webContents.SEND (sc,sd):', sc, sd);
                // window.webContents.send(sc, sd);
            }
            else {
                console.log('IPC.answerRenderer().listener NO WINDOW');
            }
        };

        try {
            console.log('IPC.AR local.SEND() dataChannel/window', dataChannel, windowToListenOn.id, windowToListenOn.webContents.id);
            console.log('IPC.AR local.SEND() wrappedData', wrappedData);
            send(dataChannel, await callback(wrappedData.renderData, windowToListenOn));
        } catch (error) {
            console.log('IPC.answerRenderer().listener try.SEND error', error);
            send(errorChannel, error);
        }
    };

    console.log('!!! IPC.answerRenderer() CALLING ipcRenderer. *ON* (sendChannel, listenerFunc)', sendChannel);
    ipcRenderer.on(sendChannel, listener);

    return () => {
        console.log('================> CLEANUP XXY ')
        console.log('IPC.answerRenderer().listener RETURN.sc', sendChannel);
        console.log('IPC.answerRenderer().listener ipc.removeListener', listener);
        ipcRenderer.removeListener(sendChannel, listener);
    };

};

export default ipc;