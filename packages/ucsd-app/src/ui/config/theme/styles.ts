import { CSSProperties } from "react"

/**
 * Typecast objects as CSSProperties.  ¯\\_(ツ)_/¯
 */
// export function cssProps(props?: CSSProperties): CSSProperties {
//   return props as CSSProperties
// }
export const cssProps = (props?: CSSProperties): CSSProperties => props as CSSProperties;

const flexbox = {
    /** Flex the children vertically. */
    column: cssProps({ display: "flex", flexDirection: "column" }),

    /** Flex the children horizontally. */
    row: cssProps({ display: "flex", flexDirection: "row" }),

    /** Grow to the size of our parent. */
    //   flex1: cssProps({ flex: 1 }),
    // flex: <positive-number>
    // Equivalent to flex: <positive-number> 1 0. Makes the flex item flexible and sets the
    // flex basis to zero, resulting in an item that receives the specified proportion of the
    // free space in the flex container. If all items in the flex container use this pattern,
    // their sizes will be proportional to the specified flex factor.
    flex1: cssProps({
        // flex: 1, => equiv to
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 'auto'
    }),
}

const electron = {
    /** Enable window dragging. */
    windowDrag: cssProps({ WebkitAppRegion: "drag" }),

    /** Disable window dragging. */
    noWindowDrag: cssProps({ WebkitAppRegion: "no-drag" }),
}

/**
 * Full screen and disable the scrolling.
 */
const fullScreen = cssProps({ overflow: "hidden", height: "100vh", ...flexbox.column })

/**
 * Style presets.
 */
export const styles = {
    ...flexbox,
    ...electron,
    fullScreen,
}
