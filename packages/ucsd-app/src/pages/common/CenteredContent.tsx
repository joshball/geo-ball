import * as React from "react"
import { compose, css } from "glamor"
import { cssProps, styles } from "../theme"

export interface CenteredContentProps {
    children: React.ReactNode
    style?: React.CSSProperties | React.CSSProperties[] | false | null
}

const BASE = compose(
    styles.flex1,
    styles.column,
    cssProps({
        overflow: "hidden",
        justifyContent: "center",
        alignItems: "center",
    }),
)

export function CenteredContent(props: CenteredContentProps) {
    return <div {...css(BASE, props.style)}>{props.children}</div>
}
