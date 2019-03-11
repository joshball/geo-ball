import { css } from '@geo-ball/component-lib';

export const fannypackTheme = {
    global: {
        base: css`
            font-family: 'Comic Sans MS';
        `,
    },
    palette: {
        primary: 'blue',
    },
    layout: {
        mobileBreakpoint: 520,
        tabletBreakpoint: 960,
    },
    Button: {
        disabled: css`
            opacity: 0.2;
        `,
    },
    Text: css`
        font-weight: 300;
    `,
};
