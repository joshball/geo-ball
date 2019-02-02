import * as React from 'react'
import { css } from 'glamor'
import { Link } from 'react-router-dom'
import { colors, fonts, fontSizes, cssProps } from "../config/theme"
import { Button, Intent } from "@blueprintjs/core";
import { MapExplorerPage } from './MapExplorerPage';
import { CenteredContent } from '../components/common/CenteredContent';
import { Text } from '../components/common/Text';
import { WelcomeScreen } from '../OLD/views/example/welcome-screen/welcome-screen';
import { UcsdManagedDirComponent } from '../components/files/UcsdManagedDirComponent';

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

const buttonBarCss = cssProps({
    // padding: 0,
    margin: '20px',
})

export const HomePage: React.SFC<any> = (props: any) => {
    console.log('HomePage location', location)
    console.log('HomePage props.location', props.location)
    console.log('HomePage props.match', props.match)
    return (
        <CenteredContent style={mainLayout}>
            <Text style={STYLE}>
                <Link to="/files">Welcome </Link>
            </Text>
            <UcsdManagedDirComponent />
            <div style={buttonBarCss}>
                <Link to="/maps">
                    <Button intent={Intent.PRIMARY} text="Explore and Download Maps" />
                </Link> &nbsp;&nbsp;
                <Link to="/files">
                    <Button intent={Intent.PRIMARY} text="Map Data Files" />
                </Link> &nbsp;&nbsp;
                <Button intent={Intent.PRIMARY} text="Map Data Files">
                    <Link to="/files"></Link>
                </Button>&nbsp;&nbsp;
                <Button intent={Intent.PRIMARY} text="Routing Fun">
                    <Link to="/routes"></Link>
                </Button>
            </div>
        </CenteredContent>
    )
}


