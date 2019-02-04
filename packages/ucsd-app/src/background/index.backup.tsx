// // console.log('BACKGROUND!');
// import { ipcRenderer, remote, BrowserWindow } from 'electron';
// import * as ipc from 'electron-better-ipc';
// import { promises } from 'fs';
// import { join, resolve as pathResolve } from 'path';
// import { getRendererResponseChannels } from './utils';
// const appPath = remote.app.getAppPath()

// console.log('ipc', ipc);
// const backgroundWindow = remote.getGlobal('backgroundWindow') as BrowserWindow;
// const uiWindow = remote.getGlobal('uiWindow') as BrowserWindow;


// console.log('bg.uiWindow.id:', uiWindow.id, uiWindow);
// console.log('bg.backgroundWindow.id:', backgroundWindow.id, backgroundWindow);


// ipc.answerRenderer = (window: BrowserWindow, channel: string, callback: any) => {
//     console.log('IPC.answerRenderer');
//     console.log('IPC.answerRenderer window.id:', window.id, window);
//     console.log('IPC.answerRenderer channel', channel);
//     // const { sendChannel, dataChannel, errorChannel } = getResponseChannels(channel);
//     const { sendChannel, dataChannel, errorChannel } = getRendererResponseChannels(window.id, channel);
//     console.log('answerRenderer sendChannel', sendChannel);
//     console.log('answerRenderer dataChannel', dataChannel);
//     console.log('answerRenderer errorChannel', errorChannel);
//     // send: %better-ipc-send-channel-2-bg.AM.lstat
//     // data: %better-ipc-response-data-channel-2-bg.AM.lstat

//     const listener = async (event:any, data:any) => {
// 		// const window = BrowserWindow.fromWebContents(event.sender);
//         console.log('answerRenderer.listener event', event, data);

// 		const send = (sc:any, sd:any) => {
//             console.log('answerRenderer.listener sendChannel', sendChannel, event, data);
//             console.log('answerRenderer.listener send sc,sd', sc, sd);
//             console.log('answerRenderer.listener send window', window);
//             console.log('answerRenderer.listener send window && isDestroyed', window && window.isDestroyed());
//             console.log('answerRenderer.listener send window && !isDestroyed', window && !window.isDestroyed());
// 			if (!(window && window.isDestroyed())) {
//                 console.log('answerRenderer.listener. EVENT.sender.SEND (sc,sd):', sc, sd);
//                 console.log('answerRenderer.listener. EVENT', event);
//                 console.log('answerRenderer.listener. EVENT.sender', event.sender);
//                 // event.sender.send(sc, sd);
//                 window.webContents.send(sc, sd);

// 			}
// 		};

// 		try {
//             console.log('answerRenderer.listener try.SEND dataChannel', dataChannel);
//             console.log('answerRenderer.listener try.SEND callback', callback);
//             console.log('answerRenderer.listener try.SEND data', data, window);
// 			send(dataChannel, await callback(data, window));
// 		} catch (error) {
//             console.log('answerRenderer.listener try.SEND error', error);
// 			send(errorChannel, error);
// 		}
//     };

//     console.log('answerRenderer.listener ipc.ON sendChannel, listener', sendChannel, listener);
//     ipc.on(sendChannel, listener);
// 	return () => {
//         console.log('answerRenderer.listener RETURN.sc', sendChannel);
//         console.log('answerRenderer.listener ipc.removeListener', listener);
// 		ipc.removeListener(sendChannel, listener);
//     };

// };

// // ipc.answerRenderer('bg.AR.lstat', async (appRelPath: string) => {
// //     const filePath = resolve(join(appPath, appRelPath))
// //     console.log('bg.AR.lstat|appRelPath:', appRelPath)
// //     console.log('bg.AR.lstat|filePath:', filePath)
// //     const stat = await promises.lstat(filePath);
// //     console.log('bg.AR.lstat|stat:', stat)
// //     return stat;
// // });


// console.log('ipc.answerRenderer:', ipc.answerRenderer);

// ipc.answerRenderer(backgroundWindow, 'bg.AM.lstat', async (appRelPath: string) => {
//     const filePath = pathResolve(join(appPath, appRelPath))
//     console.log('bg.AM.lstat|appRelPath:', appRelPath)
//     console.log('bg.AM.lstat|filePath:', filePath)
//     const stat = await promises.lstat(filePath);
//     console.log('bg.AM.lstat|stat:', stat)
//     return stat;
// });

// ipcRenderer.on('BG.ipcRenderer.stat', async (event: string, appRelPath: string) => {
//     console.log('bg.stat:', event, )
//     const filePath = pathResolve(join(appPath, appRelPath))
//     console.log('bg.stat|appRelPath:', appRelPath)
//     console.log('bg.stat|filePath:', filePath)
//     const stat = await promises.lstat(filePath);
//     console.log('bg.stat|stat:', stat)
//     uiWindow.webContents.send('ui.stat', stat);
//     return stat;
// });

// export function compute() {
//     // return 'some compute result'
//     let progress = 0;
//     for (let i = 0; i < 100000000; i += 1) {
//         if (i % 1000000 === 0) {
//             progress += 1;
//             ipcRenderer.send('command', 'progress', progress);
//         }
//     }
//     ipcRenderer.send('command', 'progress', 100);
//     return 'some compute result';
// }


// // import { requireTaskPool } from 'electron-remote';

// // const myCoolModule = requireTaskPool(require.resolve('./my-cool-module'));

// // // This method will run synchronously, but in a background BrowserWindow process
// // // so that your app will not block
// // let result = await myCoolModule.calculateDigitsOfPi(100000);

// // import express, { Request, Response, NextFunction } from 'express';
// // import bodyParser from 'body-parser';
// // const app = express()
// // const port = 21121

// // // parse application/json
// // app.use(bodyParser.json());

// // app.get('/api/files', (_req: Request, res: Response, _next: NextFunction) => res.send('Hello World!'))

// // app.use((req: Request, res: Response, _next: NextFunction) => {
// //     res.setHeader('Content-Type', 'text/plain')
// //     res.write('you posted:\n')
// //     res.end(JSON.stringify(req.body, null, 2))
// // });

// // app.listen(port, () => console.log(`Example app listening on port ${port}!`))

// // // listen for files event by browser process
// // ipcMain.on('createDirectory', async (_event: any, managedPath: string) => {
// //     try {
// //         console.log('managedPath:', managedPath);
// //         const home = resolve(app.getPath('home'));
// //         const userData = resolve(app.getPath('userData'));
// //         const managed = resolve(join(home, '.ucsdXXX'));
// //         const managedOsm = resolve(join(managed, 'osm'));

// //         UcsdDataFiles.EnsurePathSync(managed);
// //         UcsdDataFiles.EnsurePathSync(managedOsm);
// //         const ucsdDataFiles = new UcsdDataFiles(managed);

// //         // // asynchronously get the data for all the files
// //         // const data = await Promise.all(
// //         //     filesArr.map(async ({ name, pathName }) => ({
// //         //         ...await stat(pathName),
// //         //         name,
// //         //         pathName
// //         //     }))
// //         // )

// //         uiWindow.webContents.send('directoryCreated', ucsdDataFiles)
// //     } catch (error) {
// //         // send an error event if something goes wrong
// //         uiWindow.webContents.send('directoryCreated:error', error)
// //     }
// // })
// // const userDataPath = (electron.app || electron.remote.app).getPath('userData');
// // const keytar = remote.require('keytar');
// // keytar.replacePassword('KeytarTest', 'AccountName', secret);
// // onst secret = keytar.getPassword('KeytarTest', 'AccountName');
