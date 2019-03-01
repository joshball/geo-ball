import * as React from 'react';

import { Button } from '../../atoms';

import { FloatProperty } from 'csstype';

export interface ISubmitButtonProps {
    disabled?: boolean;
    execute: () => Promise<any>;
    children: React.ReactNode;
}

export interface ISubmitButtonState {
    submitting: boolean;
}

export class SubmitButton extends React.Component<ISubmitButtonProps, ISubmitButtonState> {
    state: ISubmitButtonState;
    constructor(props: ISubmitButtonProps) {
        super(props);
        this.state = { submitting: false };
        this.onClick = this.onClick.bind(this);
    }
    async onClick() {
        console.log('SubmitButton.onClick!');
        console.log('SubmitButton.onClick!', this.props);
        this.setState({ submitting: true });
        try {
            await this.props.execute();
        } finally {
            this.setState({ submitting: false });
        }
    }
    render() {
        /** @type {{search: React.CSSProperties}} */
        // const buttonDiv = {
        //     // float: 'right' as FloatProperty,
        //     display: 'inline-flex',
        //     alignItems: 'center',
        //     justifyContent: 'flex-right',
        //     height: '100%',
        //     // marginRight: '75px',
        //     // marginLeft: '75px',
        // };
        const { disabled, execute: _, ...props } = this.props;
        return (
            // <div style={buttonDiv}>
                <Button
                    {...props}
                    palette="primary"
                    isLoading={this.state.submitting}
                    disabled={this.props.disabled}
                    onClick={this.onClick}
                >
                    {this.props.children}
                </Button>
            // </div>
        );
    }
}
