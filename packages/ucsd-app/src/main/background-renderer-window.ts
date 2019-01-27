import { app, BrowserWindow } from "electron";
// tslint:disable-next-line:no-var-requires
import { loadURL } from "./load-url"

/**
 * Creates the main window.
 *
 * @param appPath The path to the bundle root.
 * @param showDelay How long in ms before showing the window after the renderer is ready.
 * @return The main BrowserWindow.
 */
export function createBackgroundWindow(appPath: string, showDelay: number = 100) {
    // create our main window
    const window = new BrowserWindow({
        show: false,
    });

    // load entry html page in the renderer.
    loadURL(window, appPath, 'background-renderer.html')
    window.webContents.openDevTools()

    return window
}
