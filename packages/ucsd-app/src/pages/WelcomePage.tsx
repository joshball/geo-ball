import * as React from 'react'
import { css } from 'glamor'
import { colors, fonts, fontSizes, cssProps } from "./theme"
import { Button, Intent } from "@blueprintjs/core";
import { MapDownloadPage } from './MapData/MapDownloadPage';
import { CenteredContent } from './common/CenteredContent';
import { Text } from './common/Text';

// const mainLayout = css({
//     display: 'grid',
//     minHeight: '100%',
//     gridTemplateRows: '100%',
//     gridTemplateColumns: '1fr 400px',
//     gridTemplateAreas: 'main sidebar',
// });

const STYLE = cssProps({
    color: colors.text,
    fontSize: fontSizes.large,
    fontFamily: fonts.default,
    padding: 0,
    margin: 0,
})

export const WelcomePage: React.SFC<any> = (props: any) => {

    return (
        <CenteredContent>
            <Text style={STYLE}>
                Hello There
            </Text>
            <div>
                <Button intent={Intent.PRIMARY} text="Map Data" /> <Button intent={Intent.PRIMARY} text="Routing" />
            </div>
        </CenteredContent>
    )
}
