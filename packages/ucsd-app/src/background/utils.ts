// export const getResponseChannels = (channel: string) => ({
//     sendChannel: `%better-ipc-send-channel-${channel}`,
//     dataChannel: `%better-ipc-response-data-channel-${channel}`,
//     errorChannel: `%better-ipc-response-error-channel-${channel}`
// });

export const getListenerChannel = (channel: string) => ({
    sendChannel: `SEND_CHANNEL-${channel}`,
});
// export const getResponseChannels = (channel: string, id: string) => ({
//     sendChannel: `SEND_CHANNEL-${channel}`,
//     dataChannel: `DATA_CHANNEL-${channel}-${id}`,
//     errorChannel: `ERROR_CHANNEL-${channel}-${id}`
// });

// export const getResponseChannels = (channel: string) => ({
//     sendChannel: `SEND_CHANNEL-${channel}`,
//     dataChannel: `DATA_CHANNEL-${channel}`,
//     errorChannel: `ERROR_CHANNEL-${channel}`
// });

export const getRendererId = (windowId: number, uuid: string) => `[ID:${windowId}-${uuid}]`

export const getRendererResponseChannels = (channel: string, id: string) => ({
    sendChannel: `SEND_CHANNEL-${channel}`,
    // sendChannel: `SEND_CHANNEL-${channel}-${windowId}-${uuid}`,
    dataChannel: `DATA_CHANNEL-${channel}-${id}`,
    errorChannel: `ERROR_CHANNEL-${channel}-${id}`
});
// export const getRendererResponseChannels = (windowId: number, channel: string, uuid: string) => ({
//     sendChannel: `SEND_CHANNEL-${channel}`,
//     // sendChannel: `SEND_CHANNEL-${channel}-${windowId}-${uuid}`,
//     dataChannel: `DATA_CHANNEL-${channel}-${windowId}-${uuid}`,
//     errorChannel: `ERROR_CHANNEL-${channel}-${windowId}-${uuid}`
// });
// export const getRendererResponseChannels = (windowId: number, channel: string) => ({
//     sendChannel: `%better-ipc-send-channel-${windowId}-${channel}`,
//     dataChannel: `%better-ipc-response-data-channel-${windowId}-${channel}`,
//     errorChannel: `%better-ipc-response-error-channel-${windowId}-${channel}`
// });

