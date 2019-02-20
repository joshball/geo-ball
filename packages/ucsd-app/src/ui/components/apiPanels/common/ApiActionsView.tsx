import * as React from 'react'
import { Card, Elevation, Button, Intent, Switch } from '@blueprintjs/core';
import { cardStyle } from './ApiStyles';
import { styles } from '../../../config/theme';
import { flow } from 'mobx';
import { style } from 'glamor';



export interface IApiActionsViewProps {
    fakeTheApiCallValue: boolean;
    fakeTheApiCallToggle: (_event: React.SyntheticEvent) => void;

    showFormStatePaneValue: boolean;
    showFormStatePaneToggle: (_event: React.SyntheticEvent) => void;
    getFormState: () => Promise<any>;

    showParameterPaneValue: boolean;
    showParameterPaneToggle: (_event: React.SyntheticEvent) => void;
    getParameters: () => Promise<any>;

    makeRequest: () => Promise<any>;
}

export const ApiActionsView = (props: IApiActionsViewProps) => {
    const actionBarDivStyle = {
        overflow: 'hidden',
        height: '30px',
        // float: 'right',
        // display: 'flex',
    }
    return (
        <Card style={cardStyle} interactive={false} elevation={Elevation.FOUR}>
            <div style={actionBarDivStyle}>
                <SubmitRequestButton {...props} />
                <DebugToggles  {...props} />
            </div>
        </Card>
    );
}

const floatRight = {
    float: 'right',
    // display: 'flex',
}

export const DebugToggles = (props: IApiActionsViewProps) => {
    const switchDivStyle = {
        float: 'right',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
    }
    const switchStyle = {
        margin: '0px 10px 0px 10px',
    }
    return (
        <div style={switchDivStyle}>
            <Switch
                style={switchStyle}
                checked={props.fakeTheApiCallValue}
                label="Fake the API call"
                onChange={props.fakeTheApiCallToggle}
            />
            <Switch
                style={switchStyle}
                checked={props.showFormStatePaneValue}
                label="Show Form State"
                onChange={props.showFormStatePaneToggle}
            />
            <Switch
                style={switchStyle}
                checked={props.showParameterPaneValue}
                label="Show Parameter Pane"
                onChange={props.showParameterPaneToggle}
            />

        </div>
    )
}


export interface ISubmitRequestButtonState {
    submitting: boolean;
}

export class SubmitRequestButton extends React.Component<IApiActionsViewProps, ISubmitRequestButtonState> {

    state: ISubmitRequestButtonState;

    constructor(props: IApiActionsViewProps) {
        super(props)
        this.state = { submitting: false }
        this.onClick = this.onClick.bind(this);
    }

    async onClick() {
        console.log('onClick!')
        this.setState({ submitting: true, });

        try { await this.props.makeRequest(); }
        finally {
            this.setState({ submitting: false, });
        }
    }

    render() {
        const buttonDiv = {
            float: 'right',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            marginRight: '75px',
            marginLeft: '75px',
        }

        return (
            <div style={buttonDiv}>
                <Button
                    disabled={this.state.submitting}
                    onClick={this.onClick}
                    intent={Intent.PRIMARY}
                >
                    Make the request
                </Button>
            </div>
        );
    }
}
