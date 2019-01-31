export const getResponseChannels = (channel: string) => ({
    sendChannel: `%better-ipc-send-channel-${channel}`,
    dataChannel: `%better-ipc-response-data-channel-${channel}`,
    errorChannel: `%better-ipc-response-error-channel-${channel}`
});

export const getRendererResponseChannels = (_windowId: number, channel: string) => ({
    sendChannel: `CS-${channel}`,
    dataChannel: `CD-${channel}`,
    errorChannel: `CE-${channel}`
});
// export const getRendererResponseChannels = (windowId: number, channel: string) => ({
//     sendChannel: `%better-ipc-send-channel-${windowId}-${channel}`,
//     dataChannel: `%better-ipc-response-data-channel-${windowId}-${channel}`,
//     errorChannel: `%better-ipc-response-error-channel-${windowId}-${channel}`
// });


import { promisify } from 'util';
import { lstat as lstatx, Stats } from 'fs';
export const lstat = promisify(lstatx);
