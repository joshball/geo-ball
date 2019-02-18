import * as React from 'react'
import { Card, Elevation, Button, Intent } from '@blueprintjs/core';
import { cardStyle } from './ApiStyles';

export interface IApiActionsViewProps {
    fullUrl: string;
    makeRequest: () => Promise<any>;
}
export interface IApiActionsViewState {
    submitting: boolean;
}

export class ApiActionsView extends React.Component<IApiActionsViewProps, IApiActionsViewState> {

    state: IApiActionsViewState;

    constructor(props: IApiActionsViewProps) {
        super(props)
        this.state = {
            submitting: false
        }
        this.onClick = this.onClick.bind(this);
    }
    onClick() {
        console.log('onClick!')
        this.setState({
            submitting: true,
        });

        this.props.makeRequest()
            .finally(() => {
                this.setState({
                    submitting: false,
                });
            })
    }
    render() {
        console.log('this.state.submitting', this.state.submitting)
        return <Card style={cardStyle}  interactive={false} elevation={Elevation.FOUR}>
            <div>
                {this.props.fullUrl}
            </div>
            <Button
                disabled={this.state.submitting}
                onClick={this.onClick}
                intent={Intent.PRIMARY}>Make it so!</Button>
        </Card>;
    }
}
