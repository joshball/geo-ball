// This is the main process entry point. It is the
// first file that is run on startup.
//
// It is responsible for launching a renderer window.

// https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&client=YOUR_CLIENT_ID&signature=SIGNATURE

import { app, dialog, ipcMain } from "electron"
import { createMainWindow, loadURL } from "."
import * as log from "electron-log"
import * as isDev from "electron-is-dev"
import { createUpdater } from "../ui/lib/updater"
import { createMenu } from "../ui/menu"
// import { promisify } from "util"
// import fs from "fs"
import { resolve, join } from "path";
import { UcsdDataFiles } from "@ball-maps/ucsd-core";

// const stat = promisify(fs.stat)


// set proper logging level
log.transports.file.level = isDev ? false : "info"
log.transports.console.level = isDev ? "debug" : false

let window: Electron.BrowserWindow
let showStorybook = false

// usually we'd just use __dirname here, however, the FuseBox
// bundler rewrites that, so we have to get it from Electron.
const appPath = app.getAppPath()

// fires when Electron is ready to start
app.on("ready", () => {
    window = createMainWindow(appPath)
    createMenu(window)

    if (isDev) {
        window.webContents.on("did-fail-load", () => {
            dialog.showErrorBox(
                "Error opening storybook",
                'Storybook failed to open. Please ensure the storybook server is running by executing "npm run storybook"',
            )
        })

        ipcMain.on("storybook-toggle", () => {
            showStorybook = !showStorybook
            loadURL(window, appPath, showStorybook)
        })
    }

    // listen for files event by browser process
    ipcMain.on('createDirectory', async (_event: any, managedPath: string) => {
        try {
            console.log('managedPath:', managedPath);
            const home = resolve(app.getPath('home'));
            const userData = resolve(app.getPath('userData'));
            const managed = resolve(join(home, '.ucsd'));
            const managedOsm = resolve(join(managed, 'osm'));

            UcsdDataFiles.EnsurePathSync(managed);
            UcsdDataFiles.EnsurePathSync(managedOsm);
            const ucsdDataFiles = new UcsdDataFiles(managed);

            // // asynchronously get the data for all the files
            // const data = await Promise.all(
            //     filesArr.map(async ({ name, pathName }) => ({
            //         ...await stat(pathName),
            //         name,
            //         pathName
            //     }))
            // )

            window.webContents.send('directoryCreated', ucsdDataFiles)
        } catch (error) {
            // send an error event if something goes wrong
            window.webContents.send('directoryCreated:error', error)
        }
    })
})

// fires when all windows are closed
app.on("window-all-closed", app.quit)



// setup the auto-updater
createUpdater(app)
