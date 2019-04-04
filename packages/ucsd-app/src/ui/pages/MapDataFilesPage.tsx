import * as React from 'react';
import { css } from 'glamor';
import { colors, fonts, fontSizes, cssProps } from '../config/theme';
import { Button, Intent } from '@blueprintjs/core';
import { MapExplorerPage } from './MapExplorerPage';
import { CenteredContent } from '../components/common/layout/CenteredContent';
import { Text } from '../components/common/layout/Text';
// import { WelcomeScreen } from '../OLD/views/example/welcome-screen/welcome-screen';
import { MapDataFilesComponent } from '../components/files/MapDataFilesComponent';
import { Redirect } from 'react-router';
import { OsmFetchManagerComponent } from '../components/files/OsmFetchManagerComponent';

const mainLayout = cssProps({
    // display: 'grid',
    // padding: 0,
    margin: '30px',
    // minHeight: '100vh',
    // gridTemplateRows: '100%',
    // gridTemplateColumns: '1fr 400px',
    // gridTemplateAreas: 'main sidebar',
});

const STYLE = cssProps({
    float: 'left',
    color: colors.text,
    fontSize: fontSizes.large,
    fontFamily: fonts.default,
    padding: 0,
    margin: 0,
});

const LSTYLE = cssProps({
    float: 'right',
    color: colors.text,
    fontSize: fontSizes.large,
    fontFamily: fonts.default,
    padding: 0,
    margin: 0,
});

const buttonBarCss = cssProps({
    // padding: 0,
    margin: '20px',
});

export const MapDataFilesPage: React.SFC<any> = (_props: any) => {
    console.log('MapDataFilesPage');
    return (
        <div style={mainLayout}>
            {/* <Text style={STYLE}>
                MAP DATA FILES
            </Text>
            <Text style={LSTYLE}>
                MAP DATA FILES
            </Text> */}
            {/* <MapDataFilesComponent /> */}
            <OsmFetchManagerComponent />
        </div>
    );
};
