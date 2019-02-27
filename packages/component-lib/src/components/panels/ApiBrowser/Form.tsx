import * as React from 'react'
// import { Card, Elevation } from 'fannypack';
import { Card, Elevation } from '@blueprintjs/core';
import { cardStyle } from '../../themes/ApiStyles';

export class FormContainer extends React.Component {
    render() {
        return <Card style={cardStyle} interactive={false} elevation={Elevation.FOUR}>
            {this.props.children}
        </Card>;
    }
}
