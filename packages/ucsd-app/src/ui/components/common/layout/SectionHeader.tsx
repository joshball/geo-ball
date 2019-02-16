import * as React from "react"
// tslint:disable-next-line:no-duplicate-imports
import { CSSProperties } from "react"
import { colors, fonts, fontSizes, cssProps, sectionHeaders } from "../../../config/theme"
import { css } from "glamor"

const STYLE = cssProps({
    color: colors.text,
    fontSize: fontSizes.medium,
    fontFamily: fonts.default,
    padding: 0,
    margin: 0,
})

export interface ISectionHeaderProps {
    text?: string
    children?: React.ReactNode
    style?: CSSProperties | CSSProperties[]
}

export function SectionHeaderOne(props: ISectionHeaderProps) {
    const styleProps = css(STYLE, props.style, sectionHeaders[3])
    return <p {...styleProps}>{props.children || props.text}</p>
}

export function SectionHeaderTwo(props: ISectionHeaderProps) {
    const styleProps = css(STYLE, props.style, sectionHeaders[4])
    return <p {...styleProps}>{props.children || props.text}</p>
}

export function SectionHeaderThree(props: ISectionHeaderProps) {
    const styleProps = css(STYLE, props.style, sectionHeaders[5])
    return <p {...styleProps}>{props.children || props.text}</p>
}
