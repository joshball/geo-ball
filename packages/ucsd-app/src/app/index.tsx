// This is the entry point for the renderer process.
//
// Here we disable a few electron settings and mount the root component.
import * as React from "react"
import * as ReactDOM from "react-dom"
import { RootComponent } from "./root-component"
import { webFrame } from "electron"
import { css } from "glamor"
// import "normalize.css/normalize.css";
// import "@blueprintjs/core/lib/css/blueprint.css";
// import "@blueprintjs/icons/lib/css/blueprint-icons.css";
// import "normalize.css/normalize.css"

/**
 * CSS reset
 */
// import "glamor/reset"

// /**
//  * Electron-focused CSS resets
//  */
// css.global("html, body", {
//   // turn off text highlighting
//   userSelect: "none",

//   // reset the cursor pointer
//   cursor: "default",

//   // font
//   font: "caption",

//   // text rendering
//   WebkitFontSmoothing: "subpixel-antialiased",
//   textRendering: "optimizeLegibility",
// })


/**
 * Zooming resets
 */
webFrame.setVisualZoomLevelLimits(1, 1)
webFrame.setLayoutZoomLevelLimits(0, 0)

/**
 * Drag and drop resets
 */
document.addEventListener("dragover", event => event.preventDefault())
document.addEventListener("drop", event => event.preventDefault())

// mount the root component
// console.log('RootComponent:', RootComponent);
ReactDOM.render(<RootComponent />, document.getElementById("root"))
// ReactDOM.render(<div>hey</div>, document.getElementById("root"))
