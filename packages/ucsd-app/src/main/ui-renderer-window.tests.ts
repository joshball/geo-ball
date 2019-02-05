import { createUiWindow } from "./ui-renderer-window"
// @ts-ignore
import * as containDeep from "jest-expect-contain-deep"
import { BrowserWindow } from "electron"
// tslint:disable-next-line:no-var-requires
const WindowStateManager = require("electron-window-state-manager")

it("can read window state", () => {
    WindowStateManager.mockImplementation(() => ({ width: 10, height: 40 }))
    createUiWindow(__dirname)
    expect(BrowserWindow).toBeCalledWith(containDeep({ width: 10, height: 40 }))
})

it("might maximize on startup", () => {
    WindowStateManager.mockImplementation(() => ({ maximized: true }))
    const window = createUiWindow(__dirname)
    expect(window.maximize).toBeCalled()
})

it("might not maximize on startup", () => {
    WindowStateManager.mockImplementation(() => ({ maximized: false }))
    expect(createUiWindow(__dirname).maximize).not.toBeCalled()
})

test("saves window state", () => {
    const saveState = jest.fn()
    WindowStateManager.mockImplementation(() => ({ saveState }))
    const window: BrowserWindow = createUiWindow(__dirname)
    window.emit("close")
    window.emit("move")
    window.emit("resize")
    expect(saveState).toHaveBeenCalledTimes(3)
})

test("show the window after we finish loading + delay", async () => {
    const window: BrowserWindow = createUiWindow(__dirname, 1)
    window.webContents.emit("did-finish-load")
    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
    await delay(2)
    expect(window.show).toHaveBeenCalled()
    expect(window.focus).toHaveBeenCalled()
})
