import * as React from 'react';
import { css, nthChild, compose } from 'glamor';
import { Switch } from '@blueprintjs/core';
import { colors, styles, cssProps, spacing, fontSizes, fonts } from '../../config/theme';
import { autoUpdater } from 'electron-updater';

export interface OsmDownalodApiPanelState {}
export interface OsmDownalodApiPanelProps {}

export class OsmDownalodApiPanel extends React.Component<
    OsmDownalodApiPanelProps,
    OsmDownalodApiPanelState
> {
    getFormBox() {
        const switchDivCss = css({
            boxSizing: 'border-box',
            // display: 'inline-block',
            // marginLeft: '5px',
            // height: 'auto',
            // margin: '0 20px 0px 20px',
            padding: '5px 20px 5px 20px',
            // border: 'thick double black',
            backgroundColor: colors.white,
            writingMode: 'horizontal-tb',
        });
        const selectBoxesBoxStyleEx = css({
            display: 'block',
            // width: 'fit-content',
            // backgroundColor: colors.pastels.litGreen,
        });
        const labelBoxStyle = css({
            display: 'block',
            //  width: 'fit-content',
            float: 'right',
            backgroundColor: colors.pastels.litGreen,
        });
        const selectBoxesBoxStyle = css({
            display: 'inline-flex',
            // flex: '1',
            // // flex:'0 0 100%',
            // flexDirection: 'row',
            alignContent: 'flex-start',
            // alignItems: 'flex-start',
            // justifyContent: 'flex-start',
            flexWrap: 'wrap',
            writingMode: 'vertical-lr',
            // margin: '20px',
            margin: '10px',
            padding: '10px',
            // border: 'thick double black',
            // height: '210px',
            height: '210px',
            // width: '500px',
            // width: 'min-content',
            // width: 'fit-content',
            // width: 'max-content',
            // width: 'auto',
            // flexBasis: 'auto', /* default value */
            // flexGrow: 1,
            backgroundColor: colors.primaryScale[3],
        });
        const formBoxStyle = css({
            display: 'block',
            // margin: '20px',
            // border: 'thick double black',
            // float: 'right',
            backgroundColor: colors.pastels.litOrange,
        });

        const labels = [
            'Address Details',
            'Bounded',
            'DeDupe',
            'Debug',
            'Extra Tags',
            'Name Details',
            'Polygon GeoJSON',
            'Polygon KML',
            'Polygon SVG',
            'Polygon Text',
        ];

        const singleSwitchWithDiv = (label: string, i: number) => (
            <div className="switch-div" {...switchDivCss} key={i}>
                <Switch label={label} />
            </div>
        );

        const switchesWithDiv = labels.map(singleSwitchWithDiv);
        const formBox = (
            <div {...formBoxStyle}>
                <h2>HEY</h2>
                <div {...labelBoxStyle}>
                    <div {...selectBoxesBoxStyleEx}>
                        <label>Switches WITH div</label>
                    </div>
                    <div>
                        <div {...selectBoxesBoxStyle}>{switchesWithDiv}</div>
                    </div>
                </div>
            </div>
        );
        return formBox;
    }

    getDivBoxItems() {
        const divBoxContainerStyle = css({
            display: 'inline-flex',
            flex: '1',
            // flex:'0 0 100%',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            flexWrap: 'wrap',
            border: '3px solid black',
            height: '500px',
            // overflow: 'visible',
            // width: '900px',
            // width: '100%',
        });

        const divBoxItemStyle = css({
            margin: '10px',
            // these two center the text in the div
            textAlign: 'center',
            display: 'inline-block',
            // alignSelf: 'flex-start',
            width: '200px',
            height: '50px',
            backgroundColor: '#ebf1f5',
            fontSize: '35px',
        });

        const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const divBoxItems = nums.map((n, i) => (
            <div key={i} {...divBoxItemStyle}>
                {n}
            </div>
        ));
        return <div {...divBoxContainerStyle}>{divBoxItems}</div>;
    }
    render() {
        const fullFormBoxStyle = css({
            height: '50%',
            minHeight: '500px',
            width: '1200px',
            minWidth: '1200px',

            margin: '30px',
            padding: '20px',
            border: 'thick double black',
            backgroundColor: '#ebf1f5',
        });

        return (
            <div>
                <h1>OSM Downloading</h1>
                <div {...fullFormBoxStyle}>{this.getFormBox()}</div>
                <div>{this.getDivBoxItems()}</div>
            </div>
        );
    }
}
{
    /* <div {...BAR}>
    <Tab active={true} text="doggo" />
    <Tab active={true} text="yo" />
</div> */
}
const BAR = css(
    styles.row,
    styles.windowDrag,
    cssProps({
        paddingLeft: spacing.medium,
        paddingRight: spacing.medium,
        paddingTop: spacing.small,
        backgroundColor: colors.nav.background,
        justifyContent: 'center',
        borderBottom: 1,
        borderBottomColor: colors.nav.line,
        borderBottomStyle: 'solid',
    }),
);

export interface TabProps {
    text: string;
    active?: boolean;
    style?: React.CSSProperties | React.CSSProperties[];
    onClick?: () => void;
}

const BASE = compose(
    styles.noWindowDrag,
    cssProps({
        cursor: 'pointer',
        paddingTop: spacing.small,
        paddingBottom: spacing.small,
        paddingLeft: spacing.medium,
        paddingRight: spacing.medium,
    }),
);

const ACTIVE = cssProps({
    borderBottom: colors.nav.line,
    borderBottomWidth: 2,
    borderBottomStyle: 'solid',
});

const BASE_TEXT = cssProps({ color: colors.nav.inactive, fontSize: fontSizes.mediumPlus });
const ACTIVE_TEXT = cssProps({ color: colors.nav.active });

export function Tab(props: TabProps) {
    // work out the styles
    const styleProps = css(BASE, props.active && ACTIVE, props.style);
    const textStyle = css(BASE_TEXT, props.active && ACTIVE_TEXT);

    return (
        <div {...styleProps} onClick={props.onClick}>
            <Text style={textStyle} text={props.text} />
        </div>
    );
}

export interface TextProps {
    text?: string;
    children?: React.ReactNode;
    style?: React.CSSProperties | React.CSSProperties[];
}

const STYLE = cssProps({
    color: colors.text,
    fontSize: fontSizes.medium,
    fontFamily: fonts.default,
    padding: 0,
    margin: 0,
});

export function Text(props: TextProps) {
    const styleProps = css(STYLE, props.style);
    return <p {...styleProps}>{props.children || props.text}</p>;
}
