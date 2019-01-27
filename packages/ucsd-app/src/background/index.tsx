console.log('BACKGROUND!');


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
