import * as React from 'react'
import { css } from 'glamor'
import { colors, fonts, fontSizes, cssProps } from "./theme"
import { Button, Intent } from "@blueprintjs/core";
import { MapDownloadPage } from './MapDownloadPage';
import { CenteredContent } from './common/CenteredContent';
import { Text } from './common/Text';
import { WelcomeScreen } from '../OLD/views/example/welcome-screen/welcome-screen';

const mainLayout = css({
    // display: 'grid',
    minHeight: '100vh',
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

const buttonBarCss = cssProps({
    // padding: 0,
    margin: '20px',
})

export const RoutingPage: React.SFC<any> = (props: any) => {

    return (
        <CenteredContent style={mainLayout}>
            <Text style={STYLE}>
                Welcome
            </Text>
            <div style={buttonBarCss}>
                <a href="/maps">Explore and Download Maps</a>&nbsp;&nbsp;
                <Button intent={Intent.PRIMARY} text="Explore and Download Maps" />&nbsp;&nbsp;
                <Button intent={Intent.PRIMARY} text="Map Data Files" />&nbsp;&nbsp;
                <Button intent={Intent.PRIMARY} text="Routing Fun" />
            </div>
        </CenteredContent>
    )
}


