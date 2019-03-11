import { CSSProperties } from 'react';
import { fonts } from './fonts';

/**
 * Typecast objects as CSSProperties.  ¯\\_(ツ)_/¯
 */
// export function cssProps(props?: CSSProperties): CSSProperties {
//   return props as CSSProperties
// }
export const cssProps = (props?: CSSProperties): CSSProperties => props as CSSProperties;

const flexbox = {
    /** Flex the children vertically. */
    column: cssProps({ display: 'flex', flexDirection: 'column' }),

    /** Flex the children horizontally. */
    row: cssProps({ display: 'flex', flexDirection: 'row' }),

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
        flexBasis: 'auto',
    }),
    justifyRight: {
        display: 'flex',
        justifyContent: 'flex-end',
    },

    formColumn: {
        display: 'inline-block',
        margin: '10px',
        padding: '10px',
    },
};

export const BaseFormFont = {
    fontFamily: fonts.forms,
    fontSize: '16px',
};

export const FormLabelStyle = { ...BaseFormFont, fontSize: '18px' };

const commonSectionHeader = (more: any) => {
    return {
        fontFamily: fonts.forms,
        fontWeight: 700,
        ...more,
    };
};

export const sectionHeaders = {
    1: commonSectionHeader({ fontSize: '36px' }),
    2: commonSectionHeader({ fontSize: '30px' }),
    3: commonSectionHeader({ fontSize: '24px' }),
    4: commonSectionHeader({ fontSize: '18px' }),
    5: commonSectionHeader({ fontSize: '14px' }),
};

const electron = {
    /** Enable window dragging. */
    // tslint:disable-next-line:no-object-literal-type-assertion
    windowDrag: cssProps({ WebkitAppRegion: 'drag' } as CSSProperties),
    // windowDrag: cssProps({ WebkitAppRegion: "drag" }),

    /** Disable window dragging. */
    // tslint:disable-next-line:no-object-literal-type-assertion
    noWindowDrag: cssProps({ WebkitAppRegion: 'no-drag' } as CSSProperties),
};

/**
 * Full screen and disable the scrolling.
 */
const fullScreen = cssProps({ overflow: 'hidden', height: '100vh', ...flexbox.column });

/**
 * Style presets.
 */
export const styles = {
    ...flexbox,
    ...electron,
    fullScreen,
};
