import * as React from 'react'

import { Card, Elevation } from '@blueprintjs/core';
import { css } from 'glamor';
import { cardStyle } from './ApiStyles'

export interface IApiJsonResultsViewProps {
}

export class ApiJsonResultsView extends React.Component<IApiJsonResultsViewProps> {
    render() {
        const mainFormWrapDiv = {
            display: 'flex',
            height: '440px',
        };
        const mainQueryStyle = css({
            display: 'flex',
            // margin: '10px',
            padding: '10px',
            // justifyContent: 'flex-end',
            // alignContent: 'flex-end',
            width: 'fit-content',
            // align:'right',
            // backgroundColor: colors.pastels.litBlue,
        });
        const queryColStyle = css({
            display: 'inline-block',
            // margin: '10px',
            // padding: '10px',
            width: '100%',
            // backgroundColor: colors.pastels.litBlue,
        });

        return <Card style={cardStyle} interactive={false} elevation={Elevation.FOUR}>
            <h4>Results</h4>
            <pre>{JSON.stringify(this.props.children, null, 4)}</pre>
        </Card>;
    }
}
