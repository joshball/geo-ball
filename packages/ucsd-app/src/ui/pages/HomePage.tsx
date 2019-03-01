import * as React from 'react'
import { css } from 'glamor'
import { colors, fonts, fontSizes, cssProps } from "../config/theme"
import { CenteredContent } from '../components/common/layout/CenteredContent';
import { Text } from '../components/common/layout/Text';
import { MAIN_ROUTES_DATA } from '../config/routes';
import { Redirect } from 'react-router';

const mainLayout = css({
    // display: 'grid',
    minHeight: 'calc(100vh - 50px)',
    // gridTemplateRows: '100%',
    // gridTemplateColumns: '1fr 400px',
    // gridTemplateAreas: 'main sidebar',
});

const WelcomeTextStyle = cssProps({
    color: colors.text,
    fontSize: fontSizes.large,
    fontFamily: fonts.default,
    padding: 0,
    margin: 0,
})

const HomeButtonLinkStyle = cssProps({
    margin: '10px',
})

const HomeButtonDivStyle = cssProps({
    margin: '20px',
})

// // console.log('ROUTE_DATA', ROUTE_DATA)
// console.log('ROUTE_COMPONENTS_EX', ROUTE_COMPONENTS_EX)
// // console.log('getRouteDataArray', getRouteDataArray)
// // const BUTTON_COMPONENTS = getRouteButtonsLinkCompArray(ROUTE_DATA);
// // const BUTTON_COMPONENTS = getRouteButtonsLinkCompArray(ROUTE_DATA);

export const HomePage: React.SFC<any> = (props: any) => {
    // console.log('HomePage location', location)
    // console.log('HomePage props.location', props.location)
    // console.log('HomePage props.match', props.match)
    console.log('HomePage props (about to redirect to /api)', props)
    // return <Redirect to='/settings' />;
    // return <Redirect to='/hooks' />;
    return <Redirect to='/api' />;
    // return <Redirect to='/files' />;
    // return <Redirect to='/maps' />;
    const homeButtons = MAIN_ROUTES_DATA
        .filter(r => r.path !== '/')
        .map((r, i) => r.getLinkButtons(i, HomeButtonLinkStyle));

    return (
        <CenteredContent style={mainLayout}>
            <Text style={WelcomeTextStyle}>
                Welcome
            </Text>
            <div style={HomeButtonDivStyle}>
                {homeButtons}
            </div>
        </CenteredContent>
    )
}


