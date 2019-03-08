// This is the main process entry point. It is the
// first file that is run on startup.
//
// It is responsible for launching a renderer window.

// https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&client=YOUR_CLIENT_ID&signature=SIGNATURE
import { app, dialog, ipcMain, BrowserWindow } from "electron"
import { createUiWindow } from "./ui-renderer-window"
import { createBackgroundWindow } from "./background-renderer-window"
import { loadURL } from "./load-url"
import * as log from "electron-log"
import * as isDev from "electron-is-dev"
import { createUpdater } from ".//updater"
import { createMenu } from "./menu"
// import { promisify } from "util"
// import fs from "fs"
import { UcsdDataFiles } from "@geo-ball/ucsd-core";
import { resolve, join } from "path";
import * as ipc from 'electron-better-ipc';
import { promises } from 'fs';

// const stat = promisify(fs.stat)
const appPath = app.getAppPath()


// set proper logging level
log.transports.file.level = isDev ? false : "info"
log.transports.console.level = isDev ? "debug" : false

declare global {
    namespace NodeJS {
        interface Global {
            backgroundWindow: null | Electron.BrowserWindow;
            uiWindow: null | Electron.BrowserWindow;
        }
    }

}

global.uiWindow = null;
global.backgroundWindow = null;
// let uiWindow: Electron.BrowserWindow
// let backgroundWindow: Electron.BrowserWindow
let showStorybook = false

// usually we'd just use __dirname here, however, the FuseBox
// bundler rewrites that, so we have to get it from Electron.

// fires when Electron is ready to start
app.on("ready", () => {
    // // tslint:disable-next-line:no-unused-expression
    // new BrowserWindow({ show: false, });
    // // tslint:disable-next-line:no-unused-expression
    // new BrowserWindow({ show: false, });
    global.uiWindow = createUiWindow(appPath)

    // // tslint:disable-next-line:no-unused-expression
    // new BrowserWindow({ show: false, });
    // // tslint:disable-next-line:no-unused-expression
    // new BrowserWindow({ show: false, });
    // // tslint:disable-next-line:no-unused-expression
    // new BrowserWindow({ show: false, });
    // // tslint:disable-next-line:no-unused-expression
    // new BrowserWindow({ show: false, });
    // // tslint:disable-next-line:no-unused-expression
    // new BrowserWindow({ show: false, });
    // // tslint:disable-next-line:no-unused-expression
    // new BrowserWindow({ show: false, });
    global.backgroundWindow = createBackgroundWindow(appPath);

    createMenu(global.uiWindow)

    if (isDev) {
        // global.uiWindow.webContents.on("did-fail-load", () => {
        //     dialog.showErrorBox(
        //         "Error opening storybook",
        //         'Storybook failed to open. Please ensure the storybook server is running by executing "npm run storybook"',
        //     )
        // })

        ipcMain.on("storybook-toggle", () => {
            showStorybook = !showStorybook
            loadURL(global.uiWindow!, appPath, "ui-renderer.html", showStorybook)
        })

    }

    // ipc.answerRenderer('main.AR.lstat', async (appRelPath: string) => {
    //     const filePath = resolve(join(appPath, appRelPath))
    //     console.log('main.AR.lstat|appRelPath:', appRelPath)
    //     console.log('main.AR.lstat|filePath:', filePath)
    //     const stat = await promises.lstat(filePath);
    //     console.log('main.AR.lstat|stat:', stat)
    //     return stat;
    // });
});

// fires when all windows are closed
app.on("window-all-closed", app.quit)

// setup the auto-updater
createUpdater(app)



