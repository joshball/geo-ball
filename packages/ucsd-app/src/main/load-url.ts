import { join } from "path"
import { format } from "url"

export function loadURL(
  window: Electron.BrowserWindow,
  appPath: string,
  htmlFile: string,
  showStorybook: boolean = false,
) {
  if (showStorybook) {
    window.loadURL("http://localhost:6006")
  } else {
    window.loadURL(
      format({
        // pathname: join(appPath, "out/index.html"),
        pathname: join(appPath, "out", htmlFile),
        protocol: "file:",
        slashes: true,
      }),
    )
  }
}
