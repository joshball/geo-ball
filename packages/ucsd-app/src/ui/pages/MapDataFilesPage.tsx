import * as React from 'react'
import { css } from 'glamor'
import { colors, fonts, fontSizes, cssProps } from "../config/theme"
import { Button, Intent } from "@blueprintjs/core";
import { MapExplorerPage } from './MapExplorerPage';
import { CenteredContent } from '../components/common/CenteredContent';
import { Text } from '../components/common/Text';
import { WelcomeScreen } from '../OLD/views/example/welcome-screen/welcome-screen';
import { MapDataFilesComponent } from '../components/files/MapDataFilesComponent';
import { Redirect } from 'react-router';

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

export const MapDataFilesPage: React.SFC<any> = (props: any) => {
    console.log('MapDataFilesPage', props.location, props.match)
    return (
        <CenteredContent style={mainLayout}>
            <Text style={STYLE}>
                MAP DATA FILES
            </Text>
            <MapDataFilesComponent />
        </CenteredContent>
    )
}


