import * as React from 'react'
import { css } from 'glamor'
import { Link, Redirect } from 'react-router-dom'
import { colors, fonts, fontSizes, cssProps } from "../config/theme"
import { Button, Intent, ControlGroup } from "@blueprintjs/core";
import { CenteredContent } from '../components/common/layout/CenteredContent';
import { Text } from '../components/common/layout/Text';
import { IRouteData, getRouteDataArray, ROUTE_DATA } from '../config/routes';

const mainLayout = css({
    // display: 'grid',
    minHeight: 'calc(100vh - 50px)',
    // gridTemplateRows: '100%',
    // gridTemplateColumns: '1fr 400px',
    // gridTemplateAreas: 'main sidebar',
});

const STYLE = cssProps({
    color: colors.text,
    fontSize: fontSizes.large,
    fontFamily: fonts.default,
    padding: 0,
    margin: 0,
})

const LINK_STYLE = cssProps({
    // padding: 0,
    margin: '10px',
})

const buttonBarCss = cssProps({
    // padding: 0,
    margin: '20px',
})

export const getRouteButtonsLinkComp = (r: IRouteData, i: number) => (
    <Link style={LINK_STYLE} key={i} to={r.path}>
        <Button intent={Intent.PRIMARY} text={r.navButtonTxt} />
    </Link>
)



export const HomePage: React.SFC<any> = (props: any) => {
    console.log('ROUTE_DATA', ROUTE_DATA)
    console.log('getRouteDataArray', getRouteDataArray)
    const getRouteButtonsLinkCompArray = (rd: any) => getRouteDataArray(rd).map(getRouteButtonsLinkComp)
    const BUTTON_COMPONENTS = getRouteButtonsLinkCompArray(ROUTE_DATA);
    console.log('HomePage location', location)
    console.log('HomePage props.location', props.location)
    console.log('HomePage props.match', props.match)
    // return <Redirect to='/settings' />;
    return <Redirect to='/files' />;
    return (
        <CenteredContent style={mainLayout}>
            <Text style={STYLE}>
                Welcome
            </Text>
            <div style={buttonBarCss}>
                {BUTTON_COMPONENTS}
            </div>
        </CenteredContent>
    )
}


