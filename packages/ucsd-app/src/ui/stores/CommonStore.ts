import { action } from 'mobx';
import { IState } from '../state/State';
import { resolve, join } from 'path';
import { homedir, userInfo, type } from 'os';
// import { remote } from "electron"
import { remote, ipcRenderer } from "electron"
import { UcsdDataFiles } from '@ball-maps/ucsd-core';

export class CommonStore {
    state!: IState

    constructor(state: IState) {
        this.state = state
        const { app } = remote;
        const home = resolve(app.getPath('home'));
        const userData = resolve(app.getPath('userData'));
        const managed = resolve(join(home, '.ucsd'));
        // const ucsdDataFiles = new UcsdDataFiles(managed);
        ipcRenderer.send('createDirectory', managed);
        ipcRenderer.on('directoryCreated', (_event:any, ucsdDataFiles:UcsdDataFiles) => {
            console.log('directoryCreated success!')
            console.log('ucsdDataFiles',ucsdDataFiles)
        })

        // error event from catch block in main process
        ipcRenderer.on('directoryCreated:error', (_event:any, error:any) => {
            console.error('directoryCreated:error')
            console.error(error)
        })

        this.state.common.dir = {
            managed,
            userData,
            home,
            ucsdDataFiles:undefined!,
        }
    }

    @action
    setTitle(newTitle: string) {
        this.state.common.title = newTitle
    }

    @action
    setManagedDir(managedDirPath: string) {
        this.state.common.dir.managed = resolve(managedDirPath)
    }
}


//  os.homedir()               C:\Users\joshua
// app.getPath('home')         C:\Users\joshua
// app.getPath('appData')      C:\Users\joshua\AppData\Roaming
// app.getPath('userData')     C:\Users\joshua\AppData\Roaming\UCSD Map App
// app.getPath('temp')         C:\Users\joshua\AppData\Local\Temp
// app.getPath('exe')          C:\Users\joshua\Google Drive\_src\ball-maps\packages\ucsd-app\node_modules\electron\dist\electron.exe
// app.getPath('logs')         C:\Users\joshua\AppData\Roaming\Electron\logs
// app.getPath('module')       C:\Users\joshua\Google Drive\_src\ball-maps\packages\ucsd-app\node_modules\electron\dist\electron.exe
// app.getPath('downloads')    W:\Users\joshua\Downloads
// console.log('os.homedir:', homedir())
// console.log('os.userInfo:', userInfo())
// console.log("app.getPath('home')", app.getPath('home'))
// console.log("app.getPath('appData')", app.getPath('appData'))
// console.log("app.getPath('userData')", app.getPath('userData'))
// console.log("app.getPath('temp')", app.getPath('temp'))
// console.log("app.getPath('exe')", app.getPath('exe'))
// console.log("app.getPath('logs')", app.getPath('logs'))
// console.log("app.getPath('module')", app.getPath('module'))
// console.log("app.getPath('downloads')", app.getPath('downloads'))
