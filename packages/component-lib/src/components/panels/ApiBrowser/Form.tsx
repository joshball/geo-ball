import * as React from 'react'
import { BlueCard as Card, Elevation } from '../../atoms';
import { cardStyle } from '../../themes/ApiStyles';

export class FormContainer extends React.Component {
    render() {
        return <Card style={cardStyle} interactive={false} elevation={Elevation.FOUR}>
            {this.props.children}
        </Card>;
    }
}
