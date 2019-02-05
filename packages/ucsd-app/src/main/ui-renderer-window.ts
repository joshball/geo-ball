import { app, BrowserWindow } from "electron";
// tslint:disable-next-line:no-var-requires
const WindowStateManager = require("electron-window-state-manager");
import { loadURL } from "./load-url"
// tslint:disable-next-line:no-var-requires
require('electron-context-menu')({
	prepend: (params:any, _browserWindow:any) => [{
		label: 'Rainbow',
		// Only show it when right-clicking images
		visible: params.mediaType === 'image'
	}]
});

// default dimensions
// export const DIMENSIONS = { width: 1800, height: 1500, minWidth: 200, minHeight: 200 }
export const DIMENSIONS = { width: 1200, height: 900, minWidth: 1200, minHeight: 900 }

/**
 * Creates the main window.
 *
 * @param appPath The path to the bundle root.
 * @param showDelay How long in ms before showing the window after the renderer is ready.
 * @return The main BrowserWindow.
 */
export function createUiWindow(appPath: string, showDelay: number = 100):BrowserWindow {
    // persistent window state manager
    const windowState = new WindowStateManager("main", {
        defaultWidth: DIMENSIONS.width,
        defaultHeight: DIMENSIONS.height,
    })

    // create our main window
    const window = new BrowserWindow({
        minWidth: DIMENSIONS.minWidth,
        minHeight: DIMENSIONS.minHeight,
        // width: windowState.width,
        // height: windowState.height,
        width: DIMENSIONS.width,
        height: DIMENSIONS.height,
        x: windowState.x,
        y: windowState.y,
        show: false,
        resizable: true,
        maximizable: true,
        frame: true,
        // useContentSize: true,
        titleBarStyle: "hiddenInset",
        autoHideMenuBar: true,
        // backgroundColor: '#fff',
        thickFrame: true,
        vibrancy: "light",
        // transparent: true,
        title: app.getName(),
        webPreferences: {
            nodeIntegration: true,
            backgroundThrottling: false,
            textAreasAreResizable: true,
        },
    })

    window.setResizable(true)

    window.setMaximizable(true)
    // window.setSize(100,100, true)
    // LETS OPEN THE DEV TOOLS
    window.webContents.openDevTools()


    // maximize if we did before
    if (windowState.maximized) {
        window.maximize()
    }

    // trap movement events
    window.on("close", () => windowState.saveState(window))
    window.on("move", () => windowState.saveState(window))
    window.on("resize", () => windowState.saveState(window))
    window.on('app-command', (e, cmd) => {
        console.log('app-command', cmd);
        console.log('app-window.webContents.canGoBack()', window.webContents.canGoBack());
        // Navigate the window back when the user hits their mouse back button
        if (cmd === 'browser-backward' && window.webContents.canGoBack()) {
          window.webContents.goBack()
        }
      })
    // load entry html page in the renderer.
    loadURL(window, appPath, "ui-renderer.html")

    // only appear once we've loaded
    window.webContents.on("did-finish-load", () => {
        setTimeout(() => {
            window.show()
            window.focus()
        }, showDelay)
    })

    return window
}
