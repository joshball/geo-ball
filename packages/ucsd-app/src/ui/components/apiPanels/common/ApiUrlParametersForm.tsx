import * as React from 'react'
import { Card, Elevation } from '@blueprintjs/core';
import { cardStyle } from './ApiStyles';

export interface IApiUrlParametersFormProps {
    // form:any;
}

export class ApiUrlParametersForm extends React.Component<IApiUrlParametersFormProps> {
    render() {
        return <Card style={cardStyle} interactive={false} elevation={Elevation.FOUR}>
            {this.props.children}
        </Card>;
    }
}

export class ApiFormParametersForm extends React.Component {
    render() {
        return <div>ApiUrlParametersForm</div>
    }
}
