// This is the main process entry point. It is the
// first file that is run on startup.
//
// It is responsible for launching a renderer window.

// https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&client=YOUR_CLIENT_ID&signature=SIGNATURE

import { app, dialog, ipcMain } from "electron"
import { createUiWindow } from "./ui-renderer-window"
import { createBackgroundWindow } from "./background-renderer-window"
import { loadURL } from "./load-url"
import * as log from "electron-log"
import * as isDev from "electron-is-dev"
import { createUpdater } from ".//updater"
import { createMenu } from "./menu"
// import { promisify } from "util"
// import fs from "fs"
import { resolve, join } from "path";
import { UcsdDataFiles } from "@ball-maps/ucsd-core";

// const stat = promisify(fs.stat)


// set proper logging level
log.transports.file.level = isDev ? false : "info"
log.transports.console.level = isDev ? "debug" : false

let uiWindow: Electron.BrowserWindow
let backgroundWindow: Electron.BrowserWindow
let showStorybook = false

// usually we'd just use __dirname here, however, the FuseBox
// bundler rewrites that, so we have to get it from Electron.
const appPath = app.getAppPath()

// fires when Electron is ready to start
app.on("ready", () => {
    uiWindow = createUiWindow(appPath)
    backgroundWindow = createBackgroundWindow(appPath);

    createMenu(uiWindow)

    if (isDev) {
        uiWindow.webContents.on("did-fail-load", () => {
            dialog.showErrorBox(
                "Error opening storybook",
                'Storybook failed to open. Please ensure the storybook server is running by executing "npm run storybook"',
            )
        })

        ipcMain.on("storybook-toggle", () => {
            showStorybook = !showStorybook
            loadURL(uiWindow, appPath, "ui-renderer.html", showStorybook)
        })
    }
});

// fires when all windows are closed
app.on("window-all-closed", app.quit)



// setup the auto-updater
createUpdater(app)
