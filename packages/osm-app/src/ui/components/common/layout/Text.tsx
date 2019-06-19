import React from 'react';
// tslint:disable-next-line:no-duplicate-imports
import { CSSProperties } from 'react';
// import { colors, fonts, fontSizes, cssProps } from '../../../config/theme';

export interface TextProps {
    text?: string;
    children?: React.ReactNode;
    style?: CSSProperties | CSSProperties[];
}

// export const STYLE = cssProps({
//     color: colors.text,
//     fontSize: fontSizes.medium,
//     fontFamily: fonts.default,
//     padding: 0,
//     margin: 0,
// });

export function Text(props: TextProps) {
    const styleProps = {};
    // const styleProps = css(STYLE, props.style);
    return <p {...styleProps}>{props.children || props.text}</p>;
}
