// console.log('BACKGROUND!');
// const remoteAjax = requireTaskPool(require.resolve('electron-remote/remote-ajax'));
// const result = await remoteAjax.get('https://httpbin.org/get');
// console.log(result.url)


import { ipcRenderer } from 'electron';

export function compute() {
  // return 'some compute result'
  let progress = 0;
  for (let i = 0; i < 100000000; i += 1) {
    if (i % 1000000 === 0) {
      progress += 1;
      ipcRenderer.send('command', 'progress', progress);
    }
  }
  ipcRenderer.send('command', 'progress', 100);
  return 'some compute result';
}


// import { requireTaskPool } from 'electron-remote';

// const myCoolModule = requireTaskPool(require.resolve('./my-cool-module'));

// // This method will run synchronously, but in a background BrowserWindow process
// // so that your app will not block
// let result = await myCoolModule.calculateDigitsOfPi(100000);

// import express, { Request, Response, NextFunction } from 'express';
// import bodyParser from 'body-parser';
// const app = express()
// const port = 21121

// // parse application/json
// app.use(bodyParser.json());

// app.get('/api/files', (_req: Request, res: Response, _next: NextFunction) => res.send('Hello World!'))

// app.use((req: Request, res: Response, _next: NextFunction) => {
//     res.setHeader('Content-Type', 'text/plain')
//     res.write('you posted:\n')
//     res.end(JSON.stringify(req.body, null, 2))
// });

// app.listen(port, () => console.log(`Example app listening on port ${port}!`))

// // listen for files event by browser process
// ipcMain.on('createDirectory', async (_event: any, managedPath: string) => {
//     try {
//         console.log('managedPath:', managedPath);
//         const home = resolve(app.getPath('home'));
//         const userData = resolve(app.getPath('userData'));
//         const managed = resolve(join(home, '.ucsd'));
//         const managedOsm = resolve(join(managed, 'osm'));

//         UcsdDataFiles.EnsurePathSync(managed);
//         UcsdDataFiles.EnsurePathSync(managedOsm);
//         const ucsdDataFiles = new UcsdDataFiles(managed);

//         // // asynchronously get the data for all the files
//         // const data = await Promise.all(
//         //     filesArr.map(async ({ name, pathName }) => ({
//         //         ...await stat(pathName),
//         //         name,
//         //         pathName
//         //     }))
//         // )

//         uiWindow.webContents.send('directoryCreated', ucsdDataFiles)
//     } catch (error) {
//         // send an error event if something goes wrong
//         uiWindow.webContents.send('directoryCreated:error', error)
//     }
// })
// const userDataPath = (electron.app || electron.remote.app).getPath('userData');
// const keytar = remote.require('keytar');
// keytar.replacePassword('KeytarTest', 'AccountName', secret);
// onst secret = keytar.getPassword('KeytarTest', 'AccountName');
